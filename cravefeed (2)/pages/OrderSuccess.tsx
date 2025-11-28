
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Truck, ChefHat, MapPin, Home } from 'lucide-react';

export const OrderSuccess: React.FC = () => {
    // Determine status based on time elapsed for demo
    const [statusStep, setStatusStep] = useState(1);

    useEffect(() => {
        const timer1 = setTimeout(() => setStatusStep(2), 3000);
        const timer2 = setTimeout(() => setStatusStep(3), 8000);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    const steps = [
        { id: 1, label: 'Order Confirmed', icon: Check },
        { id: 2, label: 'Preparing Food', icon: ChefHat },
        { id: 3, label: 'Out for Delivery', icon: Truck },
        { id: 4, label: 'Delivered', icon: Home }, 
    ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center pt-12 px-4 transition-colors">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Order Placed!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-center">Estimated delivery: 30-40 mins</p>

        <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8 relative overflow-hidden transition-colors">
            {/* Progress Line */}
            <div className="absolute top-6 left-10 bottom-6 w-1 bg-gray-200 dark:bg-gray-700">
                 <div className="w-full bg-green-500 transition-all duration-1000" style={{ height: `${((statusStep - 1) / (steps.length - 1)) * 100}%` }}></div>
            </div>

            <div className="space-y-8 relative">
                {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = statusStep >= step.id;
                    const isCurrent = statusStep === step.id;
                    return (
                        <div key={step.id} className="flex items-center gap-4 relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                                isActive ? 'bg-green-500 border-green-500 text-white' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-300 dark:text-gray-500'
                            }`}>
                                <Icon className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className={`font-bold transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>{step.label}</h3>
                                {isCurrent && <p className="text-xs text-green-600 dark:text-green-400 animate-pulse font-medium">Happening now...</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        
        <div className="w-full max-w-md bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex items-start gap-3 mb-8">
            <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
            <div>
                <h4 className="font-bold text-orange-900 dark:text-orange-200 text-sm">Live Tracking Demo</h4>
                <p className="text-orange-800 dark:text-orange-300 text-xs mt-1">
                    Valet Ramesh is on his way to the restaurant.
                </p>
            </div>
        </div>

        <Link to="/" className="text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white">
            Back to Home
        </Link>
    </div>
  );
};
