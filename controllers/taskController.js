import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

// Function to send email notifications
const sendMail = (email, subject, title, description) => {
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USERNAME, // Use environment variable for sender's email
        to: email,
        subject: subject,
        html: `<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// Route to add a new task
const addTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId); // Use findById for single document
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newTask = new taskModel({ title, description, completed: false, userId });
        await newTask.save(); // Awaiting save to handle the promise correctly

        sendMail(user.email, "Task Added", title, description); // Send email notification
        return res.status(200).json({ message: "Task added successfully" });
    } catch (error) {
        console.error("Error adding task:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Route to remove a task
const removeTask = async (req, res) => {
    const { id } = req.body;

    try {
        const task = await taskModel.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: error.message });
    }
};

// Route to get all tasks for the authenticated user
const getTask = async (req, res) => {
    try {
        const tasks = await taskModel.find({ userId: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: error.message });
    }
};

export { addTask, getTask, removeTask };
