import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../context/UserContext";

export default function EditTask({ isOpen, onClose, onSubmit, data }) {
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState(data.title);
  const [priority, setPriority] = useState(data.priority);
  const [status, setStatus] = useState(data.status);
  const [assigneeTo, setAssigneeTo] = useState(data.assigneeTo);
  const [checklist, setChecklist] = useState(
    data.checklist.map(item => ({
      ...item,
      id: item.id || Math.random().toString(), // Ensure each item has a unique ID
    }))
  );
  const [dueDate, setDueDate] = useState(data.dueDate || new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, priority, status, assigneeTo, checklist, dueDate });
    console.log({ title, priority, status, assigneeTo, checklist, dueDate });
    
    onClose();
  };

  const addNewTask = () => {
    setChecklist((prevChecklist) => [
      ...prevChecklist,
      {
        id: Math.random().toString(),
        item: "Task to be done",
        completed: false,
      },
    ]);
  };

  const removeTask = (id) => {
    setChecklist((prevChecklist) => prevChecklist.filter((task) => task.id !== id));
  };

  const updateTaskCompletion = (id, completed) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((task) =>
        task.id === id ? { ...task, completed } : task
      )
    );
  };

  const updateTaskItem = (id, updatedItem) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((task) =>
        task.id === id ? { ...task, item: updatedItem } : task
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>
              Title <span style={styles.required}>*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Priority Row */}
          <div style={{ ...styles.formGroup, ...styles.priorityRow }}>
            <label style={styles.label}>
              Select Priority <span style={styles.required}>*</span>
            </label>
            <div style={styles.priorityGroup}>
              {["High", "Moderate", "Low"].map((level) => (
                <div
                  key={level}
                  onClick={() => setPriority(level)}
                  style={{
                    ...styles.priorityOption,
                    backgroundColor: priority === level ? "#EEECEC" : "transparent",
                    color: "#767575",
                  }}
                >
                  <span
                    style={{
                      ...styles.priorityDot,
                      backgroundColor:
                        level === "High" ? "#FF2473" : level === "Moderate" ? "#18B0FF" : "#63C05B",
                    }}
                  ></span>
                  {level} Priority
                </div>
              ))}
            </div>
          </div>

          {/* Status Row */}
          <div style={{ ...styles.formGroup, ...styles.priorityRow }}>
            <label style={styles.label}>
              Select Status <span style={styles.required}>*</span>
            </label>
            <div style={styles.statusGroup}>
              {["To-Do", "Done", "Backlog", "In-Progress"].map((level) => (
                <div
                  key={level}
                  onClick={() => setStatus(level)}
                  style={{
                    ...styles.priorityOption,
                    backgroundColor: status === level ? "#EEECEC" : "transparent",
                    color: "#767575",
                  }}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>

          {/* Assignee Row */}
          <div style={{ ...styles.formGroup, ...styles.inlineGroup }}>
            <label htmlFor="assignee" style={styles.label}>
              Assign to
            </label>
            <select
              id="assignee"
              value={assigneeTo}
              onChange={(e) => setAssigneeTo(e.target.value)}
              style={styles.inlineInput}
            >
              <option value="" disabled>
                Select an assignee
              </option>
              {user.boards.map((email) => (
                <option key={email} value={email}>
                  {email}
                </option>
              ))}
            </select>
          </div>

          {/* Checklist Section */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Checklist ({checklist.filter((t) => t.completed).length}/{checklist.length})
              <span style={styles.required}>*</span>
            </label>
            <div style={styles.checklistContainer}>
              {checklist.map((task) => (
                <div key={task.id} style={styles.checklistItem}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => updateTaskCompletion(task.id, e.target.checked)}
                    style={styles.checkbox}
                  />
                  <input
                    type="text"
                    value={task.item}
                    onChange={(e) => updateTaskItem(task.id, e.target.value)}
                    style={styles.checklistInput}
                  />
                  <button
                    type="button"
                    onClick={() => removeTask(task.id)}
                    style={styles.removeButton}
                    aria-label="Remove task"
                  >
                    <FaTrash style={styles.trashIcon} />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addNewTask} style={styles.addTaskBtn}>
              + Add New
            </button>
          </div>

          {/* Date Selection */}
          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => setCalendarOpen(!calendarOpen)}
              style={styles.dueDateBtn}
            >
              Select Due Date
            </button>

            <div style={styles.rightButtonGroup}>
              <button type="button" onClick={onClose} style={styles.cancelBtn}>
                Cancel
              </button>
              <button type="submit" style={styles.saveBtn}>
                Update
              </button>
            </div>
          </div>

          {/* Calendar */}
          {calendarOpen && (
            <DatePicker
              selected={dueDate}
              onChange={(date) => {
                setDueDate(date);
                setCalendarOpen(false);
              }}
              inline
            />
          )}
        </form>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    overflowX: "auto",
    height: "596px",
    width: "666px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    fontFamily: "Poppins, sans-serif",
  },
  formGroup: {
    marginBottom: "16px",
  },
  inlineGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    
  },
  label: {
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: "0.5px",
    color: "#333",
  },
  required: {
    color: "#FF0000",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "24px",
  },
  input: {
    width: "588px",
    height: "30px",
    padding: "10px",
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    borderRadius: "4px",
    border: "1px solid #e5e7eb",
  },
  inlineInput: {
    width: "80%",
    height: "50px",
    padding: "10px",
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    borderRadius: "4px",
    border: "1px solid #e5e7eb",
  },
  priorityRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  priorityGroup: {
    display: "flex",
    gap: "16px",
  },
  statusGroup:{
    display: "flex",
    gap: "16px",
  },
  priorityOption: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    fontSize: "14px",
    fontWeight: "500",
  },
  priorityDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  checklistContainer: {
    borderRadius: "8px",
    padding: "10px",
  },
  checklistItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  checkbox: {
    cursor: "pointer",
  },
  checklistInput: {
    flex: 1,
    padding: "8px",
    fontSize: "14px",
    fontFamily: "Poppins, sans-serif",
    border: "1px solid #e5e7eb",
    borderRadius: "4px",
  },

  removeButton: {
    background: "none",
    border: "none",
    color: "#FF0000",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  trashIcon: {
    fontSize: "16px",
    color: "#E64833",
  },

  addTaskBtn: {
    marginTop: "8px",
    padding: "8px",
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "Inter, sans-serif",
    color: "#767575",
    width: "162.58px",
    height: "45px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  rightButtonGroup: {
    display: "flex",
    gap: "10px",
  },
  dueDateBtn: {
    padding: "8px 16px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#707070",
    backgroundColor: "#fff",
    border: "1px solid #707070",
    borderRadius: "4px",
    cursor: "pointer",
    width: "162.58px",
    height: "45px",
  },

  cancelBtn: {
    padding: "8px 16px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#CF3636",
    backgroundColor: "#fff",
    border: "1px solid #CF3636",
    borderRadius: "4px",
    cursor: "pointer",
    width: "162.58px",
    height: "45px",
  },

  saveBtn: {
    padding: "8px 16px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#fff",
    backgroundColor: "#17A2B8",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "162.58px",
    height: "45px",
  },


};
