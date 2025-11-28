
import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, X, Percent, MapPinOff, Map as MapIcon, List, MapPin } from 'lucide-react';
import { MOCK_RESTAURANTS, CUISINE_TYPES } from '../constants';
import { RestaurantCard } from '../components/RestaurantCard';
import { getSmartFoodRecommendations } from '../services/geminiService';
import { useUser } from '../context/UserContext';
import { Restaurant } from '../types';

export const Home: React.FC = () => {
  const { isVegMode, user } = useUser();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [isMapView, setIsMapView] = useState(false);
  
  // Local logic for filtering
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // Filter restaurants whenever city or search changes
  useEffect(() => {
    if (!user) return;
    
    // Initial load: Filter by city
    const cityRestaurants = MOCK_RESTAURANTS.filter(r => r.city === user.city);
    setRestaurants(cityRestaurants);
    setActiveCategory("All");
  }, [user?.city]);

  const handleSmartSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearchingAI(true);
    try {
      const recommendedCategories = await getSmartFoodRecommendations(searchQuery, CUISINE_TYPES);
      
      const cityRestaurants = MOCK_RESTAURANTS.filter(r => r.city === user?.city);

      const filtered = cityRestaurants.filter(r => {
        const matchesName = r.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSmartCategory = recommendedCategories.some(cat => 
          cat === 'All' ? true : r.cuisine.includes(cat)
        );
        return matchesName || matchesSmartCategory;
      });
      
      setRestaurants(filtered);
      if(recommendedCategories.length > 0 && recommendedCategories[0] !== 'All') {
          setActiveCategory(recommendedCategories[0]);
      }
    } finally {
      setIsSearchingAI(false);
    }
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setSearchQuery(""); 
    
    const cityRestaurants = MOCK_RESTAURANTS.filter(r => r.city === user?.city);

    if (cat === "All") {
      setRestaurants(cityRestaurants);
    } else {
      setRestaurants(cityRestaurants.filter(r => r.cuisine.includes(cat)));
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setActiveCategory("All");
    if (user) {
        setRestaurants(MOCK_RESTAURANTS.filter(r => r.city === user.city));
    }
  }

  const displayedRestaurants = restaurants.filter(r => {
      return isVegMode ? r.menu.some(m => m.isVegetarian) : true;
  });

  return (
    <div className="min-h-screen pb-24 bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Search Header */}
      <div className="bg-white dark:bg-gray-900 px-4 pt-6 pb-4 sticky top-16 z-30 shadow-sm transition-colors">
         <form onSubmit={handleSmartSearch} className="relative max-w-2xl mx-auto flex gap-2">
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 'Biryani', 'Cake', or restaurant..."
                className="block w-full pl-11 pr-12 py-3 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                />
                {searchQuery && (
                    <button type="button" onClick={clearSearch} className="absolute inset-y-0 right-12 flex items-center pr-2">
                        <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"/>
                    </button>
                )}
                <button 
                    type="submit"
                    disabled={isSearchingAI}
                    className="absolute inset-y-1.5 right-1.5 px-3 bg-white dark:bg-gray-700 text-orange-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                >
                {isSearchingAI ? <Sparkles className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                </button>
            </div>
            
            <button 
                type="button"
                onClick={() => setIsMapView(!isMapView)}
                className="flex-shrink-0 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
                {isMapView ? <List className="h-5 w-5" /> : <MapIcon className="h-5 w-5" />}
            </button>
          </form>
      </div>

      {/* Offer Banner */}
      {!isMapView && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 text-white flex justify-between items-center shadow-lg transform hover:scale-[1.01] transition-transform cursor-pointer">
                <div>
                    <p className="font-bold text-xs uppercase opacity-80 mb-1">CraveFeed Gold</p>
                    <h3 className="font-bold text-xl">Free Delivery on all orders!</h3>
                    <p className="text-sm opacity-90 mt-1">Get unlimited benefits at ₹49/month.</p>
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                    <Percent className="h-8 w-8 text-white" />
                </div>
            </div>
        </div>
      )}

      {/* Categories Scroller */}
      {!isMapView && (
        <div className="sticky top-[8rem] z-20 bg-gray-50 dark:bg-gray-900 py-4 transition-colors">
            <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar flex space-x-3">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex-shrink-0 shadow-sm transition-colors">
                    <Filter className="h-4 w-4" /> Sort
                </button>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 self-center flex-shrink-0"></div>
            {CUISINE_TYPES.map(cat => (
                <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    activeCategory === cat
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
                >
                {cat}
                </button>
            ))}
            </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
            {isMapView 
                ? `Map View: ${user?.city}` 
                : (isVegMode ? <span className="text-green-600 dark:text-green-400">Pure Veg Restaurants in {user?.city}</span> : `Restaurants in ${user?.city}`)
            }
        </h2>
        
        {isMapView ? (
            <div className="w-full h-[60vh] bg-gray-200 dark:bg-gray-800 rounded-3xl relative overflow-hidden shadow-inner border border-gray-300 dark:border-gray-700">
                {/* Mock Map Visualization */}
                <div className="absolute inset-0 opacity-10" style={{ 
                    backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                }}></div>
                
                {/* User Dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                    <span className="text-xs font-bold bg-white dark:bg-black px-1 rounded mt-1 shadow">You</span>
                </div>

                {/* Restaurants Scatter Plot (Simulated) */}
                {displayedRestaurants.slice(0, 20).map((r, i) => {
                    // Random positions for demo visualization relative to center
                    // In a real app we would map lat/lng to x/y pixels
                    const offsetX = (Math.random() - 0.5) * 80;
                    const offsetY = (Math.random() - 0.5) * 80;
                    return (
                        <div 
                            key={r.id} 
                            className="absolute flex flex-col items-center cursor-pointer group hover:z-50"
                            style={{ 
                                top: `${50 + offsetY}%`, 
                                left: `${50 + offsetX}%` 
                            }}
                        >
                            <MapPin className="h-6 w-6 text-orange-600 drop-shadow-md transform group-hover:-translate-y-1 transition-transform" />
                            <div className="hidden group-hover:block bg-white dark:bg-gray-900 p-2 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap absolute bottom-full mb-1 z-50">
                                {r.name}
                                <div className="text-gray-500 font-normal">{r.rating} ★</div>
                            </div>
                        </div>
                    );
                })}
                 <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs">
                    Simulated Map View
                </div>
            </div>
        ) : (
            <>
                {displayedRestaurants.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <div className="mx-auto h-32 w-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                            <MapPinOff className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No restaurants found in {user?.city}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            We are currently expanding to your city. Try changing your location to see restaurants in other cities.
                        </p>
                        <div className="flex gap-2 justify-center">
                            <button onClick={clearSearch} className="text-orange-600 dark:text-orange-400 font-bold hover:underline">
                                View All
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedRestaurants.map(r => (
                        <RestaurantCard key={r.id} restaurant={r} />
                    ))}
                    </div>
                )}
            </>
        )}
      </main>
    </div>
  );
};
