import courseModel from "../models/courseModel.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find({
        manager: req.user?._id,
      })

      .select("name thumbnail")
      .populate({
        path: "categpry",
        select: "name -_id",
      })
      .populate({
        path: "students",
        select: "name",
      });

    return res.json({
      message: "Get Course Success",
      data: courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
