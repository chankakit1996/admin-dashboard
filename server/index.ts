import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes";
import path from "path";
dotenv.config();

const app = express();

app.use(cors()); // Enable CORS
app.use(
  helmet({
    referrerPolicy: { policy: "same-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'"],
        frameSrc: ["'self'"],
      }
    }
  })
); // Secure the app by setting various HTTP headers
app.use(express.json()); // Parse JSON bodies in requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies in requests

app.use('/api', routes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./public")));
}

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
