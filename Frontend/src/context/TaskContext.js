import React,{createContext,useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const TaskContext = createContext();

export const TaskProvider = ({children}) =>{
    const [task,setTask] = useState([])
    const navigate = useNavigate();


    const createTask = async(taskData) =>{
        try {
           const createTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/createTask`;     
           await axios.post(createTaskUrl,taskData,{withCredentials:true})
           toast.success("Task Created Successfully")
           navigate("/home")
        } catch (error) {
            console.log("Task Creation failed: "+error);
            toast.error("Something went wrong");
        }
    }


    return(
        <TaskContext.Provider value={{createTask}}>
            {children}
        </TaskContext.Provider>
    )



}