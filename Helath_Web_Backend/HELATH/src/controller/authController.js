import { authService } from "../service/authService.js";
import { successResponse, errorResponse } from "../util/responseUtil.js";
import { validationResult } from "express-validator";

export const authController = {
    getAuthData: async (req, res) => {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: "User ID is required",
                });
            }

            const response = await authService.getAuthData(userId);

            if (response.success) {
                res.setHeader("Authorization", `Bearer ${response.data.token}`);
                return successResponse(res, response.message, response.data, 200);
            } else {
                return errorResponse(res, response.message, 400);
            }

            return res.status(200).json(response);
        } catch (error) {
            return errorResponse(res, error.message, 500);
        }
    },

    loginUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, "Validation error", 400);
        }

        const { phoneNumber, countryCode, dialCode, pin, pushId, deviceId } =
            req.body;
        try {
            const response = await authService.loginUser(
                phoneNumber,
                countryCode,
                dialCode,
                pin,
                pushId,
                deviceId
            );

            if (response.success) {
                res.setHeader("Authorization", `Bearer ${response.data.token}`);
                return successResponse(res, response.message, response.data, 200);
            } else {
                return errorResponse(res, response.message, 400);
            }
        } catch (error) {
            return errorResponse(res, error.message, 500);
        }
    },
};
