import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Project description is required']
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 200
    },
    technologies: [{
      type: String,
      trim: true
    }],
    category: {
      type: String,
      enum: ['web', 'mobile', 'desktop', 'fullstack', 'frontend', 'backend', 'ai-ml', 'other'],
      default: 'web'
    },
    images: [{
      url: {
        type: String,
        required: true
      },
      publicId: {
        type: String,
        required: true
      }
    }],
    thumbnailImage: {
      url: String,
      publicId: String
    },
    liveUrl: {
      type: String,
      trim: true
    },
    githubUrl: {
      type: String,
      trim: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'archived'],
      default: 'completed'
    },
    startDate: {
      type: String
    },
    endDate: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
projectSchema.index({ featured: -1, order: 1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
