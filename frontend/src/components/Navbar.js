import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import RoomifyLogo from './RoomifyLogo';
import { 
  Building2, 
  Calendar, 
  Sparkles, 
  Wrench, 
  Bell, 
  HelpCircle, 
  BarChart3, 
  Users, 
  FileText, 
  LogOut,
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/rooms', label: 'Rooms', icon: Building2 },
    { path: '/bookings', label: 'Bookings', icon: Calendar },
    { path: '/smart-scheduler', label: 'Smart', icon: Sparkles },
    { path: '/maintenance', label: 'Maintenance', icon: Wrench },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/faq', label: 'FAQ', icon: HelpCircle },
  ];

  const adminItems = [
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/users', label: 'Users', icon: Users },
    { path: '/reports', label: 'Reports', icon: FileText },
  ];

  return (
    <nav className="glass-dark text-white shadow-2xl sticky top-0 z-50 border-b border-white border-opacity-10 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/rooms" className="group relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RoomifyLogo size={45} showText={true} />
            </motion.div>
          </Link>
          
          {/* Navigation Items */}
          {user && (
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className="relative group"
                  >
                    <motion.div
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                        active 
                          ? 'bg-white bg-opacity-10 text-white shadow-lg' 
                          : 'text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-5'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                      
                      {/* Tubelight Effect */}
                      {active && (
                        <motion.div
                          layoutId="tubelight"
                          className="absolute inset-0 w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full -z-10"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        >
                          {/* Top Glow */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-t-full">
                            <div className="absolute w-12 h-6 bg-purple-400/30 rounded-full blur-md -top-2 -left-2" />
                            <div className="absolute w-8 h-6 bg-pink-400/30 rounded-full blur-md -top-1" />
                            <div className="absolute w-4 h-4 bg-purple-400/40 rounded-full blur-sm top-0 left-2" />
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </Link>
                );
              })}

              {/* Admin Dropdown */}
              {user.role === 'admin' && (
                <div className="relative">
                  <motion.button
                    onClick={() => setShowAdminMenu(!showAdminMenu)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10 transition-all"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm font-medium">Admin</span>
                    <motion.div
                      animate={{ rotate: showAdminMenu ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {showAdminMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-gray-900 rounded-xl shadow-2xl border border-white border-opacity-10 overflow-hidden"
                      >
                        {adminItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setShowAdminMenu(false)}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-white hover:bg-opacity-10 transition-all text-white text-opacity-70 hover:text-white"
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* User Profile & Logout */}
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white border-opacity-20">
                <Link to="/profile" className="group">
                  <motion.div 
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white hover:bg-opacity-10 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center font-bold text-sm shadow-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-white text-opacity-50">
                        {user.role === 'admin' ? '👑 Administrator' : '👤 Member'}
                      </div>
                    </div>
                  </motion.div>
                </Link>

                <motion.button
                  onClick={handleLogout}
                  className="p-2.5 bg-red-500 bg-opacity-20 hover:bg-opacity-30 rounded-xl transition-all border border-red-500 border-opacity-30 hover:border-opacity-50 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
