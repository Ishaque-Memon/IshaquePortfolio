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
    technologies: [{
      type: String,
      trim: true
    }],
    category: {
      type: String,
      enum: ['Web Development', 'Mobile App', 'Desktop App', 'AI/ML', 'Other'],
      default: 'Web Development'
    },
    image: {
      url: {
        type: String,
        required: [true, 'Project image is required']
      },
      publicId: String  // Cloudinary public ID for deletion
    },
    demoUrl: {
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
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed'
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
