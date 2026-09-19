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
    // Try to find user in customers table first
    let { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (customer) {
      setUserProfile({ role: 'customer', id: customer.id });
      return;
    }

    // Then check vendors
    let { data: vendor } = await supabase
      .from('vendors')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (vendor) {
      setUserProfile({ role: 'vendor', id: vendor.id });
      return;
    }

    // Then check dispatch riders
    let { data: rider } = await supabase
      .from('dispatch_riders')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (rider) {
      setUserProfile({ role: 'dispatcher', id: rider.id });
      return;
    }
    
    // Default to customer if no specific profile found but user exists
    setUserProfile({ role: 'customer', id: '' }); 
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, role: UserRole, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error || !data.user) {
      return { error };
    }

    // customers/vendors/dispatch_riders.user_id all reference this local
    // users table (not auth.users directly), so it must exist first.
    const { error: usersError } = await supabase.from('users').insert({
      id: data.user.id,
      email,
      full_name: fullName || email.split('@')[0],
      role,
    });

    if (usersError) {
      return { error: usersError as unknown as AuthError };
    }

    // Create the role-specific profile row.
    if (role === 'customer') {
      await supabase.from('customers').insert({
        user_id: data.user.id,
      });
    } else if (role === 'vendor') {
      // Vendor signup requires admin approval before the vendor is visible
      // to customers (status defaults to 'pending_review'). phone/address
      // are placeholders here — there's no vendor onboarding form yet to
      // collect them, so the vendor must fill them in before going live.
      await supabase.from('vendors').insert({
        user_id: data.user.id,
        business_name: fullName || 'New Vendor',
        phone: '',
        email,
        address: '',
      });
    } else if (role === 'dispatcher') {
      // Same placeholder situation as vendors — no rider onboarding form yet.
      await supabase.from('dispatch_riders').insert({
        user_id: data.user.id,
        phone: '',
        vehicle: '',
        plate_number: '',
      });
    }

    return { error: null };
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
