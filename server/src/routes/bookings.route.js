import express from "express";
import {
    createBooking,
    getBookingById,
    getAllBookings,
} from "../controllers/index.js";

export const bookingsRouter = express.Router();

bookingsRouter.post("/create", createBooking);
bookingsRouter.get("/all", getAllBookings);
bookingsRouter.get("/:id", getBookingById);
