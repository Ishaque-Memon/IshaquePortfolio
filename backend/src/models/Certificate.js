import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true
    },
    issuer: {
      type: String,
      required: [true, 'Certificate issuer is required'],
      trim: true
    },
    issueDate: {
      type: Date,
      required: [true, 'Issue date is required']
    },
    expiryDate: {
      type: Date
    },
    credentialId: {
      type: String,
      trim: true
    },
    credentialUrl: {
      type: String,
      trim: true
    },
    image: {
      url: {
        type: String,
        required: [true, 'Certificate image is required']
      },
      publicId: String
    },
    skills: [{
      type: String,
      trim: true
    }],
    description: {
      type: String
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Index for sorting
certificateSchema.index({ issueDate: -1, order: 1 });

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
