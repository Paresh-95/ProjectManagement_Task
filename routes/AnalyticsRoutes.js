const express = require('express')
const router = express.Router();

const { getUserTaskAnalytics } = require("../controllers/Analytics");
const {auth} = require("../middleware/User-middle")

router.get("/getUserTaskAnalaytics",auth,getUserTaskAnalytics);


module.exports = router;