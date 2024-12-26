import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewPet from "./pages/NewPet";
import Header from "./components/Header";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new-pet" element={<NewPet />} />
      </Routes>
    </Router>
  );
}

export default App;
