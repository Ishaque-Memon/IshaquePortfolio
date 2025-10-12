import AdminLayout from "../../components/layout/AdminLayout";
import Sidebar from "../../Components/ui/sidebar";
import Header from "../../Components/ui/header";

import NotificationDropdown from "../../Components/ui/NotificationDropdown";
import useNotifications from "../../hooks/useNotifications";
import { useSelector, useDispatch } from "react-redux";
import { setHeaderTitle } from "../../redux/layoutSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { FiExternalLink } from "react-icons/fi";


const AdminLayoutWrapper = () => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();



  // Dynamic notifications
  const { notifications, unreadCount, loading: notifLoading, markAsRead, markAllAsRead } = useNotifications();

  const handleNotificationClick = (notif) => {
    if (!notif.isRead) markAsRead(notif.id);
    // Navigate to messages page and scroll to the message
    navigate(`/admin/messages`, { state: { messageId: notif.id } });
  };

  // Mark all notifications as read

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const notificationContent = (
    <NotificationDropdown
      notifications={notifications}
      unreadCount={unreadCount}
      isDarkMode={isDarkMode}
      onNotificationClick={handleNotificationClick}
      loading={notifLoading}
  onClearAll={handleMarkAllAsRead}
      onViewAll={() => navigate('/admin/messages')}
    />
  );

  const rightContent = (
    <div className="flex items-center gap-4">
      <button
        onClick={() => navigate('/')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          isDarkMode
            ? 'bg-neutral-800 text-white hover:bg-neutral-700'
            : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
        }`}
      >
        <FiExternalLink size={16} />
        <span className="hidden sm:inline">View Portfolio</span>
      </button>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center`}>
          <span className="text-white font-semibold">
            {user?.username?.charAt(0).toUpperCase() || 'A'}
          </span>
        </div>
        <div className="hidden md:block">
          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{user?.name || 'Admin'}</p>
          <p className="text-xs text-neutral-500">Administrator</p>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout
      sidebar={<Sidebar />}
      header={<Header notificationContent={notificationContent} rightContent={rightContent} />}
    >
      <Outlet />
    </AdminLayout>
  );
};

export default AdminLayoutWrapper;
