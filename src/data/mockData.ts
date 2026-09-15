/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vendor, MenuItem, Address, Order, DispatchRider } from '../types';

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'mamas-kitchen',
    name: "Mama's Kitchen",
    subtitle: 'Wurukum Flagship • Authentic Nigerian & Local Benue Delicacies',
    logo: 'https://lh3.googleusercontent.com/aida/AEtjO1Xi7-HktTcDMU-D4XRA3uYqLe4DxC4xxUNuZyoSs8nUTxmHVZGZpch5_I6KpEnnwVy0rLhYnRuLIxkCMNPgfjDlVn9yX1DT6YESKO5WtUuE_VDU--KfeDD9CWZlUGhJiWutjwIh-sijLcAheIXmPrtod2ONv4cj-6G12escmvqeWiH2YE6CKOzgKBOOTNnBARfR4rQVy9Z_t7fL1cXAYgs57DmyE78lB5UV-IQmBtFRTVJhji3_iA_xUDpCqJvmAdVaVo-fMfXm',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzC8YL9-kUwYaxZ7Ue0H6rfushnZrkAn7ZENiLMRr01gbq46UB-zMgrjfR1rZaW2mAyuYgInNFxALrLD1r92d8C09qd7I-VmosDS0NDd-JS8tBfmJvfaJtorbivMfgkCOHewuqgtT2F9IFHBOvnpDmXVjydMeufmuZgkEr3cGiSibUOuBkgLockOqB6VY_NgsNtwl_apJjGcIAbrpxzCFDtuRh5dEOmdCXKQ3PKGoUtJlXfuVYe0sK',
    rating: 4.8,
    reviewCount: 324,
    cuisine: 'African Traditional',
    address: 'Plot 14 Wurukum Extension, near Total Filling Station, Makurdi, Benue State',
    city: 'Makurdi',
    deliveryTime: '25 - 35 min',
    deliveryFee: 800,
    minOrder: 2000,
    verified: true,
    famousFor: 'Ofe Owerri, Smoky Jollof & Pounded Yam',
    badge: 'Popular',
    badgeColor: 'bg-[#ea580c] text-white',
    accentColor: '#aa2d00',
    status: 'active',
    phone: '+234 803 456 7890',
    bankName: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '0145892019',
  },
  {
    id: 'royal-palace-grills',
    name: 'Royal Palace Grills',
    subtitle: 'High Level, Makurdi • Charcoal Barbecue, Suya & Shawarma',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLfw2UibnqPvWfDVjD5T2ulwOJ5F8GniRxS7c4Q08Qz3_FVCpPZEwENbSN-yCRLxA9wNGLnqA93KgxBT1fA3DCoRyeiDkSufuIJnVDL-9h19UUY8Eyb-K0il1k3EnTTQ74HGONgssjqipY1I8vSbA-1xadG3m8cTxXSRoSO29XZb_7nHj7dUPaXLF8579VnAItfxWV8PFcTr1u_W9d7rECKNyqZq2wXbFQkoup_FXpoJYarrBCBpuu',
    rating: 4.9,
    reviewCount: 680,
    cuisine: 'Fast Food & Grills',
    address: '5 High-Level Commercial Way, Makurdi, Benue State',
    city: 'Makurdi',
    deliveryTime: '20 - 30 min',
    deliveryFee: 700,
    minOrder: 1500,
    verified: true,
    famousFor: 'Asun Platters, Spicy Ram Suya & Lebanese Shawarma',
    badge: 'Fast Prep',
    badgeColor: 'bg-[#0a2e0e] text-white',
    accentColor: '#ea580c',
    status: 'active',
    phone: '+234 812 998 1234',
    bankName: 'Zenith Bank',
    accountNumber: '2089123490',
  },
  {
    id: 'benue-delight-bakers',
    name: 'Benue Delight Bakers',
    subtitle: 'Modern Market Rd • Artisan Meat Pies, Pastries & Fresh Loaves',
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu1zdfSvXl4efYC-4p2MeWQ6TqiMDTAfM7XtU5DVqll4DbM5sQHKay7_wO9KpO2dFykFnWGTvoh56inPRbT0J1MmId9m_D136sZ0rmsvAAoolFDbBU-vB29IHIuvA1CK2bolLROqqShZMQOr6i30FYSF6mPc_cEFnO-KiQ56O3rEGp19Zr12gxcqmy3boa54COPIsfz2EIa3832SLZh7a3z1WL7kaGmNNbV37MgzfeeFMD-8v0cocS',
    rating: 4.7,
    reviewCount: 290,
    cuisine: 'Bakery & Sweets',
    address: '42 Modern Market Road, Makurdi',
    city: 'Makurdi',
    deliveryTime: '15 - 25 min',
    deliveryFee: 650,
    minOrder: 1200,
    verified: true,
    famousFor: 'Spiced Beef Rolls, Glazed Doughnuts & Milk Bread',
    badge: 'Top Rated',
    badgeColor: 'bg-[#aa2d00] text-white',
    accentColor: '#d9a441',
    status: 'active',
    phone: '+234 802 334 5566',
    bankName: 'Access Bank',
    accountNumber: '0076231145',
  },
  {
    id: 'benue-fishery-spot',
    name: 'Benue Fishery Spot',
    subtitle: 'Riverbank Road • Native Point & Kill Fresh Catfish Broth',
    logo: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLqSFRFgqffYT-fS4-Lz0UH9f8q-1-5YY6nvUqarogbYXuzPxDXQfH1I-Cd-g_uIy-dbdu6-qXY942B_gJIHXDx9r93j9YXrUdYlL363MDJ2hJcFqqSx9Q7JSIrpcmBwBsedwBoyoRuFBWaIDFhiBxsqWGIbqSgjtoU9tCHDzSD7abarYv7Ct86wKIP_mpDT5ZiPSH_vlfxpuDfRzijXeSr3yi8LCfS00Y1gqrtOEOZdn9vuZ_EsWy',
    rating: 4.8,
    reviewCount: 412,
    cuisine: 'African Traditional',
    address: 'River Benue Waterfront Marina, Makurdi',
    city: 'Makurdi',
    deliveryTime: '30 - 45 min',
    deliveryFee: 850,
    minOrder: 2500,
    verified: true,
    famousFor: 'Live Benue Catfish Pepper Soup with Agidi',
    badge: 'Fresh Catch',
    badgeColor: 'bg-[#0a2e0e] text-white',
    accentColor: '#4d6b2c',
    status: 'active',
    phone: '+234 805 778 9900',
    bankName: 'First Bank of Nigeria',
    accountNumber: '3098124451',
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Mama's Kitchen Items
  {
    id: 'm-jollof-combo',
    vendorId: 'mamas-kitchen',
    name: 'Royal Jollof Rice Combo',
    description: 'Signature firewood-smoked jollof rice paired with tender spiced goat meat cubes and ripe caramelized plantains (dodo).',
    price: 4500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0qqf_TTu5aQg0nyNjfNM3pK6xoRKNxFXBPxdxyXYaEhmdheQjZT9-vOj2-GU4-qEX3InEf7_4gJCMXwLne9CAr47WJRj7kqcc2N0Uzuk8jo9lCdpsZGXEuTxvTtVGn3pxqBZBxBRK4M9m5smeiT_MA-BID_0E6fraLglTlKRCQLDZdAkRf2Fr0mRgC59mYc8_W7WPOXD7NnMuef4Yq4q9emAJZzIdVYMlhrl0aVnAhLA-TV82uPqI',
    category: 'Main Dishes',
    portionVariants: [
      { id: 'standard', name: 'Standard Portion', additionalPrice: 0 },
      { id: 'party', name: 'Party Portion (+₦1,500)', additionalPrice: 1500 }
    ],
    modifiers: [
      { id: 'plantain', name: 'Extra Fried Plantain (+₦500)', price: 500 },
      { id: 'pepper-sauce', name: 'Pepper Sauce (+₦300)', price: 300 },
      { id: 'boiled-egg', name: 'Boiled Egg (+₦250)', price: 250 }
    ],
    available: true,
    prepTimeMinutes: 25,
    isChefPick: true,
    isPopular: true,
    tags: ['Bestseller', 'Firewood Flavour', 'Chef Pick']
  },
  {
    id: 'm-egusi-goat',
    vendorId: 'mamas-kitchen',
    name: 'Egusi Soup with Assorted Goat Meat & Pounded Yam',
    description: 'Slow-simmered melon seed soup cooked with stockfish, shaki, assorted goat meat cuts, and smooth hot pounded yam swallow.',
    price: 4000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjZZp225To6nevVs0eMV-Mmc8xkuj9NwBfKPeLfGgrSDMiQ9_uUMXwAJoUJDf0_MNaJOqU7OdP7Em8r75os8jaDXab88K_L_cFRhXzMqM2iHjAvsHlY6f1cXC6acrVbJEbOpwazAAtPZkahQTMO-c1vOv9X1X8h1C8Hjy5vqtaRDEOjr62XpTyFr13mTVMa7UWu5AapnQlcoRE80AFyIAoTXUJAb6mY7yKdZtTkMlBCU2hWNhA29U',
    category: 'Soups & Swallows',
    portionVariants: [
      { id: 'regular', name: 'Standard Bowl', additionalPrice: 0 },
      { id: 'large', name: 'Deluxe Jumbo Pot (+₦2,000)', additionalPrice: 2000 }
    ],
    modifiers: [
      { id: 'extra-goat', name: 'Extra Goat Meat (+₦1,500)', price: 1500 },
      { id: 'kpomo', name: 'Soft Peppered Kpomo (+₦600)', price: 600 }
    ],
    available: true,
    prepTimeMinutes: 30,
    isChefPick: false,
    isPopular: true,
    tags: ['Traditional', 'Organic Palm Oil']
  },
  {
    id: 'm-tilapia-pepper',
    vendorId: 'mamas-kitchen',
    name: 'Spicy Tilapia Pepper Soup',
    description: 'Fresh river tilapia poached in hot aromatic uziza and uda pepper soup broth. Garnished with wild mint scent leaves.',
    price: 3800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLqSFRFgqffYT-fS4-Lz0UH9f8q-1-5YY6nvUqarogbYXuzPxDXQfH1I-Cd-g_uIy-dbdu6-qXY942B_gJIHXDx9r93j9YXrUdYlL363MDJ2hJcFqqSx9Q7JSIrpcmBwBsedwBoyoRuFBWaIDFhiBxsqWGIbqSgjtoU9tCHDzSD7abarYv7Ct86wKIP_mpDT5ZiPSH_vlfxpuDfRzijXeSr3yi8LCfS00Y1gqrtOEOZdn9vuZ_EsWy',
    category: 'Soups & Swallows',
    portionVariants: [
      { id: 'standard', name: 'Single Fillet Portion', additionalPrice: 0 },
      { id: 'whole', name: 'Whole Jumbo Fish (+₦1,800)', additionalPrice: 1800 }
    ],
    modifiers: [
      { id: 'extra-pepper', name: 'Extra Habanero Pepper (Free)', price: 0 },
      { id: 'agidi-wrap', name: 'Hot Agidi Wrap (+₦400)', price: 400 }
    ],
    available: true,
    prepTimeMinutes: 20,
    isSpicy: true,
    tags: ['Spicy Hot', 'Fresh River Catch']
  },
  {
    id: 'm-fried-rice-chicken',
    vendorId: 'mamas-kitchen',
    name: 'Fried Rice & Crispy Chicken',
    description: 'Savory seasoned rice tossed with garden sweet peas, sweet corn, minced beef liver, served with golden spiced crispy chicken quarter.',
    price: 3600,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=80',
    category: 'Main Dishes',
    portionVariants: [
      { id: 'standard', name: 'Quarter Chicken', additionalPrice: 0 },
      { id: 'half', name: 'Half Crispy Chicken (+₦1,800)', additionalPrice: 1800 }
    ],
    modifiers: [
      { id: 'salad', name: 'Coleslaw with Cream (+₦500)', price: 500 },
      { id: 'extra-chicken', name: 'Extra Drumstick (+₦1,200)', price: 1200 }
    ],
    available: true,
    prepTimeMinutes: 25,
    isPopular: true,
    tags: ['Classic Meal', 'Kids Favorite']
  },
  {
    id: 'm-zobo-fusion',
    vendorId: 'mamas-kitchen',
    name: 'Zobo Fusion Drink (1 Litre Jug)',
    description: 'Chilled native hibiscus flowers cold-infused with sweet pineapple chunks, spicy ginger root, and natural cloves.',
    price: 1800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV-fVarBwZUS2qXEoOZSl_-b1ELmbpoF7pvFzufHi1UUX176-QWseeCO1ltRYtHrwlVis4lNFO5tThY_z0-vvhHZcRTfrXsMygtp9vjxksgp6J6fgQMQTrFFwBWE0N-XUU9SBKrVr5mDbzXnQL-7AaYFzIPlu7S5dcg0Bb0V6QfnOfuu6bt0GBKLTCYcquRmTOH_YedqXuV5NYLhjBxf4RSKmRAFtCuHaWsz2-VOlQ8gdSsbi4vHLY',
    category: 'Cold Drinks',
    available: true,
    prepTimeMinutes: 5,
    tags: ['Cold Brewed', '100% Natural']
  },

  // Royal Palace Grills Items
  {
    id: 'r-special-suya',
    vendorId: 'royal-palace-grills',
    name: 'Special Suya Platter',
    description: 'Tenderized boneless beef spiced with Northern yaji, garnished with crunchy white onion rings and cucumbers.',
    price: 2800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLiD6tr2tE5QPgMFY4MbwRzDX8B1fgpWSfn1OthcWpWdq2B3V5Yi8sh3Io1gWOMHzTJNxG8GRalR9aZROt3HwJnHdbYlZa3YLXVez1cnb5qDJ2zddixDzF9QR5hfud8N9uheurxm03cOaJcx1ixCOSpB4QM_OuRwzoAUFMogq2qT0ZNukUCSDHZLu_eaZn9v9LhEG5YN9vy9FXk6IXvSEcuIs2T57DPI4HlwbbcKm5Xe6nD3HhUvHc',
    category: 'Grills & Sides',
    portionVariants: [
      { id: 'single', name: 'Regular Pack', additionalPrice: 0 },
      { id: 'jumbo', name: 'Family Platter (+₦2,500)', additionalPrice: 2500 }
    ],
    modifiers: [
      { id: 'extra-yaji', name: 'Extra Northern Yaji Pepper (Free)', price: 0 },
      { id: 'fried-yam', name: 'Fried Yam Fries (+₦800)', price: 800 }
    ],
    available: true,
    prepTimeMinutes: 15,
    isPopular: true,
    isSpicy: true,
    tags: ['Night Grill', 'Authentic Yaji']
  },
  {
    id: 'r-chicken-shawarma',
    vendorId: 'royal-palace-grills',
    name: 'Crispy Chicken Shawarma',
    description: 'Double toasted Lebanese flatbread packed with spiced shredded chicken, two juicy sausages, and secret cream dressing.',
    price: 2200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo-MrMMmECxl8oDC6gPDZm8lepx4ncwZLChmTEs6A44r6tEkPBYt8oZPzVOZy79WmpTdfmOFl34AuVKYJdNPzjKB2zWNbY51CgzPStsieek0p6IEr98fEuz4JnHomn1N9O2jjpjMNJYUWJVudgGB7dfjnx7UwtojKuG3NFuovFVk_t7XnFLOWK3qOwiTp1NiGFUHE96EwaZn2G2T1qGPNIqI0m4lLxDyxqYi8Gtnn0cFNILb87h5aF',
    category: 'Grills & Sides',
    portionVariants: [
      { id: 'regular', name: 'Standard (1 Sausage)', additionalPrice: 0 },
      { id: 'double', name: 'Double Sausage Special (+₦600)', additionalPrice: 600 }
    ],
    modifiers: [
      { id: 'extra-cheese', name: 'Melted Cheddar Cheese (+₦700)', price: 700 }
    ],
    available: true,
    prepTimeMinutes: 15,
    isPopular: true,
    tags: ['Street Food', 'Double Wrapped']
  }
];

