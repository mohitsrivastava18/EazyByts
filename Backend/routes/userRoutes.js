import express from "express";
import { getUserProfile, login, logout, verifyOTP } from "../controllers/adminRegistrationContoller.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "../controllers/projectController.js";
import upload from "../middlewares/multerConfig.js";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogController.js";
import { deleteContact, getAllContacts, submitContact } from "../controllers/contactController.js";
import { getRecentActivities } from "../controllers/activityController.js";
const router=express.Router()

// --------------------AUTHENTICATION ROUTES----------------
// Public Route
router.post("/login",login)
router.post("/verify",verifyOTP)

// Private Route
router.post("/logout",verifyTokenMiddleware, logout)
router.get("/me", verifyTokenMiddleware, getUserProfile);

// -------------------- PROJECTS ROUTES------------------
// Public Route 
router.get("/projects",getAllProjects)
router.get("/projects/:id",getProjectById)

// Private Route
router.post("/projects",verifyTokenMiddleware,upload.single('image'),createProject)
router.put("/projects/:id",verifyTokenMiddleware,upload.single('image'),updateProject)
router.delete("/projects/:id",verifyTokenMiddleware,deleteProject)

// -------------------- BLOGS ROUTES ------------------
// Public Routes
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);

// Private Routes
router.post('/blogs', verifyTokenMiddleware, upload.single('image'), createBlog);
router.put('/blogs/:id', verifyTokenMiddleware, upload.single('image'), updateBlog);
router.delete('/blogs/:id', verifyTokenMiddleware, deleteBlog);

// -------------------- CONTACT ROUTES ------------------
// Public Route
router.post('/contact', submitContact);

// Private Routes
router.get('/contact', verifyTokenMiddleware, getAllContacts);
router.delete('/contact/:id', verifyTokenMiddleware, deleteContact);

// ---------------------- Activity--------------------------
router.get('/recent-activity', verifyTokenMiddleware, getRecentActivities);

export default router