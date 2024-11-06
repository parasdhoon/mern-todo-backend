import express from "express";  // Importing Express
import { addTask, getTask, removeTask } from "../controllers/taskController.js";  // Importing task controller functions
import requireAuth from "../middleware/requireAuth.js";  // Importing authentication middleware

const router = express.Router();  // Create a router instance

// Define route for adding a task, protected by authentication
router.post("/addTask", requireAuth, addTask);

// Define route for getting tasks, protected by authentication
router.get("/getTask", requireAuth, getTask);

// Define route for removing a task, protected by authentication
router.get("/removeTask/:id", requireAuth, removeTask);  // Expecting an ID parameter for the task to remove

export default router;  // Export the router for use in the main application
