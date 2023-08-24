import { Router } from "express";
import {
  createProjectController,
  dashboardController,
  deleteProjectController,
  notesProjectController,
  onePostProjectController,
  oneProjectController,
  viewProjectController,
} from "../controllers/projectController.js";

const router = Router();

router
  .get("/", dashboardController)
  .get("/view-project", viewProjectController)
  .get("/view-project/:id", oneProjectController)
  .post("/view-project/:id", onePostProjectController)
  .post("/create-project", createProjectController)
  .delete("/:id", deleteProjectController)
  .patch("/:id/:videoIndex", notesProjectController);

export default router;
