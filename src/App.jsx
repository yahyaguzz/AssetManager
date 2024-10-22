import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/LoginPage";
import Settings from "./pages/SettingsPage";
import MainPage from "./pages/MainPage";
import DevicesPage from "./pages/DevicesPage";
import RoomDetailPage from './pages/RoomDetailPage'; 
import UserSettings from "./pages/UserSettingsPage";
import "react-datepicker/dist/react-datepicker.css";
import useColors from "./ui/Colors";
import LogoutBar from "./components/LogoutBar";
import { hexToRgbValues } from "./ui/Colors";
import { WarrantProvider, useWarrant } from './components/WarrantContext'; // Adjust the import path

function App() {
  const location = useLocation();
  const { PRIMARY } = useColors();
  const warrant = useWarrant(); // Get warrant value from context

  return (
    <div
      className="flex h-screen flex-row md:flex-row"
      style={{
        "--primary-color-300": hexToRgbValues(PRIMARY[300]),
        "--primary-color-400": hexToRgbValues(PRIMARY[400]),
        "--primary-color-500": hexToRgbValues(PRIMARY[500]),
        "--primary-color-600": hexToRgbValues(PRIMARY[600]),
        "--primary-color-700": hexToRgbValues(PRIMARY[700]),
        "--primary-color-800": hexToRgbValues(PRIMARY[800]),
        "--primary-color-900": hexToRgbValues(PRIMARY[900]),
      }}
    >
      { location.pathname !== "/login"&& <Navbar />}
      <div className="flex-1 md:ml-24 mt-24 md:mt-0 p-4 overflow-y-auto transition-all duration-500">
        {location.pathname !== "/login" && <LogoutBar />}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/sube/:warehouse_id/oda/:room_name" element={<RoomDetailPage />} />
          {/* Restrict access to the UserSettings page based on the warrant value */}
          <Route path="/usersettings" element={warrant === "0" ? <Navigate to="/" /> : <UserSettings />} />
          <Route path="/devices" element={<DevicesPage />} />
        </Routes>
      </div>
    </div>
  );
}

// Wrap App in Router to access useLocation
function AppWrapper() {
  return (
    <WarrantProvider>
      <Router>
        <App />
      </Router>
    </WarrantProvider>
  );
}

export default AppWrapper;
