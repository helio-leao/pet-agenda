import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewPetPage from "./pages/NewPetPage";
import NewTaskPage from "./pages/NewTaskPage";
import TasksPage from "./pages/TasksPage";
import SignupPage from "./pages/SignupPage";
import { SessionProvider } from "./contexts/SessionContext";
import PetPage from "./pages/PetPage";
import EditPetPage from "./pages/EditPetPage";
import EditUserPage from "./pages/EditUserPage";
import EditTaskPage from "./pages/EditTaskPage";
import PetsPage from "./pages/PetsPage";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import PetWeightRecordsPage from "./pages/PetWeightRecordsPage";

function App() {
  return (
    <SessionProvider>
      <Router>
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/verify-account/:token"
              element={<VerifyAccountPage />}
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/new-pet" element={<NewPetPage />} />
            <Route path="/new-task" element={<NewTaskPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/pets" element={<PetsPage />} />
            <Route path="/pet/:id" element={<PetPage />} />
            <Route path="/edit-pet/:id" element={<EditPetPage />} />
            <Route path="/edit-user/:id" element={<EditUserPage />} />
            <Route path="/edit-task/:id" element={<EditTaskPage />} />
            <Route
              path="/pet-weight-records/:id"
              element={<PetWeightRecordsPage />}
            />
          </Route>
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
