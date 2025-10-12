import { useEffect, useState } from "react";
import { getAllMessages, markMessageAsRead, deleteMessage } from "../api/portfolioApi";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getAllMessages()
      .then((data) => {
        if (mounted) {
          // Map messages to notification format (paginated response)
          const messages = Array.isArray(data?.data) ? data.data : [];
          const mapped = messages.map((msg) => ({
            id: msg._id,
            title: msg.name || "New Message",
            body: msg.message || msg.email || "You have a new message.",
            time: msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "",
            isRead: msg.isRead,
          }));
          setNotifications(mapped.filter((n) => !n.isRead));
        }
      })
      .catch((e) => {
        if (mounted) setError(e);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);


  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await markMessageAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {}
  };


  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.filter(n => !n.isRead).map(n => markMessageAsRead(n.id))
      );
      setNotifications([]); // Clear the dropdown after marking all as read
    } catch {}
  };

  // Clear all notifications (just clear from UI, not backend)
  const clearAll = async () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return { notifications, unreadCount, loading, error, markAsRead, markAllAsRead, clearAll };
}
