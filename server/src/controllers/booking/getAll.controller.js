import { asyncHandler,SuccessResponse } from "../../lib/index.js";
import { Booking } from "../../models/index.js";

export const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new SuccessResponse(
                200,
                "All Bookings retrieved successfully",
                bookings,
            ),
        );
});
