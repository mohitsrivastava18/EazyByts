import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import { NotficationModal } from "../popupModels/NotficationModal";
import axios from "axios";

// Custom hook to detect clicks outside a component
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

function Header({ setSidebarOpen ,refreshPage,setRefreshPage}) {
    const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  // Use the custom hook with the ref
  useClickOutside(notificationRef, () => {
    setIsNotificationOpen(false);
  });

    useEffect(() => {
    fetchNotifications();
  }, [refreshPage]);


  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/contact", {
        withCredentials: true, // if your API uses cookies
      });
      setNotifications(res.data);
      setRefreshPage(prev=>prev+1)
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };


  // Example notifications data
//   const notifications = [
//     { message: "New message from John Doe", time: "2 minutes ago" },
//     { message: "Project 'Alpha' status updated", time: "1 hour ago" },
//     { message: "Your account was logged in from a new device.", time: "Yesterday" },
//   ];

  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-10 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button className="text-gray-500 lg:hidden" onClick={() => setSidebarOpen(true)}>
          <FaBars className="text-xl" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent w-48 md:w-64"
          />
        </div>

        {/* ATTACH THE REF TO THE CONTAINER */}
        <div className="relative" ref={notificationRef}>
          <button
            className="text-gray-500 cursor-pointer"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <FaBell className="text-xl" />
            <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications.length}
            </span>
          </button>

          <NotficationModal isOpen={isNotificationOpen} notifications={notifications} />
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
            AU
          </div>
          <div className="hidden md:block">
            <h4 className="font-semibold">Admin User</h4>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;