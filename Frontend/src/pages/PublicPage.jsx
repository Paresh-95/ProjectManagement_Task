"use client";

import React, { useContext, useEffect, useState } from "react";
import { Check, Box } from "lucide-react";
import { TaskContext } from "../context/TaskContext";
import { useParams } from "react-router-dom";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
    alignSelf: "flex-start",
  },
  headerText: {
    fontWeight: "500",
  },
  card: {
    width: "100%",
    maxWidth: "425px",
    padding: "24px",
    backgroundColor: "white",
    borderRadius: "24px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  priorityWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  priorityDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#ef4444",
  },
  priorityText: {
    fontSize: "10px",
    fontWeight: "500",
    color: "#4b5563",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "24px",
  },
  checklistHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  checklistCount: {
    fontSize: "14px",
    fontWeight: "500",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  taskItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
  },

  taskText: {
    fontSize: "14px",
  },
  dueDateWrapper: {
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  dueDateText: {
    fontSize: "14px",
    color: "#4b5563",
  },
  dueDateButton: {
    padding: "6px 12px",
    fontSize: "12px",
    fontWeight: "500",
    color: "white",
    backgroundColor: "#ef4444",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  loadingText: {
    fontSize: "18px",
    color: "#4b5563",
  },
};

export default function PublicPage() {
  const { id } = useParams();
  const { share, getTaskById, loading } = useContext(TaskContext);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const isPastDate = date < today;
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
    const suffix =
      date.getDate() % 10 === 1 && date.getDate() !== 11
        ? "st"
        : date.getDate() % 10 === 2 && date.getDate() !== 12
        ? "nd"
        : date.getDate() % 10 === 3 && date.getDate() !== 13
        ? "rd"
        : "th";
    return { formattedDate: `${formattedDate}${suffix}`, isPastDate };
  };

  const { formattedDate, isPastDate } = formatDate(share.dueDate);

  useEffect(() => {
    getTaskById(id);
  }, []); 

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Box size={20} />
        <span style={styles.headerText}>Pro Manage</span>
      </div>

      {loading ? ( 
        <div style={styles.loadingText}>Loading...</div>
      ) : (
        <div style={styles.card}>
          <div style={styles.priorityWrapper}>
            <div style={styles.priorityDot} />
            <span style={styles.priorityText}>
              {share.priority || "Priority"}
            </span>{" "}

          </div>
          <h2 style={styles.title}>{share.title || "Task Title"}</h2>{" "}
          <div>
            <div style={styles.checklistHeader}>
              <span style={styles.checklistCount}>
                Checklist ({share.checklist?.length || 0}/12)
              </span>
            </div>

            <div style={styles.taskList}>
              {share.checklist?.map((task) => (
                <label key={task._id} style={styles.taskItem}>
                  <div style={styles.checkbox}>
                    {task.completed}
                  </div>
                  <span style={styles.taskText}>{task.item}</span>
                </label>
              ))}
            </div>
          </div>
          <div style={styles.dueDateWrapper}>
            <span style={styles.dueDateText}>Due Date</span>
            <button style={styles.dueDateButton}>
              {formattedDate || "Due Date"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
