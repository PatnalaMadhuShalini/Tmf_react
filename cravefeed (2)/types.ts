
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  calories?: number;
  isVegetarian: boolean;
  isBestSeller?: boolean;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  cuisine: string[];
  deliveryTime: string; // Base delivery time
  priceRange: '₹' | '₹₹' | '₹₹₹';
  image: string;
  menu: MenuItem[];
  address: string;
  city: string;
  coordinates: Coordinates; // Added coordinates
  hasOffer?: boolean;
  offerText?: string;
  isGoldPartner?: boolean;
}

export interface DiningRestaurant extends Restaurant {
  tableAvailable: boolean;
  averageCostForTwo: number;
}

export interface GroceryItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  weight: string;
}

export interface CartItem extends MenuItem {
  restaurantId: string;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  zip: string;
  coordinates?: Coordinates;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'preparing' | 'out_for_delivery' | 'delivered';
  date: string;
  restaurantName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  address: string; // Current detected address
  coordinates: Coordinates | null; // Current GPS coords
  isAuthenticated: boolean;
  isGoldMember: boolean;
  savedAddresses: Address[];
  walletBalance: number;
}
