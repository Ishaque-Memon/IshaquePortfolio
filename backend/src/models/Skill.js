import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      unique: true
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'],
      default: 'Other'
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    icon: {
      type: String,
      trim: true
    },
    order: {
      type: Number,
      default: 0
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
skillSchema.index({ category: 1, order: 1 });

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
