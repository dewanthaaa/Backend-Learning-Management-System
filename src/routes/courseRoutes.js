import express from "express";
import {
  deleteCourse,
  getCategories,
  getCourses,
  postCourse,
  updateCourse,
} from "../controllers/courseController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import multer from "multer";
import { fileStorageCourses, fileFilter } from "../utils/multer.js";

const courseRoutes = express.Router();
const upload = multer({
  storage: fileStorageCourses,
  fileFilter,
});

courseRoutes.get("/courses", verifyToken, getCourses);
courseRoutes.get("/categories", verifyToken, getCategories);
courseRoutes.post(
  "/courses",
  verifyToken,
  upload.single("thumbnail"),
  postCourse
);
courseRoutes.put(
  "/courses/:id",
  verifyToken,
  upload.single("thumbnail"),
  updateCourse
);
courseRoutes.delete("/courses/:id", verifyToken, deleteCourse);

export default courseRoutes;
