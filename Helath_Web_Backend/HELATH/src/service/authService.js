import User from "../model/User.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const authService = {
    // Get Auth Data
    getAuthData: async (userId) => {
        try {
            // Step 1: Validate userId
            if (
                !userId ||
                typeof userId !== "string" ||
                !mongoose.Types.ObjectId.isValid(userId)
            ) {
                throw new Error("Invalid user ID");
            }

            // Step 2: Fetch user
            const user = await User.findOne({ _id: userId, is_active: true }).select("-latest_password -last_password");

            // Step 3: Handle not found
            if (!user) {
                throw new Error("User not found or inactive");
            }

            // Step 4: Return user
            return {
                success: true,
                message: "User data fetched successfully",
                data: user,
            };
        } catch (error) {
            console.error(`[ERROR]: Failed to fetch user auth data: ${error.message}`);
            throw new Error(error.message);
        }
    },

    // Login User
    loginUser: async (phoneNumber, countryCode, dialCode, password, pushId, deviceId) => {
        try {
            if (!phoneNumber || !countryCode || !dialCode || !password) {
                throw new Error("Missing required login fields");
            }

            // Step 1: Find the user
            const user = await User.findOne({
                phone_number: phoneNumber,
                country_code: countryCode,
                dial_code: dialCode,
                is_active: true
            });

            if (!user) {
                return { success: false, message: "User not found" };
            }

            // Step 2: Validate PIN
            const isMatch = await bcrypt.compare(pin, user.latest_password);

            if (!isMatch) {
                return { success: false, message: "Invalid PIN" };
            }

            // Step 3: Update device info
            user.push_id = pushId || user.push_id;
            user.device_id = deviceId || user.device_id;
            user.last_login_at = new Date();

            await user.save();

            // Step 4: Generate token
            const token = jwt.sign(
                { userId: user._id, role: user.role_id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            user.token = token;
            await user.save();

            // Step 5: Exclude sensitive data before returning
            const userObj = user.toObject();
            delete userObj.latest_password;
            delete userObj.last_password;

            return {
                success: true,
                message: "Login successful",
                data: userObj,
            };
        } catch (error) {
            console.error(`[ERROR]: Login failed: ${error.message}`);
            return { success: false, message: error.message };
        }
    },
};
