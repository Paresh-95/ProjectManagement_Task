const User = require("../models/User-model");



exports.addMemberToBoard = async (req, res) => {
  try {
    

    const {email} = req.body
    const userId = req.user.id; 
    
    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Member Email is Required to add Member to the Board",
      });
    }

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }

    if(user.boards.includes(email)){
      return res.status(400).json({
        success:false,
        message:"Email Already Exist in Board"
      })
    }

    user.boards.push(email);
    await user.save();

    return res.status(200).json({
      success:true,
      message:"User Added Successfully to the Board",
      board:user.boards
    })

   
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
  
    const { memberEmail } = req.body;
    const userId = req.user.id;

    if (!memberEmail) {
      return res.status(401).json({
        success: false,
        message: "Member Email is Required to add Member to the Board",
      });
    }

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }

    if(!user.boards.includes(memberEmail)){
      return res.status(400).json({
        success:false,
        message:"Email Not Exist in Board"
      })
    }

    user.boards.pop(memberEmail);
    await User.save();

    return res.status(200).json({
      success:true,
      message:"User Removed Successfully to the Board",
      board:user.boards
    })

   
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while removing the member to the board",
    });
  }
};


