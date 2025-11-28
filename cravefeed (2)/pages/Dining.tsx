
import React, { useState } from 'react';
import { MOCK_DINING, FALLBACK_IMAGE } from '../constants';
import { Star } from 'lucide-react';

export const Dining: React.FC = () => {
  const [booked, setBooked] = useState<string | null>(null);

  const handleBook = (name: string) => {
      setBooked(name);
      setTimeout(() => setBooked(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-6 shadow-sm mb-6 transition-colors">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dining Out</h1>
        <p className="text-gray-500 dark:text-gray-400">Explore curated lists of top restaurants, cafes, pubs, and bars in your city, based on trends.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_DINING.map(r => (
                  <div key={r.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
                      <div className="h-48 relative">
                          <img 
                            src={r.image} 
                            alt={r.name} 
                            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                            className="w-full h-full object-cover" 
                           />
                          {r.tableAvailable ? (
                               <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">Available</span>
                          ) : (
                               <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Full</span>
                          )}
                      </div>
                      <div className="p-4">
                           <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{r.name}</h3>
                                <span className="bg-green-600 text-white text-sm font-bold px-1.5 rounded flex items-center gap-1">
                                    {r.rating} <Star className="h-3 w-3 fill-current" />
                                </span>
                           </div>
                           <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{r.cuisine.join(', ')} • {r.address}</p>
                           
                           <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                               <div className="text-sm">
                                   <p className="text-gray-500 dark:text-gray-400">Approx Cost</p>
                                   <p className="font-bold text-gray-900 dark:text-white">₹{r.averageCostForTwo} for two</p>
                               </div>
                               <button 
                                onClick={() => handleBook(r.name)}
                                disabled={!r.tableAvailable}
                                className={`px-4 py-2 rounded-lg font-bold text-sm ${r.tableAvailable ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
                               >
                                   {booked === r.name ? 'Booked!' : 'Book Table'}
                               </button>
                           </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
      
      {booked && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-lg z-50 animate-bounce">
              Table booked at {booked}!
          </div>
      )}
    </div>
  );
};
