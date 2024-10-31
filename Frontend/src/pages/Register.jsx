import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

export default function RegistrationComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration submitted', { name, email, password, confirmPassword });
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.astronautContainer}>
          <img src="/placeholder.svg?height=200&width=200" alt="Astronaut" style={styles.astronaut} />
        </div>
        <h2 style={styles.welcome}>Welcome aboard my friend</h2>
        <p style={styles.subtext}>Just a couple of clicks and we start</p>
      </div>
      <div style={styles.rightPanel}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.registerTitle}>Register</h1>
          <div style={styles.inputGroup}>
            <FaRegUser style={styles.inputIcon} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <CiMail style={styles.inputIcon} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <RiLockPasswordLine style={styles.inputIcon} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.showPasswordButton}
            >
              {showPassword ? <FiEyeOff style={styles.iconSize} /> : <FiEye style={styles.iconSize}/>}
            </button>
          </div>
          <div style={styles.inputGroup}>
            <RiLockPasswordLine style={styles.inputIcon} />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              style={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.showPasswordButton}
            >
              {showConfirmPassword ? <FiEyeOff style={styles.iconSize} /> : <FiEye style={styles.iconSize}/>}
            </button>
          </div>
          <button type="submit" style={styles.registerButton}>
            Register
          </button>
          <p style={styles.loginText}>Have an account?</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={styles.loginButton}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  leftPanel: {
    flex: 1,
    backgroundColor: '#17A2B8',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    textAlign: 'center',
  },
  astronautContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '100%',
    padding: '2rem',
    marginBottom: '2rem',
  },
  astronaut: {
    width: '150px',
    height: '150px',
  },
  welcome: {
    fontFamily: 'Open Sans',
    fontSize: '33.08px',
    fontWeight: 600,
    lineHeight: '66.15px',
    textAlign: 'center',
    marginBottom: '0rem', // Adjust margin bottom to reduce gap
  },
  subtext: {
    fontFamily: 'Open Sans',
    fontSize: '19.29px',
    fontWeight: 400,
    lineHeight: '38.59px',
    textAlign: 'center',
    opacity: 0.8,
    marginTop: '0rem', // Optionally adjust margin top if needed
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center align items
  },
  registerTitle: {
    fontFamily: 'Open Sans',
    fontSize: '33.08px',
    fontWeight: 600,
    lineHeight: '45.04px',
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
  },
  inputGroup: {
    marginBottom: '1rem',
    position: 'relative',
    width: '493px', // Make input group take full width
    display: 'flex',
    justifyContent: 'center', // Center input within the group
  },
  inputIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    fontSize: '1.3em',
    transform: 'translateY(-50%)',
    color: '#666',
  },
  input: {
    width: '493px',
    height: '55.13px',
    padding: '0.75rem 2.5rem', // Adjusted padding for better look
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    opacity: '1',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  showPasswordButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
  },
  registerButton: {
    width: '493px', // Set register button width to 493px
    height: '55.13px',
    padding: '0.75rem',
    fontFamily: 'Open Sans',
    fontSize: '19.29px',
    fontWeight: 400,
    lineHeight: '26.28px',
    textAlign: 'center',
    backgroundColor: '#17A2B8',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    marginTop: '1rem',
    boxSizing: 'border-box',
  },
  loginText: {
    marginTop: '1rem',
    fontFamily: 'Open Sans',
    fontSize: '19.29px',
    fontWeight: 400,
    lineHeight: '26.28px',
    textAlign: 'center', // Centered the text
    color: '#828282',
  },
  loginButton: {
    width: '493px', // Set login button width to 493px
    height: '55.13px',
    padding: '0.75rem',
    fontFamily: 'Open Sans',
    fontSize: '19.29px',
    fontWeight: 400,
    lineHeight: '26.28px',
    textAlign: 'center',
    backgroundColor: 'white',
    color: '#17A2B8',
    border: '1px solid #17A2B8',
    borderRadius: '25px',
    cursor: 'pointer',
    marginTop: '0.5rem',
    boxSizing: 'border-box',
  },
  iconSize: {
    fontSize: '1.3em', // Increase icon size by 30%
  },
};
