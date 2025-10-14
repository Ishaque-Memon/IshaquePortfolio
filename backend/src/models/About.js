import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String },
    email: { type: String },
    phone: { type: String },
    location: {
      city: String,
      country: String,
    },
    profileImage: {
      url: String,
      publicId: String,
    },
    resumeFile: {
      url: String,
      publicId: String,
    },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      facebook: String,
      instagram: String,
      website: String,
    },
    statistics: {
      yearsOfExperience: Number,
      projectsCompleted: Number,
      happyClients: Number,
      certificatesEarned: Number,
      linkedinFollowers: Number,
      githubFollowers: Number,
      twitterFollowers: Number,
      facebookFollowers: Number,
      instagramFollowers: Number,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
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

export default mongoose.model("About", aboutSchema);



