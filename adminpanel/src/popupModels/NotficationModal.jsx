export const NotficationModal = ({ isOpen, notifications }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute right-0 mt-6 w-72 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
      <div className="py-1">
        <h3 className="text-lg font-semibold px-4 pt-2 pb-1 text-gray-800">Notifications</h3>
        <div className="border-t border-gray-100"></div>
        
        {/* Loop through the notifications array and render each one */}
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <a 
              key={index} 
              href="#" 
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.time}</p>
            </a>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500 text-sm">No new notifications.</p>
        )}
        
        <div className="border-t border-gray-100"></div>
        <a href="#" className="block px-4 py-2 text-center text-sm text-blue-600 hover:underline">
          View All Notifications
        </a>
      </div>
    </div>
  );
};