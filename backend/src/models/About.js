import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      default: 'Full Stack Developer'
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    bio: {
      type: String,
      required: [true, 'Bio is required']
    },
    profileImage: {
      url: {
        type: String,
        required: false
      },
      publicId: String
    },
    resumeUrl: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    location: {
      city: String,
      country: String
    },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      facebook: String,
      instagram: String,
      website: String
    },
    statistics: {
      yearsOfExperience: {
        type: Number,
        default: 0
      },
      projectsCompleted: {
        type: Number,
        default: 0
      },
      happyClients: {
        type: Number,
        default: 0
      },
      certificatesEarned: {
        type: Number,
        default: 0
      }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Only one active about document allowed
aboutSchema.pre('save', async function(next) {
  if (this.isActive) {
    await mongoose.model('About').updateMany(
      { _id: { $ne: this._id } },
      { isActive: false }
    );
  }
  next();
});

const About = mongoose.model('About', aboutSchema);

export default About;
