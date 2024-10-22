import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutSvg from "../assets/svg/Logout";


const LogoutBar = () => {
  const navigate = useNavigate(); 

  const handleLogoutClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      localStorage.removeItem("token"); 
      navigate("/login"); 
    }

  };

  return (
    <div className="flex justify-end px-4 sm:py-5 p-2">
      <button
        className="transform hover:scale-105 transition-transform duration-200"
        onClick={handleLogoutClick}
      >
        <div className="flex text-[#EBA258]">
          <LogoutSvg alt="LogoutLogo" />
          <span className="pl-2">Hesaptan Çık</span>
        </div>
      </button>
    </div>
  );
};

export default LogoutBar;
