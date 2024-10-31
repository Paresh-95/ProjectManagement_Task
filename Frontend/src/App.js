import Login from "./pages/Login"
import Register from "./pages/Register"
import Analytics from "./pages/Analytics"
import Home from "./pages/Home"
import Settings from "./pages/Settings"
import { Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
   <>
   <div>
   <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/analytics" element={<Analytics />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
          
          </Routes>
   </div>
   </>
  );
}

export default App;
