// MacOSDock.jsx - A configurable macOS-style dock component
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
import { useTheme } from "../../contexts/ThemeContext.jsx";

/**
 * ============================================================================
 * DEVICE CONFIGURATION SYSTEM
 * ============================================================================
 * This array defines how the dock should appear on different screen sizes.
 * Each configuration specifies:
 * - Device dimensions (width/height)
 * - Match type (exact, range, or default fallback)
 * - Icon size and spacing
 * - Position on screen
 * - Orientation (horizontal at bottom or vertical on side)
 */

const DEVICE_CONFIGURATIONS = [
  // Exact device matches - specific phones and tablets
  {
    name: "Galaxy Z Fold 5 (344x882)",
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

  // Landscape layouts - horizontal dock at bottom
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
    position: { centered: true, bottom: 24, left: "20%" },
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

  // Tablets in portrait
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

  // Range-based matches - catch devices within size ranges
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
    position: { centered: true, bottom: 24, left:"24%" }
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

  // Default fallback for any unmatched screens
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

/**
 * ============================================================================
 * CONFIGURATION CONSTANTS
 * ============================================================================
 */

// Auto-hide behavior (for landscape mode)
const AUTO_HIDE_DELAY_MS = 3000; // How long to wait before hiding dock when idle
const AUTO_HIDE_AFTER_LEAVE_MS = 2000; // How long to wait after mouse leaves dock
const EDGE_DETECTION_ZONE_DESKTOP_PX = 6; // Pixels from bottom edge to trigger dock reveal (desktop)
const EDGE_DETECTION_ZONE_MOBILE_PX = 24; // Pixels from bottom edge to trigger dock reveal (mobile)
const MOUSE_ACTIVITY_THROTTLE_MS = 500; // Minimum time between mouse activity checks

// Dimension matching tolerances
const EXACT_MATCH_TOLERANCE_PX = 2; // Allow small rounding differences for exact matches
const BROWSER_CHROME_HEIGHT_VARIANCE_PX = 140; // iOS Safari URL bar can change height significantly

/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 */

/**
 * Find the best configuration match for the given screen dimensions
 * Tries exact match first, then near-exact (for browser chrome variance),
 * then range match, and finally falls back to default
 * 
 * @param {number} screenWidth - Current screen width in pixels
 * @param {number} screenHeight - Current screen height in pixels
 * @returns {object} The matched configuration object
 */
const findConfigurationForScreen = (screenWidth, screenHeight) => {
  // Step 1: Try exact match (allowing dimension swap for rotation and small tolerance)
  const exactMatch = DEVICE_CONFIGURATIONS.find(config => {
    if (config.matchType !== "exact") return false;
    
    const configWidth = config.width ?? -9999;
    const configHeight = config.height ?? -9999;
    
    // Check direct match (width matches width, height matches height)
    const directMatch = 
      Math.abs(configWidth - screenWidth) <= EXACT_MATCH_TOLERANCE_PX && 
      Math.abs(configHeight - screenHeight) <= EXACT_MATCH_TOLERANCE_PX;
    
    // Check swapped match (for device rotation)
    const swappedMatch = 
      Math.abs(configWidth - screenHeight) <= EXACT_MATCH_TOLERANCE_PX && 
      Math.abs(configHeight - screenWidth) <= EXACT_MATCH_TOLERANCE_PX;
    
    return directMatch || swappedMatch;
  });
  
  if (exactMatch) return exactMatch;

  // Step 2: Try near-exact match (for iOS Safari URL bar height changes)
  const nearExactMatch = DEVICE_CONFIGURATIONS.find(config => {
    if (config.matchType !== 'exact') return false;
    
    const configWidth = config.width ?? -9999;
    const configHeight = config.height ?? -9999;
    
    // Width must match closely on at least one axis
    const widthMatchesOneAxis = 
      Math.abs(configWidth - screenWidth) <= EXACT_MATCH_TOLERANCE_PX || 
      Math.abs(configWidth - screenHeight) <= EXACT_MATCH_TOLERANCE_PX;
    
    // Height can vary significantly due to browser chrome
    const heightIsClose = 
      Math.abs(configHeight - screenHeight) <= BROWSER_CHROME_HEIGHT_VARIANCE_PX || 
      Math.abs(configHeight - screenWidth) <= BROWSER_CHROME_HEIGHT_VARIANCE_PX;
    
    return widthMatchesOneAxis && heightIsClose;
  });
  
  if (nearExactMatch) return nearExactMatch;

  // Step 3: Try range match
  const rangeMatch = DEVICE_CONFIGURATIONS.find(config => {
    if (config.matchType !== "range") return false;
    
    const minWidth = config.minWidth ?? -Infinity;
    const maxWidth = config.maxWidth ?? Infinity;
    const minHeight = config.minHeight ?? -Infinity;
    const maxHeight = config.maxHeight ?? Infinity;
    
    const widthInRange = screenWidth >= minWidth && screenWidth <= maxWidth;
    const heightInRange = screenHeight >= minHeight && screenHeight <= maxHeight;
    
    return widthInRange && heightInRange;
  });
  
  if (rangeMatch) return rangeMatch;

  // Step 4: Use default fallback
  const defaultConfig = DEVICE_CONFIGURATIONS.find(config => config.matchType === "default");
  
  // If no default exists, create a sensible one
  return defaultConfig || {
    orientation: "vertical",
    iconSize: Math.round(Math.min(72, Math.max(48, screenWidth * 0.04))),
    spacing: 10,
    position: { 
      right: Math.round(Math.max(28, screenWidth * 0.035)), 
      top: Math.round(Math.max(180, screenHeight * 0.22)), 
      centered: false 
    }
  };
};

/**
 * Convert position config (which may use percentages) to pixel values
 * 
 * @param {object} positionConfig - Position object from device config
 * @param {number} screenWidth - Screen width for percentage calculations
 * @param {number} screenHeight - Screen height for percentage calculations
 * @returns {object} Position with all values in pixels
 */
const convertPositionToPixels = (positionConfig, screenWidth, screenHeight) => {
  const pixelPosition = {};
  
  if (!positionConfig) return pixelPosition;
  
  // Copy direct pixel values
  if (positionConfig.right !== undefined) pixelPosition.right = positionConfig.right;
  if (positionConfig.left !== undefined) pixelPosition.left = positionConfig.left;
  if (positionConfig.top !== undefined) pixelPosition.top = positionConfig.top;
  if (positionConfig.bottom !== undefined) pixelPosition.bottom = positionConfig.bottom;
  
  // Convert percentage values to pixels
  if (positionConfig.topPercent !== undefined) {
    pixelPosition.top = Math.round((positionConfig.topPercent / 100) * screenHeight);
  }
  if (positionConfig.rightPercent !== undefined) {
    pixelPosition.right = Math.round((positionConfig.rightPercent / 100) * screenWidth);
  }
  if (positionConfig.leftPercent !== undefined) {
    pixelPosition.left = Math.round((positionConfig.leftPercent / 100) * screenWidth);
  }
  if (positionConfig.bottomPercent !== undefined) {
    pixelPosition.bottom = Math.round((positionConfig.bottomPercent / 100) * screenHeight);
  }
  
  // Copy special properties
  if (positionConfig.centered) pixelPosition.centered = true;
  if (positionConfig.transform) pixelPosition.transform = positionConfig.transform;
  if (positionConfig.zIndex) pixelPosition.zIndex = positionConfig.zIndex;
  
  return pixelPosition;
};

/**
 * Detect if current browser is Safari
 * @returns {boolean} True if Safari browser
 */
const isSafariBrowser = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

/**
 * ============================================================================
 * MAIN DOCK COMPONENT
 * ============================================================================
 */

const MacOSDock = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  // ========== Hover and Interaction State ==========
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [isDockHovered, setIsDockHovered] = useState(false);
  const [isDockVisible, setIsDockVisible] = useState(false);
  
  // ========== Device and Screen State ==========
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [screenConfiguration, setScreenConfiguration] = useState({
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
  
  // ========== Lifecycle and Timing State ==========
  const [hasMainLoaderFinished, setHasMainLoaderFinished] = useState(false);
  const [isComponentInitialized, setIsComponentInitialized] = useState(false); // Safari rendering fix
  const [isUIOverlayOpen, setIsUIOverlayOpen] = useState(false);
  
  // ========== Auto-hide State (Landscape Mode) ==========
  const [isAutoHidden, setIsAutoHidden] = useState(false);
  
  // ========== Refs ==========
  const autoHideTimerRef = useRef(null);
  const lastMouseActivityTimeRef = useRef(Date.now());
  const dockElementRef = useRef(null);
  const isMouseButtonDownRef = useRef(false);
  const hasShownIntroAnimationRef = useRef(false);
  
  // ========== Measured Dimensions ==========
  const [dockDimensions, setDockDimensions] = useState({ width: 0, height: 0 });
  
  // ========== Interaction Permission ==========
  // Prevents click-through issues by delaying pointer events after dock appears
  const [canUserInteract, setCanUserInteract] = useState(false);
  
  // ========== Framer Motion Values ==========
  const mouseYPosition = useMotionValue(Infinity);

  /**
   * ========================================================================
   * EFFECT: Update screen configuration on resize/orientation change
   * ========================================================================
   * Monitors window dimensions and updates dock configuration accordingly.
   * Includes special handling for Safari's viewport quirks.
   */
  useEffect(() => {
    const updateScreenConfiguration = () => {
      // Get accurate viewport dimensions (handles mobile browser chrome)
      const viewport = typeof window !== 'undefined' ? window.visualViewport : undefined;
      const currentWidth = Math.round((viewport?.width ?? window.innerWidth));
      const currentHeight = Math.round((viewport?.height ?? window.innerHeight));
      const currentAspectRatio = currentWidth / Math.max(1, currentHeight);
      
      // Detect if device has touch capability
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Find matching device configuration
      const matchedDeviceConfig = findConfigurationForScreen(currentWidth, currentHeight);
      
      // Convert position config to pixel values
      const pixelPosition = convertPositionToPixels(
        matchedDeviceConfig.position, 
        currentWidth, 
        currentHeight
      );
      
      // Calculate base icon size with touch device scaling
      let calculatedIconSize = matchedDeviceConfig.iconSize ?? 
        Math.round(Math.max(48, Math.min(72, currentWidth * (isTouchCapable ? 0.06 : 0.04))));
      
      // Special handling for small vertical phones (e.g., iPhone 8)
      // Prevents icons from being too large and causing layout issues
      const isSmallVerticalPhone = 
        currentWidth <= 414 && 
        currentHeight <= 900 && 
        (matchedDeviceConfig.orientation === 'vertical' || currentWidth < currentHeight);
      
      if (isSmallVerticalPhone) {
        calculatedIconSize = Math.min(calculatedIconSize, 44);
      }
      
      // Calculate spacing between icons
      const calculatedSpacing = Math.round(
        matchedDeviceConfig.spacing ?? 
        (calculatedIconSize * (isSmallVerticalPhone ? 0.10 : 0.12))
      );
      
      // Determine orientation (horizontal for landscape, vertical for portrait)
      const determinedOrientation = 
        matchedDeviceConfig.orientation || 
        (currentWidth > currentHeight ? "horizontal" : "vertical");
      
      // Build final configuration object
      const finalConfiguration = {
        isMobile: isTouchCapable || currentWidth <= 768,
        isTablet: currentWidth > 768 && currentWidth <= 1024,
        isDesktop: currentWidth > 1024,
        screenWidth: currentWidth,
        screenHeight: currentHeight,
        aspectRatio: currentAspectRatio,
        orientation: determinedOrientation,
        iconSize: Math.round(calculatedIconSize),
        spacing: calculatedSpacing,
        position: pixelPosition,
        indicatorSize: matchedDeviceConfig.indicatorSize || { 
          width: determinedOrientation === "horizontal" 
            ? Math.round(calculatedIconSize * 0.7) 
            : 4, 
          height: determinedOrientation === "horizontal" 
            ? 4 
            : Math.round(calculatedIconSize * 0.7) 
        },
        padding: matchedDeviceConfig.padding,
        zIndex: matchedDeviceConfig.zIndex || 50,
        deviceName: matchedDeviceConfig.name || 'Unknown Device'
      };
      
      setScreenConfiguration(finalConfiguration);
      setIsMobileDevice(finalConfiguration.isMobile);
      
      // Mark component as initialized after first successful config update
      if (!isComponentInitialized) {
        setIsComponentInitialized(true);
      }
    };
    
    // Safari requires multiple delayed updates to fix rendering glitches
    const isSafari = isSafariBrowser();
    
    // Initial update
    updateScreenConfiguration();
    
    if (isSafari) {
      // Safari-specific: Multiple delayed updates at increasing intervals
      const safariUpdateTimers = [
        setTimeout(updateScreenConfiguration, 50),
        setTimeout(updateScreenConfiguration, 100),
        setTimeout(updateScreenConfiguration, 200),
        setTimeout(updateScreenConfiguration, 500)
      ];
      
      // Additional update after page fully loads
      setTimeout(() => {
        if (document.readyState === 'complete') {
          updateScreenConfiguration();
        }
      }, 750);
      
      // Safari-specific resize handler with double-check
      const handleSafariResize = () => {
        updateScreenConfiguration();
        setTimeout(updateScreenConfiguration, 16); // Next animation frame
      };
      
      window.addEventListener('resize', handleSafariResize);
      window.addEventListener('orientationchange', handleSafariResize);
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleSafariResize);
      }
      
      return () => {
        safariUpdateTimers.forEach(clearTimeout);
        window.removeEventListener('resize', handleSafariResize);
        window.removeEventListener('orientationchange', handleSafariResize);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleSafariResize);
        }
      };
    } else {
      // Standard browsers: simple resize listeners
      const debounceTimer = setTimeout(updateScreenConfiguration, 40);
      
      window.addEventListener('resize', updateScreenConfiguration);
      window.addEventListener('orientationchange', updateScreenConfiguration);
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateScreenConfiguration);
      }
      
      return () => {
        clearTimeout(debounceTimer);
        window.removeEventListener('resize', updateScreenConfiguration);
        window.removeEventListener('orientationchange', updateScreenConfiguration);
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', updateScreenConfiguration);
        }
      };
    }
  }, [isComponentInitialized]);

  /**
   * ========================================================================
   * EFFECT: Measure actual dock dimensions for hide animations
   * ========================================================================
   * Uses ResizeObserver to track dock size changes, which is needed to
   * calculate the proper distance to slide the dock off-screen
   */
  useEffect(() => {
    if (!dockElementRef.current) return;
    
    let animationFrameId;
    const dockElement = dockElementRef.current;
    
    const measureDockSize = () => {
      // Use requestAnimationFrame to avoid layout thrashing
      animationFrameId = requestAnimationFrame(() => {
        const boundingRect = dockElement.getBoundingClientRect();
        setDockDimensions({ 
          width: Math.round(boundingRect.width), 
          height: Math.round(boundingRect.height) 
        });
      });
    };
    
    measureDockSize();
    
    // Use ResizeObserver for accurate size tracking
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(measureDockSize);
      resizeObserver.observe(dockElement);
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', measureDockSize);
    }
    
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', measureDockSize);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  /**
   * ========================================================================
   * EFFECT: Main loader completion (initial delay before showing dock)
   * ========================================================================
   */
  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setHasMainLoaderFinished(true);
    }, 2000);
    
    return () => clearTimeout(loaderTimer);
  }, []);

  /**
   * ========================================================================
   * EFFECT: Intro animation (peek dock once after loader finishes)
   * ========================================================================
   */
  useEffect(() => {
    if (!hasMainLoaderFinished) return;
    if (isUIOverlayOpen) return;
    if (hasShownIntroAnimationRef.current) return;
    
    hasShownIntroAnimationRef.current = true;
    setIsDockVisible(true);
    
    const hideTimer = setTimeout(() => {
      if (!isDockHovered && !isUIOverlayOpen) {
        setIsDockVisible(false);
      }
    }, 2000);
    
    return () => clearTimeout(hideTimer);
  }, [hasMainLoaderFinished, isUIOverlayOpen, isDockHovered]);

  /**
   * ========================================================================
   * EFFECT: Auto-hide dock when not hovered (general behavior)
   * ========================================================================
   */
  useEffect(() => {
    let autoHideTimer;
    
    if (isUIOverlayOpen) {
      // Hide dock when overlay is open
      setIsDockVisible(false);
    } else if (!isDockHovered && hasMainLoaderFinished) {
      // Hide after 3 seconds of no hover
      autoHideTimer = setTimeout(() => {
        setIsDockVisible(false);
      }, 3000);
    } else if (isDockHovered) {
      // Show when hovered (unless overlay is open)
      if (!isUIOverlayOpen) {
        setIsDockVisible(true);
      }
    }
    
    return () => {
      if (autoHideTimer) clearTimeout(autoHideTimer);
    };
  }, [isDockHovered, hasMainLoaderFinished, isUIOverlayOpen]);

  /**
   * ========================================================================
   * EFFECT: Hide dock on scroll
   * ========================================================================
   */
  useEffect(() => {
    let lastScrollPosition = window.scrollY;
    
    const handleScroll = () => {
      if (isUIOverlayOpen) return;
      
      const currentScrollPosition = window.scrollY;
      const scrollDelta = Math.abs(currentScrollPosition - lastScrollPosition);
      
      // Hide dock if scroll movement is significant
      if (scrollDelta > 10) {
        setIsDockVisible(false);
        setIsDockHovered(false);
      }
      
      lastScrollPosition = currentScrollPosition;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMainLoaderFinished, isUIOverlayOpen]);

  /**
   * ========================================================================
   * EFFECT: Listen for overlay state changes
   * ========================================================================
   */
  useEffect(() => {
    const handleOverlayChange = (event) => {
      const isOpen = event?.detail?.open === true;
      setIsUIOverlayOpen(isOpen);
      
      if (isOpen) {
        setIsDockVisible(false);
        setIsDockHovered(false);
      }
    };
    
    window.addEventListener('ui:overlay-change', handleOverlayChange);
    
    // Check initial state
    setIsUIOverlayOpen(document.body.classList.contains('ui-overlay-open'));
    
    return () => window.removeEventListener('ui:overlay-change', handleOverlayChange);
  }, []);

  /**
   * ========================================================================
   * EFFECT: Auto-hide behavior for landscape mode (macOS-style)
   * ========================================================================
   * In landscape mode, dock auto-hides after inactivity and reveals when
   * mouse approaches the bottom edge of the screen
   */
  useEffect(() => {
    const isLandscapeMode = screenConfiguration.orientation === "horizontal";
    
    // Only apply auto-hide in landscape mode when dock is ready
    if (!isLandscapeMode || !hasMainLoaderFinished || isUIOverlayOpen) {
      setIsAutoHidden(false);
      return;
    }
    
    const edgeDetectionZone = screenConfiguration.isMobile 
      ? EDGE_DETECTION_ZONE_MOBILE_PX 
      : EDGE_DETECTION_ZONE_DESKTOP_PX;
    
    /**
     * Reset the auto-hide timer and show the dock
     */
    const resetAutoHideTimer = () => {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
      
      setIsAutoHidden(false);
      lastMouseActivityTimeRef.current = Date.now();
      
      // Set timer to hide dock after inactivity
      autoHideTimerRef.current = setTimeout(() => {
        if (!isDockHovered && !isUIOverlayOpen) {
          setIsAutoHidden(true);
        }
      }, AUTO_HIDE_DELAY_MS);
    };
    
    /**
     * Handle mouse movement to detect bottom edge proximity
     */
    const handleMouseMove = (event) => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastMouseActivityTimeRef.current;
      
      // Throttle timer resets to avoid excessive updates
      if (timeSinceLastActivity > MOUSE_ACTIVITY_THROTTLE_MS) {
        resetAutoHideTimer();
      }
      
      // Show dock when mouse approaches bottom edge
      const distanceFromBottomEdge = window.innerHeight - event.clientY;
      const shouldRevealDock =
        !isMouseButtonDownRef.current &&
        distanceFromBottomEdge <= edgeDetectionZone &&
        (isAutoHidden || !isDockVisible);
      
      if (shouldRevealDock) {
        setIsAutoHidden(false);
        if (!isUIOverlayOpen) {
          setIsDockVisible(true);
        }
        resetAutoHideTimer();
      }
    };
    
    /**
     * Handle mouse leaving viewport
     */
    const handleMouseLeave = () => {
      if (!isDockHovered) {
        autoHideTimerRef.current = setTimeout(() => {
          setIsAutoHidden(true);
        }, 1000); // Faster hide when mouse leaves
      }
    };
    
    /**
     * Handle keyboard activity
     */
    const handleKeyPress = () => {
      resetAutoHideTimer();
    };
    
    /**
     * Handle scroll activity
     */
    const handleScroll = () => {
      resetAutoHideTimer();
    };
    
    /**
     * Track mouse button state to prevent accidental reveals during drag
     */
    const handleMouseDown = () => {
      isMouseButtonDownRef.current = true;
    };
    
    const handleMouseUp = () => {
      isMouseButtonDownRef.current = false;
    };
    
    // Initial timer setup
    resetAutoHideTimer();
    
    // Add all event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [screenConfiguration.orientation, hasMainLoaderFinished, isUIOverlayOpen, isDockHovered]);

  /**
   * ========================================================================
   * EFFECT: Delay interaction capability to prevent click-through
   * ========================================================================
   * In horizontal mode, we delay enabling pointer events briefly after
   * showing the dock to prevent accidental clicks during the reveal animation
   */
  useEffect(() => {
    if (screenConfiguration.orientation !== 'horizontal') {
      setCanUserInteract(true);
      return;
    }
    
    let interactionDelayTimer;
    
    const isReadyForInteraction = 
      isDockVisible && 
      !isAutoHidden && 
      hasMainLoaderFinished && 
      !isUIOverlayOpen && 
      isComponentInitialized;
    
    if (isReadyForInteraction) {
      // Disable interactions briefly
      setCanUserInteract(false);
      
      // Re-enable after short delay
      interactionDelayTimer = setTimeout(() => {
        setCanUserInteract(true);
      }, 180);
    } else {
      setCanUserInteract(false);
    }
    
    return () => {
      if (interactionDelayTimer) {
        clearTimeout(interactionDelayTimer);
      }
    };
  }, [isDockVisible, isAutoHidden, hasMainLoaderFinished, isUIOverlayOpen, isComponentInitialized, screenConfiguration.orientation]);

  /**
   * ========================================================================
   * EVENT HANDLERS
   * ========================================================================
   */

  /**
   * Handle mouse entering the dock area
   */
  const handleDockMouseEnter = () => {
    setIsDockHovered(true);
    setIsAutoHidden(false);
    
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
    }
  };

  /**
   * Handle mouse leaving the dock area
   */
  const handleDockMouseLeave = () => {
    setIsDockHovered(false);
    lastMouseActivityTimeRef.current = Date.now();
    
    // In landscape mode, auto-hide after a delay
    if (screenConfiguration.orientation === "horizontal") {
      autoHideTimerRef.current = setTimeout(() => {
        if (!isUIOverlayOpen) {
          setIsAutoHidden(true);
        }
      }, AUTO_HIDE_AFTER_LEAVE_MS);
    }
  };

  /**
   * Handle clicks on the indicator (the small bar that shows when dock is hidden)
   */
  const handleIndicatorClick = () => {
    if (isMobileDevice) {
      // Toggle visibility on mobile
      setIsDockVisible(!isDockVisible);
      
      if (!isDockVisible) {
        setIsDockHovered(true);
        setTimeout(() => {
          setIsDockHovered(false);
        }, 5000);
      }
    } else {
      // Desktop behavior: reveal dock in landscape auto-hide mode
      if (screenConfiguration.orientation === "horizontal" && isAutoHidden) {
        setIsAutoHidden(false);
        setIsDockVisible(true);
        setIsDockHovered(true);
        
        // Auto-hide again after delay
        if (autoHideTimerRef.current) {
          clearTimeout(autoHideTimerRef.current);
        }
        autoHideTimerRef.current = setTimeout(() => {
          if (!isDockHovered && !isUIOverlayOpen) {
            setIsAutoHidden(true);
          }
        }, 3000);
      } else {
        setIsDockHovered(true);
      }
    }
  };

  /**
   * ========================================================================
   * DOCK ITEMS CONFIGURATION
   * ========================================================================
   */
  const dockItems = [
    { 
      id: "home", 
      icon: FiHome, 
      label: "Home", 
      color: "from-blue-500 to-blue-600", 
      sectionId: "home" 
    },
    { 
      id: "about", 
      icon: FiUser, 
      label: "About", 
      color: "from-green-500 to-green-600", 
      sectionId: "about" 
    },
    { 
      id: "skills", 
      icon: FiCode, 
      label: "Skills", 
      color: "from-purple-500 to-purple-600", 
      sectionId: "skills" 
    },
    { 
      id: "projects", 
      icon: FiBriefcase, 
      label: "Projects", 
      color: "from-orange-500 to-orange-600", 
      sectionId: "projects" 
    },
    { 
      id: "education", 
      icon: FiBook, 
      label: "Education", 
      color: "from-red-500 to-red-600", 
      sectionId: "education" 
    },
    { 
      id: "certificates", 
      icon: FiAward, 
      label: "Certificates", 
      color: "from-yellow-500 to-yellow-600", 
      sectionId: "certificates" 
    },
    { 
      id: "contact", 
      icon: FiMessageCircle, 
      label: "Contact", 
      color: "from-teal-500 to-teal-600", 
      sectionId: "contact" 
    },
    { 
      id: "theme-toggle", 
      icon: isDarkMode ? FiSun : FiMoon, 
      label: isDarkMode ? "Light Mode" : "Dark Mode", 
      color: "from-amber-500 to-yellow-600", 
      isThemeToggle: true 
    }
  ];

  /**
   * Scroll to a specific section on the page
   */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Handle clicks on dock items
   */
  const handleDockItemClick = (item) => {
    if (item.isThemeToggle) {
      toggleTheme();
    } else {
      scrollToSection(item.sectionId);
    }
  };

  /**
   * ========================================================================
   * STYLE BUILDERS
   * ========================================================================
   * These functions compute the CSS styles for positioning the indicator
   * and dock based on the current screen configuration
   */

  /**
   * Build CSS styles for the indicator (small bar that shows when dock is hidden)
   */
  const buildIndicatorStyles = () => {
    const styles = {};
    
    if (screenConfiguration.orientation === "horizontal") {
      // Horizontal dock: indicator at bottom center
      if (screenConfiguration.position?.centered) {
        styles.left = "48.4%";
        styles.transform = "translateX(-50%)";
      } else {
        if (screenConfiguration.position?.left !== undefined) {
          styles.left = `${screenConfiguration.position.left}px`;
        } else if (screenConfiguration.position?.right !== undefined) {
          styles.right = `${screenConfiguration.position.right}px`;
        } else {
          styles.left = "50%";
          styles.transform = "translateX(-50%)";
        }
      }
      
      if (screenConfiguration.position?.bottom !== undefined) {
        styles.bottom = `${Math.max(4, screenConfiguration.position.bottom - 8)}px`;
      } else {
        styles.bottom = "12px";
      }
      
      styles.width = `${screenConfiguration.indicatorSize?.width || (screenConfiguration.isMobile ? 32 : 48)}px`;
      styles.height = `${screenConfiguration.indicatorSize?.height || (screenConfiguration.isMobile ? 3 : 4)}px`;
    } else {
      // Vertical dock: indicator on side
      if (screenConfiguration.position?.centered) {
        styles.left = "50%";
        styles.top = "50%";
        styles.transform = "translate(-50%, -50%)";
      } else {
        if (screenConfiguration.position?.right !== undefined) {
          styles.right = `${Math.max(4, screenConfiguration.position.right / 2)}px`;
        } else if (screenConfiguration.position?.left !== undefined) {
          styles.left = `${Math.max(4, screenConfiguration.position.left / 2)}px`;
        } else {
          styles.right = "12px";
        }
        styles.top = "50%";
        styles.transform = "translateY(-50%)";
      }
      
      styles.width = `${screenConfiguration.indicatorSize?.width || (screenConfiguration.isMobile ? 3 : 4)}px`;
      styles.height = `${screenConfiguration.indicatorSize?.height || (screenConfiguration.isMobile ? 32 : 48)}px`;
    }
    
    if (screenConfiguration.zIndex) {
      styles.zIndex = screenConfiguration.zIndex - 10;
    }
    
    return styles;
  };

  /**
   * Build CSS styles for the dock container
   */
  const buildDockStyles = () => {
    const styles = {};
    
    if (screenConfiguration.orientation === "horizontal") {
      // Horizontal orientation: dock at bottom, centered or positioned
      if (screenConfiguration.position?.centered) {
        styles.left = screenConfiguration.position.left || "50%";
        styles.transform = "translateX(-50%)";
      } else {
        if (screenConfiguration.position?.left !== undefined) {
          styles.left = `${screenConfiguration.position.left}px`;
        }
        if (screenConfiguration.position?.right !== undefined) {
          styles.right = `${screenConfiguration.position.right}px`;
        }
        if (!styles.left && !styles.right) {
          styles.left = "50%";
          styles.transform = "translateX(-50%)";
        }
      }
      
      if (screenConfiguration.position?.bottom !== undefined) {
        styles.bottom = `${screenConfiguration.position.bottom}px`;
      } else {
        styles.bottom = "20px";
      }
    } else {
      // Vertical orientation: dock on side
      if (screenConfiguration.position?.centered) {
        styles.left = "50%";
        styles.top = "50%";
        styles.transform = "translate(-50%, -50%)";
        
        if (screenConfiguration.position.top !== undefined) {
          styles.top = `${screenConfiguration.position.top}px`;
          styles.transform = "translateX(-50%)";
        }
      } else {
        if (screenConfiguration.position?.right !== undefined) {
          styles.right = `${screenConfiguration.position.right}px`;
        }
        if (screenConfiguration.position?.left !== undefined) {
          styles.left = `${screenConfiguration.position.left}px`;
        }
        if (screenConfiguration.position?.top !== undefined) {
          styles.top = `${screenConfiguration.position.top}px`;
        }
        if (screenConfiguration.position?.bottom !== undefined) {
          styles.bottom = `${screenConfiguration.position.bottom}px`;
        }
      }
    }
    
    // Apply custom transform if specified
    if (screenConfiguration.position?.transform) {
      styles.transform = screenConfiguration.position.transform;
    }
    
    // Apply z-index
    if (screenConfiguration.zIndex) {
      styles.zIndex = screenConfiguration.zIndex;
    }
    
    // Apply padding
    if (screenConfiguration.padding) {
      const padding = screenConfiguration.padding;
      styles.padding = `${padding.top || 0}px ${padding.right || 0}px ${padding.bottom || 0}px ${padding.left || 0}px`;
    } else {
      const calculatedPadding = Math.round(screenConfiguration.spacing * 1.2);
      styles.padding = `${calculatedPadding}px ${screenConfiguration.spacing}px`;
    }
    
    // Ensure vertical dock fits within viewport on small phones
    if (screenConfiguration.orientation === 'vertical' && dockDimensions.height) {
      try {
        const viewportHeight = (typeof window !== 'undefined' && window.visualViewport)
          ? Math.round(window.visualViewport.height)
          : (typeof window !== 'undefined' ? Math.round(window.innerHeight) : screenConfiguration.screenHeight);
        
        const edgeMargin = 12;
        
        // If dock has a fixed top position, ensure it doesn't overflow viewport
        if (styles.top !== undefined) {
          const topPositionPx = typeof styles.top === 'string' && styles.top.endsWith('px') 
            ? parseFloat(styles.top) 
            : Number(styles.top) || 0;
          
          const maxAllowedTop = Math.max(8, viewportHeight - dockDimensions.height - edgeMargin);
          
          if (topPositionPx > maxAllowedTop) {
            styles.top = `${maxAllowedTop}px`;
          }
        }
      } catch (error) {
        // Fail silently - use default positioning
      }
    }
    
    return styles;
  };

  /**
   * Calculate the Y offset for hiding the dock (horizontal mode)
   */
  const calculateHideOffset = () => {
    // Use dock's actual height plus margin, clamped for safety
    const hideDistance = Math.min(
      Math.max(dockDimensions.height + 32, 72), 
      280
    );
    
    // Determine if dock should be hidden
    if (!hasMainLoaderFinished || isUIOverlayOpen || !isComponentInitialized) {
      return screenConfiguration.orientation === 'horizontal' ? hideDistance : 0;
    }
    
    if (screenConfiguration.orientation === 'horizontal') {
      // In horizontal mode, slide down when hidden or auto-hidden
      if (!isDockVisible || isAutoHidden) {
        return hideDistance;
      }
      return 0;
    }
    
    return 0; // Vertical orientation doesn't slide
  };

  /**
   * Determine if indicator should be visible
   */
  const shouldShowIndicator = () => {
    if (!hasMainLoaderFinished || isUIOverlayOpen || !isComponentInitialized) {
      return false;
    }
    
    if (screenConfiguration.orientation === "horizontal") {
      // Show indicator when dock is auto-hidden OR not visible
      return isAutoHidden || !isDockVisible;
    }
    
    // For vertical orientation, show indicator when dock is not visible
    return !isDockVisible;
  };

  /**
   * Determine if dock should be visible and at what opacity
   */
  const shouldShowDock = () => {
    return isDockVisible && hasMainLoaderFinished && !isUIOverlayOpen && isComponentInitialized;
  };

  // Get computed styles
  const indicatorStyles = buildIndicatorStyles();
  const dockStyles = buildDockStyles();
  const isSafari = isSafariBrowser();

  /**
   * ========================================================================
   * RENDER
   * ========================================================================
   */
  return (
    <>
      {/* ==================== INDICATOR ==================== */}
      {/* Small bar that shows when dock is hidden, clicking reveals dock */}
      <motion.div
        className={`fixed z-40 ${
          isDarkMode ? 'bg-white/40' : 'bg-black/40'
        } rounded-full cursor-pointer select-none ${
          isSafari ? 'safari-indicator' : ''
        } ${
          !isComponentInitialized ? 'opacity-0' : ''
        }`}
        style={{
          ...indicatorStyles,
          // Safari-specific performance optimizations
          ...(isSafari && {
            WebkitTransform: indicatorStyles.transform,
            WebkitBackfaceVisibility: 'hidden',
            WebkitPerspective: '1000px',
            willChange: 'transform, opacity'
          })
        }}
        onClick={isMobileDevice ? handleIndicatorClick : undefined}
        onMouseEnter={!isMobileDevice ? handleIndicatorClick : undefined}
        onMouseLeave={!isMobileDevice ? (() => setIsDockHovered(false)) : undefined}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: shouldShowIndicator() ? 1 : 0,
          scale: shouldShowIndicator() ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileHover={{ 
          scale: isMobileDevice ? 1 : 1.2, 
          opacity: 0.8 
        }}
        whileTap={isMobileDevice ? { scale: 0.9 } : {}}
      />

      {/* ==================== MAIN DOCK ==================== */}
      <motion.div
        className={`fixed z-50 ${
          isDarkMode 
            ? 'bg-black/20 backdrop-blur-md border border-white/10' 
            : 'bg-white/20 backdrop-blur-md border border-black/10'
        } rounded-2xl shadow-2xl ${
          isSafari ? 'safari-dock' : ''
        } ${
          !isComponentInitialized ? 'opacity-0' : ''
        } ${
          screenConfiguration.orientation === "horizontal" 
            ? (isAutoHidden ? 'dock-auto-hide' : 'dock-auto-show') 
            : ''
        }`}
        style={isSafari ? {
          ...dockStyles,
          transformOrigin: screenConfiguration.orientation === 'horizontal' ? '50% 100%' : '100% 50%',
          // Safari-specific performance optimizations
          WebkitTransform: dockStyles.transform,
          WebkitBackfaceVisibility: 'hidden',
          WebkitPerspective: '1000px',
          willChange: 'transform, opacity',
          pointerEvents: screenConfiguration.orientation === 'horizontal' 
            ? (canUserInteract ? 'auto' : 'none') 
            : 'auto'
        } : {
          ...dockStyles,
          transformOrigin: screenConfiguration.orientation === 'horizontal' ? '50% 100%' : '100% 50%',
          pointerEvents: screenConfiguration.orientation === 'horizontal' 
            ? (canUserInteract ? 'auto' : 'none') 
            : 'auto'
        }}
        onMouseEnter={!isMobileDevice ? handleDockMouseEnter : undefined}
        onMouseLeave={!isMobileDevice ? (() => {
          handleDockMouseLeave();
          setHoveredItemIndex(null);
          // Reset mouse Y to large value to return all icons to base size
          mouseYPosition.set(999999);
        }) : undefined}
        onMouseMove={!isMobileDevice ? ((event) => {
          mouseYPosition.set(event.nativeEvent.clientY);
        }) : undefined}
        onTouchStart={isMobileDevice ? (() => setIsDockHovered(true)) : undefined}
        ref={dockElementRef}
        initial={{ 
          opacity: 0, 
          scale: 0.98, 
          y: screenConfiguration.orientation === 'horizontal' ? 80 : 0 
        }}
        animate={{
          opacity: shouldShowDock() ? 1 : 0,
          scale: shouldShowDock() ? 1 : 0.98,
          x: 0,
          y: calculateHideOffset()
        }}
        transition={screenConfiguration.orientation === 'horizontal' ? {
          // Spring animation for horizontal dock (smoother, more natural)
          type: 'spring',
          stiffness: 520,
          damping: 36,
          mass: 0.85,
          delay: (hasMainLoaderFinished && isComponentInitialized) ? 0.05 : 0
        } : {
          // Regular tween for vertical dock
          duration: isSafari ? 0.6 : 0.5,
          ease: 'easeOut',
          delay: (hasMainLoaderFinished && isComponentInitialized) ? 0.2 : 0
        }}
      >
        {/* Dock items container */}
        <div
          className={`flex ${
            screenConfiguration.orientation === "vertical" 
              ? "flex-col items-center" 
              : "flex-row items-center justify-center"
          }`}
          style={{
            gap: `${screenConfiguration.spacing}px`,
            width: screenConfiguration.orientation === "horizontal" ? "auto" : undefined
          }}
        >
          {dockItems.map((item, index) => (
            <DockItem
              key={item.id}
              item={item}
              index={index}
              mouseY={mouseYPosition}
              onClick={() => handleDockItemClick(item)}
              hoveredIndex={hoveredItemIndex}
              setHoveredIndex={setHoveredItemIndex}
              isDarkMode={isDarkMode}
              screenConfig={screenConfiguration}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

/**
 * ============================================================================
 * DOCK ITEM COMPONENT
 * ============================================================================
 * Individual icon button in the dock with hover magnification effect
 */

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
  const iconElementRef = useRef(null);
  const [isItemHovered, setIsItemHovered] = useState(false);
  const [shouldShowTooltip, setShouldShowTooltip] = useState(false);
  
  /**
   * ========================================================================
   * EFFECT: Debounced tooltip visibility with cleanup
   * ========================================================================
   * Shows tooltip after a brief delay when hovering, hides immediately when not
   */
  useEffect(() => {
    let tooltipDelayTimer;
    
    const shouldShow = 
      hoveredIndex === index && 
      !screenConfig.isMobile && 
      isItemHovered;
    
    if (shouldShow) {
      tooltipDelayTimer = setTimeout(() => {
        setShouldShowTooltip(true);
      }, 200); // 200ms delay before showing tooltip
    } else {
      setShouldShowTooltip(false);
      if (tooltipDelayTimer) {
        clearTimeout(tooltipDelayTimer);
      }
    }
    
    return () => {
      if (tooltipDelayTimer) {
        clearTimeout(tooltipDelayTimer);
      }
    };
  }, [hoveredIndex, index, screenConfig.isMobile, isItemHovered]);
  
  /**
   * ========================================================================
   * MAGNIFICATION EFFECT
   * ========================================================================
   * Calculate distance from mouse cursor to icon center, then transform
   * that distance into a size multiplier for the magnification effect
   */
  
  // Calculate distance from mouse Y position to icon center
  const distanceFromMouse = useTransform(mouseY, (mouseYValue) => {
    const bounds = iconElementRef.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    
    // If not hovered or mouse is reset (large value), return large distance
    if (!isItemHovered || mouseYValue > 99999) {
      return 1000;
    }
    
    // Calculate distance from mouse to icon center
    const iconCenterY = bounds.y + bounds.height / 2;
    return mouseYValue - iconCenterY;
  });
  
  // Transform distance into size (closer = larger)
  const baseIconSize = screenConfig.iconSize;
  const hoverSizeMultiplier = screenConfig.isMobile ? 1.15 : 1.6;
  
  // Map distance to size: icons closer to cursor are larger
  const calculatedIconSize = useTransform(
    distanceFromMouse,
    [-150, 0, 150], // Distance from cursor in pixels
    [baseIconSize * 0.8, baseIconSize * hoverSizeMultiplier, baseIconSize * 0.8] // Corresponding sizes
  );
  
  // Apply spring physics for smooth size transitions
  const animatedIconSize = useSpring(calculatedIconSize, {
    mass: screenConfig.isMobile ? 0.2 : 0.1,
    stiffness: screenConfig.isMobile ? 200 : 150,
    damping: screenConfig.isMobile ? 15 : 12
  });
  
  /**
   * ========================================================================
   * EFFECT: Reset size when not hovered
   * ========================================================================
   */
  useEffect(() => {
    if (!isItemHovered || hoveredIndex === null) {
      animatedIconSize.set(baseIconSize);
      setShouldShowTooltip(false);
    }
  }, [isItemHovered, hoveredIndex, baseIconSize, animatedIconSize]);
  
  const IconComponent = item.icon;
  
  /**
   * Calculate tooltip position based on dock orientation
   */
  const getTooltipPosition = () => {
    if (screenConfig.orientation === 'vertical') {
      // Vertical dock: tooltip to the left
      return {
        right: 'calc(100% + 12px)',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 'auto'
      };
    } else {
      // Horizontal dock: tooltip above
      return {
        bottom: 'calc(100% + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 'auto'
      };
    }
  };
  
  const tooltipPosition = getTooltipPosition();
  
  /**
   * ========================================================================
   * RENDER
   * ========================================================================
   */
  return (
    <motion.div
      ref={iconElementRef}
      className="relative flex flex-row items-center"
      onMouseEnter={() => {
        setHoveredIndex(index);
        setIsItemHovered(true);
      }}
      onMouseLeave={() => {
        setHoveredIndex(null);
        setIsItemHovered(false);
      }}
    >
      {/* ==================== TOOLTIP ==================== */}
      {shouldShowTooltip && (
        <motion.div
          key={`tooltip-${item.id}-${index}`}
          className={`absolute px-3 py-2 rounded-lg text-sm font-medium pointer-events-none whitespace-nowrap ${
            isDarkMode 
              ? 'bg-gray-900 text-white border border-gray-700' 
              : 'bg-white text-gray-900 border border-gray-200'
          } shadow-lg backdrop-blur-sm`}
          style={{
            ...tooltipPosition,
            fontSize: screenConfig.isMobile ? '12px' : '14px',
            maxWidth: screenConfig.isMobile ? '120px' : '180px',
            zIndex: 60,
            position: 'absolute'
          }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          layoutId={`tooltip-${item.id}`}
        >
          {item.label}
          
          {/* Tooltip arrow */}
          {screenConfig.orientation === 'vertical' ? (
            <div className={`absolute top-1/2 -right-1 transform -translate-y-1/2 border-4 border-transparent ${
              isDarkMode ? 'border-l-gray-900' : 'border-l-white'
            }`} />
          ) : (
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent ${
              isDarkMode ? 'border-t-gray-900' : 'border-t-white'
            }`} />
          )}
        </motion.div>
      )}

      {/* ==================== ICON BUTTON ==================== */}
      <motion.button
        onClick={onClick}
        className={`relative cursor-pointer overflow-hidden shadow-lg ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300'
        }`}
        style={{
          width: animatedIconSize,
          height: animatedIconSize,
          borderRadius: screenConfig.isMobile ? '12px' : '16px'
        }}
        whileTap={{ scale: screenConfig.isMobile ? 0.95 : 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Colored gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`} />

        {/* Icon */}
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
              (typeof animatedIconSize.get === 'function' 
                ? animatedIconSize.get() 
                : baseIconSize) * (screenConfig.isMobile ? 0.45 : 0.4)
            )}
          />
        </motion.div>

        {/* Hover highlight overlay */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Tap ripple effect */}
        <motion.div
          className="absolute inset-0 bg-white/30 rounded-2xl"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

   {/* Active indicator dot */}
      <motion.div
        className={`ml-2 w-1 h-1 rounded-full ${
          isDarkMode ? 'bg-white/60' : 'bg-black/60'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: hoveredIndex === index ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default MacOSDock;