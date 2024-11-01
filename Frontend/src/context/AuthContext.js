import React, { createContext, useState } from "react";   
import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

 const signup = async (userData) => {
    try {
      const registerUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/auth/signup`;     
      await axios.post(registerUrl, userData);
      setIsAuthenticated(true);
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
      const response = await axios.post(loginUrl, userCred, { withCredentials: true });
      
      const { token } = response.data; 
      localStorage.setItem("token", token); 
  
      setIsAuthenticated(true);
      toast.success("User Logged In Successfully");
      navigate("/home");
    } catch (error) {
      console.log("Login Failed: " + error);
      toast.error("Something went Wrong");
    }
  };
  

  const logout = async () =>{
    try {
      const logoutUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/auth/logout`
      await axios.get(logoutUrl,{withCredentials:true})
      toast.success("User Logged Out Successfully")
      navigate("/")
      setIsAuthenticated(false)
    } catch (error) {
        console.log("Logout Failed: "+error);
        toast.error("Something went Wrong")
        
    }
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated, signup, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
