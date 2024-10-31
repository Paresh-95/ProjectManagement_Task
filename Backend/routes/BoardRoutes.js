const express = require("express")
const router = express.Router();

const {addMemberToBoard,removeMemberFromBoard,addTaskToBoard,createBoard,getBoardById,getBoards,updateBoard,deleteBoard} = require("../controllers/Board")
const {auth} = require("../middleware/User-middle")


router.post("/createBoard",auth,createBoard)
router.get("/getBoards",auth,getBoards)
router.get("/getBoardById/:id",auth,getBoardById)
router.put("/updateBoard/:id",auth,updateBoard)
router.delete("/deleteBoard/:id",auth,deleteBoard)
router.post("/addMemeber/:id",auth,addMemberToBoard)
router.delete("/removeMember/:id",auth,removeMemberFromBoard)
router.post("/addTaskToBoard/:id",auth,addTaskToBoard)


module.exports = router