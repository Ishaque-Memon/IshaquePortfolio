import mongoose from "mongoose";

const expertiseSchema = new mongoose.Schema({
  icon: { type: String },        // e.g. "FiCode"
  title: { type: String },
  description: { type: String }
}, { _id: false });

const imageSchema = new mongoose.Schema({
  url: { type: String },
  publicId: { type: String }
}, { _id: false });

const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String },
  email: { type: String },
  phone: { type: String },
  location: {
    city: String,
    country: String,
  },
  profileImage: imageSchema,
  aboutImage: imageSchema,                // <-- ADDED: image used in AboutSection
  resumeFile: imageSchema,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String,
    website: String,
  },
  expertiseAreas: {                       // <-- ADDED: array of expertise tiles
    type: [expertiseSchema],
    default: []
  },
  statistics: {                           // keep it explicit and flexible
    yearsOfExperience: { type: Number, default: 0 },
    projectsCompleted: { type: Number, default: 0 },
    happyClients: { type: Number, default: 0 },
    certificatesEarned: { type: Number, default: 0 },
    linkedinFollowers: { type: Number, default: 0 },
    githubFollowers: { type: Number, default: 0 },
    twitterFollowers: { type: Number, default: 0 },
    facebookFollowers: { type: Number, default: 0 },
    instagramFollowers: { type: Number, default: 0 }
    // stackExpertise: { type: [String], default: [] } // optional array of stack tags
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

aboutSchema.pre('save', async function(next) {
  if (this.isActive) {
    await mongoose.model('About').updateMany(
      { _id: { $ne: this._id } },
      { isActive: false }
    );
  }
  next();
});

export default mongoose.model("About", aboutSchema);
