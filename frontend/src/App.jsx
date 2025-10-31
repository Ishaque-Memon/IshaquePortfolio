import React, { useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import AppRouter from "./router.jsx";
import { Toaster } from "./Components/ui/sonner.jsx";
import { logVisit } from "./api/portfolioApi.js";
import io from "socket.io-client";
import "./styles/globals.css";
import "./styles/animations.css";

function App() {
  useEffect(() => {
    // Log visit once per session
    if (!window.__visitLogged) {
      logVisit();
      window.__visitLogged = true;
    }

    // Connect socket.io (for live analytics)
    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000");

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("visitUpdate", (data) => {
      console.log("🌍 Live total visits:", data.totalVisits);
    });

    socket.on("disconnect", () => {
      console.log("⚠️ Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
