
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '../types';
import { useUser } from './UserContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, restaurantId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  discount: number;
  applyCoupon: (code: string) => boolean;
  couponCode: string | null;
  finalTotal: number;
  deliveryFee: number;
  restaurantId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cravefeed_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse cart", e);
      return [];
    }
  });
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    localStorage.setItem('cravefeed_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: MenuItem, restaurantId: string) => {
    setItems(prev => {
      const existingRestaurant = prev.length > 0 ? prev[0].restaurantId : null;
      if (existingRestaurant && existingRestaurant !== restaurantId) {
        if (!confirm("Start a new basket? You have items from another restaurant. Adding this will clear your current basket.")) {
          return prev;
        }
        return [{ ...item, restaurantId, quantity: 1 }];
      }

      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, restaurantId, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
    if (items.length <= 1) {
        setCouponCode(null);
        setDiscountPercent(0);
    }
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems(prev => prev.map(i => {
      if (i.id === itemId) {
        return { ...i, quantity: Math.max(0, i.quantity + delta) };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => {
      setItems([]);
      setCouponCode(null);
      setDiscountPercent(0);
  };

  const applyCoupon = (code: string) => {
      if (code.toUpperCase() === 'WELCOME50') {
          setDiscountPercent(0.5); // 50%
          setCouponCode('WELCOME50');
          return true;
      }
      if (code.toUpperCase() === 'CRAVE100') {
          setDiscountPercent(0.2); 
          setCouponCode('CRAVE100');
          return true;
      }
      return false;
  };

  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Gold members get free delivery, others pay ₹40
  // Fix: safely check if user exists before accessing isGoldMember
  const isGold = user?.isGoldMember || false;
  const deliveryFee = isGold ? 0 : 40;
  
  const discountAmount = cartTotal * discountPercent;
  const finalTotal = Math.max(0, cartTotal - discountAmount + deliveryFee);
  
  const restaurantId = items.length > 0 ? items[0].restaurantId : null;

  return (
    <CartContext.Provider value={{ 
        items, addToCart, removeFromCart, updateQuantity, clearCart, 
        cartTotal, itemCount, discount: discountAmount, applyCoupon, 
        couponCode, finalTotal, deliveryFee, restaurantId 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
