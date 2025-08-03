// models/session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
    image_url: { type: String },
    video_url: { type: String },
    json_file_url: { type: String },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

export default mongoose.model('Session', sessionSchema);
