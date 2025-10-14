// utils/socketEmitter.js

/**
 * Global Socket.io Event Emitter
 * -----------------------------------
 * This helper lets you emit events from any controller
 * without repeating socket code everywhere.
 *
 * Usage:
 *   import { emitSocketEvent } from '../utils/socketEmitter.js';
 *   emitSocketEvent(req, 'aboutUpdated', data);
 */

export const emitSocketEvent = (req, eventName, data) => {
  try {
    const io = req.app.get("io");
    if (!io) {
      console.warn("⚠️ Socket.io instance not found in app.");
      return;
    }

    // Emit event
    io.emit(eventName, data);

    // Optional: Log event emission
    console.log(`📡 Socket Event Emitted → ${eventName}`);
  } catch (error) {
    console.error(`❌ Socket Emit Error (${eventName}):`, error.message);
  }
};
