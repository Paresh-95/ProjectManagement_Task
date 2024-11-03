import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Corrected import
import { useNavigate } from "react-router-dom";

// Create a TaskContext
export const TaskContext = createContext();

// TaskProvider component to provide task-related state and functions
export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState([]); // State to hold tasks
    const [loading, setLoading] = useState(false); // State to manage loading
    const navigate = useNavigate();

    // Function to create a task
    const createTask = async (taskData) => {
        setLoading(true); // Set loading to true
        try {
            const createTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/createTask`;
            await axios.post(createTaskUrl, taskData, { withCredentials: true });
            toast.success("Task Created Successfully");
            navigate("/home");
            getTask(); // Fetch updated tasks after creation
        } catch (error) {
            console.error("Task Creation failed:", error);
            toast.error("Something went wrong while creating the task");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Function to fetch tasks
    const getTask = async (dueDate = "today") => {
        setLoading(true); // Set loading to true
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
            setLoading(false); // Reset loading state
        }
    };

    // Function to update a task
    const updateTask = async (taskId, updatedData) => {
        setLoading(true); // Set loading to true
        try {
            const updateTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/updateTask/${taskId}`;
            await axios.put(updateTaskUrl, updatedData, { withCredentials: true });
            toast.success("Task Updated Successfully");
            getTask(); // Fetch updated tasks after updating
        } catch (error) {
            console.error("Task Updation Failed:", error);
            toast.error("Task Updation Failed, please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Function to delete a task
    const deleteTask = async (taskId) => {
        setLoading(true); // Set loading to true
        try {
            const deleteTaskUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/task/deleteTask/${taskId}`;
            await axios.delete(deleteTaskUrl, { withCredentials: true });
            toast.success("Task Deleted Successfully");
            getTask(); // Fetch updated tasks after deletion
        } catch (error) {
            console.error("Task Deletion Failed:", error);
            toast.error("Deleting Task Failed. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Function to add a member to the board
    const addMemberToBoard = async (memberEmail) => {
        setLoading(true); // Set loading to true
        try {
            const addMemberUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/board/addMember`;
            await axios.post(addMemberUrl, { email: memberEmail }, { withCredentials: true });
            toast.success("Member Added Successfully to Board");
            navigate("/home");
        } catch (error) {
            console.error("Error While Adding Member to the Board:", error);
            toast.error("Error While Adding Member to the Board");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Fetch tasks when the provider mounts
    useEffect(() => {
        getTask(); // Fetch tasks on mount
    }, []);

    return (
        <TaskContext.Provider value={{ task, loading, createTask, getTask, addMemberToBoard, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};
