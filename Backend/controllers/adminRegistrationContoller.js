import { sendOtp } from "../config/sendOtp.js"
import User from "../models/userModel.js"
import { generateOtp } from "../utils/generateOtp.js"

import jwt from "jsonwebtoken"


export const login = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is Required"
            })
        }

        // Check if the user is exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found. Access denied." });
        }

        user.otp = generateOtp()
        user.otpExpires = Date.now() + 5 * 60 * 1000
        await user.save();
        
        // Store only the email in the session
        req.session.email = email;

        await sendOtp(email, user.otp)

        return res.status(200).json({ message: "OTP sent successfully to your email." });

    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// verify otp
export const verifyOTP = async (req, res) => {
    try {
        const {otp } = req.body;
        const email = req.session.email;

      console.log("your ",otp)
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        // Find user by email and check OTP validity
        const user = await User.findOne({
            email,
            otp,
            otpExpires: { $gt: Date.now() } // OTP must not be expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // OTP is valid — clear it so it can't be reused
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
      
        const token = jwt.sign({
            userId: user._id, email: user.email, role: user.role
        }, JWT_SECRET, { expiresIn: '1h' })


        // Destroy session after OTP verification
        req.session.destroy((err) => {
            if (err) console.error("Error destroying session:", err);
        });

        // Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            path:"/",
            secure: false, // only send cookie over HTTPS in production
            sameSite: "Lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.json({
            message: 'OTP verified successfully', token,
        });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Logout User
export const logout = (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0), // expire immediately
    //   sameSite: 'strict',
    //   secure: process.env.NODE_ENV === 'production',
    });

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get the user Profile
export const getUserProfile = async (req, res) => {
  try {
    // req.user is set by verifyTokenMiddleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    // Return user info
    res.status(200).json({
      message: "User profile fetched successfully",
      user: req.user
    });
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


