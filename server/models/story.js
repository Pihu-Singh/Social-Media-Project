import mongoose from 'mongoose';
import Post from './Post';

const StorySchema = new mongoose.Schema(
  {
    user: { type: String, ref: 'User', requried: true },
    content: { type: String },
    media_url: { type: String },
    media_type: { type: String, enum: ['text', 'image', 'video'] },
    views_count: [{ type: String, ref: 'User' }],
    background_color: { type: String },
  },
  { timestamps: true, minimize: false },
);

const Story = mongoose.model('Story', StorySchema);

export default Story;
