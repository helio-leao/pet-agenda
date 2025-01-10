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
import NewPetWeightRecordPage from "./pages/NewPetWeightRecordPage";
import EditPetWeightRecordPage from "./pages/EditPetWeightRecordPage";
import NewTaskDonePage from "./pages/NewTaskDonePage";
import TaskPage from "./pages/TaskPage";

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
            <Route path="/users/:id/edit" element={<EditUserPage />} />
            <Route path="/pets" element={<PetsPage />} />
            <Route path="/pets/new" element={<NewPetPage />} />
            <Route path="/pets/:id" element={<PetPage />} />
            <Route path="/pets/:id/edit" element={<EditPetPage />} />
            <Route
              path="/pets/:id/weight-records/new"
              element={<NewPetWeightRecordPage />}
            />
            <Route
              path="/pets/:petId/weight-records/:recordId/edit"
              element={<EditPetWeightRecordPage />}
            />
            <Route
              path="/pets/:id/weight-records"
              element={<PetWeightRecordsPage />}
            />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/new" element={<NewTaskPage />} />
            <Route path="/tasks/:id" element={<TaskPage />} />
            <Route path="/tasks/:id/edit" element={<EditTaskPage />} />.
            <Route path="/tasks/:id/complete" element={<NewTaskDonePage />} />
          </Route>
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
