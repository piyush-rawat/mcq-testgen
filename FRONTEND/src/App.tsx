import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";

import "./App.css";
import CreateTestPage from "./pages/CreateTestPage";
import TestPage from "./pages/TestPage";
import ResultsPage from "./pages/ResultsPage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <SnackbarProvider>
      <GoogleOAuthProvider clientId="622136685107-017damgo50vqk4btgaqt4a577sth4hls.apps.googleusercontent.com">
        <Navbar />
        <Router>
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute element={<DashboardPage />} />}
            />
            <Route
              path="/create"
              element={<PrivateRoute element={<CreateTestPage />} />}
            />
            <Route
              path="/test/:slug"
              element={<PrivateRoute element={<TestPage />} />}
            />
            <Route
              path="/result/:slug"
              element={<PrivateRoute element={<ResultsPage />} />}
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </SnackbarProvider>
  );
};

export default App;
