import React, { useState } from 'react';
import {
  FaPalette, FaHome, FaBriefcase, FaBlog, FaEnvelope,
  FaUsers, FaCog, FaChartLine, FaPaintBrush, FaBell,
} from 'react-icons/fa';
import Header from '../components/Header';
import { StatsCard } from '../components/StatsCard';
import { TrafficOverview } from '../components/TrafficOverview';
import { RecentActivity } from '../components/RecentActivity';
import { RecentProjects } from '../components/RecentProjects';
import { RecentMessages } from '../components/RecentMessages';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProjectPage from '../pages/ProjectPage';

const PortfolioDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const navigate = useNavigate()
  const location = useLocation();
  const [refreshPage,setRefreshPage]=useState(0)
  const navItems = [
    { name: 'Dashboard', icon: <FaHome className="text-2xl font" />, path: '/dashboard' },
    { name: 'Projects', icon: <FaBriefcase className="text-2xl font" />, path: '/dashboard/projects' },
    { name: 'Blog', icon: <FaBlog className="text-2xl font" />, path: '/blog' },
    { name: 'Messages', icon: <FaEnvelope className="text-2xl font" />, path: '/messages' },
    { name: 'Users', icon: <FaUsers className="text-2xl font" />, path: '/users' },
    { name: 'Settings', icon: <FaCog className="text-2xl font" />, path: '/settings' },
    { name: 'Analytics', icon: <FaChartLine className="text-2xl font" />, path: '/analytics' },
    { name: 'Themes', icon: <FaPaintBrush className="text-2xl font" />, path: '/themes' },
    { name: 'Notifications', icon: <FaBell className="text-2xl font" />, path: '/notifications' },
  ];

  const handleNavClick = (name, path) => {
    setActiveNav(name);
    navigate(path);
  };


  return (
    <div className="flex min-h-screen bg-gray-50" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}>
      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white  fixed  inset-y-0 left-0 z-30 w-72 transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
      >
        <div className="p-5 border-b border-blue-800 flex items-center gap-3">
          <FaPalette className="text-blue-400 text-2xl" />
          <h1 className="text-2xl font-bold ">Portfolio CMS</h1>
        </div>

        <nav className="py-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 w-full px-6 py-3  cursor-pointer text-xl font-semibold  text-left transition-colors ${activeNav === item.name
                ? 'bg-blue-800 bg-opacity-30 border-l-4 border-blue-400'
                : 'hover:bg-blue-800 hover:bg-opacity-20 border-l-4 border-transparent'
                }`}
              onClick={() => handleNavClick(item.name, item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20  bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} refreshPage={refreshPage} setRefreshPage={setRefreshPage}></Header>


        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6">
          {/* Stats Cards */}
          <StatsCard></StatsCard>

          {/* Charts & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            {/* Traffic Overview */}
            {/* <TrafficOverview></TrafficOverview> */}
            <Outlet></Outlet>

            {/* Recent Activity */}
            {location.pathname === "/dashboard" && <RecentActivity></RecentActivity>}


          </div>

          {/* Recent Projects & Messages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Recent Projects */}
            <RecentProjects></RecentProjects>

            {/* Recent Messages */}
            <RecentMessages></RecentMessages>
          </div>

        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
          <p>© 2023 Portfolio CMS Dashboard | Designed with ❤️</p>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioDashboard;