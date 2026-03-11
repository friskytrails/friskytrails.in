import crypto from "crypto";
import User from "../models/user.model.js";
import { sendOTPEmail } from "../utils/sendEmail.js";
import { pushToSheet } from "../utils/pushToSheet.js";
import { sheetConfig } from "../config/sheetConfig.js";

/* -------------------- HELPERS -------------------- */

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // secure
};

const hashOTP = (otp) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes
const MAX_OTP_ATTEMPTS = 5;

/* -------------------- SEND OTP -------------------- */

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const lowerEmail = email.toLowerCase();

    // 🔍 Find user
    let user = await User.findOne({ email: lowerEmail });
    const isNewUser = !user;

    // 🆕 Create user + push to sheet ONLY ONCE
    if (isNewUser) {
      user = await User.create({ email: lowerEmail });

      // 📄 Sheet sync ONLY for new user
      try {
        const config = sheetConfig.User;
        await pushToSheet({
          sheetName: config.sheetName,
          columns: config.columns,
          document: user,
        });
      } catch (sheetErr) {
        // ❗ Sheet failure should NOT block OTP
        console.error("Sheet sync failed:", sheetErr);
      }
    }

    // ⛔ Block resend if OTP still valid
    if (user.otpExpiry && user.otpExpiry > Date.now()) {
      return res.status(429).json({
        success: true, // anti-enumeration
        message: "If the email exists, an OTP has been sent.",
      });
    }

    // 🔐 Generate OTP
    const otp = generateOTP();
    user.otp = hashOTP(otp);
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    user.otpAttempts = 0;

    await user.save();
    await sendOTPEmail(lowerEmail, otp);

    return res.status(200).json({
      success: true,
      message: "If the email exists, an OTP has been sent.",
    });

  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again.",
    });
  }
};


/* -------------------- VERIFY OTP -------------------- */

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const lowerEmail = email.toLowerCase();
    const user = await User.findOne({ email: lowerEmail });

    // Generic response (anti-enumeration)
    if (!user || !user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Expired OTP
    if (user.otpExpiry < Date.now()) {
      user.otp = null;
      user.otpExpiry = null;
      user.otpAttempts = 0;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Too many attempts
    if (user.otpAttempts >= MAX_OTP_ATTEMPTS) {
      return res.status(429).json({
        success: false,
        message: "Too many failed attempts. Please request a new OTP.",
      });
    }

    // Compare hashed OTP
    const hashedOtp = hashOTP(otp);
    if (hashedOtp !== user.otp) {
      user.otpAttempts += 1;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ✅ Success
    user.isVerified = true;
    user.verifiedAt = new Date();
    user.otp = null;
    user.otpExpiry = null;
    user.otpAttempts = 0;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      data: {
        email: lowerEmail,
        verified: true,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP. Please try again.",
    });
  }
};
