import React, { useContext } from "react";
import { CiSettings } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoDatabase } from "react-icons/go";
import { HiOutlineLogout } from "react-icons/hi";
import {Link} from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

export default function Sidebar({ activePage }) {

  const {logout} = useContext(AuthContext)
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <span style={styles.icon}>⚙️</span> Pro Manage
      </div>
      <nav style={styles.nav}>
        <Link
          to="/home"
          style={{
            ...styles.navItem,
            ...(activePage === "dashboard" ? styles.activeNavItem : {}),
          }}
        >
          <LuLayoutDashboard style={styles.iconSize} /> Board
        </Link>
        <Link
          to="/analytics"
          style={{
            ...styles.navItem,
            ...(activePage === "analytics" ? styles.activeNavItem : {}),
          }}
        >
          <GoDatabase style={styles.iconSize} /> Analytics
        </Link>
        <Link
          to="/settings"
          style={{
            ...styles.navItem,
            ...(activePage === "settings" ? styles.activeNavItem : {}),
          }}
        >
          <CiSettings style={styles.iconSize} /> Settings
        </Link>
      </nav>
      <div style={styles.logout}>
        <button style={styles.logoutLink}  onClick={logout} >
        <HiOutlineLogout style={styles.iconSize} /> Log out
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    backgroundColor: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #E0E0E0",
    height: "100vh",
    overflowY: "auto",
  },
  logo: {
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "24px",
    textAlign: "left",
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  navItem: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "24px",
    textAlign: "left",
    padding: "10px",
    marginBottom: "10px",
    textDecoration: "none",
    color: "#333",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  activeNavItem: {
    backgroundColor: "#ecf4fd",
    fontWeight: "bold",
  },
  logout: {
    marginBottom: "80px",
  },
  logoutLink: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "24px",
    textAlign: "left",
    color: "#FF4757",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  iconSize: {
    fontSize: "1.3em", // Increase icon size by 30%
  },
};
