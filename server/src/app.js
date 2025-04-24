import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { errorReponseHandler, SuccessResponse } from "./lib/index.js";

export const app = express();

const corsOption = {
    credentials: true,
    origin: process.env.CLIENT_URL,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.get("/", (_, res) => {
    res.status(200).json(new SuccessResponse(200, "tour travels server", null));
});

/* Routes */
// Auth route
import { authRouter } from "./routes/index.js";
app.on("/api/v1/auth", authRouter);

// error handling middleware
app.use(errorReponseHandler);
