import express from "express";
import {
    addPlace,
    getAllPlaces,
    getPlaceById,
    deletePlace,
    updatePlace,
} from "../controllers/index.js";

export const placesRouter = express.Router();

placesRouter.get("/all", getAllPlaces);
placesRouter.get("/:id", getPlaceById);
placesRouter.post("/add", addPlace);
placesRouter.patch("/update/:id", updatePlace);
placesRouter.delete("/delete/:id", deletePlace);
