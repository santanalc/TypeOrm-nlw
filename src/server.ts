import express from "express";
import "./database/connection";
import routes from "./routes";
import path from "path";
import errorHandler from "./errors/handler";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3334);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
// MVC
// Model
// Views
// Controllers

// yarn typeorm migration:create -n name
