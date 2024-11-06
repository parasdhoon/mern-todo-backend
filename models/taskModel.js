import mongoose from "mongoose";

// Define the schema for a task instance
const taskInstance = mongoose.Schema({
    title: { type: String, required: true },         // Title of the task
    description: { type: String, required: true },   // Description of the task
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to the User model
    completed: { type: Boolean, default: false }     // Task completion status; defaults to false
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create the model from the schema
const taskModel = mongoose.model("Task", taskInstance);

// Export the model for use in other files
export default taskModel;
