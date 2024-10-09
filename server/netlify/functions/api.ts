import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "../../routes";
import path from "path";
import { exit } from "process";
import serverless from "serverless-http";
dotenv.config();

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies in requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies in requests

app.use('/api', routes);
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, "./public")));
// }

const PORT = process.env.PORT;

mongoose
  .connect(process.env.DB_URI as string)
  .then(async () => {
    console.log("Connected to MongoDB");
    // app.listen(PORT, () => {
    //   console.log(`Server is running on port ${PORT}`);
    // });
  })
  .catch((error) => {
    console.log("Cannot connect to MongoDB");
    console.log(error);
    exit()
  });

export const handler = serverless(app);

