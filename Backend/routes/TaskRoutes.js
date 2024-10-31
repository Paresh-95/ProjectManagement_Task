const express = require("express");
const router = express.Router();


const {createTask,getTasks,getTasksById,updateTask,deleteTask,assignTaskToUser,updateTaskStatus,updateChecklistItem,toggleShareTask} = require("../controllers/Task");
const {auth} = require("../middleware/User-middle")


router.post("/createTask",auth,createTask)
router.get("/getTasks",auth,getTasks)
router.get("/getTasksById/:id",auth,getTasksById)
router.put("/updateTask/:id",auth,updateTask)
router.delete("/deleteTask/:id",auth,deleteTask)
router.post("/assignTaskToUser/:id",auth,assignTaskToUser)
router.patch("/updateTaskStatus/assign/:id",auth,updateTaskStatus)
router.patch("/updateCheckListItem/:taskId/update/:itemId",auth,updateChecklistItem)
router.patch("/toogleShareTask/:id",auth,toggleShareTask);



module.exports = router