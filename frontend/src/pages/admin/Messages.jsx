import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useContactMessages } from "../../hooks/usePortfolio";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail, FiTrash2, FiEye, FiEyeOff, FiCalendar, FiUser,
  FiMessageSquare, FiFilter, FiCheck, FiAlertCircle, FiSearch, FiX
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Messages = () => {
  const location = useLocation();
  const messageRefs = useRef({});
  const { isDarkMode } = useTheme();
  const { messages, loading, error, markAsRead, deleteMessage } = useContactMessages();
  
  // State management
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);
  const [viewingMessageId, setViewingMessageId] = useState(null);

  // Calculate statistics
  const statistics = {
    total: messages?.length || 0,
    unread: messages?.filter(msg => !msg.isRead).length || 0,
    read: messages?.filter(msg => !msg.isRead === false).length || 0
  };

  // Filter messages based on active filter and search query
  const getFilteredMessages = () => {
    if (!messages || !Array.isArray(messages)) return [];
    
    let filtered = [...messages];

    // Apply filter type
    switch (filterType) {
      case "read":
        filtered = filtered.filter(msg => msg.isRead);
        break;
      case "unread":
        filtered = filtered.filter(msg => !msg.isRead);
        break;
      default:
        break;
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(msg => 
        msg.name?.toLowerCase().includes(query) ||
        msg.email?.toLowerCase().includes(query) ||
        msg.subject?.toLowerCase().includes(query) ||
        msg.message?.toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const filteredMessages = getFilteredMessages();

  // Scroll to message if navigated from notification
  useEffect(() => {
    if (location.state?.messageId && messageRefs.current[location.state.messageId]) {
      setTimeout(() => {
        messageRefs.current[location.state.messageId]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 300);
    }
  }, [location.state, messages]);

  // Format date utility
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handler: View message
  const handleViewMessage = (message) => {
    setViewingMessageId(message._id);
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    setViewingMessageId(null);
  };

  // Handler: Mark message as read when dialog closes (only if unread)
  const handleCloseViewDialog = async (open) => {
    if (!open && selectedMessage && !selectedMessage.isRead) {
      // Mark as read in background after dialog closes
      try {
        await markAsRead(selectedMessage._id);
      } catch (err) {
        console.error("Failed to mark message as read:", err);
      }
    }
    
    if (!open) {
      setIsViewDialogOpen(false);
      setSelectedMessage(null);
    }
  };

  // Handler: Open delete dialog
  const handleOpenDeleteDialog = (message) => {
    setMessageToDelete(message);
    setIsDeleteDialogOpen(true);
  };

  // Handler: Delete single message
  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    
    setIsProcessing(true);
    try {
      await deleteMessage(messageToDelete._id);
      setIsDeleteDialogOpen(false);
      setMessageToDelete(null);
    } catch (err) {
      console.error("Failed to delete message:", err);
      alert(err.response?.data?.message || "Failed to delete message. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handler: Mark all as read
  const handleMarkAllAsRead = async () => {
    const unreadMessages = messages.filter(msg => !msg.isRead);
    if (unreadMessages.length === 0) return;

    setIsMarkingAllRead(true);
    try {
      await Promise.all(
        unreadMessages.map(msg => markAsRead(msg._id).catch(err => console.error(err)))
      );
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    } finally {
      setIsMarkingAllRead(false);
    }
  };

  // Handler: Delete all messages
  const handleDeleteAll = async () => {
    if (!messages || messages.length === 0) return;
    
    setIsProcessing(true);
    try {
      await Promise.all(
        messages.map(msg => deleteMessage(msg._id).catch(err => console.error(err)))
      );
      setIsDeleteAllDialogOpen(false);
    } catch (err) {
      console.error("Failed to delete all messages:", err);
      alert("Failed to delete all messages. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto"></div>
          <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Loading messages...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            Contact Messages
          </h1>
          <p className={`mt-1 text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            View and manage messages from your portfolio contacts
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {statistics.unread > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={isMarkingAllRead}
              className="flex items-center gap-2"
            >
              <FiCheck size={16} />
              <span className="hidden sm:inline">Mark All Read</span>
            </Button>
          )}
          
          {statistics.total > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsDeleteAllDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <FiTrash2 size={16} />
              <span className="hidden sm:inline">Delete All</span>
            </Button>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Card className={`border-red-500/50 ${isDarkMode ? 'bg-red-950/20' : 'bg-red-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FiAlertCircle className="text-red-500 flex-shrink-0" size={20} />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Messages"
          value={statistics.total}
          icon={FiMessageSquare}
          iconColor="text-blue-500"
          bgColor="bg-blue-500/10"
          isDarkMode={isDarkMode}
          onClick={() => setFilterType("all")}
          isActive={filterType === "all"}
        />
        
        <StatCard
          title="Unread"
          value={statistics.unread}
          icon={FiMail}
          iconColor="text-red-500"
          bgColor="bg-red-500/10"
          isDarkMode={isDarkMode}
          onClick={() => setFilterType("unread")}
          isActive={filterType === "unread"}
        />
        
        <StatCard
          title="Read"
          value={statistics.read}
          icon={FiCheck}
          iconColor="text-green-500"
          bgColor="bg-green-500/10"
          isDarkMode={isDarkMode}
          onClick={() => setFilterType("read")}
          isActive={filterType === "read"}
        />
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`} size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, subject, or message..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
              isDarkMode 
                ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500' 
                : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-neutral-500/10 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
              title="Clear search"
            >
              <FiX size={16} />
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`p-2 rounded-lg ${filterType !== 'all' ? (isDarkMode ? 'bg-primary-500/10 text-primary-400' : 'bg-primary-50 text-primary-600') : (isDarkMode ? 'text-neutral-400' : 'text-neutral-500')}`}>
            <FiFilter size={18} />
          </div>
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            All ({statistics.total})
          </Button>
          <Button
            variant={filterType === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("unread")}
          >
            Unread ({statistics.unread})
          </Button>
          <Button
            variant={filterType === "read" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("read")}
          >
            Read ({statistics.read})
          </Button>
        </div>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <EmptyState
          isDarkMode={isDarkMode}
          filterType={filterType}
          hasSearchQuery={searchQuery.trim().length > 0}
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredMessages.map((message, index) => (
              <MessageCard
                key={message._id}
                message={message}
                index={index}
                isDarkMode={isDarkMode}
                onView={handleViewMessage}
                onDelete={handleOpenDeleteDialog}
                formatDate={formatDate}
                viewingMessageId={viewingMessageId}
                ref={(el) => { messageRefs.current[message._id] = el; }}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* View Message Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={handleCloseViewDialog}>
        <DialogContent className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'} max-w-2xl max-h-[80vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Message Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoField
                  label="Name"
                  value={selectedMessage.name}
                  icon={FiUser}
                  isDarkMode={isDarkMode}
                />
                <InfoField
                  label="Email"
                  value={selectedMessage.email}
                  icon={FiMail}
                  isDarkMode={isDarkMode}
                />
              </div>

              {selectedMessage.subject && (
                <InfoField
                  label="Subject"
                  value={selectedMessage.subject}
                  isDarkMode={isDarkMode}
                  className="text-lg font-semibold"
                />
              )}

              <InfoField
                label="Received"
                value={formatDate(selectedMessage.createdAt)}
                icon={FiCalendar}
                isDarkMode={isDarkMode}
              />

              <div>
                <label className={`text-xs font-medium mb-2 block ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Message
                </label>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                  <p className={`whitespace-pre-wrap text-sm leading-relaxed ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Badge variant={selectedMessage.isRead ? "outline" : "default"}>
                  {selectedMessage.isRead ? "Read" : "Unread"}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Single Message Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'}>
          <AlertDialogHeader>
            <AlertDialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Delete Message
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message from{" "}
              <span className="font-semibold">{messageToDelete?.name}</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMessage}
              disabled={isProcessing}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isProcessing ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete All Messages Dialog */}
      <AlertDialog open={isDeleteAllDialogOpen} onOpenChange={setIsDeleteAllDialogOpen}>
        <AlertDialogContent className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'}>
          <AlertDialogHeader>
            <AlertDialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Delete All Messages
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all {statistics.total} messages?
              This action cannot be undone and will permanently remove all messages from your inbox.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAll}
              disabled={isProcessing}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isProcessing ? "Deleting..." : "Delete All"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Sub-components
const StatCard = ({ title, value, icon: Icon, iconColor, bgColor, isDarkMode, onClick, isActive }) => (
  <Card
    onClick={onClick}
    className={`cursor-pointer transition-all hover:shadow-lg ${
      isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
    } ${isActive ? 'ring-2 ring-primary-500' : ''}`}
  >
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {title}
          </p>
          <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${bgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const MessageCard = React.forwardRef(({ message, index, isDarkMode, onView, onDelete, formatDate, viewingMessageId }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ delay: index * 0.03 }}
  >
    <Card
      className={`group transition-all hover:shadow-lg ${
        isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
      } ${!message.isRead ? 'border-l-4 border-l-primary-500' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2.5 rounded-lg flex-shrink-0 ${
                message.isRead 
                  ? isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
                  : 'bg-primary-500/10'
              }`}>
                {message.isRead ? (
                  <FiEye className={`w-4 h-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
                ) : (
                  <FiMail className="w-4 h-4 text-primary-500" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {message.name}
                  </h3>
                  {!message.isRead && (
                    <Badge className="bg-red-500 text-white text-xs flex-shrink-0">New</Badge>
                  )}
                </div>
                <p className={`text-sm truncate ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {message.email}
                </p>
              </div>
            </div>

            {message.subject && (
              <p className={`text-sm font-medium mb-2 truncate ${
                isDarkMode ? 'text-primary-400' : 'text-primary-600'
              }`}>
                {message.subject}
              </p>
            )}
            
            <p className={`text-sm mb-3 line-clamp-2 ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {message.message}
            </p>
            
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <FiCalendar size={12} />
              <span>{formatDate(message.createdAt)}</span>
            </div>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={() => onView(message)}
              disabled={viewingMessageId === message._id}
              className={`relative p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-primary-500/10 text-primary-400' 
                  : 'hover:bg-primary-50 text-primary-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="View message"
            >
              {viewingMessageId === message._id ? (
                <div className="animate-spin rounded-full h-[18px] w-[18px] border-2 border-primary-500 border-t-transparent"></div>
              ) : (
                <FiEye size={18} />
              )}
            </button>
            <button
              onClick={() => onDelete(message)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-red-500/10 text-red-400' 
                  : 'hover:bg-red-50 text-red-600'
              }`}
              title="Delete message"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
));

const EmptyState = ({ isDarkMode, filterType, hasSearchQuery }) => {
  const getEmptyMessage = () => {
    if (hasSearchQuery) return "No messages match your search";
    if (filterType === "unread") return "No unread messages";
    if (filterType === "read") return "No read messages";
    return "You haven't received any messages yet";
  };

  return (
    <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
      <CardContent className="p-12 text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
        }`}>
          <FiMail className={`w-8 h-8 ${isDarkMode ? 'text-neutral-600' : 'text-neutral-400'}`} />
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
          {getEmptyMessage()}
        </h3>
        <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          {hasSearchQuery ? "Try adjusting your search terms" : "Messages from your portfolio will appear here"}
        </p>
      </CardContent>
    </Card>
  );
};

const InfoField = ({ label, value, icon: Icon, isDarkMode, className = "" }) => (
  <div>
    <label className={`text-xs font-medium mb-1 block ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
      {label}
    </label>
    <div className="flex items-center gap-2">
      {Icon && <Icon className={isDarkMode ? 'text-neutral-500' : 'text-neutral-400'} size={16} />}
      <p className={`${isDarkMode ? 'text-white' : 'text-neutral-900'} ${className}`}>
        {value}
      </p>
    </div>
  </div>
);

export default Messages;