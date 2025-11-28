
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, Calendar, Share2, Search, Leaf, MapPin } from 'lucide-react';
import { MOCK_RESTAURANTS, calculateDistance, estimateDeliveryTime, FALLBACK_IMAGE } from '../constants';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Restaurant, MenuItem } from '../types';

export const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, items: cartItems } = useCart();
  const { isVegMode, user } = useUser();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [localVegFilter, setLocalVegFilter] = useState(false);

  useEffect(() => {
    const found = MOCK_RESTAURANTS.find(r => r.id === id);
    if (found) {
        setRestaurant(found);
        // Extract unique categories
        const categories = Array.from(new Set(found.menu.map(m => m.category)));
        if (categories.length > 0) setActiveCategory(categories[0]);
    }
  }, [id]);

  useEffect(() => {
      // Sync local filter with global veg mode
      setLocalVegFilter(isVegMode);
  }, [isVegMode]);

  if (!restaurant) return <div className="p-8 text-center dark:text-white">Loading...</div>;

  let distance = 0;
  let dynamicTime = restaurant.deliveryTime;

  if (user?.coordinates && restaurant.coordinates) {
      distance = calculateDistance(
          user.coordinates.lat, 
          user.coordinates.lng, 
          restaurant.coordinates.lat, 
          restaurant.coordinates.lng
      );
      dynamicTime = estimateDeliveryTime(distance);
  }

  const filteredItems = restaurant.menu.filter(m => 
      localVegFilter ? m.isVegetarian : true
  );

  const categories = Array.from(new Set(filteredItems.map(m => m.category)));
  
  const displayMenu = activeCategory 
    ? filteredItems.filter(m => m.category === activeCategory)
    : filteredItems;

  const getItemQty = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 transition-colors">
      {/* Header Actions */}
      <div className="fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-center pointer-events-none">
          <button 
              onClick={() => navigate(-1)} 
              className="pointer-events-auto p-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
              <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex gap-2 pointer-events-auto">
               <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Search className="h-5 w-5" />
               </button>
               <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Share2 className="h-5 w-5" />
               </button>
          </div>
      </div>

      {/* Info Card */}
      <div className="pt-20 px-4 pb-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 rounded-b-3xl shadow-sm transition-colors">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{restaurant.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{restaurant.cuisine.join(', ')} • {restaurant.address}</p>
            {distance > 0 && <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {distance} km away</p>}
            
            <div className="flex items-center gap-4 mt-4">
                <div className="flex flex-col items-center bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-lg border border-green-100 dark:border-green-800">
                    <div className="flex items-center gap-1 font-bold text-green-700 dark:text-green-400">
                        {restaurant.rating} <Star className="h-3 w-3 fill-current"/>
                    </div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{restaurant.reviewCount}+ ratings</span>
                </div>
                <div className="flex flex-col items-center px-3 py-1">
                     <span className="font-bold text-gray-900 dark:text-white">{dynamicTime}</span>
                     <span className="text-[10px] text-gray-500 dark:text-gray-400">Delivery Time</span>
                </div>
                 <div className="flex flex-col items-center px-3 py-1">
                     <span className="font-bold text-gray-900 dark:text-white">{restaurant.priceRange}</span>
                     <span className="text-[10px] text-gray-500 dark:text-gray-400">Cost</span>
                </div>
            </div>

            {restaurant.hasOffer && (
                <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 border-dashed">
                    <span className="font-bold text-sm">% {restaurant.offerText}</span>
                </div>
            )}
            
            <div className="flex gap-3 mt-4">
                 <button 
                    onClick={() => setLocalVegFilter(!localVegFilter)}
                    className={`flex-1 py-2 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${localVegFilter ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}
                 >
                    <Leaf className="h-4 w-4" /> {localVegFilter ? 'Pure Veg ON' : 'Veg Only'}
                 </button>
                 <button 
                    onClick={() => setShowScheduleModal(true)}
                    className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                 >
                    <Calendar className="h-4 w-4" /> Schedule
                 </button>
            </div>
          </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Menu Categories */}
        {categories.length > 0 && (
             <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 pb-2 sticky top-16 bg-white dark:bg-gray-900 z-10 py-2 transition-colors">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            activeCategory === cat 
                            ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-md' 
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        )}
       

        {/* Menu Items */}
        <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{activeCategory}</h2>
            <div className="space-y-6">
                {displayMenu.map((item: MenuItem) => (
                    <div key={item.id} className="flex justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800 last:border-0">
                        <div className="flex-1">
                            <div className="mb-1">
                                {item.isVegetarian ? (
                                    <div className="w-4 h-4 border border-green-600 flex items-center justify-center p-[1px]">
                                        <div className="w-full h-full bg-green-600 rounded-full"></div>
                                    </div>
                                ) : (
                                     <div className="w-4 h-4 border border-red-600 flex items-center justify-center p-[1px]">
                                        <div className="w-full h-full bg-red-600 rounded-full"></div>
                                    </div>
                                )}
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-base">{item.name}</h3>
                            <div className="font-medium text-gray-900 dark:text-white mt-1">₹{item.price}</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 leading-relaxed">{item.description}</p>
                        </div>
                        <div className="relative w-32 h-28 flex-shrink-0">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                                className="w-full h-full object-cover rounded-xl" 
                            />
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                {getItemQty(item.id) === 0 ? (
                                    <button 
                                        onClick={() => addToCart(item, restaurant.id)}
                                        className="bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 font-bold px-6 py-2 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 uppercase"
                                    >
                                        Add
                                    </button>
                                ) : (
                                    <div className="bg-white dark:bg-gray-800 flex items-center rounded-lg shadow border border-gray-200 dark:border-gray-700 h-9">
                                        <button onClick={() => addToCart(item, restaurant.id)} className="px-3 text-green-600 dark:text-green-400 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 rounded-l-lg">+</button>
                                        <span className="px-1 text-sm font-bold text-green-700 dark:text-green-400">{getItemQty(item.id)}</span>
                                        <button disabled className="px-3 text-gray-400 font-bold rounded-r-lg">-</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
              <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6">
                  <h3 className="text-lg font-bold mb-4 dark:text-white">Schedule Order</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Choose a time for delivery up to 2 days in advance.</p>
                  
                  <div className="space-y-3 mb-6">
                      <button className="w-full p-3 border dark:border-gray-600 rounded-lg text-left hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 font-medium dark:text-gray-200">Today, 8:00 PM - 8:30 PM</button>
                      <button className="w-full p-3 border dark:border-gray-600 rounded-lg text-left hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 font-medium dark:text-gray-200">Tomorrow, 1:00 PM - 1:30 PM</button>
                  </div>
                  
                  <div className="flex gap-3">
                      <button onClick={() => setShowScheduleModal(false)} className="flex-1 py-3 text-gray-600 dark:text-gray-300 font-bold">Cancel</button>
                      <button onClick={() => setShowScheduleModal(false)} className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold">Confirm</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
