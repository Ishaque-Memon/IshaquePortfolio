import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: ['frontend', 'backend','database', 'framework', 'tools', 'cloud', 'other'],
      default: 'other'
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
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
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
skillSchema.index({ name: 1, category: 1 }, { unique: true });

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
