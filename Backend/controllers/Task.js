const Task = require("../models/Task-model");
const User = require("../models/User-model");
const moment = require("moment");

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      checklist,
      assignedTo,
    } = req.body;

    if (!title || !priority) {
      return res.status(400).json({
        success: false,
        message: "Title and Priority are required",
      });
    }

    const validPriority = ["Low", "Moderate", "High"];
    if (!validPriority.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority value",
      });
    }

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      checklist: checklist || [],
      createdBy: req.user.id,
      assignedTo: assignedTo || [],
    });

    const savedTask = await task.save();

    const user = await User.findById(req.user.id);
    user.tasks.push(savedTask.id);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Task Created Successfully ",
      task: savedTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "Internal server Error Somethng went wrong while creating the task",
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { priority, dueDateRange } = req.query;
    const userId = req.user.id;
    
    let query = { createdBy: userId };

    if (priority) {
      query.priority = priority;
    }

    if (dueDateRange) {
      const today = moment().startOf("day");
      if (dueDateRange === "today") {
        query.dueDate = {
          $gte: today.toDate(),
          $lt: today.add(1, "day").toDate(),
        };
      } else if (dueDateRange === "this_week") {
        query.dueDate = {
          $gte: today.startOf("week").toDate(),
          $lt: today.endOf("week").toDate(),
        };
      } else if (dueDateRange === "this_month") {
        query.dueDate = {
          $gte: today.startOf("month").toDate(),
          $lt: today.endOf("month").toDate(),
        };
      }
    }

    // Fetch tasks and sort by priority
    const tasks = await Task.find(query).populate("assignedTo", "name email");
    const priorityOrder = { High: 1, Moderate: 2, Low: 3 };

    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully.",
      tasks,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "Internal server error: Something went wrong while retrieving the tasks.",
    });
  }
};

exports.getTasksById = async (req, res) => {
  try {
    const TaskId = req.params.id;
    const userId = req.user.id;

    const task = await Task.findOne({
      _id: TaskId,
      $or: [{ createdBy: userId }, { assignedTo: userId }],
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or your not authorized for the task",
      });
    }

    return res.status(404).json({
      success: true,
      message: "Task reterieved Successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error Something went wrong while geting task by id ",
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const TaskId = req.params.id;
    const userId = req.user.id;
    const updateData = req.body;

    const task = await Task.findOne({ _id: TaskId, createdBy: userId });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or your not authorized to visit task",
      });
    }

    if (updateData.title !== undefined) task.title = updateData.title;
    if (updateData.description !== undefined)
      task.description = updateData.description;
    if (updateData.priority !== undefined) task.priority = updateData.priority;
    if (updateData.status !== undefined) task.status = updateData.status;
    if (updateData.dueDate !== undefined) task.dueDate = updateData.dueDate;
    if (updateData.assignedTo !== undefined)
      task.assignedTo = updateData.assignedTo;

    const updatedTask = await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated Successfully",
      updatedTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error Something went wrong while updating the task",
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await Task.findOne({ _id: taskId, createdBy: userId });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or your not authorized to view the task",
      });
    }

    const deletedTask = await Task.deleteOne({ _id: taskId });

    return res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
      deletedTask,
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error Something went wrong while deleting the task",
    });
  }
};

exports.assignTaskToUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { assignedUser } = req.body;
 

    const task = await Task.findOne({ _id: taskId, createdBy: userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or your not authenticated to view the task",
      });
    }

    if (!assignedUser) {
      return res.status(400).json({
        success: false,
        message: "Assigning user email is Required",
      });
    }

    if (!task.assignedTo.includes(assignedUser)) {
      task.assignedTo.push(assignedUser);
    }

    const taskAssigned = await task.save();

    return res.status(200).json({
      success: true,
      message: "Task Assigned Successfully",
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error Something went wrong while assigning the task",
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const { status } = req.body;

    const ValidityStatus = ["Backlog", "To-Do", "In-Progress", "Done"];

    const task = await Task.findOne({ _id: taskId, createdBy: userId });
    if (!task) {
      return res
        .status(404)
        .json({
          message:
            "Task not found or you're not authorized to update this task",
        });
    }

    if (!ValidityStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status Provided ",
      });
    }

    task.status = status;

    const updatedTaskStatus = await task.save();

    return res.status(200).json({
      success: true,
      message: "Task Status updated Successfully",
      updatedTaskStatus
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error Something went wrong while udpating the task status ",
    });
  }
};

exports.updateChecklistItem = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const itemId = req.params.itemId;
    const userId = req.user.id;
    const {item, completed } = req.body;

    const task = await Task.findOne({ _id: taskId, createdBy: userId });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or your not authorized to view the task",
      });
    }

    const checkListItem = task.checklist.id(itemId);
    if (!checkListItem) {
      return res.status(404).json({
        success: false,
        message: "Checklist item not found",
      });
    }

    checkListItem.item = item;
    checkListItem.completed = completed;

    const updatedChecklistItem = await task.save();
    
    return res.status(200).json({
      success: true,
      message: "CheckList item updated Successfully",
     checkListItem
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error Something went wrong while updating the checklist item ",
    });
  }
};

exports.toggleShareTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await Task.findOne({ _id: taskId, createdBy: userId });
    if (!task) {
      return res
        .status(404)
        .json({
          message:
            "Task not found or you're not authorized to update this task",
        });
    }


    task.isShared = !task.isShared;

    await task.save();

    return res.status(200).json({
        success:true,
        message:"share task status updated Successfully ",
        task
    })



  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error Something went wrong while toogling share task  ",
    });
  }
};
