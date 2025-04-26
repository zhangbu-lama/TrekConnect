import { asyncHandler, SuccessResponse } from "../../lib/index.js";
import { Categorie } from "../../models/category.model.js";
export const getAllCategories = asyncHandler(async (_, res) => {
    const categories = await Categorie.find();

    return res.status(200).json(
        new SuccessResponse(200, "desired action done succesfully", {
            categories: categories,
        }),
    );
});
