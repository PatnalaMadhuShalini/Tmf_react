
import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FALLBACK_IMAGE } from '../constants';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <span className="text-6xl">🛒</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-sm">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition-colors">
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 pb-24 transition-colors">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Order</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mb-6 border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                 <span className="font-semibold text-gray-700 dark:text-gray-200">Items</span>
                 <button onClick={clearCart} className="text-red-500 text-sm hover:underline">Clear all</button>
            </div>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {items.map(item => (
              <li key={item.id} className="p-4 sm:p-6 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                     <img 
                        src={item.image} 
                        alt={item.name} 
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                        className="w-full h-full object-cover" 
                      />
                     <div className={`absolute bottom-0 left-0 w-full h-1 ${item.isVegetarian ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
               
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">₹{item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-1">
                  <button 
                    onClick={() => item.quantity === 1 ? removeFromCart(item.id) : updateQuantity(item.id, -1)}
                    className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors text-gray-600 dark:text-gray-300"
                  >
                    {item.quantity === 1 ? <Trash2 className="h-4 w-4 text-red-500" /> : <Minus className="h-4 w-4" />}
                  </button>
                  <span className="text-sm font-semibold w-4 text-center dark:text-white">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors text-gray-600 dark:text-gray-300"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="font-bold text-gray-900 dark:text-white w-20 text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-black dark:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-between px-6 hover:bg-gray-800 dark:hover:bg-orange-700 transition-colors shadow-lg"
        >
            <span>Proceed to Pay</span>
            <span className="bg-white/20 px-2 py-1 rounded text-sm">₹{cartTotal.toFixed(2)} <ArrowRight className="inline h-4 w-4 ml-1" /></span>
        </button>
      </div>
    </div>
  );
};
