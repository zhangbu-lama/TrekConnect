import {
    asyncHandler,
    SuccessResponse,
    ErrorResponse,
} from "../../lib/index.js";

export const adminLogin = asyncHandler(async (req, res) => {
    const email = (req.body?.email ?? "").trim();
    const password = req.body?.password;

    if (!email || !password) {
        return new ErrorResponse("Email and password are required", 400);
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
        return new ErrorResponse(401, 6001, "Invalid admin credentials");
    }

    return res.status(200).json(
        new SuccessResponse(200,"Admin Login successful", {
            token: process.env.ADMIN_TOKEN,
        }),
    );
});
