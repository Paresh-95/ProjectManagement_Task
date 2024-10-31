const Board = require("../models/Board-model");
const User = require("../models/User-model");
const Task = require("../models/Task-model");

exports.createBoard = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const owner = req.user.id;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Title is required to create a board",
      });
    }

    const board = new Board({
      name,
      description: description || "",
      owner,
      members: members || [],
    });

    const savedBoard = await board.save();

    const user = await User.findById(owner);
    user.boards.push(savedBoard._id);

    await user.save();

    return res.status(201).json({
      succcess: true,
      message: "Board Created Successfully",
      board: savedBoard,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating the board",
    });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const userId = req.user.id;

    const boards = await Board.find({
      $or: [{ owner: userId }, { member: userId }],
    })
      .populate("owner", "name,email")
      .populate("members", "name,email");

    return res.status(200).json({
      succcess: true,
      message: "Board retrieved Successfully",
      boards,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while retrieving the board",
    });
  }
};

exports.getBoardById = async (req, res) => {
  try {
    const boardId = req.params.id;

    const board = await Board.findById(boardId)
      .populate("owner", "name,email")
      .populate("members", "name,email")
      .populate({
        path: "tasks",
        populate: { path: "assignedTo", select: "name email" },
      });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Board retreived Successfully",
      board,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while retrieving the board by id ",
    });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const { name, description, members } = req.body;
    const userId = req.user.id;

    const board = await Board.findOne({ _id: boardId, owner: userId });

    if (!board) {
      return res.status(404).json({
        succcess: false,
        message:
          "Board not found or you are not authorized to update the board",
      });
    }

    if (name) board.name = name;
    if (description) board.description = description;
    if (members) board.members = members;

    const updatedBoard = await board.save();

    return res.status(200).json({
      success: true,
      message: "Board updated Successfully",
      board: updatedBoard,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating the board",
    });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const userId = req.user.id;

    const board = await Board.findOne({ _id: boardId, owner: userId });
    if (!board) {
      return res.status(404).json({
        success: false,
        message:
          "Board not found or you do not have permission to delete the board ",
      });
    }

    const deletedBoard = await Board.deleteOne({ _id: boardId });

    return res.status(200).json({
      success: true,
      message: "Board deleted successfully",
      deletedBoard,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting the board",
    });
  }
};

exports.addMemberToBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const { memberEmail } = req.body;
    const userId = req.user.id;

    if (!memberEmail) {
      return res.status(401).json({
        success: false,
        message: "Member Email is Required to add Member to the Board",
      });
    }

    const board = await Board.findOne({ _id: boardId, owner: userId });
    if (!board) {
      return res.status(404).json({
        success: false,
        message:
          "Board not found or you are not authorized to add member to the board",
      });
    }

    if (!board.members.includes(memberEmail)) {
      board.members.push(memberEmail);
      await board.save();
    }

    return res.status(200).json({
      success: true,
      message: "Member added to board successfully",
      board,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while adding the member to the board",
    });
  }
};

exports.removeMemberFromBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const { memberEmail } = req.body;
    const userId = req.user.id;

    const board = await Board.findOne({ _id: boardId, owner: userId });
    if (!board) {
      return res.status(404).json({
        success: false,
        message:
          "Board not found or you are not authorized to add member to the board",
      });
    }

    if (board.members.includes(memberEmail)) {
      board.members.pop(memberEmail);
      await board.save();
    }

    return res.status(200).json({
      success: true,
      message: "Member deleted from the board successfully",
      board,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while removing the member to the board",
    });
  }
};

exports.addTaskToBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const { title, description, priority, dueDate, checklist, assignedTo } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      checklist,
      checklist: checklist || [],
      createdBy: req.user.id,
      assignedTo: assignedTo || [],
      board: boardId,
    });

    const savedTask = await task.save();

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    board.tasks.push(savedTask._id);
    await board.save();

    return res.status(200).json({
      success: true,
      message: "Task added to board succesfully",
      task,
      board
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while removing the member to the board",
    });
  }
};
