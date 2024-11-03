import React, { useContext, useState, useEffect } from 'react';
import { MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { TaskContext } from '../context/TaskContext';
import EditTask from './EditTask';

export default function TaskCard({ items }) {
  const { deleteTask, updateTask } = useContext(TaskContext);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tasks, setTasks] = useState(items.checklist || []);

  useEffect(() => {
    setTasks(items.checklist || []);
  }, [items.checklist]);

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  // Function to truncate text for display
  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  // Define priority colors based on the priority level
  const priorityColors = {
    High: { dot: '#ff2473', text: '#ff4747' },
    Moderate: { dot: '#18b0ff', text: '#1e90ff' },
    Low: { dot: '#63c05b', text: '#32cd32' }
  };

  const color = priorityColors[items.priority] || { dot: '#1e90ff', text: '#000000' };

  // Function to handle task deletion
  const handleDelete = () => {
    deleteTask(items._id);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle task edit submission
  const handleEditTaskSubmit = (taskData) => {
    updateTask(items._id, taskData);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const isPastDate = date < today;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
    const suffix = (date.getDate() % 10 === 1 && date.getDate() !== 11) ? 'st' :
                   (date.getDate() % 10 === 2 && date.getDate() !== 12) ? 'nd' :
                   (date.getDate() % 10 === 3 && date.getDate() !== 13) ? 'rd' : 'th';
    return { formattedDate: `${formattedDate}${suffix}`, isPastDate };
  };

  const { formattedDate, isPastDate } = formatDate(items.dueDate);
  
  // Define styles for the card and its components
  const styles = {
    card: {
      backgroundColor: 'white',
      borderRadius: '25px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      width: '95%',
      maxWidth: '425px',
      padding: '16px',
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px', 
    },
    priorityWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    priorityDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: color.dot,
    },
    priorityText: {
      fontSize: '8px',
      color: '#707070',
      fontWeight: 500,
      lineHeight: '12px',
      textAlign: 'left',
    },
    menuWrapper: {
      position: 'relative',
    },
    menuButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
    },
    menuDropdown: {
      position: 'absolute',
      right: 0,
      top: '100%',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '4px',
      zIndex: 10,
    },
    menuDropdownItem: {
      color: 'black',
      background: 'none',
      border: 'none',
      fontFamily: 'Poppins',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '21px',
      textAlign: 'left',
      padding: '8px 40px',
    },
    deleteButton: {
      color: '#ff4747',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '27px',
      textAlign: 'left',
      marginBottom: '24px', 
    },
    checklistContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    checklistHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    checklistCount: {
      fontFamily: 'Inter',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '16.94px',
      textAlign: 'left',
    },
    toggleButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
    },
    checklistItems: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    checklistItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      padding: '12px',
      border: '1px solid #eee',
      borderRadius: '8px',
      fontFamily: 'Inter',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '16.94px',
      textAlign: 'left',
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '16px',
    },
    dateButton: {
      backgroundColor: isPastDate ? '#cf3636' : '#DBDBDB',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      padding: '6px 10px',
      fontSize: '8px',
      fontWeight: 500,
      lineHeight: '12px',
      textAlign: 'left',
      cursor: 'pointer',
    },
    statusButtons: {
      display: 'flex',
      gap: '4px',
    },
    statusButton: {
      backgroundColor: '#eeecec',
      border: 'none',
      borderRadius: '10px',
      padding: '6px 10px',
      color: '#767575',
      fontSize: '8px',
      fontWeight: 500,
      lineHeight: '12px',
      textAlign: 'left',
      cursor: 'pointer',
    },
    checkbox: {
      width: '16px',
      height: '16px',
      marginTop: '2px',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.priorityWrapper}>
          <div style={styles.priorityDot} />
          <span style={styles.priorityText}>
            {items.priority} Priority
          </span> 
        </div>
        <div style={styles.menuWrapper}>
          <button style={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MoreHorizontal size={16} />
          </button>
          {isMenuOpen && (
            <div style={styles.menuDropdown}>
              <button style={styles.menuDropdownItem} onClick={() => setIsModalOpen(true)}>Edit</button>
              <button style={styles.menuDropdownItem} onClick={() => setIsMenuOpen(false)}>Share</button>
              <button style={{ ...styles.menuDropdownItem, ...styles.deleteButton }} onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>

      <h4 style={styles.cardTitle}>{truncateText(items.title, 50)}</h4>

      <div style={styles.checklistContainer}>
        <div style={styles.checklistHeader}>
          <span style={styles.checklistCount}>
            Checklist ({completedTasksCount}/{tasks.length})
          </span>
          <button style={styles.toggleButton} onClick={() => setIsChecklistOpen(!isChecklistOpen)}>
            {isChecklistOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {isChecklistOpen && (
          <div style={styles.checklistItems}>
            {tasks.map((task) => (
              <div key={task._id} style={styles.checklistItem}>
                <input
                  type="checkbox"
                  id={`task-${task._id}`}
                  style={styles.checkbox}
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task._id)}
                />
                <label htmlFor={`task-${task._id}`}>{task.item}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.cardActions}>
        <button style={styles.dateButton}>
         {formattedDate}
        </button>
        <div style={styles.statusButtons}>
          <button style={styles.statusButton}>To Do</button>
          <button style={styles.statusButton}>In Progress</button>
          <button style={styles.statusButton}>Done</button>
        </div>
      </div>

      {isModalOpen && (
        <EditTask 
          task={items}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleEditTaskSubmit}
        />
      )}
    </div>
  );
}
