import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    otp: { type: String },
    otpExpires: { type: Date }
}, { timestamps: true });

const userModel= mongoose.model("User", userSchema)
export default userModel