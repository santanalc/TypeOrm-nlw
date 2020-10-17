import { Router } from "express";
import "./database/connection";
import multer from "multer";
import OrphanageController from "./controllers/OrphanagesController";
import uploadConfig from "./config/uploads";

const routes = Router();

const upload = multer(uploadConfig);
routes.post("/orphanages", upload.array("images"), OrphanageController.create);
routes.get("/orphanages", OrphanageController.index);
routes.get("/orphanages/:id", OrphanageController.show);

export default routes;
