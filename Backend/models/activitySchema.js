import mongoose from 'mongoose';
import { formatDistanceToNow } from 'date-fns'; // Optional: for frontend formatting

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['blog', 'project', 'user', 'settings'], // Match frontend types
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who performed the action
    required: true,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;