import express from 'express';  // Importing Express
import { loginUser, registerUser, getUser } from '../controllers/userController.js';  // Importing controller functions
import requireAuth from '../middleware/requireAuth.js';  // Importing authentication middleware

const router = express.Router();  // Create a router instance

// Define the login route
router.post("/login", loginUser);  // No authentication required

// Define the registration route
router.post("/register", registerUser);  // No authentication required

// Define the route to get user information, protected by authentication
router.get("/getuser", requireAuth, getUser);  // Requires authentication

export default router;  // Export the router for use in the main application
