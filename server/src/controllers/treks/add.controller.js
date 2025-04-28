import { isValidObjectId } from "mongoose";
import { asyncHandler, SuccessResponse } from "../../lib/index.js";
import { Trek } from "../../models/index.js";

export const addTrek = asyncHandler(async (req, res) => {
    const name = (req.body?.name ?? "").tirm();

    const difficulty = (req.body?.difficulty ?? "").tirm();
    const place = (req.body?.place ?? "").tirm();
    const duration = (req.body?.duration ?? "").tirm();
    const overview = (req.body?.overview ?? "").tirm();
    const max_elevation = (req.body?.max_elevation ?? "").tirm();
    const best_season = (req.body?.best_season ?? "").tirm();
    const contact_number = (req.body?.contact_number ?? "").tirm();
    const contact_email = (req.body?.contact_email ?? "").tirm();
    const rating = (req.body?.rating ?? "").tirm();
    const reviews = (req.body?.reviews ?? "").tirm();
    const images = (req.body?.images ?? "").tirm();

    if (!name) {
        throw new ErrorResponse(400, 6000, "name is required");
    }
    if (!difficulty) {
        throw new ErrorResponse(400, 6001, "difficulty is required");
    }
    if (!place) {
        throw new ErrorResponse(400, 6002, "place is required");
    }

    if (!isValidObjectId(place)) {
        throw new ErrorResponse(400, 6002, "place is not valid");
    }

    if (!duration) {
        throw new ErrorResponse(400, 6003, "duration is required");
    }
    if (!overview) {
        throw new ErrorResponse(400, 6004, "overview is required");
    }
    if (!max_elevation) {
        throw new ErrorResponse(400, 6005, "max_elevation is required");
    }
    if (!best_season) {
        throw new ErrorResponse(400, 6006, "best_season is required");
    }
    if (!contact_number) {
        throw new ErrorResponse(400, 6007, "contact_number is required");
    }
    if (!contact_email) {
        throw new ErrorResponse(400, 6008, "contact_email is required");
    }
    if (!rating) {
        throw new ErrorResponse(400, 6009, "rating is required");
    }
    if (!reviews) {
        throw new ErrorResponse(400, 6010, "reviews is required");
    }
    if (images?.length < 1) {
        throw new ErrorResponse(400, 6011, "atleast oen image is requried");
    }

    const trek = new Trek({
        name,
        difficulty,
        place,
        duration,
        overview,
        max_elevation,
        best_season,
        contact_number,
        contact_email,
        rating,
        reviews,
        images: images.map((image) => image.filename),
    });

    return res
        .status(201)
        .json(new SuccessResponse(201, "trek created succesfully", trek));
});
