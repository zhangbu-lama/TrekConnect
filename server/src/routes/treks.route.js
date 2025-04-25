import express from "express";

import {
    addTrek,
    getAllTreks,
    getTrekById,
    deleteTrek,
    getTreksByPlaceId,
    updateTrek,
} from "../controllers/index.js";

export const treksRouter = express.Router();

treksRouter.get("/all", getAllTreks);
treksRouter.get("/:id", getTrekById);
treksRouter.get("/place/:id", getTreksByPlaceId);
treksRouter.post("/add", addTrek);
treksRouter.delete("/delete/:id", deleteTrek);
treksRouter.patch("/udpate/:id", updateTrek);
