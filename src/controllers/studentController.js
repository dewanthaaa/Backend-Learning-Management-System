import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import { mutateStudentSchema } from "../utils/schema.js";
import fs from "fs";

export const getStudent = async (req, res) => {
  try {
    const student = await userModel.find({
      role: "student",
      manager: req.user._id,
    });

    return res.json({
      message: "Get Student Success",
      data: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const postStudent = async (req, res) => {
  try {
    const body = req.body;

    console.log(req.file);

    const parse = mutateStudentSchema.safeParse(body);

    if (!parse.success) {
      const errors = parse.error.issues.map(
        (err) => `${err.path.join(".") || "(root)"}: ${err.message}`
      );

      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
      }

      return res.status(500).json({
        message: "Error Validation",
        data: null,
        errors: errors,
      });
    }

    const hashPassword = bcrypt.hashSync(body.password, 12);

    const student = new userModel({
      name: parse.data.name,
      email: parse.data.email,
      password: hashPassword,
      photo: req.file?.filename,
      manager: req.user?._id,
      role: "student",
    });

    await student.save();

    return res.json({ message: "Create Student Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params.id;
    const body = req.body;

    // if (!studentId) {
    //   return res.status(500).json({
    //     message: "Student Id not found",
    //   });
    // }

    const parse = mutateStudentSchema
      .partial({
        password: true,
      })
      .safeParse(body);

    if (!parse.success) {
      const errors = parse.error.issues.map(
        (err) => `${err.path.join(".") || "(root)"}: ${err.message}`
      );

      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
      }

      return res.status(500).json({
        message: "Error Validation",
        data: null,
        errors: errors,
      });
    }

    const student = await userModel.findById(id);
    const hashPassword = parse.data?.password
      ? bcrypt.hashSync(parse.data.password, 12)
      : student.password;

    await userModel.findByIdAndUpdate(id, {
      name: parse.data.name,
      email: parse.data.email,
      password: hashPassword,
      photo: req?.file ? req.file?.filename : student.photo,
    });

    return res.json({ message: "Update Student Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
