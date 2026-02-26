import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

const setCookieAndRespond = (res, user, extraFields = {}) => {
    const token = generateToken(user._id);
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 1 * 60 * 60 * 1000, // 1 hour
    });
    res.json({ _id: user._id, username: user.username, ...extraFields });
};

// @desc    Auth user & get token (username/password)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        setCookieAndRespond(res, user);
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
};

// @desc    Auth admin via Google ID token (single admin only)
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ message: "No credential provided" });
    }

    try {
        // Verify the Google ID token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload?.email;

        // Restrict to the single authorised admin email
        if (!email || email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
            return res.status(403).json({
                message: "Access denied. This Google account is not authorised as admin.",
            });
        }

        // Find or create an admin user record keyed by email
        let user = await User.findOne({ username: email });

        if (!user) {
            // Create a placeholder user for this Google-authenticated admin
            // Random long password since they'll never use password login
            const randomPass = Math.random().toString(36).slice(-16) + Math.random().toString(36).slice(-16);
            user = await User.create({ username: email, password: randomPass });
        }

        setCookieAndRespond(res, user, { email });
    } catch (err) {
        console.error("Google login error:", err);
        res.status(401).json({ message: "Invalid or expired Google credential" });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logout = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

export { login, googleLogin, logout, getMe };
