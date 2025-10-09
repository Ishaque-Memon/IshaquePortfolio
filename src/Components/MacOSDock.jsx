// MacOSDock.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  FiHome, 
  FiUser, 
  FiCode, 
  FiBriefcase, 
  FiAward, 
  FiMessageCircle,
  FiFileText,
  FiBook,
  FiSun,
  FiMoon
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext.jsx";

/**
 * HOW TO CONTROL DOCK SIZES AND POSITIONS:
 * (your original commented instructions remain valid)
 */

const dimensionsConfig = [
  {
    name: "Galaxy Z fold 5 (344x882)",
    matchType: "exact",
    width: 344,
    height: 882,
    orientation: "vertical",
    iconSize: 42,
    spacing: 8,
    position: { top: 260, right: 22 },
  },
  {
    name: "iPhone 8-ish (375x667)",
    matchType: "exact",
    width: 375,
    height: 667,
    orientation: "vertical",
    iconSize: 38,
    spacing: 10,
    position: { top: 160, right: 22 },
  },
  {
    name: "Samsung Galaxy A51 (412x914)",
    matchType: "exact",
    width: 412,
    height: 914,
    orientation: "vertical",
    iconSize: 40,
    spacing: 10,
    position: { top: 250, right: 22 },
  },
  {
    name: "iPhone 11 Pro Max-ish (414x896)",
    matchType: "exact",
    width: 414,
    height: 896,
    orientation: "vertical",
    iconSize: 40,
    spacing: 10,
    position: { top: 220, right: 22 },
  },
  {
    name: "Specific tablet 912x1368",
    matchType: "exact",
    width: 912,
    height: 1368,
    orientation: "vertical",
    iconSize: 75,
    spacing: 10,
    position: { top: 350, right: 30 },
  },
  {
    name: "Landscape 1024x600",
    matchType: "exact",
    width: 1024,
    height: 600,
    orientation: "horizontal",
    iconSize: 54,
    spacing: 12,
    position: { centered: true, bottom: 20, left: "20%" },
  },
  {
    name: "Landscape 1280x800",
    matchType: "exact",
    width: 1280,
    height: 800,
    orientation: "horizontal",
    iconSize: 60,
    spacing: 14,
    position: { centered: true, bottom: 24, left: "25%" },
  },
  {
    name: "Common Vertical tablet - 768x1024",
    matchType: "exact",
    width: 768,
    height: 1024,
    orientation: "vertical",
    iconSize: 58,
    spacing: 14,
    position: { top: 220, right: 24 },
  },
  {
    name: "Wide landscape - 1366x768",
    matchType: "exact",
    width: 1366,
    height: 768,
    orientation: "horizontal",
    iconSize: 70,
    spacing: 16,
    position: { centered: true, bottom: 26 },
  },
  {
    name: "Landscape devices (wide screens)",
    matchType: "range",
    minWidth: 1024,
    maxWidth: 2560,
    minHeight: 500,
    maxHeight: 900,
    orientation: "horizontal",
    iconSize: 66,
    spacing: 14,
    position: { centered: true, bottom: 24, left:"25%" }
  },
  {
    name: "Small phones",
    matchType: "range",
    minWidth: 320,
    maxWidth: 399,
    minHeight: 600,
    maxHeight: 900,
    orientation: "vertical",
    iconSize: 40,
    spacing: 6,
    position: { top: 240, right: 22}
  },
  {
    name: "Medium phones / small tablets",
    matchType: "range",
    minWidth: 400,
    maxWidth: 768,
    minHeight: 600,
    maxHeight: 1100,
    orientation: "vertical",
    iconSize: 48,
    spacing: 8,
    position: { top: 200, right: 22 }
  },
  {
    name: "vertical Standard tablets & Large displayes",
    matchType: "range",
    minWidth: 769,
    maxWidth: 1366,
    minHeight: 600,
    maxHeight: 1000,
    orientation: "vertical",
    iconSize: 72,
    spacing: 10,
    position: { top: 220, right: 24 },
  },
  {
    name: "horizontal Standard tablets / small laptops",
    matchType: "range",
    minWidth: 860,
    maxWidth: 1366,
    minHeight: 800,
    maxHeight: 1400,
    orientation: "horizontal",
    iconSize: 72,
    spacing: 10,
    position: { centered: true, bottom: 30, left:"13.5%" }
  },
  {
    name: "Default fallback",
    matchType: "default",
    orientation: "vertical",
    iconSize: 64,
    spacing: 10,
    position: { topPercent: 22, rightPercent: 1.4 },
    indicatorSize: { width: 4, height: 48 }
  }
];

