import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewPet from "./pages/NewPet";
import NewTask from "./pages/NewTask";
import Header from "./components/Header";
import Tasks from "./pages/Tasks";
import Signup from "./pages/Signup";
import { SessionProvider } from "./contexts/session";

function App() {
  return (
    <SessionProvider>
      <Router>
        <Header />
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/new-pet" element={<NewPet />} />
            <Route path="/new-task" element={<NewTask />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
