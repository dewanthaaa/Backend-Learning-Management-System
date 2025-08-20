import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getStudent, postStudent } from "../controllers/studentController.js";
import { fileFilter, fileStorage } from "../utils/multer.js";

const studentRoutes = express.Router();

const upload = multer({
  storage: fileStorage("students"),
  fileFilter,
});

studentRoutes.get("/students", verifyToken, getStudent);
studentRoutes.post(
  "/students",
  verifyToken,
  upload.single("avatar"),
  postStudent
);

export default studentRoutes;
