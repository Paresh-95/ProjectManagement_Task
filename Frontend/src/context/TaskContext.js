import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; 
import { useNavigate } from "react-router-dom";


export const TaskContext = createContext();


export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState([]); 
    const [share,setShare] = useState({});
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    
    const createTask = async (taskData) => {
        setLoading(true); 
        try {
            const createTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/createTask`;
            await axios.post(createTaskUrl, taskData, { withCredentials: true });
            toast.success("Task Created Successfully");
            navigate("/home");
            getTask(); 
        } catch (error) {
            console.error("Task Creation failed:", error);
            toast.error("Something went wrong while creating the task");
        } finally {
            setLoading(false); 
        }
    };

    
    const getTask = async (dueDate = "this_month") => {
        setLoading(true); 
        try {
            console.log("Fetching tasks with due date:", dueDate);
            const fetchTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/getTasks?dueDateRange=${dueDate || ""}`;
            const response = await axios.get(fetchTaskUrl, { withCredentials: true });

            if (response.data.tasks && response.data.tasks.length > 0) {
                setTask(response.data.tasks);
                toast.success("Tasks Fetched Successfully");
            } else {
                setTask([]);
                toast.error("No tasks available for the specified criteria.");
            }
        } catch (error) {
            console.error("Task Fetching Failed:", error);
            toast.error("Fetching Tasks Failed. Please try again.");
        } finally {
            setLoading(false); 
        }
    };


    const getTaskById = async (taskId) => {
        setLoading(true); 
        try {
            const fetchTaskByIdUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/getTasksById/${taskId}`;
            const response = await axios.get(fetchTaskByIdUrl, { withCredentials: true });
            setShare(response.data.task)
            toast.success("Task Fetched Successfully")
        } catch (error) {
            console.error("Task Fetching Failed:", error);
            toast.error("Fetching Tasks Failed. Please try again.");
        } finally {
            setLoading(false); 
        }
    };





    
    const updateTask = async (taskId, updatedData) => {
        setLoading(true); 
        try {
            console.log(updatedData);
            
            const updateTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/updateTask/${taskId}`;
            await axios.put(updateTaskUrl, updatedData, { withCredentials: true });
            toast.success("Task Updated Successfully");
            getTask(); 
        } catch (error) {
            console.error("Task Updation Failed:", error);
            toast.error("Task Updation Failed, please try again.");
        } finally {
            setLoading(false); 
        }
    };

    
    const deleteTask = async (taskId) => {
        setLoading(true); 
        try {
            const deleteTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/deleteTask/${taskId}`;
            await axios.delete(deleteTaskUrl, { withCredentials: true });
            toast.success("Task Deleted Successfully");
            getTask(); 
        } catch (error) {
            console.error("Task Deletion Failed:", error);
            toast.error("Deleting Task Failed. Please try again.");
        } finally {
            setLoading(false); 
        }
    };

    
    const addMemberToBoard = async (memberEmail) => {
        setLoading(true); 
        try {
            const addMemberUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/board/addMember`;
            await axios.post(addMemberUrl, { email: memberEmail }, { withCredentials: true });
            toast.success("Member Added Successfully to Board");
            navigate("/home");
        } catch (error) {
            console.error("Error While Adding Member to the Board:", error);
            toast.error("Error While Adding Member to the Board");
        } finally {
            setLoading(false); 
        }
    };

    

    return (
        <TaskContext.Provider value={{share, getTaskById,task, loading, createTask, getTask, addMemberToBoard, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};
