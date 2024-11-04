import React, { createContext } from "react";   
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const signup = async (userData) => {
    try {
      const registerUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/auth/signup`;     
      await axios.post(registerUrl, userData,{ withCredentials: true });
      toast.success("User Tegistered Successfully");
      navigate("/");
    } catch (error) {
      console.error("Registration failed: " + error);
      toast.error("Something went wrong");
    }
  };


  const login = async (userCred) => {
    try {
      const loginUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/auth/login`;  
      const response = await axios.post(loginUrl, userCred,{ withCredentials: true }); // Include credentials
      toast.success("User Logged In Successfully");
      navigate("/home");
      
    } catch (error) {
      console.log("Login Failed: ", error.response?.data?.message || error.message);
      toast.error("Login failed: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  const logout = async () => {
    try {
      const logoutUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/auth/logout`;
      await axios.get(logoutUrl, { withCredentials: true }); // Include credentials
      toast.success("User Logged Out Successfully");
      navigate("/");
    } catch (error) {
      console.log("Logout Failed: ", error.response?.data?.message || error.message);
      toast.error("Logout failed: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <AuthContext.Provider value={{ signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
