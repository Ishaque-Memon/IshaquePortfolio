
import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiInbox, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const NotificationDropdown = ({ notifications = [], unreadCount = 0, isDarkMode, onNotificationClick, loading, onClearAll, onViewAll }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 focus:outline-none shadow-sm ${
          isDarkMode ? "text-neutral-200 hover:bg-neutral-800" : "text-neutral-700 hover:bg-neutral-100"
        }`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
      >
        <FiBell size={22} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full shadow">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div
          className={`absolute right-0 mt-2 w-80 max-w-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl z-50 animate-fade-in flex flex-col`}
        >
          <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 font-semibold text-base flex items-center gap-2">
            <FiInbox className="text-primary-500" /> Notifications
            {unreadCount > 0 && <span className="ml-auto text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full">{unreadCount} unread</span>}
          </div>
          <div className="flex-1 min-h-[120px] max-h-72 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-32 text-neutral-400 dark:text-neutral-500">
                <svg className="animate-spin h-6 w-6 mb-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-neutral-400 dark:text-neutral-500">
                <FiCheckCircle size={32} className="mb-2" />
                No notifications
              </div>
            ) : (
              <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {notifications.map((n, i) => (
                  <li
                    key={n.id || i}
                    className={`p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer relative rounded-lg my-1 mx-2 ${!n.isRead ? 'bg-blue-50 dark:bg-neutral-800/60 border-l-4 border-blue-500' : ''}`}
                    onClick={() => onNotificationClick && onNotificationClick(n)}
                  >
                    <div className="font-medium text-sm mb-1 flex items-center gap-2">
                      {n.title}
                      {!n.isRead && <span className="ml-1 w-2 h-2 rounded-full bg-blue-500 inline-block" />}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">{n.body}</div>
                    <div className="text-[10px] text-neutral-400 mt-1">{n.time}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="p-2 border-t border-neutral-100 dark:border-neutral-800 flex gap-2 justify-end">
            {notifications.length > 2 && (
              <button
                className="text-xs font-semibold px-3 py-1 rounded bg-primary-500 text-white hover:bg-primary-600 transition-all"
                onClick={() => {
                  setOpen(false);
                  if (onViewAll) onViewAll();
                  else navigate('/admin/messages');
                }}
              >
                View all
              </button>
            )}
            {notifications.length > 0 && (
              <button
                className="text-xs font-semibold px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center gap-1"
                onClick={() => {
                  setOpen(false);
                  if (onClearAll) onClearAll();
                }}
                title="Mark all as read"
              >
                <FiCheckCircle size={14} /> Mark all as read
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
