
import React, { useState } from 'react';
import { Train as TrainIcon, ArrowRight } from 'lucide-react';

export const Train: React.FC = () => {
  const [pnr, setPnr] = useState('');
  const [step, setStep] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if(pnr.length === 10) setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 flex flex-col items-center justify-center p-4 transition-colors">
       <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors">
           <div className="bg-orange-600 p-8 text-center">
               <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                   <TrainIcon className="h-8 w-8 text-white" />
               </div>
               <h1 className="text-2xl font-bold text-white">Food on Train</h1>
               <p className="text-orange-100 mt-2">Get hot food delivered to your seat.</p>
           </div>
           
           <div className="p-8">
               {step === 1 ? (
                    <form onSubmit={handleSearch}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter 10-digit PNR</label>
                        <div className="relative mb-6">
                            <input 
                                type="number" 
                                value={pnr}
                                onChange={e => setPnr(e.target.value)}
                                placeholder="e.g. 4215567890"
                                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-mono text-lg text-gray-900 dark:text-white"
                                maxLength={10}
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={pnr.length !== 10}
                            className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors"
                        >
                            Find Train
                        </button>
                    </form>
               ) : (
                   <div className="text-center">
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white">Rajdhani Express (12951)</h3>
                       <p className="text-gray-500 dark:text-gray-400 mb-6">New Delhi to Mumbai Central</p>
                       
                       <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800 mb-6">
                           <p className="font-bold text-green-800 dark:text-green-400">Delivery Available at:</p>
                           <ul className="text-sm text-green-700 dark:text-green-300 mt-2 space-y-1">
                               <li>Kota Jn (7:30 PM)</li>
                               <li>Ratlam Jn (10:15 PM)</li>
                               <li>Vadodara (2:00 AM)</li>
                           </ul>
                       </div>
                       
                       <button className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 rounded-xl hover:bg-black dark:hover:bg-gray-200 transition-colors">
                           View Restaurants <ArrowRight className="h-4 w-4" />
                       </button>
                       <button onClick={() => setStep(1)} className="mt-4 text-sm text-gray-500 dark:text-gray-400 underline">Change PNR</button>
                   </div>
               )}
           </div>
       </div>
    </div>
  );
};
