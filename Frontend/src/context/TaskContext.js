import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Corrected import
import { useNavigate } from "react-router-dom";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState([]);
    const navigate = useNavigate();

    // Function to create a task
    const createTask = async (taskData) => {
        try {
            const createTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/createTask`;
            await axios.post(createTaskUrl, taskData, { withCredentials: true });
            toast.success("Task Created Successfully");
            navigate("/home");
            getTask();
        } catch (error) {
            console.error("Task Creation failed:", error);
            toast.error("Something went wrong");
        }
    };

    // Function to fetch tasks
    const getTask = async (dueDate="today") => {
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
        }
    };

    // Function to update a task
    const updateTask = async (taskId, updatedData) => {
        try {
            const updateTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/updateTask/${taskId}`;
            await axios.put(updateTaskUrl, updatedData, { withCredentials: true });
            toast.success("Task Updated Successfully");
            getTask();
        } catch (error) {
            console.error("Task Updation Failed:", error);
            toast.error("Task Updation Failed, please try again.");
        }
    };

    // Function to delete a task
    const deleteTask = async (taskId) => {
        try {
            const deleteTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/deleteTask/${taskId}`;
            await axios.delete(deleteTaskUrl, { withCredentials: true });
            toast.success("Task Deleted Successfully");
            getTask();
        } catch (error) {
            console.error("Task Deletion Failed:", error);
            toast.error("Deleting Task Failed. Please try again.");
        }
    };

    const addMemberToBoard = async (memberEmail) => {
        try {
            const addMemberUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/board/addMember`;
            await axios.post(addMemberUrl, { email: memberEmail }, { withCredentials: true });
            toast.success("Member Added Successfully to Board");
            navigate("/home");
        } catch (error) {
            console.error("Error While Adding Member to the Board:", error);
            toast.error("Error While Adding Member to the Board");
        }
    };

    return (
        <TaskContext.Provider value={{ task, createTask, getTask, addMemberToBoard, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};
