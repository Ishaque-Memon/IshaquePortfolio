import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useContactMessages } from "../../hooks/usePortfolio";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail, FiTrash2, FiEye, FiEyeOff, FiCalendar, FiUser,
  FiMessageSquare, FiFilter, FiCheck, FiAlertCircle
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
  const { isDarkMode } = useTheme();
  const { messages, loading, error, markAsRead, deleteMessage } = useContactMessages();
  
  const [filter, setFilter] = useState("all"); // all, read, unread
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter messages
  const filteredMessages = messages.filter(msg => {
    if (filter === "read") return msg.isRead;
    if (filter === "unread") return !msg.isRead;
    return true;
  });

  // Stats
  const stats = {
    total: messages.length,
    unread: messages.filter(m => !m.isRead).length,
    read: messages.filter(m => m.isRead).length
  };

  const handleViewMessage = async (message) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    
    // Mark as read if unread
    if (!message.isRead) {
      try {
        await markAsRead(message._id);
      } catch (err) {
        console.error("Error marking as read:", err);
      }
    }
  };

  const handleOpenDeleteDialog = (message) => {
    setMessageToDelete(message);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      await deleteMessage(messageToDelete._id);
      setIsDeleteDialogOpen(false);
      setMessageToDelete(null);
    } catch (err) {
      console.error("Error deleting message:", err);
      alert(err.response?.data?.message || "Failed to delete message");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            Contact Messages
          </h2>
          <p className="text-neutral-500 mt-1">View and manage messages from your portfolio</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Messages</p>
                <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {stats.total}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10">
                <FiMessageSquare className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} cursor-pointer hover:shadow-lg transition-shadow`} onClick={() => setFilter('unread')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Unread</p>
                <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {stats.unread}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-red-500/10">
                <FiMail className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} cursor-pointer hover:shadow-lg transition-shadow`} onClick={() => setFilter('read')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Read</p>
                <h3 className={`text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {stats.read}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-green-500/10">
                <FiCheck className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <FiFilter className="text-neutral-500" size={18} />
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All ({stats.total})
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unread")}
              >
                Unread ({stats.unread})
              </Button>
              <Button
                variant={filter === "read" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("read")}
              >
                Read ({stats.read})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4">
            <p className="text-red-500 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardContent className="p-12 text-center">
            <FiMail className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              No messages found
            </h3>
            <p className="text-neutral-500">
              {filter === "unread" && "No unread messages"}
              {filter === "read" && "No read messages"}
              {filter === "all" && "You haven't received any messages yet"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                } ${!message.isRead ? 'border-l-4 border-l-primary-500' : ''} hover:shadow-lg transition-all group`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${
                            message.isRead 
                              ? 'bg-neutral-700/20' 
                              : 'bg-primary-500/10'
                          }`}>
                            {message.isRead ? (
                              <FiEye className={`w-4 h-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
                            ) : (
                              <FiMail className="w-4 h-4 text-primary-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                                {message.name}
                              </h3>
                              {!message.isRead && (
                                <Badge className="bg-red-500 text-white text-xs">New</Badge>
                              )}
                            </div>
                            <p className="text-sm text-neutral-500">{message.email}</p>
                            {message.subject && (
                              <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                                {message.subject}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <p className={`text-sm mb-2 line-clamp-2 ${
                          isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                        }`}>
                          {message.message}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <FiCalendar size={12} />
                            {formatDate(message.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleViewMessage(message)}
                          className="p-2 rounded hover:bg-primary-500/10 text-primary-500"
                          title="View message"
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteDialog(message)}
                          className="p-2 rounded hover:bg-red-500/10 text-red-500"
                          title="Delete message"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* View Message Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'} max-w-2xl`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Message Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-neutral-500">Name</Label>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {selectedMessage.name}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-neutral-500">Email</Label>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {selectedMessage.email}
                  </p>
                </div>
              </div>

              {selectedMessage.subject && (
                <div>
                  <Label className="text-xs text-neutral-500">Subject</Label>
                  <p className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {selectedMessage.subject}
                  </p>
                </div>
              )}

              <div>
                <Label className="text-xs text-neutral-500">Received</Label>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>

              <div>
                <Label className="text-xs text-neutral-500 mb-2 block">Message</Label>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'
                }`}>
                  <p className={`whitespace-pre-wrap ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Badge variant={selectedMessage.isRead ? "outline" : "default"}>
                  {selectedMessage.isRead ? "Read" : "Unread"}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
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
              onClick={handleDelete}
              disabled={isProcessing}
              className="bg-red-500 hover:bg-red-600"
            >
              {isProcessing ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const Label = ({ children, className }) => (
  <label className={className}>{children}</label>
);

export default Messages;
