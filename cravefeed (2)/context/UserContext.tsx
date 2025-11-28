
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order, Address, Coordinates } from '../types';
import { AVAILABLE_CITIES, CITY_COORDINATES, calculateDistance } from '../constants';

interface UserContextType {
  user: User | null;
  isVegMode: boolean;
  isDarkMode: boolean;
  toggleVegMode: () => void;
  toggleDarkMode: () => void;
  toggleGoldMembership: () => void;
  pastOrders: Order[];
  addOrder: (order: Order) => void;
  login: (email: string, city: string, address?: string, coordinates?: Coordinates) => void;
  signup: (name: string, email: string, city: string, address?: string, coordinates?: Coordinates) => void;
  logout: () => void;
  updateCity: (city: string) => void;
  detectLocation: () => Promise<{ city: string; address: string; coordinates: Coordinates }>;
  setManualLocation: (address: string, city: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('cravefeed_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Failed to parse user from local storage", e);
      localStorage.removeItem('cravefeed_user');
      return null;
    }
  });

  const [isVegMode, setIsVegMode] = useState<boolean>(() => {
    return localStorage.getItem('cravefeed_veg') === 'true';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('cravefeed_dark') === 'true';
  });

  const [pastOrders, setPastOrders] = useState<Order[]>(() => {
     try {
       const saved = localStorage.getItem('cravefeed_orders');
       return saved ? JSON.parse(saved) : [];
     } catch (e) {
       console.error("Failed to parse orders", e);
       return [];
     }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cravefeed_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cravefeed_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cravefeed_veg', String(isVegMode));
  }, [isVegMode]);

  useEffect(() => {
    localStorage.setItem('cravefeed_dark', String(isDarkMode));
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('cravefeed_orders', JSON.stringify(pastOrders));
  }, [pastOrders]);

  const toggleVegMode = () => setIsVegMode(prev => !prev);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const toggleGoldMembership = () => {
    if (user) {
      setUser({ ...user, isGoldMember: !user.isGoldMember });
    }
  };

  const addOrder = (order: Order) => {
    setPastOrders(prev => [order, ...prev]);
  };

  const login = (email: string, city: string, address = 'Home', coordinates?: Coordinates) => {
    let name = email.split('@')[0];
    let userCity = city;
    let userAddr = address;
    let userCoords = coordinates || null;

    try {
        const pending = localStorage.getItem('cravefeed_pending_signup');
        if (pending) {
            const pUser = JSON.parse(pending);
            if (pUser.email === email) {
                name = pUser.name;
                if (pUser.city) userCity = pUser.city;
                if (pUser.address) userAddr = pUser.address;
                if (pUser.coordinates) userCoords = pUser.coordinates;
            }
        }
    } catch (e) { console.error(e); }

    // If no coordinates provided (manual login), try to use city center
    if (!userCoords && CITY_COORDINATES[userCity]) {
        userCoords = CITY_COORDINATES[userCity];
    }

    const fakeUser: User = {
        id: 'u_' + Math.random().toString(36).substr(2, 9),
        name: name, 
        email: email,
        city: userCity,
        address: userAddr,
        coordinates: userCoords,
        isAuthenticated: true,
        isGoldMember: false,
        walletBalance: 1000,
        savedAddresses: [
            { id: 'a1', label: 'Current Location', street: userAddr, city: userCity, zip: '000000', coordinates: userCoords || undefined }
        ]
    };
    setUser(fakeUser);
    localStorage.removeItem('cravefeed_pending_signup');
  };

  const signup = (name: string, email: string, city: string, address = 'Home', coordinates?: Coordinates) => {
      const pendingUser = { name, email, city, address, coordinates };
      localStorage.setItem('cravefeed_pending_signup', JSON.stringify(pendingUser));
  };

  const logout = () => {
      setUser(null);
  };

  const updateCity = (city: string) => {
      if (user) {
          // When manually changing city, reset address to city center generic
          setUser({ 
              ...user, 
              city, 
              address: `${city} City Center`,
              coordinates: CITY_COORDINATES[city] || null 
            });
      }
  };

  const setManualLocation = (address: string, city: string) => {
      if (user) {
           setUser({ 
              ...user, 
              city, 
              address,
              // If manual string entry, we fallback to city center coords for logic
              coordinates: CITY_COORDINATES[city] || null 
            });
      }
  }

  const detectLocation = async (): Promise<{ city: string; address: string; coordinates: Coordinates }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          let detectedCity = 'New Delhi'; // Default
          let detectedAddress = 'Detected Location';

          // 1. Reverse Geocoding with OpenStreetMap Nominatim API
          try {
              const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
              if (response.ok) {
                  const data = await response.json();
                  if (data.display_name) {
                      detectedAddress = data.display_name.split(',').slice(0, 3).join(','); // Shorten address
                  }
                  // Try to find city in address components
                  if (data.address) {
                      const addr = data.address;
                      const cityVal = (addr.city || addr.town || addr.village || addr.state_district || '').toLowerCase();
                      
                      if (cityVal) {
                          // Check exact match
                          const match = AVAILABLE_CITIES.find(c => c.toLowerCase() === cityVal);
                          if (match) {
                              detectedCity = match;
                          } else {
                              // Check aliases
                              if (cityVal.includes('vizag') || cityVal.includes('vishakhapatnam')) detectedCity = 'Visakhapatnam';
                              else if (cityVal.includes('bengaluru')) detectedCity = 'Bangalore';
                              else if (cityVal.includes('gurgaon') || cityVal.includes('gurugram')) detectedCity = 'New Delhi';
                              else if (cityVal.includes('bombay')) detectedCity = 'Mumbai';
                              else if (cityVal.includes('madras')) detectedCity = 'Chennai';
                              else if (cityVal.includes('calcutta')) detectedCity = 'Kolkata';
                          }
                      }
                  }
              }
          } catch (e) {
              console.warn("Reverse geocoding failed, falling back to distance calculation");
          }

          // 2. Fallback: Find closest supported city by distance if geocoding didn't definitively find a supported city
          // (We do this anyway to ensure we snap to our supported city list)
          let minDistance = Infinity;
          let closestSupportedCity = detectedCity;
          
          // If detectedCity is already in our list, we prioritize it, but we still verify distance isn't massive (optional)
          const isCitySupported = AVAILABLE_CITIES.includes(detectedCity);

          if (!isCitySupported) {
              Object.entries(CITY_COORDINATES).forEach(([city, coords]) => {
                  const dist = calculateDistance(latitude, longitude, coords.lat, coords.lng);
                  if (dist < minDistance) {
                      minDistance = dist;
                      closestSupportedCity = city;
                  }
              });
              detectedCity = closestSupportedCity;
          }

          const result = {
              city: detectedCity,
              address: detectedAddress,
              coordinates: { lat: latitude, lng: longitude }
          };
          
          resolve(result);
        },
        (error) => {
          let errorMessage = "Unknown error";
          switch(error.code) {
              case error.PERMISSION_DENIED:
                  errorMessage = "Location permission denied.";
                  break;
              case error.POSITION_UNAVAILABLE:
                  errorMessage = "Location information is unavailable.";
                  break;
              case error.TIMEOUT:
                  errorMessage = "The request to get user location timed out.";
                  break;
          }
          reject(new Error(errorMessage));
        }
      );
    });
  };

  return (
    <UserContext.Provider value={{ 
        user, 
        isVegMode, 
        isDarkMode,
        toggleVegMode, 
        toggleDarkMode,
        toggleGoldMembership, 
        pastOrders, 
        addOrder, 
        login, 
        signup, 
        logout,
        updateCity,
        detectLocation,
        setManualLocation
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
