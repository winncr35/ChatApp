import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protectedRoute = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Cannot find access token" });
        }
        // Verify the token

        const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // find user

        const user = await User.findById(decodedUser.userId).select("-hashedPassword");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Attach the user to the request object for further use

        req.user = user;
        next();

    } catch (error) {
        console.error('Error occurred while verifying jwt token:', error);
        return res.status(403).json({ message: "Invalid access token" });
    }
};