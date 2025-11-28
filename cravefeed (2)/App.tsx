import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider, useUser } from './context/UserContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { RestaurantDetail } from './pages/RestaurantDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Dining } from './pages/Dining';
import { Grocery } from './pages/Grocery';
import { Train } from './pages/Train';
import { Profile } from './pages/Profile';
import { Orders } from './pages/Orders';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

// Placeholder for missing pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center text-gray-400 font-medium">
    {title} Page - Coming Soon
  </div>
);

// Wrapper for protected routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useUser();
    
    // Check if user is logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
};

const App: React.FC = () => {
  return (
    <UserProvider>
        <CartProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Routes */}
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantDetail /></ProtectedRoute>} />
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/orders/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                    <Route path="/dining" element={<ProtectedRoute><Dining /></ProtectedRoute>} />
                    <Route path="/grocery" element={<ProtectedRoute><Grocery /></ProtectedRoute>} />
                    <Route path="/train" element={<ProtectedRoute><Train /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                    <Route path="/favorites" element={<ProtectedRoute><Placeholder title="Favorites" /></ProtectedRoute>} />
                    
                    {/* Catch all redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </CartProvider>
    </UserProvider>
  );
};

export default App;