import Project from "../models/projectSchema.js";
import cloudinary from "../config/cloudinary.js";
import Activity from "../models/activitySchema.js";

// GET /api/projects - Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find(); // Fetch all projects from the database
        return res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({message: "Error fetching projects", error: error.message});
    }
};

// GET /api/projects/:id - Get project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({message: "Project not found"});
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({message: "Error fetching project", error: error.message});
    }
};

// POST /api/projects - Add a new project
export const createProject = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({message: "Authentication required"});
        }

        // Validate request body
        const {title, description, category, technologies, link} = req.body;
        if (!title || !description || !technologies || technologies.length === 0) {
            return res.status(400).json({message: "Title, description, and technologies are required"});
        }
        if (category && !["Web App", "Mobile App", "Desktop App"].includes(category)) {
            return res.status(400).json({message: "Invalid category. Must be Web App, Mobile App, or Desktop App"});
        }

        // Handle image upload to Cloudinary
        let imageUrl = "";
        if (req.file) {
            // Wrap upload_stream in a Promise
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {folder: "portfolio_cms/projects"},
                    (error, result) => {
                        if (error) {
                            return reject(new Error("Failed to upload image to Cloudinary"));
                        }
                        resolve(result.secure_url);
                    }
                );
                stream.end(req.file.buffer);
            });

            imageUrl = await uploadPromise;
        }

        // Create new project
        const project = new Project({
            title,
            description,
            category: category || "Web App", // Use default if not provided
            technologies,
            imageUrl,
            link,
            createdBy: req.user.userId,
        });

        const savedProject = await project.save();

        console.log("userId",req.user)
        // Log activity
        await Activity.create({
            type: "project",
            title: "Project Created",
            description: `New project "${title}" was created`,
            userId: req.user.userId
        });

        res.status(201).json({
            data: savedProject,
            message: "Project created successfully",
        });
    } catch (error) {
        res.status(400).json({message: "Error creating project", error: error.message});
    }
};

// PUT /api/projects/:id - Update project details

export const updateProject = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({message: "Authentication required"});
        }

        // Validate request body
        const {title, description, category, technologies, link} = req.body;
        if (!title || !description || !technologies || technologies.length === 0) {
            return res.status(400).json({message: "Title, description, and technologies are required"});
        }
        if (category && !["Web App", "Mobile App", "Desktop App"].includes(category)) {
            return res.status(400).json({message: "Invalid category. Must be Web App, Mobile App, or Desktop App"});
        }

        // Handle image upload to Cloudinary
        let imageUrl;
        if (req.file) {
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {folder: "portfolio_cms/projects"},
                    (error, result) => {
                        if (error) {
                            return reject(new Error("Failed to upload image to Cloudinary"));
                        }
                        resolve(result.secure_url);
                    }
                );
                stream.end(req.file.buffer);
            });
            imageUrl = await uploadPromise;
        }

        // Find and update the project
        const updateData = {title, description, category, technologies, link};
        if (imageUrl) updateData.imageUrl = imageUrl;

        const project = await Project.findOneAndUpdate({_id: req.params.id, createdBy: req.user.id}, updateData, {
            new: true,
            runValidators: true,
        });

        // Check if project exists and user has permission
        if (!project) {
            return res.status(404).json({
                message: "Project not found or you do not have permission to update it",
            });
        }

        // Log activity
        await Activity.create({
            type: "project",
            title: "Project Updated",
            description: `Project "${title}" was updated`,
            userId: req.user.userId,
        });

        res.status(200).json({
            data: project,
            message: "Project updated successfully",
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({message: "Invalid project ID"});
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({message: "Validation failed", error: error.message});
        }
        res.status(500).json({message: "Error updating project", error: error.message});
    }
};

// DELETE /api/projects/:id - Delete a project
export const deleteProject = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({message: "Authentication required"});
        }

        // Find the project to get imageUrl and verify ownership
        const project = await Project.findOne({_id: req.params.id, createdBy: req.user.id});
        if (!project) {
            return res.status(404).json({message: "Project not found or you do not have permission to delete it"});
        }

        // Delete image from Cloudinary if it exists
        if (project.imageUrl) {
            try {
                // Extract public_id from imageUrl
                const publicId = project.imageUrl.split("/").pop().split(".")[0];
                const cloudinaryPath = `portfolio_cms/projects/${publicId}`;
                await cloudinary.uploader.destroy(cloudinaryPath);
            } catch (cloudinaryError) {
                console.error("Cloudinary deletion error:", cloudinaryError.message);
                // Optionally, decide whether to proceed or fail if Cloudinary deletion fails
                // Here, we proceed to delete the project even if Cloudinary fails
            }
        }

        // Delete the project from MongoDB
        await Project.findByIdAndDelete(req.params.id);

        // Log activity
        await Activity.create({
            type: "project",
            title: "Project Deleted",
            description: `Project "${project.title}" was deleted`,
            userId: req.user.userId,
        });

        res.status(200).json({message: "Project and associated image deleted successfully"});
    } catch (error) {
        console.error("Delete project error:", error);
        if (error.name === "CastError") {
            return res.status(400).json({message: "Invalid project ID"});
        }
        res.status(500).json({message: "Error deleting project", error: error.message});
    }
};
