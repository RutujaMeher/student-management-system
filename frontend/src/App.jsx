import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import AddMarks from "./pages/AddMarks";
import ViewStudent from "./pages/ViewStudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/add-student" element={<AddStudent />} />

        <Route path="/student/:id" element={<ViewStudent />} />

        <Route path="/student/:id/add-marks" element={<AddMarks />} />

        <Route path="/edit-student/:id" element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;