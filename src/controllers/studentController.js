import userModel from "../models/userModel.js";

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
