import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Database connected successfully`);
    console.log(`Host URL: http://localhost:${port}/api`);
  });
}).catch((error) => {
  console.error("Error during Data Source initialization", error);
});
