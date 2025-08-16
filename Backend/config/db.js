import mongoose from "mongoose";

export const connDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected successfully")
    } catch (error) {
        console.error(" MongoDB Connection Error:", error);
        process.exit(1);
    }
}
