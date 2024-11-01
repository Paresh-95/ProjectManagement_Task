"use client"

import React, { useState } from "react"
import { Check, Box } from "lucide-react"

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
    alignSelf: 'flex-start',
  },
  headerText: {
    fontWeight: '500',
  },
  card: {
    width: '100%',
    maxWidth: '425px',
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  priorityWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  priorityDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#ef4444',
  },
  priorityText: {
    fontSize: '10px',
    fontWeight: '500',
    color: '#4b5563',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '20px',
    fontWeight: '500',
    marginBottom: '24px',
  },
  checklistHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  checklistCount: {
    fontSize: '14px',
    fontWeight: '500',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  taskItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  checkbox: {
    position: 'relative',
    width: '16px',
    height: '16px',
  },
  checkboxInput: {
    width: '16px',
    height: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    appearance: 'none',
    cursor: 'pointer',
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkIcon: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '16px',
    height: '16px',
    color: 'white',
    pointerEvents: 'none',
  },
  taskText: {
    fontSize: '14px',
  },
  dueDateWrapper: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  dueDateText: {
    fontSize: '14px',
    color: '#4b5563',
  },
  dueDateButton: {
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#ef4444',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
}

export default function PublicPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Done Task", checked: true },
    { id: 2, text: "Task to be done", checked: false },
    { id: 3, text: "Task to be done", checked: false },
    { id: 4, text: "Task to be done", checked: false },
    { id: 5, text: "Task to be done", checked: false },
    { id: 6, text: "Task to be done", checked: false },
    { id: 7, text: "Lorem ipsum dolor sit amet consectetur. Sem duis morbi elementum sagittis placerat ordin aliquet sem.", checked: false },
  ])

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Box size={20} />
        <span style={styles.headerText}>Pro Manage</span>
      </div>
      
      <div style={styles.card}>
        <div style={styles.priorityWrapper}>
          <div style={styles.priorityDot} />
          <span style={styles.priorityText}>High Priority</span>
        </div>
        
        <h2 style={styles.title}>Hero section</h2>
        
        <div>
          <div style={styles.checklistHeader}>
            <span style={styles.checklistCount}>Checklist (1/12)</span>
          </div>
          
          <div style={styles.taskList}>
            {tasks.map((task) => (
              <label
                key={task.id}
                style={styles.taskItem}
              >
                <div style={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={(e) => {
                      setTasks(tasks.map(t =>
                        t.id === task.id ? { ...t, checked: e.target.checked } : t
                      ))
                    }}
                    style={{
                      ...styles.checkboxInput,
                      ...(task.checked ? styles.checkboxChecked : {})
                    }}
                  />
                  {task.checked && (
                    <Check style={styles.checkIcon} />
                  )}
                </div>
                <span style={styles.taskText}>{task.text}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={styles.dueDateWrapper}>
          <span style={styles.dueDateText}>Due Date</span>
          <button style={styles.dueDateButton}>
            Feb 10th
          </button>
        </div>
      </div>
    </div>
  )
}
