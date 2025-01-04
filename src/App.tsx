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
import Tasks from "./pages/Tasks";
import Signup from "./pages/Signup";
import { SessionProvider } from "./contexts/session";
import Pet from "./pages/Pet";
import EditPet from "./pages/EditPet";
import EditUser from "./pages/EditUser";
import EditTask from "./pages/EditTask";
import Pets from "./pages/Pets";
import VerifyAccount from "./pages/VerifyAccount";

function App() {
  return (
    <SessionProvider>
      <Router>
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-account/:token" element={<VerifyAccount />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/new-pet" element={<NewPet />} />
            <Route path="/new-task" element={<NewTask />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pet/:id" element={<Pet />} />
            <Route path="/edit-pet/:id" element={<EditPet />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
