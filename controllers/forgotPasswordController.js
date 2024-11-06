import userModel from "../models/userModel.js";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// Route to handle "forgot password" request
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    // Check if email exists in the database
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    await user.save();

    // Send email with reset token
    const resetUrl = `https://your-app-url/resetPassword?token=${resetToken}`;  // Update this with your actual URL
    const transporter = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USERNAME,  // Use the sender email from environment variable
        to: email,
        subject: "Reset Password",
        html: `<h1>Reset Password</h1>
               <h2>Click on the link to reset your password</h2>
               <h3><a href="${resetUrl}">${resetUrl}</a></h3>`,
    };

    // Send email and handle success/error
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'A link to reset your password has been sent to your email.' });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: 'Error sending email. Please try again later.' });
    }
};

// Route to handle password reset request
const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    // Verify reset token
    const user = await userModel.findOne({ resetToken: token });
    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update user password and clear reset token
    user.password = password; // Here, you should ideally hash the password before saving
    user.resetToken = null; // Clear the reset token
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
};

export { forgotPassword, resetPassword };
