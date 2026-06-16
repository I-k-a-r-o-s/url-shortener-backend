import { Router } from "express";
import {
  createUrl,
  deleteUrl,
  getAllUrl,
  getUrl,
} from "../controlers/shortUrlControllers.js";

const shortUrlRouter = Router();

shortUrlRouter.post("/shorturl", createUrl);
shortUrlRouter.get("/shorturl", getAllUrl);
shortUrlRouter.get("/shorturl/:id", getUrl);
shortUrlRouter.delete("/shorturl/:id", deleteUrl);

export default shortUrlRouter;
