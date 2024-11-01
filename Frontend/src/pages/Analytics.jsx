import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export default function Analytics() {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyticsUrl = `${process.env.REACT_APP_BACKEND_API}/api/v1/analytics/getUserTaskAnalaytics`;
       
        const response = await axios.get(analyticsUrl,{withCredentials:true } );
        setAnalytics(response.data.analytics);
        setLoading(false);
      } catch (error) {
        console.log("Error Fetching User Task Analytics");
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const analyticsData = [
    [
      { label: "Backlog Tasks", value: analytics.backlogTasks },
      { label: "To-do Tasks", value: analytics.todoTasks },
      { label: "In-Progress Tasks", value: analytics.inProgressTasks },
      { label: "Completed Tasks", value: analytics.completedTasks },
    ],
    [
      { label: "Low Priority", value: analytics.lowPriorityTasks },
      { label: "Moderate Priority", value: analytics.moderatePriorityTasks },
      { label: "High Priority", value: analytics.highPriorityTasks },
      { label: "Total Tasks", value: analytics.totalTasks },
    ],
  ];

  return (
    <div style={styles.container}>
      <Sidebar activePage="analytics" />
      <main style={styles.main}>
        <h1 style={styles.title}>Analytics</h1>
        <div style={styles.analyticsContainer}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            analyticsData.map((column, columnIndex) => (
              <div key={columnIndex} style={styles.analyticsBox}>
                <div style={styles.analyticsColumn}>
                  {column.map((item, index) => (
                    <div key={index} style={styles.analyticsItem}>
                      <span style={styles.analyticsLabel}>
                        <span style={styles.analyticsDot}></span>
                        {item.label}
                      </span>
                      <span style={styles.analyticsValue}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  main: {
    flex: 1,
    overflowY: "auto",
    padding: "0px 40px 40px 40px",
  },
  title: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: "22px",
    fontWeight: 600,
    lineHeight: "29.96px",
    textAlign: "left",
    marginBottom: "50px",
    color: "#000",
  },
  analyticsContainer: {
    display: "flex",
    gap: "20px",
    maxWidth: "800px",
    margin: "20px",
  },
  analyticsBox: {
    flex: 1,
    backgroundColor: "#F9FCFF",
    borderRadius: "10px",
    padding: "20px",
  },
  analyticsColumn: {
    display: "flex",
    flexDirection: "column",
  },
  analyticsItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
  },
  analyticsLabel: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "24.51px",
    textAlign: "left",
    color: "#000000",
    display: "flex",
    alignItems: "center",
  },
  analyticsDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#90C4CC",
    marginRight: "10px",
  },
  analyticsValue: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "27.24px",
    textAlign: "left",
    color: "#000000",
    marginLeft: "10px",
  },
  iconSize: {
    fontSize: "1.3em",
  },
};