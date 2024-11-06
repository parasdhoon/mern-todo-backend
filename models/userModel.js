import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },  // User's name
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },  // Unique email address
    password: { type: String, required: true },  // Hashed password
    resetToken: { type: String, required: false },  // Optional field for password reset
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create the user model from the schema
const userModel = mongoose.model("User", userSchema);

// Export the model for use in other files
export default userModel;
