import cloudinary from "../config/cloudinary.js";
import Activity from "../models/activitySchema.js";
import Blog from "../models/blogSchema.js"
// Get All the Blog
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};

// Get the Blog By  id 
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};

// Create a new Blog
export const createBlog = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { title, content, author, category, link } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content, and author are required' });
    }
    if (category && !['Technology', 'Lifestyle', 'Travel', 'Food', 'Other'].includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    let imageUrl = '';
    if (req.file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'portfolio_cms/blogs' },
          (error, result) => {
            if (error) reject(new Error('Failed to upload image to Cloudinary'));
            resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = await uploadPromise;
    }

    const blog = new Blog({
      title,
      content,
      author,
      category: category || 'Other',
      imageUrl,
      link,
      createdBy: req.user.id,
    });

    const savedBlog = await blog.save();

    // Log activity
    await Activity.create({
      type: 'blog',
      title: 'Blog Published',
      description: `New blog post "${title}" was published by ${author}`,
      userId: req.user.id,
    });

    res.status(201).json({
      data: savedBlog,
      message: 'Blog created successfully',
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating blog', error: error.message });
  }
};

// Update Blog 
export const updateBlog = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { title, content, author, category, link } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content, and author are required' });
    }
    if (category && !['Technology', 'Lifestyle', 'Travel', 'Food', 'Other'].includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    let imageUrl;
    if (req.file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'portfolio_cms/blogs' },
          (error, result) => {
            if (error) reject(new Error('Failed to upload image to Cloudinary'));
            resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = await uploadPromise;
    }

    const updateData = { title, content, author, category, link };
    if (imageUrl) updateData.imageUrl = imageUrl;

    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found or you do not have permission to update it' });
    }

    // Log activity
    await Activity.create({
      type: 'blog',
      title: 'Blog Updated',
      description: `Blog "${title}" was updated by ${author}`,
      userId: req.user.id,
    });

    res.status(200).json({
      data: blog,
      message: 'Blog updated successfully',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error: error.message });
    }
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
};

// Delete the Blog
export const deleteBlog = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const blog = await Blog.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found or you do not have permission to delete it' });
    }

    if (blog.imageUrl) {
      try {
        const publicId = blog.imageUrl.split('/').pop().split('.')[0];
        const cloudinaryPath = `portfolio_cms/blogs/${publicId}`;
        await cloudinary.uploader.destroy(cloudinaryPath);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError.message);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);

    // Log activity
    await Activity.create({
      type: 'blog',
      title: 'Blog Deleted',
      description: `Blog "${blog.title}" was deleted by ${req.user.id}`,
      userId: req.user.id,
    });
    res.status(200).json({ message: 'Blog and associated image deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};