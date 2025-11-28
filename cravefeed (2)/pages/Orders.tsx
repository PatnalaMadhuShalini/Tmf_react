
import React from 'react';
import { useUser } from '../context/UserContext';
import { Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Orders: React.FC = () => {
  const { pastOrders } = useUser();
  const navigate = useNavigate();

  const handleReorder = (order: any) => {
      navigate('/'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 transition-colors">
        <div className="bg-white dark:bg-gray-800 p-6 shadow-sm mb-6 transition-colors">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Past Orders</h1>
        </div>

        <div className="max-w-3xl mx-auto px-4 space-y-4">
            {pastOrders.length === 0 ? (
                 <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400">No past orders found.</p>
                 </div>
            ) : (
                pastOrders.map(order => (
                    <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{order.restaurantName}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{order.date}</p>
                            </div>
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded flex items-center gap-1">
                                {order.status === 'delivered' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                {order.status}
                            </span>
                        </div>
                        
                        <div className="border-t border-b border-gray-50 dark:border-gray-700 py-3 mb-3">
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                {order.items.map(item => (
                                    <li key={item.id} className="flex justify-between">
                                        <span>{item.quantity} x {item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-between items-center">
                             <span className="font-bold text-gray-900 dark:text-white">Total: ₹{order.total.toFixed(2)}</span>
                             <button 
                                onClick={() => handleReorder(order)}
                                className="text-orange-600 dark:text-orange-400 font-bold text-sm hover:underline"
                            >
                                 Reorder
                             </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
  );
};
