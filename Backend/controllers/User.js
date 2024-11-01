const User = require("../models/User-model");
const bcryptjs = require("bcryptjs");

exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "TaskId Not found to fetch user",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for the id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Data Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "Internal server error,Something went wrong while getting user Details",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, oldPassword, newPassword } = req.body;
    
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User Id not found",
      });
    }

    const user = await User.findById(userId);
    
    
    if (await bcryptjs.compare(oldPassword, user.password)) {

      let hashedPassword;
      try {
        hashedPassword = await bcryptjs.hash(newPassword, 10);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Error while Hashing Password",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { name, email, password: hashedPassword }
      );

      return res.status(200).json({
        success: true,
        message: "User Details Updated Successfully",
        updatedUser,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Enter Correct Password to Update",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error,Something went Wrong while updating the user",
      error: error.message,
    });
  }
};
