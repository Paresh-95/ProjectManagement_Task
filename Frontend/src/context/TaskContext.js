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

    const getTask = async (priority, dueDateRange) => {
        try {
            // 
            const fetchTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/getTasks?priority=${priority || ''}&dueDateRange=${dueDateRange || ''}`;            
            const response = await axios.get(fetchTaskUrl, { withCredentials: true });
            if (response.data.tasks && response.data.tasks.length > 0) {
                setTask(response.data.tasks);
                toast.success("Tasks Fetched Successfully");
            } else {
                setTask([]);
                toast.info("No tasks available for the specified criteria.");
            }
    
        } catch (error) {
            console.error("Task Fetching Failed: ", error);
            toast.error("Fetching Tasks Failed. Please try again.");
        }
    };
    

    const addMemberToBoard = async (memberEmail) => {
        try {   
            const addMemberUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/board/addMember`;            
            await axios.post(addMemberUrl, { email: memberEmail }, { withCredentials: true }); // Wrapping memberEmail in an object
            toast.success("Member Added Successfully to Board");
            navigate("/home");
        } catch (error) {
            console.log(error);
            toast.error("Error While Adding Member to the Board");
        }
    };

    

    return(
        <TaskContext.Provider value={{task,createTask,getTask,addMemberToBoard}}>
            {children}
        </TaskContext.Provider>
    )



}