const MacOSDock = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMainLoaderComplete, setIsMainLoaderComplete] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // Safari fix
  const [isAutoHidden, setIsAutoHidden] = useState(false); // Auto-hide state for landscape
  const [lastMouseActivity, setLastMouseActivity] = useState(Date.now());
  const autoHideTimerRef = useRef(null);
  const dockRef = useRef(null);
  const [dockDimensions, setDockDimensions] = useState({ width: 0, height: 0 });
  const [screenConfig, setScreenConfig] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1920,
    screenHeight: 1080,
    aspectRatio: 16 / 9,
    orientation: "vertical",
    iconSize: 72,
    spacing: 10,
    position: { right: 32, top: 240, centered: false }
  });
  const mouseY = useMotionValue(Infinity);
  const hasIntroShown = useRef(false);

  // Improved utility: tolerant exact-match and swapped-dim match
  const getConfigForDimensions = (w, h) => {
    const tol = 2; // tolerance for small rounding differences

    // exact matches (allow swapped width/height)
    const exact = dimensionsConfig.find(c => {
      if (c.matchType !== "exact") return false;
      const cw = c.width ?? -9999;
      const ch = c.height ?? -9999;
      const direct = Math.abs(cw - w) <= tol && Math.abs(ch - h) <= tol;
      const swapped = Math.abs(cw - h) <= tol && Math.abs(ch - w) <= tol;
      return direct || swapped;
    });
    if (exact) return exact;

    // near-exact matches: handle iOS Safari URL bar height shifts (treat close heights as same device)
    const nearExact = dimensionsConfig.find(c => {
      if (c.matchType !== 'exact') return false;
      const cw = c.width ?? -9999;
      const ch = c.height ?? -9999;
      const heightTol = 140; // allow significant variance due to browser chrome
      const widthMatch = Math.abs(cw - w) <= tol || Math.abs(cw - h) <= tol; // width matches either axis
      const heightClose = Math.abs(ch - h) <= heightTol || Math.abs(ch - w) <= heightTol;
      return widthMatch && heightClose;
    });
    if (nearExact) return nearExact;

    // range matches
    const range = dimensionsConfig.find(c => {
      if (c.matchType !== "range") return false;
      const minW = typeof c.minWidth === "number" ? c.minWidth : -Infinity;
      const maxW = typeof c.maxWidth === "number" ? c.maxWidth : Infinity;
      const minH = typeof c.minHeight === "number" ? c.minHeight : -Infinity;
      const maxH = typeof c.maxHeight === "number" ? c.maxHeight : Infinity;
      return w >= minW && w <= maxW && h >= minH && h <= maxH;
    });
    if (range) return range;

    // default fallback
    const def = dimensionsConfig.find(c => c.matchType === "default");
    return def || {
      orientation: "vertical",
      iconSize: Math.round(Math.min(72, Math.max(48, w * 0.04))),
      spacing: 10,
      position: { right: Math.round(Math.max(28, w * 0.035)), top: Math.round(Math.max(180, h * 0.22)), centered: false }
    };
  };

  useEffect(() => {
    const updateScreenConfig = () => {
      const vv = typeof window !== 'undefined' ? window.visualViewport : undefined;
      const width = Math.round((vv?.width ?? window.innerWidth));
      const height = Math.round((vv?.height ?? window.innerHeight));
      const aspectRatio = width / Math.max(1, height);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const deviceConfig = getConfigForDimensions(width, height);

      // interpret percent position values if provided
      const parsedPosition = {};
      if (deviceConfig.position) {
        const pos = deviceConfig.position;
        if (typeof pos.right !== "undefined") parsedPosition.right = pos.right;
        if (typeof pos.left !== "undefined") parsedPosition.left = pos.left;
        if (typeof pos.top !== "undefined") parsedPosition.top = pos.top;
        if (typeof pos.bottom !== "undefined") parsedPosition.bottom = pos.bottom;

        if (typeof pos.topPercent === "number") parsedPosition.top = Math.round((pos.topPercent / 100) * height);
        if (typeof pos.rightPercent === "number") parsedPosition.right = Math.round((pos.rightPercent / 100) * width);
        if (typeof pos.leftPercent === "number") parsedPosition.left = Math.round((pos.leftPercent / 100) * width);
        if (typeof pos.bottomPercent === "number") parsedPosition.bottom = Math.round((pos.bottomPercent / 100) * height);

        if (pos.centered) parsedPosition.centered = true;
        if (pos.transform) parsedPosition.transform = pos.transform;
        if (pos.zIndex) parsedPosition.zIndex = pos.zIndex;
      }

      let baseIconSize = deviceConfig.iconSize ??
        Math.round(Math.max(48, Math.min(72, width * (isTouchDevice ? 0.06 : 0.04))));

      // Clamp icon size on small vertical phones (e.g., iPhone 8) to avoid jumpy oversizing
      const isSmallVerticalPhone = width <= 414 && height <= 900 && (deviceConfig.orientation === 'vertical' || width < height);
      if (isSmallVerticalPhone) {
        baseIconSize = Math.min(baseIconSize, 44); // reduce slightly for better fit
      }
  const spacing = Math.round(deviceConfig.spacing ?? (baseIconSize * (isSmallVerticalPhone ? 0.10 : 0.12)));

      let orientation = deviceConfig.orientation || (width > height ? "horizontal" : "vertical");

      const final = {
        isMobile: isTouchDevice || width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024,
        screenWidth: width,
        screenHeight: height,
        aspectRatio,
        orientation,
        iconSize: Math.round(baseIconSize),
        spacing,
        position: parsedPosition,
  indicatorSize: deviceConfig.indicatorSize || { 
          width: orientation === "horizontal" ? Math.round(baseIconSize * 0.7) : 4, 
          height: orientation === "horizontal" ? 4 : Math.round(baseIconSize * 0.7) 
        },
        padding: deviceConfig.padding,
        zIndex: deviceConfig.zIndex || 50,
        deviceName: deviceConfig.name || 'Unknown Device'
      };

      console.log('🚀 MacOSDock Config Update:', {
        device: final.deviceName,
        dimensions: `${width}x${height}`,
        orientation,
        iconSize: final.iconSize,
        spacing: final.spacing,
        position: parsedPosition,
        indicatorSize: final.indicatorSize,
        matchedConfig: deviceConfig.matchType || 'fallback'
      });

      setScreenConfig(final);
      setIsMobile(final.isMobile);
      
      // Mark as initialized after first proper config update
      if (!isInitialized) {
        setIsInitialized(true);
      }
    };

    // Safari fix: Force multiple updates to ensure proper rendering
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    updateScreenConfig();
    
    // For Safari, do additional delayed updates to fix rendering glitches
    if (isSafari) {
      const safariTimers = [
        setTimeout(updateScreenConfig, 50),
        setTimeout(updateScreenConfig, 100),
        setTimeout(updateScreenConfig, 200),
        setTimeout(updateScreenConfig, 500)
      ];
      
      // Safari-specific: Force repaint after page load
      setTimeout(() => {
        if (document.readyState === 'complete') {
          updateScreenConfig();
        }
      }, 750);
      
      // Additional fix for Safari's viewport change detection
      const handleSafariResize = () => {
        updateScreenConfig();
        // Double-check after a brief delay
        setTimeout(updateScreenConfig, 16);
      };
      
      window.addEventListener('resize', handleSafariResize);
      window.addEventListener('orientationchange', handleSafariResize);
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleSafariResize);
      }
      
      return () => {
        safariTimers.forEach(clearTimeout);
        window.removeEventListener('resize', handleSafariResize);
        window.removeEventListener('orientationchange', handleSafariResize);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleSafariResize);
        }
      };
    } else {
      const t = setTimeout(updateScreenConfig, 40);
      window.addEventListener('resize', updateScreenConfig);
      window.addEventListener('orientationchange', updateScreenConfig);
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateScreenConfig);
      }

      return () => {
        clearTimeout(t);
        window.removeEventListener('resize', updateScreenConfig);
        window.removeEventListener('orientationchange', updateScreenConfig);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', updateScreenConfig);
        }
      };
    }
  }, []);

  // Measure dock size to compute precise hide offset (for bottom slide like macOS)
  useEffect(() => {
    if (!dockRef.current) return;
    let rafId;
    const el = dockRef.current;

    const updateSize = () => {
      // Use rAF to avoid layout thrash during rapid transitions
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        setDockDimensions({ width: Math.round(rect.width), height: Math.round(rect.height) });
      });
    };

    updateSize();

    // Prefer ResizeObserver for accuracy during content/scale changes
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateSize);
      ro.observe(el);
    } else {
      // Fallback: listen to window resize
      window.addEventListener('resize', updateSize);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', updateSize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Main loader peek logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMainLoaderComplete(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMainLoaderComplete) return;
    if (isOverlayOpen) return;
    if (hasIntroShown.current) return;
    hasIntroShown.current = true;
    setIsVisible(true);
    const t = setTimeout(() => {
      if (!isHovered && !isOverlayOpen) setIsVisible(false);
    }, 2000);
    return () => clearTimeout(t);
  }, [isMainLoaderComplete, isOverlayOpen, isHovered]);

  useEffect(() => {
    let hideTimer;
    if (isOverlayOpen) {
      setIsVisible(false);
    } else if (!isHovered && isMainLoaderComplete) {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } else if (isHovered) {
      if (!isOverlayOpen) setIsVisible(true);
    }
    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [isHovered, isMainLoaderComplete, isOverlayOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (isOverlayOpen) return;
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        setIsVisible(false);
        setIsHovered(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMainLoaderComplete, isOverlayOpen]);

  useEffect(() => {
    const handler = (e) => {
      const open = e?.detail?.open === true;
      setIsOverlayOpen(open);
      if (open) {
        setIsVisible(false);
        setIsHovered(false);
      }
    };
    window.addEventListener('ui:overlay-change', handler);
    setIsOverlayOpen(document.body.classList.contains('ui-overlay-open'));
    return () => window.removeEventListener('ui:overlay-change', handler);
  }, []);

  // Auto-hide logic for landscape mode (macOS-style behavior)
  useEffect(() => {
    const isLandscape = screenConfig.orientation === "horizontal";
    
    if (!isLandscape || !isMainLoaderComplete || isOverlayOpen) {
      setIsAutoHidden(false);
      return;
    }

    const AUTO_HIDE_DELAY = 3000; // 3 seconds of inactivity
    const EDGE_DETECTION_ZONE = 100; // pixels from bottom edge to trigger show

    const resetAutoHideTimer = () => {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
      
      setIsAutoHidden(false);
      setLastMouseActivity(Date.now());

      autoHideTimerRef.current = setTimeout(() => {
        if (!isHovered && !isOverlayOpen) {
          setIsAutoHidden(true);
        }
      }, AUTO_HIDE_DELAY);
    };

    const handleMouseMove = (e) => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastMouseActivity;
      
      // Only reset timer if enough time has passed to avoid excessive timer resets
      if (timeSinceLastActivity > 500) {
        resetAutoHideTimer();
      }

      // Show dock when mouse approaches bottom edge (landscape mode)
      const distanceFromBottom = window.innerHeight - e.clientY;
      if (distanceFromBottom <= EDGE_DETECTION_ZONE && (isAutoHidden || !isVisible)) {
        setIsAutoHidden(false);
        if (!isOverlayOpen) setIsVisible(true);
        resetAutoHideTimer();
      }
    };

    const handleMouseLeave = () => {
      if (!isHovered) {
        autoHideTimerRef.current = setTimeout(() => {
          setIsAutoHidden(true);
        }, 1000); // Faster hide when mouse leaves viewport
      }
    };

    const handleKeyPress = () => {
      resetAutoHideTimer();
    };

    const handleScroll = () => {
      resetAutoHideTimer();
    };

    // Initial timer setup
    resetAutoHideTimer();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [screenConfig.orientation, isMainLoaderComplete, isOverlayOpen, isHovered, lastMouseActivity]);

  // Handle dock hover states for auto-hide
  const handleDockMouseEnter = () => {
    setIsHovered(true);
    setIsAutoHidden(false);
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
    }
  };

  const handleDockMouseLeave = () => {
    setIsHovered(false);
    setLastMouseActivity(Date.now());
    
    if (screenConfig.orientation === "horizontal") {
      autoHideTimerRef.current = setTimeout(() => {
        if (!isOverlayOpen) {
          setIsAutoHidden(true);
        }
      }, 2000); // 2 second delay after leaving dock
    }
  };

  const handleIndicatorInteraction = () => {
    if (isMobile) {
      setIsVisible(!isVisible);
      if (!isVisible) {
        setIsHovered(true);
        setTimeout(() => {
          setIsHovered(false);
        }, 5000);
      }
    } else {
      // For landscape mode with auto-hide
      if (screenConfig.orientation === "horizontal" && isAutoHidden) {
        setIsAutoHidden(false);
        setIsVisible(true);
        setIsHovered(true);
        
        // Auto-hide again after 3 seconds
        if (autoHideTimerRef.current) {
          clearTimeout(autoHideTimerRef.current);
        }
        autoHideTimerRef.current = setTimeout(() => {
          if (!isHovered && !isOverlayOpen) {
            setIsAutoHidden(true);
          }
        }, 3000);
      } else {
        setIsHovered(true);
      }
    }
  };

  const dockItems = [
    { id: "home", icon: FiHome, label: "Home", color: "from-blue-500 to-blue-600", sectionId: "home" },
    { id: "about", icon: FiUser, label: "About", color: "from-green-500 to-green-600", sectionId: "about" },
    { id: "skills", icon: FiCode, label: "Skills", color: "from-purple-500 to-purple-600", sectionId: "skills" },
    { id: "projects", icon: FiBriefcase, label: "Projects", color: "from-orange-500 to-orange-600", sectionId: "projects" },
    { id: "education", icon: FiBook, label: "Education", color: "from-red-500 to-red-600", sectionId: "education" },
    { id: "certificates", icon: FiAward, label: "Certificates", color: "from-yellow-500 to-yellow-600", sectionId: "certificates" },
    { id: "fyp", icon: FiFileText, label: "Final Year Project", color: "from-pink-500 to-pink-600", sectionId: "fyp" },
    { id: "contact", icon: FiMessageCircle, label: "Contact", color: "from-teal-500 to-teal-600", sectionId: "contact" },
    { id: "theme-toggle", icon: isDarkMode ? FiSun : FiMoon, label: isDarkMode ? "Light Mode" : "Dark Mode", color: "from-amber-500 to-yellow-600", isThemeToggle: true }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDockItemClick = (item) => {
    if (item.isThemeToggle) {
      toggleTheme();
    } else {
      scrollToSection(item.sectionId);
    }
  };

  // Build styles for indicator and dock based on screenConfig
  const indicatorStyle = (() => {
    const pos = {};
    
    if (screenConfig.orientation === "horizontal") {
      if (screenConfig.position?.centered) {
        pos.left = "50%";
        pos.transform = "translateX(-50%)";
      } else {
        if (typeof screenConfig.position?.left !== "undefined") {
          pos.left = `${screenConfig.position.left}px`;
        } else if (typeof screenConfig.position?.right !== "undefined") {
          pos.right = `${screenConfig.position.right}px`;
        } else {
          pos.left = "50%";
          pos.transform = "translateX(-50%)";
        }
      }
      
      if (typeof screenConfig.position?.bottom !== "undefined") {
        pos.bottom = `${Math.max(4, screenConfig.position.bottom - 8)}px`;
      } else {
        pos.bottom = "12px";
      }
      
      pos.width = `${screenConfig.indicatorSize?.width || (screenConfig.isMobile ? 32 : 48)}px`;
      pos.height = `${screenConfig.indicatorSize?.height || (screenConfig.isMobile ? 3 : 4)}px`;
    } else {
      if (screenConfig.position?.centered) {
        pos.left = "50%";
        pos.top = "50%";
        pos.transform = "translate(-50%, -50%)";
      } else {
        if (typeof screenConfig.position?.right !== "undefined") {
          pos.right = `${Math.max(4, screenConfig.position.right / 2)}px`;
        } else if (typeof screenConfig.position?.left !== "undefined") {
          pos.left = `${Math.max(4, screenConfig.position.left / 2)}px`;
        } else {
          pos.right = "12px";
        }
        pos.top = "50%";
        pos.transform = "translateY(-50%)";
      }
      pos.width = `${screenConfig.indicatorSize?.width || (screenConfig.isMobile ? 3 : 4)}px`;
      pos.height = `${screenConfig.indicatorSize?.height || (screenConfig.isMobile ? 32 : 48)}px`;
    }
    
    if (screenConfig.zIndex) {
      pos.zIndex = screenConfig.zIndex - 10;
    }
    
    return pos;
  })();

  // Dock style builder (flex column vs row, position math)
  const dockStyle = (() => {
    const s = {};

    if (screenConfig.orientation === "horizontal") {
      // For horizontal orientation, center at bottom if requested
      if (screenConfig.position?.centered) {
        s.left = screenConfig.position.left || "50%";
        s.transform = "translateX(-50%)";
      } else {
        if (typeof screenConfig.position?.left !== "undefined") {
          s.left = `${screenConfig.position.left}px`;
        }
        if (typeof screenConfig.position?.right !== "undefined") {
          s.right = `${screenConfig.position.right}px`;
        }
        if (!s.left && !s.right) {
          s.left = "50%";
          s.transform = "translateX(-50%)";
        }
      }

      if (typeof screenConfig.position?.bottom !== "undefined") {
        s.bottom = `${screenConfig.position.bottom}px`;
      } else {
        s.bottom = "20px";
      }

    } else {
      if (screenConfig.position?.centered) {
        s.left = "50%";
        s.top = "50%";
        s.transform = "translate(-50%, -50%)";
        if (typeof screenConfig.position.top !== "undefined") {
          s.top = `${screenConfig.position.top}px`;
          s.transform = "translateX(-50%)";
        }
      } else {
        if (typeof screenConfig.position?.right !== "undefined") {
          s.right = `${screenConfig.position.right}px`;
        }
        if (typeof screenConfig.position?.left !== "undefined") {
          s.left = `${screenConfig.position.left}px`;
        }
        if (typeof screenConfig.position?.top !== "undefined") {
          s.top = `${screenConfig.position.top}px`;
        }
        if (typeof screenConfig.position?.bottom !== "undefined") {
          s.bottom = `${screenConfig.position.bottom}px`;
        }
      }
    }

    if (screenConfig.position?.transform) {
      s.transform = screenConfig.position.transform;
    }

    if (screenConfig.zIndex) {
      s.zIndex = screenConfig.zIndex;
    }

    if (screenConfig.padding) {
      const p = screenConfig.padding;
      s.padding = `${p.top || 0}px ${p.right || 0}px ${p.bottom || 0}px ${p.left || 0}px`;
    } else {
      const pad = Math.round(screenConfig.spacing * 1.2);
      s.padding = `${pad}px ${screenConfig.spacing}px`;
    }
    
    // Ensure vertical dock fits within viewport on small phones (e.g., iPhone 8)
    if (screenConfig.orientation === 'vertical' && dockDimensions.height) {
      try {
        const vh = (typeof window !== 'undefined' && window.visualViewport)
          ? Math.round(window.visualViewport.height)
          : (typeof window !== 'undefined' ? Math.round(window.innerHeight) : screenConfig.screenHeight);
        const margin = 12; // minimal margin from edges
        // If a fixed top is set, make sure bottom doesn't overflow viewport
        if (typeof s.top !== 'undefined') {
          const topPx = typeof s.top === 'string' && s.top.endsWith('px') ? parseFloat(s.top) : Number(s.top) || 0;
          const maxTop = Math.max(8, vh - dockDimensions.height - margin);
          if (topPx > maxTop) {
            s.top = `${maxTop}px`;
          }
        }
      } catch (e) {
        // no-op: defensive
      }
    }
    
    console.log('📍 Final dock style being applied:', s);
    
    return s;
  })();

  // Safari detection
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <>
      {/* Indicator */}
      <motion.div
        className={`fixed z-40 ${isDarkMode ? 'bg-white/40' : 'bg-black/40'} rounded-full cursor-pointer select-none ${
          isSafari ? 'safari-indicator' : ''
        } ${!isInitialized ? 'opacity-0' : ''}`}
  style={{
          ...indicatorStyle,
          // Safari-specific fixes
          ...(isSafari && {
            WebkitTransform: indicatorStyle.transform,
            WebkitBackfaceVisibility: 'hidden',
            WebkitPerspective: '1000px',
            willChange: 'transform, opacity'
          })
        }}
        onClick={screenConfig.isMobile ? handleIndicatorInteraction : undefined}
        onMouseEnter={!screenConfig.isMobile ? handleIndicatorInteraction : undefined}
        onMouseLeave={!screenConfig.isMobile ? (() => setIsHovered(false)) : undefined}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: (() => {
            if (!isMainLoaderComplete || isOverlayOpen || !isInitialized) return 0;
            
            // For horizontal orientation (landscape with horizontal dock at bottom)
            if (screenConfig.orientation === "horizontal") {
              // Show indicator when dock is auto-hidden OR when dock is not visible
              return (isAutoHidden || !isVisible) ? 1 : 0;
            }
            
            // For vertical orientation (portrait + landscape devices with vertical dock on side)
            // Show indicator when dock is not visible (original behavior)
            return (!isVisible) ? 1 : 0;
          })(),
          scale: (() => {
            if (!isMainLoaderComplete || isOverlayOpen || !isInitialized) return 0;
            
            // For horizontal orientation (landscape with horizontal dock at bottom)
            if (screenConfig.orientation === "horizontal") {
              // Show indicator when dock is auto-hidden OR when dock is not visible
              return (isAutoHidden || !isVisible) ? 1 : 0;
            }
            
            // For vertical orientation (portrait + landscape devices with vertical dock on side)
            // Show indicator when dock is not visible (original behavior)
            return (!isVisible) ? 1 : 0;
          })()
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileHover={{ scale: screenConfig.isMobile ? 1 : 1.2, opacity: 0.8 }}
        whileTap={screenConfig.isMobile ? { scale: 0.9 } : {}}
      />

      {/* Main dock */}
      <motion.div
        className={`fixed z-50 ${isDarkMode ? 'bg-black/20 backdrop-blur-md border border-white/10' : 'bg-white/20 backdrop-blur-md border border-black/10'} rounded-2xl shadow-2xl ${
          isSafari ? 'safari-dock' : ''
        } ${!isInitialized ? 'opacity-0' : ''} ${
          screenConfig.orientation === "horizontal" ? (isAutoHidden ? 'dock-auto-hide' : 'dock-auto-show') : ''
        }`}
  style={isSafari ? {
          ...dockStyle,
          transformOrigin: screenConfig.orientation === 'horizontal' ? '50% 100%' : '100% 50%',
          WebkitTransform: dockStyle.transform,
          WebkitBackfaceVisibility: 'hidden',
          WebkitPerspective: '1000px',
          willChange: 'transform, opacity'
        } : { ...dockStyle, transformOrigin: screenConfig.orientation === 'horizontal' ? '50% 100%' : '100% 50%' }}
        onMouseEnter={!screenConfig.isMobile ? handleDockMouseEnter : undefined}
        onMouseLeave={!screenConfig.isMobile ? (() => {
          handleDockMouseLeave();
          setHoveredIndex(null);
          // Reset mouseY to a large value to ensure all icons return to base size
          mouseY.set(999999);
        }) : undefined}
        onMouseMove={!screenConfig.isMobile ? ((e) => mouseY.set(e.nativeEvent.clientY)) : undefined}
        onTouchStart={screenConfig.isMobile ? (() => setIsHovered(true)) : undefined}
        ref={dockRef}
        initial={{ opacity: 0, scale: 0.98, y: screenConfig.orientation === 'horizontal' ? 80 : 0 }}
        animate={{
          opacity: (isVisible && isMainLoaderComplete && !isOverlayOpen && isInitialized) ? 1 : 0,
          scale: (isVisible && isMainLoaderComplete && !isOverlayOpen && isInitialized) ? 1 : 0.98,
          x: 0,
          y: (() => {
            const hideOffset = Math.min(Math.max(dockDimensions.height + 32, 72), 280); // clamp for safety
            // If not ready or overlay, keep dock hidden below
            if (!isMainLoaderComplete || isOverlayOpen || !isInitialized) {
              return screenConfig.orientation === 'horizontal' ? hideOffset : 0;
            }

            if (screenConfig.orientation === 'horizontal') {
              // Auto-hide: slide fully below viewport; visible: y=0
              if (!isVisible || isAutoHidden) return hideOffset;
              return 0;
            }
            return 0; // vertical orientation unchanged
          })()
        }}
        transition={screenConfig.orientation === 'horizontal' ? {
          type: 'spring',
          stiffness: 520,
          damping: 36,
          mass: 0.85,
          delay: (isMainLoaderComplete && isInitialized) ? 0.05 : 0
        } : {
          duration: isSafari ? 0.6 : 0.5,
          ease: 'easeOut',
          delay: (isMainLoaderComplete && isInitialized) ? 0.2 : 0
        }}
      >
        <div
          className={`flex ${screenConfig.orientation === "vertical" ? "flex-col items-center" : "flex-row items-center justify-center"}`}
          style={{
            gap: `${screenConfig.spacing}px`,
            width: screenConfig.orientation === "horizontal" ? "auto" : undefined
          }}
        >
          {dockItems.map((item, index) => (
            <DockItem
              key={item.id}
              item={item}
              index={index}
              mouseY={mouseY}
              onClick={() => handleDockItemClick(item)}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              isDarkMode={isDarkMode}
              screenConfig={screenConfig}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

const DockItem = ({
  item,
  index,
  mouseY,
  hoveredIndex,
  setHoveredIndex,
  onClick,
  isDarkMode,
  screenConfig
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Debounced tooltip visibility with aggressive cleanup
  useEffect(() => {
    let timeoutId;
    if (hoveredIndex === index && !screenConfig.isMobile && isHovered) {
      timeoutId = setTimeout(() => setShowTooltip(true), 200);
    } else {
      setShowTooltip(false);
      if (timeoutId) clearTimeout(timeoutId);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hoveredIndex, index, screenConfig.isMobile, isHovered]);
  
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    // If mouse is not over the dock area or value is very large (reset), return a large distance
    if (!isHovered || val > 99999) return 1000;
    return val - bounds.y - bounds.height / 2;
  });

  const baseSize = screenConfig.iconSize;
  const hoverMultiplier = screenConfig.isMobile ? 1.15 : 1.6;
  
  const widthSync = useTransform(
    distance,
    [-150, 0, 150],
    [baseSize * 0.8, baseSize * hoverMultiplier, baseSize * 0.8]
  );
  
  const width = useSpring(widthSync, {
    mass: screenConfig.isMobile ? 0.2 : 0.1,
    stiffness: screenConfig.isMobile ? 200 : 150,
    damping: screenConfig.isMobile ? 15 : 12
  });

  // Reset to base size when not hovered or when hoveredIndex is null
  useEffect(() => {
    if (!isHovered || hoveredIndex === null) {
      width.set(baseSize);
      setShowTooltip(false); // Force cleanup tooltip
    }
  }, [isHovered, hoveredIndex, baseSize, width]);

  const IconComponent = item.icon;

  // Calculate tooltip position based on orientation and boundaries
  const getTooltipPosition = () => {
    if (screenConfig.orientation === 'vertical') {
      // For vertical dock, try left first, then right
      return {
        right: 'calc(100% + 12px)',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 'auto'
      };
    } else {
      // For horizontal dock, position above
      return {
        bottom: 'calc(100% + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 'auto'
      };
    }
  };

  const tooltipPosition = getTooltipPosition();

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-row items-center"
      onMouseEnter={() => {
        setHoveredIndex(index);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setHoveredIndex(null);
        setIsHovered(false);
      }}
    >
      {/* Simplified Tooltip with unique key */}
      {showTooltip && (
        <motion.div
          key={`tooltip-${item.id}-${index}`}
          className={`absolute px-3 py-2 rounded-lg text-sm font-medium pointer-events-none whitespace-nowrap ${isDarkMode ? 'bg-gray-900 text-white border border-gray-700' : 'bg-white text-gray-900 border border-gray-200'} shadow-lg backdrop-blur-sm`}
          style={{
            ...tooltipPosition,
            fontSize: screenConfig.isMobile ? '12px' : '14px',
            maxWidth: screenConfig.isMobile ? '120px' : '180px',
            zIndex: 60,
            position: 'absolute' // Ensure proper positioning
          }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          layoutId={`tooltip-${item.id}`} // Prevent layout thrashing
        >
          {item.label}
          
          {/* Simple Arrow */}
          {screenConfig.orientation === 'vertical' ? (
            <div className={`absolute top-1/2 -right-1 transform -translate-y-1/2 border-4 border-transparent ${isDarkMode ? 'border-l-gray-900' : 'border-l-white'}`} />
          ) : (
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent ${isDarkMode ? 'border-t-gray-900' : 'border-t-white'}`} />
          )}
        </motion.div>
      )}

      {/* Icon button */}
      <motion.button
        onClick={onClick}
        className={`relative cursor-pointer overflow-hidden shadow-lg ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300'}`}
        style={{
          width,
          height: width,
          borderRadius: screenConfig.isMobile ? '12px' : '16px'
        }}
        whileTap={{ scale: screenConfig.isMobile ? 0.95 : 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`} />

        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white"
          animate={{
            scale: hoveredIndex === index ? (screenConfig.isMobile ? 1.05 : 1.1) : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <IconComponent
            size={Math.max(
              screenConfig.isMobile ? 16 : 20,
              (typeof width.get === 'function' ? width.get() : baseSize) * (screenConfig.isMobile ? 0.45 : 0.4)
            )}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-white/20 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        <motion.div
          className="absolute inset-0 bg-white/30 rounded-2xl"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      <motion.div
        className={`ml-2 w-1 h-1 rounded-full ${isDarkMode ? 'bg-white/60' : 'bg-black/60'}`}
        initial={{ scale: 0 }}
        animate={{ scale: hoveredIndex === index ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default MacOSDock;
