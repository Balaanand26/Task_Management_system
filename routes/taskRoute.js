import express from "express";
import {
  getallTask,
  getTask,
  postTask,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";
import { verifyAccessToken } from "../middleware/index.js";
const router = express.Router();

router.get("/", verifyAccessToken, getallTask);
router.get("/:taskId", verifyAccessToken, getTask);
router.post("/", verifyAccessToken, postTask);
router.put("/:taskId", verifyAccessToken, updateTask);
router.delete("/:taskId", verifyAccessToken, deleteTask);

export default router;
