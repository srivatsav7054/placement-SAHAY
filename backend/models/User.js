const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  techStack:   [{ type: String }],
  link:        { type: String, default: '' },
}, { timestamps: true });

const AchievementSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  date:        { type: String, default: '' },
}, { timestamps: true });

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree:      { type: String, default: '' },
  field:       { type: String, default: '' },
  dates:       { type: String, default: '' },
  grade:       { type: String, default: '' },
}, { timestamps: true });

const CertificationSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  issuer:      { type: String, default: '' },
  date:        { type: String, default: '' },
  link:        { type: String, default: '' },
}, { timestamps: true });

const TodoSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate:   { type: String, default: null },
  createdAt: { type: Number, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  clerkId:      { type: String, required: true, unique: true, index: true },
  email:        { type: String, default: '' },
  name:         { type: String, default: '' },
  phone:        { type: String, default: '' },
  location:     { type: String, default: '' },
  profilePhoto: { type: String, default: '' },
  skills:       [{ type: String }],
  bio:          { type: String, default: '' },
  socialLinks: {
    github:   { type: String, default: '' },
    linkedin: { type: String, default: '' },
    portfolio:{ type: String, default: '' },
    leetcode: { type: String, default: '' },
    codechef: { type: String, default: '' },
  },
  projects:      [ProjectSchema],
  achievements:  [AchievementSchema],
  education:     [EducationSchema],
  certifications:[CertificationSchema],
  todos:         [TodoSchema],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
