import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes";
dotenv.config();

const app = express();

app.use(cors()); // Enable CORS
app.use(helmet()); // Secure the app by setting various HTTP headers
app.use(express.json()); // Parse JSON bodies in requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies in requests

app.use(routes);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.DB_URI as string)
  .then(async () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Cannot connect to MongoDB");
    console.log(error);
  });
