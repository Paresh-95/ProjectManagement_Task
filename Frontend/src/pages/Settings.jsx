import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/UserContext";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {updateUser} = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      email,
      oldPassword,
      newPassword,
    };
    console.log(updatedUser);
    
    updateUser(updatedUser);
    
  };

  return (
    <div style={styles.container}>
      <Sidebar activePage="settings" />
      <main style={styles.main}>
        <h1 style={styles.title}>Settings</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaRegUser style={styles.inputIcon} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <CiMail style={styles.inputIcon} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Update Email"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <RiLockPasswordLine style={styles.inputIcon} />
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              style={styles.showPasswordButton}
            >
              {showOldPassword ? (
                <FiEyeOff style={styles.iconSize} />
              ) : (
                <FiEye style={styles.iconSize} />
              )}
            </button>
          </div>
          <div style={styles.inputGroup}>
            <RiLockPasswordLine style={styles.inputIcon} />
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              style={styles.showPasswordButton}
            >
              {showNewPassword ? (
                <FiEyeOff style={styles.iconSize} />
              ) : (
                <FiEye style={styles.iconSize} />
              )}
            </button>
          </div>
          <button type="submit" style={styles.updateButton}>
            Update
          </button>
        </form>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
  },
  main: {
    flex: 1,
    padding: "0px 40px 40px 40px",
  },
  title: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: "22px",
    fontWeight: 600,
    lineHeight: "29.96px",
    textAlign: "left",
    marginBottom: "40px",
    color: "#000",
  },
  form: {
    maxWidth: "400px",
  },
  inputGroup: {
    marginBottom: "20px",
    position: "relative",
    width: "493px",
  },
  inputIcon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#666",
  },
  input: {
    width: "100%", // Changed to 100% to ensure it spans the full width of the input group
    height: "55.13px",
    padding: "12px",
    paddingLeft: "35px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box",
  },
  showPasswordButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
  },
  updateButton: {
    width: "493px",
    height: "55.13px",
    fontSize: "16px",
    backgroundColor: "#17A2B8",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    marginTop: "20px",
  },
  iconSize: {
    fontSize: "1.3em",
  },
};