export const INITIAL_SAVED_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'HOME',
    tag: 'Primary Address',
    addressText: 'Plot 14, Wurukum Extension, Makurdi, Benue State.',
    landmark: 'Near Total Filling Station, Wurukum Junction',
    instructions: 'Call when at the gate',
    isPrimary: true
  },
  {
    id: 'addr-2',
    label: 'OFFICE',
    tag: 'Benue State Tech Hub',
    addressText: '5 High-Level Commercial Way, Makurdi.',
    landmark: 'Opposite State Library Board',
    instructions: 'Leave with reception desk on 1st Floor',
    isPrimary: false
  }
];

export const INITIAL_DISPATCHER: DispatchRider = {
  id: 'rider-terna',
  name: 'Terna Michael',
  phone: '+234 812 998 1234',
  rating: 4.9,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
  vehicle: 'Bajaj Pulsar 150',
  plateNumber: 'MKD-441-XA (Benue)',
  etaMinutes: 12,
  ordersCompleted: 412,
  currentLocationName: 'Wurukum Market bypass'
};

export const INITIAL_ACTIVE_ORDER: Order = {
  id: 'fp-108429',
  orderNumber: '#FP-108429',
  customerName: 'Emeka Daniel',
  customerPhone: '+234 803 123 4567',
  vendorId: 'mamas-kitchen',
  vendorName: "Mama's Kitchen",
  items: [
    {
      id: 'item-1',
      menuItemId: 'm-jollof-combo',
      name: 'Benue Special Smoky Jollof Rice (Jumbo Pack)',
      basePrice: 4500,
      unitPrice: 6500,
      quantity: 1,
      selectedVariant: { id: 'party', name: 'Party Portion (+₦1,500)', additionalPrice: 1500 },
      selectedModifiers: [
        { id: 'plantain', name: 'Extra Fried Plantain (+₦500)', price: 500 }
      ],
      vendorId: 'mamas-kitchen',
      vendorName: "Mama's Kitchen",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0qqf_TTu5aQg0nyNjfNM3pK6xoRKNxFXBPxdxyXYaEhmdheQjZT9-vOj2-GU4-qEX3InEf7_4gJCMXwLne9CAr47WJRj7kqcc2N0Uzuk8jo9lCdpsZGXEuTxvTtVGn3pxqBZBxBRK4M9m5smeiT_MA-BID_0E6fraLglTlKRCQLDZdAkRf2Fr0mRgC59mYc8_W7WPOXD7NnMuef4Yq4q9emAJZzIdVYMlhrl0aVnAhLA-TV82uPqI'
    },
    {
      id: 'item-2',
      menuItemId: 'm-egusi-goat',
      name: 'Pounded Yam & Assorted Egusi Soup',
      basePrice: 4000,
      unitPrice: 5200,
      quantity: 1,
      selectedModifiers: [
        { id: 'extra-meat', name: 'Goat Meat (2 cuts), Beef Shaki', price: 1200 }
      ],
      vendorId: 'mamas-kitchen',
      vendorName: "Mama's Kitchen",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpjZZp225To6nevVs0eMV-Mmc8xkuj9NwBfKPeLfGgrSDMiQ9_uUMXwAJoUJDf0_MNaJOqU7OdP7Em8r75os8jaDXab88K_L_cFRhXzMqM2iHjAvsHlY6f1cXC6acrVbJEbOpwazAAtPZkahQTMO-c1vOv9X1X8h1C8Hjy5vqtaRDEOjr62XpTyFr13mTVMa7UWu5AapnQlcoRE80AFyIAoTXUJAb6mY7yKdZtTkMlBCU2hWNhA29U'
    },
    {
      id: 'item-3',
      menuItemId: 'm-zobo-fusion',
      name: 'Zobo Fusion Drink (1 Litre Jug)',
      basePrice: 1800,
      unitPrice: 1800,
      quantity: 1,
      selectedModifiers: [],
      vendorId: 'mamas-kitchen',
      vendorName: "Mama's Kitchen",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV-fVarBwZUS2qXEoOZSl_-b1ELmbpoF7pvFzufHi1UUX176-QWseeCO1ltRYtHrwlVis4lNFO5tThY_z0-vvhHZcRTfrXsMygtp9vjxksgp6J6fgQMQTrFFwBWE0N-XUU9SBKrVr5mDbzXnQL-7AaYFzIPlu7S5dcg0Bb0V6QfnOfuu6bt0GBKLTCYcquRmTOH_YedqXuV5NYLhjBxf4RSKmRAFtCuHaWsz2-VOlQ8gdSsbi4vHLY'
    }
  ],
  subtotal: 13500,
  deliveryFee: 850,
  serviceFee: 500,
  discount: 0,
  total: 14850,
  status: 'OUT_FOR_DELIVERY',
  deliveryOtp: '4829',
  deliveryAddress: INITIAL_SAVED_ADDRESSES[0],
  paymentMethod: 'paystack',
  isPaid: true,
  paidAt: '12:30 PM WAT',
  rider: INITIAL_DISPATCHER,
  customerNote: 'Pack sauce separately please. Extra pepper on grilled chicken.',
  createdAt: '2025-05-18T12:30:00Z',
  timeline: [
    {
      status: 'PAID',
      label: 'Order Placed & Paid',
      timestamp: '12:30 PM',
      description: 'Paystack Gateway Settlement Confirmed',
      completed: true
    },
    {
      status: 'ACCEPTED',
      label: 'Vendor Accepted',
      timestamp: '12:34 PM',
      description: "Mama's Kitchen Kitchen Display System",
      completed: true
    },
    {
      status: 'PREPARING',
      label: 'Food Being Prepared',
      timestamp: '12:45 PM',
      description: 'Chef station packing fresh batches',
      completed: true
    },
    {
      status: 'READY_FOR_PICKUP',
      label: 'Ready for Pickup',
      timestamp: '01:05 PM',
      description: 'Quality check passed & thermal bagged',
      completed: true
    },
    {
      status: 'DISPATCH_ASSIGNED',
      label: 'Dispatcher Assigned',
      timestamp: '01:08 PM',
      description: 'Terna Michael auto-dispatched',
      completed: true
    },
    {
      status: 'PICKED_UP',
      label: 'Order Picked Up',
      timestamp: '01:12 PM',
      description: 'Insulated thermal box sealed',
      completed: true
    },
    {
      status: 'OUT_FOR_DELIVERY',
      label: 'Out for Delivery',
      timestamp: '01:15 PM',
      description: 'Courier transit on Bajaj motorcycle (12 min eta)',
      completed: false,
      isCurrent: true
    },
    {
      status: 'DELIVERED',
      label: 'Delivered to Gate / Door',
      timestamp: 'Awaiting',
      description: 'Awaiting rider arrival at Wurukum destination',
      completed: false
    },
    {
      status: 'CUSTOMER_CONFIRMED',
      label: 'Customer Confirmed',
      timestamp: 'Awaiting',
      description: 'Awaiting OTP validation (4829)',
      completed: false
    }
  ]
};

export const mockVendors = INITIAL_VENDORS;
export const mockMenuItems = INITIAL_MENU_ITEMS;
export const mockActiveOrder = INITIAL_ACTIVE_ORDER;
export const mockSavedAddresses = INITIAL_SAVED_ADDRESSES;
export const mockDispatcher = INITIAL_DISPATCHER;

