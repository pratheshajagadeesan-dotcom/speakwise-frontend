import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import PracticePage from "./pages/PracticePage";
import ReportPage from "./pages/ReportPage";
import HistoryPage from "./pages/HistoryPage";

function App() {

  return (
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<LoginPage />} />

          <Route path="/practice" element={<PracticePage />} />

          <Route path="/report/:id" element={<ReportPage />} />

          <Route path="/history" element={<HistoryPage />} />

        </Routes>
      </BrowserRouter>
  );

}

export default App;