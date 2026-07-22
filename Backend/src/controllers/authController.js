import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days in seconds


export const signUp = async (req, res) => {
    try {

        const { username, password, email, firstName, lastName } = req.body;
        if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" });

        }
        // Check if the username or email already exists in the database
        const duplicateUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (duplicateUser) {
            if (duplicateUser.username === username) {
                return res.status(400).json({ message: "Username already exists" });
            }
            if (duplicateUser.email === email) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // salt = 10

        // Create a new user
        await User.create({
            username,
            hashedPassword,
            email,
            displayName: `${firstName} ${lastName}`,
        });

        return res.sendStatus(204);
    }
    catch (error) {
        console.error('Error occurred while signing up:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// Todo : Move logic to Service Folder

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        // Find the user by username
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Create access token
        const accessToken = jwt.sign({ userId: user._id },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL });

        // Create refresh token
        const refreshToken = crypto.randomBytes(64).toString("hex");

        // Create session to save refresh token in the database
        await Session.create({
            userId: user._id,
            refreshToken: refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none", // backend, frontend are on different domains
            maxAge: REFRESH_TOKEN_TTL
        });
        return res.status(200).json({
            message: `User ${user.displayName} signed in successfully!`,
            accessToken: accessToken,

        });



    }
    catch (error) {
        console.error('Error occurred while signing in:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const signOut = async (req, res) => {
    try {
        //get refresh token from cookie
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
            await Session.deleteOne({ refreshToken: refreshToken });

            // delete refresh token from session


            // delete cookie
            res.clearCookie("refreshToken");
        }
        return res.status(200).json({ message: "Signed out successfully" });
    }
    catch (error) {
        console.error('Error occurred while signing out:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const refreshToken = async (req, res) => {
    try {
        // Get refreshtoken in DB
        const token = req.cookies?.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "Token does not exists" })
        }
        //Compare Rf in DB
        const session = await Session.findOne({ refreshToken: token })

        if (!session) {
            return res.status(401).json({ message: "Token is invalid or expired" })
        }
        // Check if expired
        if (session.expiresAt < new Date()) {
            return res.status(403).json({ message: "Token is expired" })
        }



        // Create new accesstoken
        const accessToken = jwt.sign({
            userId: session.userId,
        },
            process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_TTL
        }
        )

        //return
        return res.status(200).json({ accessToken });
    }
    catch (error) {
        console.error("Error refreshToken", error)
        return res.status(500).json({ message: 'System Error' })
    }
}