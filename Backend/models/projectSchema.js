import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Web App", "Mobile App", "Desktop App"],
    default: "Web App",
  },
  technologies: {
    type: [String], // e.g., ["React", "Node.js", "MongoDB"]
    required: true,
  },
  imageUrl: {
    type: String,
  },
  link: {
    type: String, // e.g., project demo or repo link
  },
  
},{timestamps:true});

const Project = mongoose.model("Project", projectSchema);

export default Project;
