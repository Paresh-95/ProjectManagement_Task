import React, { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const getUserUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/auth/getUser`;
      const response = await axios.get(getUserUrl,{withCredentials:true});
      setUser(response.data.user);
    } catch (error) {
      console.error("Getting User Failed: ", error);
      toast.error("Something went wrong while getting user info.");
    }
  };


  const updateUser = async (updatedData) => {
    try {
      const updateUserUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/auth/updateUser`;
      const response = await axios.put(updateUserUrl, updatedData,{withCredentials:true});
      setUser(response.data.updatedUser);
      toast.success("User Data Updated Successfully")
    } catch (error) {
      console.error("Getting User Failed: ", error);
      toast.error("Something went wrong while getting user info.");
    }
  };


  return (
    <UserContext.Provider value={{ user,getUser,updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
