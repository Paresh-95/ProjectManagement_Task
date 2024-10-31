const express = require("express");
const router = express.Router();

const {signup,login,logout} = require("../controllers/Auth")
const {getUser,updateUser} = require("../controllers/User")
const {auth} = require("../middleware/User-middle")


router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout);

router.get("/getUser",auth,getUser)
router.put("/updateUser",auth,updateUser)


module.exports = router