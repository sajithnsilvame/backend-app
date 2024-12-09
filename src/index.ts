import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRoutes);

AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error("Error during Data Source initialization", error);
});
