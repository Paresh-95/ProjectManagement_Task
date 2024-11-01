import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom";
import './App.css';
import PublicPage from "./pages/PublicPage";

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
          <Route path="/publicpage" element={<PublicPage/>}></Route>

        </Routes>
      </div>
    </>
  );
}

export default App;
