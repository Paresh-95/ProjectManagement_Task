const Task = require("../models/Task-model");

exports.getUserTaskAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ createdBy: userId });


    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "Done"
    ).length;
    const backlogTasks = tasks.filter(
      (task) => task.status === "Backlog"
    ).length;
    const inProgressTasks = tasks.filter(
      (task) => task.status === "In-Progress"
    ).length;
    const todoTasks = tasks.filter((task) => task.status === "To-Do").length;

    
    
    const lowPriorityTasks = tasks.filter(
      (task) => task.priority === "Low"
    ).length;
    const moderatePriorityTasks = tasks.filter(
      (task) => task.priority === "Moderate"
    ).length;
    const highPriorityTasks = tasks.filter(
      (task) => task.priority === "High"
    ).length;

    const analytics = {
      totalTasks,
      completedTasks,
      backlogTasks,
      inProgressTasks,
      todoTasks,
      lowPriorityTasks,
      moderatePriorityTasks,
      highPriorityTasks,
    };

    return res.status(200).json({
      success: true,
      message: "User Task analaytics reterived Succssfully",
      analytics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error Something went wrong while getting Task analytics",
    });
  }
};
