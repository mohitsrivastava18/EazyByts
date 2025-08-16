// D:\Protofolio_CMS\Backend\models\blogSchema.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
   
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  category: {
    type: String,
    enum: {
      values: ['Technology', 'Lifestyle', 'Travel', 'Food', 'Other'],
      message: 'Category must be Technology, Lifestyle, Travel, Food, or Other',
    },
    default: 'Other',
  },
  imageUrl: {
    type: String,
    required: [true, 'Image is required'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: [true, 'CreatedBy is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});



export default mongoose.model('Blog', blogSchema);