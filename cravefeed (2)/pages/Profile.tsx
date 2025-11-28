
import React from 'react';
import { useUser } from '../context/UserContext';
import { Crown, MapPin, Gift, CreditCard, ChevronRight, LogOut, Settings, Bell, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user, toggleGoldMembership, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-6 mb-4 shadow-sm transition-colors">
          <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border-2 border-orange-100 dark:border-orange-900">
                  <img src={`https://ui-avatars.com/api/?name=${user.name}&background=orange&color=fff&size=128`} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">{user.email}</p>
                  <Link to="#" className="text-orange-600 dark:text-orange-400 text-sm font-bold hover:underline">Edit Profile</Link>
              </div>
          </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 space-y-4">
          {/* Gold Membership Card */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg transition-transform hover:scale-[1.01]">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-6 w-6 text-yellow-400 fill-current" />
                    <h2 className="text-lg font-bold tracking-wide">CRAVEFEED GOLD</h2>
                </div>
                <p className="text-gray-300 text-sm mb-6 max-w-xs">
                    {user.isGoldMember 
                        ? "You are a Gold Member! Enjoy free delivery and VIP support." 
                        : "Join Gold to get Free Delivery, Extra Discounts, and VIP access."}
                </p>
                <button 
                    onClick={toggleGoldMembership}
                    className={`px-6 py-2 rounded-full font-bold text-sm transition-colors shadow-lg ${
                        user.isGoldMember 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-yellow-400 text-black hover:bg-yellow-500'
                    }`}
                >
                    {user.isGoldMember ? "Manage Membership" : "Get Gold Now"}
                </button>
              </div>
              <Crown className="absolute -bottom-4 -right-4 h-32 w-32 text-white opacity-5 rotate-12" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors">
               <Link to="/orders" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400"><Gift className="h-5 w-5" /></div>
                      <span className="font-medium text-gray-700 dark:text-gray-200">Orders & Reorder</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
               </Link>
               
               <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                      <div className="p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-pink-600 dark:text-pink-400"><Heart className="h-5 w-5" /></div>
                      <span className="font-medium text-gray-700 dark:text-gray-200">Favorites</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
               </div>

               <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400"><MapPin className="h-5 w-5" /></div>
                      <div>
                          <span className="font-medium text-gray-700 dark:text-gray-200 block">Address Book</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Manage your delivery locations</span>
                      </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
               </div>

               <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400"><CreditCard className="h-5 w-5" /></div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-200 block">Money & Payments</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Balance: ₹{user.walletBalance}</span>
                      </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
               </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"><Settings className="h-5 w-5" /></div>
                      <span className="font-medium text-gray-700 dark:text-gray-200">Settings</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
               </div>
               <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"><Bell className="h-5 w-5" /></div>
                      <span className="font-medium text-gray-700 dark:text-gray-200">Notifications</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
               </div>
                <button onClick={handleLogout} className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left group">
                  <div className="flex items-center gap-4">
                      <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/40"><LogOut className="h-5 w-5" /></div>
                      <span className="font-medium text-red-600 dark:text-red-400">Log Out</span>
                  </div>
               </button>
          </div>
      </div>
    </div>
  );
};
