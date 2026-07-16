import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    avatarUrl: {
        type: String,
    },

    avatarId: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: 500,
    },
    phone: {
        type: String,
        sparse: true,// Allows null values and unique constraint
    },
},
    {
        timestamps: true,
    },

);
const User = mongoose.model("User", userSchema);
export default User;