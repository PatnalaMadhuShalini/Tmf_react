
import React from 'react';
import { Star, Clock, Heart, MapPin } from 'lucide-react';
import { Restaurant } from '../types';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { calculateDistance, estimateDeliveryTime, FALLBACK_IMAGE } from '../constants';

interface Props {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { user } = useUser();

  // Calculate real distance if user coordinates exist
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

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {restaurant.hasOffer && (
          <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {restaurant.offerText}
          </div>
        )}
        <button 
          onClick={toggleFav}
          className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
              {restaurant.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{restaurant.cuisine.join(', ')}</p>
          </div>
          <div className="flex items-center bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md">
            <span className="text-sm font-bold text-green-700 dark:text-green-400">{restaurant.rating}</span>
            <Star className="h-3 w-3 text-green-700 dark:text-green-400 ml-1 fill-current" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">
                <Clock className="h-3 w-3" />
                <span className="text-xs font-bold">{dynamicTime}</span>
             </div>
             {distance > 0 && (
                 <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs">{distance} km</span>
                 </div>
             )}
          </div>
          <span className="font-medium text-gray-700 dark:text-gray-300">{restaurant.priceRange}</span>
        </div>
      </div>
    </Link>
  );
};
