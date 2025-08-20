import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getStudent } from "../controllers/studentController.js";

const studentRoutes = express.Router();

studentRoutes.get("/students", verifyToken, getStudent);

export default studentRoutes;
