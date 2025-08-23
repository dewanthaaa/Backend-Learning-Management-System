import express from "express";
import {
  deleteCourse,
  getCategories,
  getCourses,
  getCourseById,
  postCourse,
  updateCourse,
  postContentCourse,
  updateContentCourse,
  deleteContentCourse,
  getDetailContent,
  getStudentByCourseId,
  postStudentToCourse,
} from "../controllers/courseController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import multer from "multer";
import { fileStorageCourses, fileFilter } from "../utils/multer.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { mutateContentSchema } from "../utils/schema.js";
import { addStudentCourseSchema } from "../../../fe-lms/src/utils/zodSchema.js";

const courseRoutes = express.Router();
const upload = multer({
  storage: fileStorageCourses,
  fileFilter,
});

courseRoutes.get("/courses", verifyToken, getCourses);
courseRoutes.get("/courses/:id", verifyToken, getCourseById);
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

courseRoutes.post(
  "/courses/contents",
  verifyToken,
  validateRequest(mutateContentSchema),
  postContentCourse
);
courseRoutes.put(
  "/courses/contents/:id",
  verifyToken,
  validateRequest(mutateContentSchema),
  updateContentCourse
);
courseRoutes.delete("/courses/contents/:id", verifyToken, deleteContentCourse);
courseRoutes.get("/courses/contents/:id", verifyToken, getDetailContent);

courseRoutes.get("/courses/students/:id", verifyToken, getStudentByCourseId);
courseRoutes.post(
  "/courses/students/:id",
  verifyToken,
  validateRequest(addStudentCourseSchema),
  postStudentToCourse
);

export default courseRoutes;
