
import React from 'react';
import { MOCK_GROCERY, FALLBACK_IMAGE } from '../constants';
import { Plus, Clock } from 'lucide-react';

export const Grocery: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 shadow-sm mb-6 text-white">
        <h1 className="text-2xl font-bold">Instamart</h1>
        <p className="opacity-90">Groceries delivered in minutes.</p>
        <div className="flex items-center gap-2 mt-4 bg-white/20 inline-flex px-3 py-1 rounded-full text-sm font-medium">
            <Clock className="h-4 w-4" />
            Delivery in 12 mins
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-4">Fresh Essentials</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {MOCK_GROCERY.map(item => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col transition-colors">
                      <div className="h-28 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center p-2 relative overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                            className="w-full h-full object-cover rounded-lg" 
                           />
                      </div>
                      <div className="flex-1">
                           <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{item.category}</div>
                           <h3 className="font-medium text-gray-900 dark:text-white text-sm leading-tight mb-1">{item.name}</h3>
                           <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">{item.weight}</div>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                          <span className="font-bold text-gray-900 dark:text-white">₹{item.price}</span>
                          <button className="p-1 rounded border border-green-600 text-green-600 dark:text-green-400 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20">
                              <Plus className="h-4 w-4" />
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};
