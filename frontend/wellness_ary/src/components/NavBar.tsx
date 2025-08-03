// src/components/NavBar.tsx
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  PlusCircle,
  BarChart3,

} from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'DashBoard', path: '/dashboard', icon: <Home className="h-5 w-5" /> },
    // { name: 'Add Transaction', path: '/add-transaction', icon: <PlusCircle className="h-5 w-5" /> },
    { name: 'My Sessions', path: '/my-sessions', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Create Session', path: '/create-session', icon: <PlusCircle className="h-5 w-5" /> },
    { name: 'Profile', path: '/profile', icon: <Home className="h-5 w-5" /> },
    
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow md:hidden">
      <nav className="flex justify-between items-center h-16 px-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center text-xs flex-grow ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
