import Home from "./pages/Home"
import Chats from "./pages/Chats"
import Login from "./pages/Login"
import Chat from "./context/Provider";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <>
      <div>
        <Router>
          <Chat>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Chat>
        </Router>

      </div>
    </>
  );
}

export default App;
