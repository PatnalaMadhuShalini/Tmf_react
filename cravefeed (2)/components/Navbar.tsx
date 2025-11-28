
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User as UserIcon, MapPin, Home, Utensils, Leaf, ChevronDown, LogOut, Moon, Sun, Crosshair, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { AVAILABLE_CITIES } from '../constants';

export const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const { isVegMode, isDarkMode, toggleVegMode, toggleDarkMode, user, logout, updateCity, detectLocation, setManualLocation } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [showCityMenu, setShowCityMenu] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [manualInput, setManualInput] = useState('');

  // If not logged in, show minimal navbar or nothing
  if (!user) return null;

  const isActive = (path: string) => location.pathname === path ? "text-orange-600 dark:text-orange-500" : "text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400";

  const handleCityChange = (city: string) => {
      updateCity(city);
      setShowCityMenu(false);
      setManualInput('');
      navigate('/');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!manualInput.trim()) return;

      // Smartly detect if the user typed a known city name
      let detectedCity = user.city;
      const lowerInput = manualInput.toLowerCase();

      // Check against supported cities
      const foundCity = AVAILABLE_CITIES.find(city => 
        lowerInput.includes(city.toLowerCase())
      );
      
      if (foundCity) {
          detectedCity = foundCity;
      } else {
        // Handle common aliases manually
        if (lowerInput.includes('vizag') || lowerInput.includes('waltair')) detectedCity = 'Visakhapatnam';
        if (lowerInput.includes('bengaluru')) detectedCity = 'Bangalore';
        if (lowerInput.includes('gurgaon') || lowerInput.includes('noida')) detectedCity = 'New Delhi';
        if (lowerInput.includes('secunderabad')) detectedCity = 'Hyderabad';
        if (lowerInput.includes('bombay')) detectedCity = 'Mumbai';
        if (lowerInput.includes('madras')) detectedCity = 'Chennai';
        if (lowerInput.includes('calcutta')) detectedCity = 'Kolkata';
      }

      // Update location with the detected city
      setManualLocation(manualInput, detectedCity);
      setShowCityMenu(false);
      setManualInput('');
      navigate('/');
  };

  const handleDetectLocation = async () => {
      setDetecting(true);
      try {
          const loc = await detectLocation();
          setManualLocation(loc.address, loc.city);
          navigate('/');
      } catch (e) {
          alert("Could not detect location. Please select manually.");
      } finally {
          setDetecting(false);
          setShowCityMenu(false);
      }
  };

  return (
    <>
      {/* Desktop/Tablet Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            <div className="flex items-center gap-6">
                <Link to="/" className="flex items-center gap-2">
                <div className="bg-orange-600 p-2 rounded-lg">
                    <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white hidden sm:block">CraveFeed</span>
                </Link>

                <div className="relative">
                    <button 
                        onClick={() => setShowCityMenu(!showCityMenu)}
                        className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors max-w-[200px]"
                    >
                        <MapPin className="h-4 w-4 text-orange-600 flex-shrink-0" />
                        <span className="font-bold truncate">{user.address.includes('City Center') ? user.city : user.address.split(',')[0]}</span>
                        <ChevronDown className="h-3 w-3 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    </button>
                    
                    {showCityMenu && (
                        <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                             
                             {/* Manual Entry */}
                             <div className="px-4 pb-2 border-b border-gray-100 dark:border-gray-700 mb-2">
                                 <form onSubmit={handleManualSubmit} className="relative">
                                     <input 
                                        type="text" 
                                        placeholder="Enter area, city (e.g. Vizag)..." 
                                        value={manualInput}
                                        onChange={(e) => setManualInput(e.target.value)}
                                        className="w-full pl-8 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:border-orange-500 dark:text-white"
                                     />
                                     <Search className="h-4 w-4 text-gray-400 absolute left-2.5 top-2.5" />
                                 </form>
                             </div>

                             <button
                                onClick={handleDetectLocation}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 dark:hover:bg-gray-700 text-orange-600 font-bold flex items-center gap-2"
                            >
                                <Crosshair className={`h-4 w-4 ${detecting ? 'animate-spin' : ''}`} />
                                {detecting ? 'Detecting GPS...' : 'Use Current Location'}
                            </button>
                            
                            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Popular Cities</div>
                            <div className="max-h-60 overflow-y-auto no-scrollbar">
                                {AVAILABLE_CITIES.map(city => (
                                    <button
                                        key={city}
                                        onClick={() => handleCityChange(city)}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-orange-50 dark:hover:bg-gray-700 ${user.city === city ? 'font-bold text-orange-600' : 'text-gray-700 dark:text-gray-200'}`}
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="hidden md:flex space-x-6">
              <Link to="/" className={`font-medium transition-colors ${isActive('/')}`}>Delivery</Link>
              <Link to="/dining" className={`font-medium transition-colors ${isActive('/dining')}`}>Dining Out</Link>
              <Link to="/grocery" className={`font-medium transition-colors ${isActive('/grocery')}`}>Grocery</Link>
              <Link to="/train" className={`font-medium transition-colors ${isActive('/train')}`}>Train</Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button 
                onClick={toggleVegMode}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                    isVegMode 
                    ? 'border-green-600 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-green-400'
                }`}
              >
                <div className={`w-4 h-4 border-2 flex items-center justify-center ${isVegMode ? 'border-green-600' : 'border-gray-400 dark:border-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${isVegMode ? 'bg-green-600' : 'bg-transparent'}`}></div>
                </div>
                <span className="text-sm font-bold">Veg</span>
              </button>

              <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <ShoppingBag className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
              
              <Link to="/profile" className="hidden md:flex items-center gap-2 pl-2 pr-1 rounded-full border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                 <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{user.name.split(' ')[0]}</span>
                 <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                     <img src={`https://ui-avatars.com/api/?name=${user.name}&background=orange&color=fff`} alt="User" />
                 </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/')}`}>
            <Home className="h-6 w-6" />
            <span className="text-[10px] font-medium mt-1">Delivery</span>
          </Link>
          <Link to="/dining" className={`flex flex-col items-center p-2 ${isActive('/dining')}`}>
            <Utensils className="h-6 w-6" />
            <span className="text-[10px] font-medium mt-1">Dining</span>
          </Link>
          <Link to="/grocery" className={`flex flex-col items-center p-2 ${isActive('/grocery')}`}>
            <Leaf className="h-6 w-6" />
            <span className="text-[10px] font-medium mt-1">Grocery</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center p-2 ${isActive('/profile')}`}>
            <UserIcon className="h-6 w-6" />
            <span className="text-[10px] font-medium mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};
