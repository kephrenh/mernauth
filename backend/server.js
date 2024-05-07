import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import rootRoutes from "./routes/root.routes.js";
import userRoutes from "./routes/user.routes.js";
const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.use("/", rootRoutes);
}

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
  });
});
