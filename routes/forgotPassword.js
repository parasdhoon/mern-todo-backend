import express from "express";  // Import Express
import { forgotPassword, resetPassword } from "../controllers/forgotPasswordController.js";  // Import controller functions

const router = express.Router();  // Create a router instance

// Define the forgot password endpoint
router.post("/forgotPassword", forgotPassword);

// Define the reset password endpoint
router.post("/resetPassword", resetPassword);

// Export the router for use in the main application
export default router;
