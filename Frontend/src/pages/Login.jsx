import React, { useContext, useState } from 'react';
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const handleSubmit = (e) => {
    const userCred = {
      email,password
    }
    e.preventDefault(); 
    login(userCred)
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.astronautContainer}>
          <div style={styles.logoBackground}>
            <img src="/Group.png" alt="Group Logo" style={styles.astronaut} />
          </div>
        </div>
        <h2 style={styles.welcome}>Welcome aboard my friend</h2>
        <p style={styles.subtext}>just a couple of clicks and we start</p>
      </div>
      <div style={styles.rightPanel}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.loginTitle}>Login</h1>
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
              {showPassword ? <FiEyeOff style={styles.iconSize} /> : <FiEye style={styles.iconSize}/> }
            </button>
          </div>
          <button type="submit" style={styles.loginButton}>
            Log in
          </button>
          <p style={styles.registerText}>
            Have no account yet?
          </p>
          <button 
            onClick={() => navigate('/register')} 
            type="button" 
            style={styles.registerButton}
          >
            Register
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
    position: 'relative',
    marginBottom: '2rem',
  },
  logoBackground: {
    width: '304.58px',
    height: '304.58px',
    backgroundColor: '#317F8B',
    borderRadius: '50%', // Makes it round
    opacity: 0.6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: '0rem',
  },
  subtext: {
    fontFamily: 'Open Sans',
    fontSize: '19.29px',
    fontWeight: 400,
    lineHeight: '38.59px',
    textAlign: 'center',
    opacity: 0.8,
    marginTop: '0rem',
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
    alignItems: 'center',
  },
  loginTitle: {
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
    width: '493px',
    display: 'flex',
    justifyContent: 'center',
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
    padding: '0.75rem 2.5rem',
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
  loginButton: {
    width: '493px',
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
  registerText: {
    marginTop: '1rem',
    fontFamily: 'Open Sans',
    fontSize: '19.29px',
    fontWeight: 400,
    lineHeight: '26.28px',
    textAlign: 'center',
    color: '#828282',
  },
  registerButton: {
    width: '493px',
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
    fontSize: '1.3em',
  },
};
