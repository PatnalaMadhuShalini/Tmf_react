
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, CheckCircle, Ticket, Wallet } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cartTotal, deliveryFee, discount, finalTotal, clearCart, applyCoupon, couponCode, items } = useCart();
  const { user, addOrder } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const handlePlaceOrder = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        const newOrder = {
            id: 'ord-' + Date.now(),
            items: [...items],
            total: finalTotal,
            status: 'preparing' as const,
            date: new Date().toLocaleDateString(),
            restaurantName: items[0]?.name || 'Restaurant', // In real app, fetch from ID
            restaurantImage: items[0]?.image || ''
        };
        addOrder(newOrder);
        setLoading(false);
        clearCart();
        navigate('/orders/success');
    }, 2000);
  };

  const handleApplyCoupon = () => {
      if(applyCoupon(couponInput)) {
          setCouponMessage("Coupon applied successfully!");
      } else {
          setCouponMessage("Invalid coupon code.");
      }
  };

  if (items.length === 0) {
      navigate('/');
      return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 pb-32 transition-colors">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>
        
        {/* Address Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Delivery Address</h2>
            </div>
            <div className="pl-12">
                {user.savedAddresses.map(addr => (
                    <div key={addr.id} className="p-4 border border-orange-500 bg-orange-50 dark:bg-orange-900/20 rounded-lg relative cursor-pointer mb-2">
                        <div className="absolute top-4 right-4 text-orange-600 dark:text-orange-400">
                            <CheckCircle className="h-5 w-5 fill-current" />
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white">{addr.label}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{addr.street}, {addr.city}, {addr.zip}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Offers */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-4 border border-gray-100 dark:border-gray-700">
             <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-full">
                    <Ticket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Offers</h2>
            </div>
            <div className="pl-12">
                 <div className="flex gap-2">
                     <input 
                        type="text" 
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Enter Code (e.g. WELCOME50)" 
                        className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 uppercase placeholder-gray-500 dark:placeholder-gray-400"
                     />
                     <button onClick={handleApplyCoupon} className="font-bold text-orange-600 dark:text-orange-400 px-4 hover:bg-orange-50 dark:hover:bg-gray-700 rounded-lg">Apply</button>
                 </div>
                 {couponMessage && <p className={`text-sm mt-2 ${couponMessage.includes('Invalid') ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>{couponMessage}</p>}
                 {couponCode && <div className="mt-2 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded">Applied '{couponCode}'</div>}
            </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-6 border border-gray-100 dark:border-gray-700">
             <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full">
                    <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Payment Method</h2>
            </div>
            <div className="pl-12 space-y-3">
                 <button 
                    onClick={() => setPaymentMethod('upi')}
                    className={`w-full flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-gray-600'}`}
                 >
                    <div className="w-10 h-6 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-[10px] font-bold dark:text-white">UPI</div>
                    <div className="flex-1 text-left">
                        <p className="font-bold text-sm text-gray-900 dark:text-white">Google Pay / PhonePe / Paytm</p>
                    </div>
                    {paymentMethod === 'upi' && <CheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 fill-current" />}
                 </button>

                 <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-gray-600'}`}
                 >
                     <div className="w-10 h-6 bg-gray-800 dark:bg-gray-600 rounded"></div>
                    <div className="flex-1 text-left">
                        <p className="font-bold text-sm text-gray-900 dark:text-white">Credit / Debit Card</p>
                    </div>
                    {paymentMethod === 'card' && <CheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 fill-current" />}
                 </button>

                 <button 
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-full flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-gray-600'}`}
                 >
                    <Wallet className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    <div className="flex-1 text-left">
                        <p className="font-bold text-sm text-gray-900 dark:text-white">Cash on Delivery</p>
                    </div>
                    {paymentMethod === 'cod' && <CheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 fill-current" />}
                 </button>
            </div>
        </div>

        {/* Bill Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-6 border border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Bill Details</h2>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Item Total</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Delivery Fee {user.isGoldMember && <span className="text-xs bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 px-1 rounded ml-1">GOLD FREE</span>}</span>
                    <span className={user.isGoldMember ? 'line-through text-gray-400 dark:text-gray-500' : ''}>₹{user.isGoldMember ? 40 : deliveryFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                     <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                        <span>Coupon Discount</span>
                        <span>- ₹{discount.toFixed(2)}</span>
                    </div>
                )}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-2 mt-2 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                    <span>To Pay</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>

        {/* Summary Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 md:static md:bg-transparent md:border-0 md:p-0">
             <button 
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
                {loading ? (
                    <>Processing...</>
                ) : (
                    <>Pay ₹{finalTotal.toFixed(2)}</>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};
