import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
