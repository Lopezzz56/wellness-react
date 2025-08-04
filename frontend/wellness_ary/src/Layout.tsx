// src/layouts/Layout.tsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar'; 

import {
  BarChart3,
  Menu,
  X,
  LayoutDashboard,
  PenLine,
  UserCircle,
} from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'DashBoard', path: '/dashboard', icon: <LayoutDashboard  className="h-5 w-5" /> },
    { name: 'My Sessions', path: '/my-sessions', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Create Session', path: '/create-session', icon: <PenLine  className="h-5 w-5" /> },
    { name: 'Profile', path: '/profile', icon: <UserCircle  className="h-5 w-5" /> },

  ];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image layer */}
  <div className="absolute inset-0 z-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      <source src="/bg.mp4" type="video/mp4" />
    </video>
  </div>

      {/* Foreground content */}
      <div className="relative z-10 flex h-full w-full">
        {/* Sidebar - hidden on mobile */}
<aside className={`hidden md:flex flex-col transition-all duration-300 bg-transparent ${sidebarOpen ? 'w-80' : 'w-20'}`}>
<div className={`flex items-center justify-between border-b ${sidebarOpen ? 'p-4' : 'py-2 px-4'}`}>
  {sidebarOpen && (
    <Link
      to="/"
      className="text-2xl font-extrabold text-[#ffffff]"
    >
      Wellness Sessions
    </Link>
  )}
  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="text-[#093FB4] bg-white p-2 rounded-full shadow"
  >
    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
  </button>
</div>


<nav className={`flex flex-col ${sidebarOpen ? 'mt-2' : 'pt-8'}`}>
    {navItems.map((item) => (
      <Link
        key={item.path}
        to={item.path}
className={`flex items-center px-4 py-3 transition-colors 
  ${isActive(item.path) 
    ? 'bg-[#1e1e1e] text-[#ffffff] font-bold text-lg' 
    : 'text-[#ffffff]  text-lg hover:bg-[#2a2a2a]'} 
`}

      >
        <span className="mr-8">{item.icon}</span>
        {sidebarOpen && <span>{item.name}</span>}
      </Link>
    ))}
  </nav>
</aside>


        {/* Main content */}
<div className="flex-1 flex flex-col overflow-hidden">
  <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
          {/* Mobile bottom nav */}
          <div className="md:hidden">
            <NavBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
