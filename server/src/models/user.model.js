import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email_address: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        refresh_token: {
            type: String,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

export const User = mongoose.model("User", userSchema);
