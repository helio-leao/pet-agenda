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
import Pet from "./pages/Pet";
import EditPet from "./pages/EditPet";
import EditUser from "./pages/EditUser";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <SessionProvider>
      <Router>
        <Header />
        <main style={{ padding: 20 }}>
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
              <Route path="/pet/:id" element={<Pet />} />
              <Route path="/edit-pet/:id" element={<EditPet />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
              <Route path="/edit-task/:id" element={<EditTask />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </SessionProvider>
  );
}

export default App;
