import { Routes, Route, } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import "./styles/styles.css";

export default function App() {
  return (
    <div>
      
      {}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
