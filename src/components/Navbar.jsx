import React, { useEffect, useState } from "react"; // Import useState
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DoganayLogo from "../assets/DoganayLogo.svg";
import AdileLogo from "../assets/Adile.svg";
import useColors from "../ui/Colors";
import DevicesSvg from "../assets/svg/Devices.jsx";
import MainPageSvg from "../assets/svg/MainPage.jsx";
import SettingsSvg from "../assets/svg/Settings.jsx";
import API from "../utils/utilRequest";

function Navbar() {
  const { PRIMARY } = useColors();
  const [userCustomer, setUserCustomer] = useState(''); // State to hold warrant value


  const navigate = useNavigate();
  const location = useLocation();
  const [warrant, setWarrant] = useState(null); // State to hold warrant value

  const handleMainPageClick = async () => {
    navigate("/mainpage");
  };

  const handleDevicesPageClick = async () => {
    navigate("/devices");
  };

  const handleSettingsPageClick = async () => {
    navigate("/usersettings");
  };

  useEffect(() => {
    const fetchwarrant = async () => {
      try {
        const response = await API.CheckWarrant();
        const userWarrant = response.data.user_warrant; // Fetch the warrant value
        setWarrant(userWarrant); // Update state with fetched warrant
      } catch (error) {
        console.error("Error fetching warrant:", error);
      }
    };

    fetchwarrant();
  }, []);

  useEffect(() => {
    // Function to fetch user colors
    const fetchUserColors = async () => {
      try {
        const response = await API.CheckCustomer();
        const customerId = response.data.customer_id; 
        setUserCustomer(customerId); // Set userCustomer in state
      } catch (error) {
        console.error("Error fetching user colors:", error);
        // Fallback to initialColors in case of error
      }
    };
  
    fetchUserColors();
  }, []);

  const logoSrc = userCustomer === 1 ? DoganayLogo : AdileLogo;

  return (
    <div className={`bg-custom-primary-900 sm:px-6 py-1 md:py-6 md:px-2 fixed w-screen h-24 md:w-24 md:h-screen text-white flex md:flex-col flex-row items-center justify-between transition-all duration-500`}>
      <button
        onClick={handleMainPageClick}
        className={`items-center justify-center w-auto md:w-full h-full md:h-auto p-3 rounded-2xl hover:bg-custom-primary-700 hover:scale-105 transition-all duration-300`}
      >
        <img src={logoSrc} alt={userCustomer === 1 ? "Doganay Logo" : "Adile Logo"} className="w-auto h-full md:h-auto md:w-full" />      </button>

      <div className="flex flex-1 flex-row md:flex-col h-full md:w-full md:h-auto items-center justify-center gap-2 md:gap-6">
        <button
          onClick={handleMainPageClick}
          className={`h-full md:w-full md:h-auto p-3 rounded-2xl flex flex-col items-center justify-center gap-2 ${location.pathname === "/mainpage" ? "bg-custom-primary-700" : `hover:bg-custom-primary-700 hover:scale-105 transition-all duration-300`
            }`}
        >
          <MainPageSvg color={PRIMARY[500]} />
          <span>Anasayfa</span>
        </button>

        <button
          onClick={handleDevicesPageClick}
          className={`h-full md:w-full md:h-auto p-3 rounded-2xl flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-300 ${location.pathname === "/devices" ? "bg-custom-primary-700" : `hover:bg-custom-primary-300`
            }`}
        >
          <DevicesSvg color={PRIMARY[500]} />
          <span>Cihazlar</span>
        </button>
      </div>

      <div className="flex-1 hidden md:flex"></div>

      {/* Conditionally render the Settings button */}
      {warrant !== "0" && (
        <button
          onClick={handleSettingsPageClick}
          className={`h-full md:w-full md:h-auto p-3 rounded-2xl flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-300 ${location.pathname === "/usersettings" ? "bg-custom-primary-700" : `hover:bg-custom-primary-700`
            }`}
        >
          <SettingsSvg color={PRIMARY[500]} />
          <span>Ayarlar</span>
        </button>
      )}
    </div>
  );
}

export default Navbar;
