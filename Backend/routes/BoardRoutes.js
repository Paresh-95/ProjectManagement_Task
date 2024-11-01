const express = require("express")
const router = express.Router();

const {addMemberToBoard,removeMemberFromBoard,addTaskToBoard,createBoard,getBoardById,getBoards,updateBoard,deleteBoard} = require("../controllers/Board")
const {auth} = require("../middleware/User-middle")


router.post("/addMember",auth,addMemberToBoard)
router.delete("/removeMember",auth,removeMemberFromBoard)



module.exports = router