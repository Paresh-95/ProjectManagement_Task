import React from 'react';
import Sidebar from '../components/Sidebar';

export default function Analytics() {
  const analyticsData = [
    [
      { label: 'Backlog Tasks', value: '16' },
      { label: 'To-do Tasks', value: '14' },
      { label: 'In-Progress Tasks', value: '03' },
      { label: 'Completed Tasks', value: '22' },
    ],
    [
      { label: 'Low Priority', value: '16' },
      { label: 'Moderate Priority', value: '14' },
      { label: 'High Priority', value: '03' },
      { label: 'Due Date Tasks', value: '03' },
    ]
  ];

  return (
    <div style={styles.container}>
      <Sidebar activePage="analytics" />
      <main style={styles.main}>
        <h1 style={styles.title}>Analytics</h1>
        <div style={styles.analyticsContainer}>
          {analyticsData.map((column, columnIndex) => (
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
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    padding: '0px 40px 40px 40px',
  },
  title: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '22px',
    fontWeight: 600,
    lineHeight: '29.96px',
    textAlign: 'left',
    marginBottom: '50px',
    color: '#000', 
  },

  analyticsContainer: {
    display: 'flex',
    gap: '20px', 
    maxWidth: '800px',
    margin: '20px',
  },
  analyticsBox: {
    flex: 1,
    backgroundColor: '#F9FCFF',  
    borderRadius: '10px',
    padding: '20px',
  },
  analyticsColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  analyticsItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
  },
  analyticsLabel: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '24.51px',
    textAlign: 'left',
    color: '#000000', 
    display: 'flex',
    alignItems: 'center',
},

analyticsDot: {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: '#90C4CC',
  marginRight: '10px',
},

  analyticsValue: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '27.24px',
    textAlign: 'left',
    color: '#000000',
    marginLeft: '10px',
},

  iconSize: {
    fontSize: '1.3em', // Increase icon size by 30%
  },
};