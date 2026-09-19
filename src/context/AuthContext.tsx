import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { UserRole } from '../lib/database.types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: { role: UserRole; id: string } | null;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, role: UserRole, fullName?: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<{ role: UserRole; id: string } | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    // users.role is the source of truth for RBAC (set at signup and never
    // guessed) — previously this function probed customers/vendors/
    // dispatch_riders in a fixed order and silently defaulted anyone it
    // didn't find (e.g. an admin, who has none of those rows) to 'customer'.
    const { data: userRow, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (userError || !userRow) {
      setUserProfile(null);
      return;
    }

    const role = userRow.role;

    if (role === 'customer') {
      const { data: customer } = await supabase.from('customers').select('id').eq('user_id', userId).single();
      setUserProfile({ role, id: customer?.id ?? '' });
    } else if (role === 'vendor') {
      const { data: vendor } = await supabase.from('vendors').select('id').eq('user_id', userId).single();
      setUserProfile({ role, id: vendor?.id ?? '' });
    } else if (role === 'dispatcher') {
      const { data: rider } = await supabase.from('dispatch_riders').select('id').eq('user_id', userId).single();
      setUserProfile({ role, id: rider?.id ?? '' });
    } else {
      // admin, super_admin, vendor_staff, dispatcher_manager, support_agent —
      // none of these have a dedicated profile table; the auth user id is
      // the identity.
      setUserProfile({ role, id: userId });
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, role: UserRole, fullName?: string) => {
    // public.users and the role-specific profile row (customers/vendors/
    // dispatch_riders) are created server-side by the on_auth_user_created
    // trigger (see database/migrations/004_auto_create_user_profile.sql),
    // not here. A client-side insert immediately after signUp() would fail
    // whenever "Confirm email" is enabled (the default): there's no active
    // session yet, so auth.uid() is null and every RLS insert policy on
    // these tables rejects the row. The trigger runs server-side at the
    // moment the auth user is created, independent of confirmation status.
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
  };

  const value = {
    user,
    session,
    loading,
    userProfile,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
