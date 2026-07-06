import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import PracticePage from "./pages/PracticePage";
import ReportPage from "./pages/ReportPage";
import HistoryPage from "./pages/HistoryPage";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

function App() {

  return (
      <BrowserRouter>

          <Navbar />
        <Routes>

          <Route path="/login" element={<LoginPage />} />

            <Route
                path="/practice"
                element={
                    <PrivateRoute>
                        <PracticePage />
                    </PrivateRoute>
                }
            />

            <Route
                path="/report/:id"
                element={
                    <PrivateRoute>
                        <ReportPage />
                    </PrivateRoute>
                }
            />

            <Route
                path="/history"
                element={
                    <PrivateRoute>
                        <HistoryPage />
                    </PrivateRoute>
                }
            />

            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <AdminPage />
                    </PrivateRoute>
                }
            />

        </Routes>
      </BrowserRouter>
  );

}

export default App;