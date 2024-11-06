import express from "express"; // Importing Express
import mongoose from "mongoose"; // Importing Mongoose
import cors from "cors"; // Importing CORS middleware
import dotenv from "dotenv"; // Importing dotenv for environment variables

import userRouter from "./routes/userRoute.js"; // Importing user routes
import taskRouter from "./routes/taskRoute.js"; // Importing task routes
import forgotPasswordRouter from "./routes/forgotPassword.js"; // Importing forgot password routes

// App Configuration
dotenv.config(); // Load environment variables from .env file
const app = express(); // Create an Express application
const port = process.env.PORT || 8001; // Set port

// Mongoose Configuration
mongoose.set('strictQuery', true); // Mongoose setting

// Middleware Configuration
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Use the new unified topology layer
})
.then(() => console.log("DB Connected")) // Log success
.catch(err => console.error("DB Connection Error:", err)); // Log error if it occurs

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

// Start the Server
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`); // Log the listening port
});