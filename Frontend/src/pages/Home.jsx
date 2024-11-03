import React, { useState, useEffect } from "react";
import { LuUsers2 } from "react-icons/lu";
import { VscCollapseAll } from "react-icons/vsc";
import { GoPlus } from "react-icons/go";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { TaskContext } from "../context/TaskContext";
import AddPeopleAttachment from "../components/AddPeopleAttachment";

export default function Home() {
  const { createTask, getTask, task, addMemberToBoard } =
    useContext(TaskContext);
  const { user, getUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getTask();
  }, []);

  const handleDueDate = (dueDateRange) => {
    getTask(dueDateRange);   
  };

  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const [collapsedBoards, setCollapsedBoards] = useState({
    backlog: false,
    todo: false,
    inProgress: false,
    done: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskSubmit = (taskData) => {
    createTask(taskData);
    console.log("New task:", taskData);
  };

  const toggleCollapse = (board) => {
    setCollapsedBoards((prevState) => ({
      ...prevState,
      [board]: !prevState[board],
    }));
  };

  return (
    <div style={styles.container}>
      <Sidebar activePage="dashboard" />
      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.welcomeText}>Welcome! {user.name || " User"}</h1>
          <span style={styles.dateText}>{today}</span>
        </header>

        <div style={styles.boardHeader}>
          <h2 style={styles.boardTitle}>Board</h2>
          <button
            style={styles.addPeopleButton}
            onClick={() => setIsAddPeopleOpen(true)}
          >
            <LuUsers2 /> Add People
          </button>

          <div style={styles.filterContainer}>
            <select  onChange={(e) => handleDueDate(e.target.value)} style={styles.filterSelect}>
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
            </select>
          </div>
        </div>

        <div style={styles.board}>
          {[
            { name: "Backlog", key: "Backlog" },
            { name: "To-Do", key: "To-Do" },
            { name: "In-Progress", key: "In-Progress" },
            { name: "Done", key: "Done" },
          ].map((column) => (
            <div key={column.key} style={styles.column}>
              <div style={styles.columnHeader}>
                <h3 style={styles.columnTitle}>{column.name}</h3>

                <div style={styles.iconContainer}>
                  {column.key === "To-Do" && (
                    <GoPlus
                      style={styles.plusIcon}
                      onClick={() => setIsModalOpen(true)}
                    />
                  )}
                  <VscCollapseAll
                    style={styles.collapseIcon}
                    onClick={() => toggleCollapse(column.key)}
                  />
                </div>
              </div>

              {!collapsedBoards[column.key] && (
                <div style={styles.cardList}>
                  {task.filter((item) => item.status === column.name).length >
                  0 ? (
                    task
                      .filter((item) => item.status === column.name)
                      .map((item, index) => (
                        <TaskCard key={index} items={item} />
                      ))
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <AddPeopleAttachment
        isOpen={isAddPeopleOpen}
        onClose={() => setIsAddPeopleOpen(false)}
        onSubmit={(memberEmail) => {
          console.log("Adding user:", memberEmail);
          addMemberToBoard(memberEmail);
        }}
      />
      <AddTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTaskSubmit}
      />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  main: {
    flex: 1,
    padding: "5px 20px 20px 20px",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: "22px",
    fontWeight: 600,
    lineHeight: "33px",
    textAlign: "left",
  },
  dateText: {
    marginLeft: "10px",
    color: "#707070",
    fontFamily: "Poppins",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "30px",
    textAlign: "left",
  },
  boardHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  boardTitle: {
    fontSize: "29px",
    fontWeight: 500,
    lineHeight: "43.5px",
    textAlign: "left",
    marginRight: "5px",
  },
  addPeopleButton: {
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    fontSize: "15px",
    cursor: "pointer",
    color: "#707070",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginRight: "10px",
  },
  filterContainer: {
    marginLeft: "auto",
  },
  filterSelect: {
    padding: "5px",
    borderRadius: "5px",
    border: "none",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "24px",
    textAlign: "center",
  },

  board: {
    display: "flex",
    gap: "15px",
    maxWidth: "100%",
    overflowX: "auto",
  },
  column: {
    flex: 1,
    backgroundColor: "#eef2f5",
    borderRadius: "10px",
    padding: "20px 35px 20px 20px",
    minWidth: "320px",
    maxWidth: "380px",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  columnTitle: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "24px",
    textAlign: "left",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },
  plusIcon: {
    fontSize: "25px",
    color: "black",
  },
  collapseIcon: {
    fontSize: "20px",
    cursor: "pointer",
    color: "#707070",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
};
