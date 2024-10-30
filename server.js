const express = require("express")
const cookieParser = require("cookie-parser");
require("dotenv").config();
const dbConnect = require("./config/db");
const userRoute = require("./routes/UserRoutes");
const AnalyticsRoutes = require("./routes/AnalyticsRoutes");
const TaskRoutes = require("./routes/TaskRoutes")

const PORT = process.env.PORT || 3000

const app = express();
dbConnect();



app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/task",TaskRoutes)
app.use("/api/v1/analytics",AnalyticsRoutes)



app.get("/",(req,res)=>{
    res.send("API HOME ROUTE");
})


app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT} `);   
})