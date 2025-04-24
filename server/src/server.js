import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import connectDb from "./db/connectDb.js";

const port = process.env.PORT || 6969;

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on PORT: ${port}`);
        });
    })
    .catch((err) => {
        console.log("Server failed to run!", err);
    });
