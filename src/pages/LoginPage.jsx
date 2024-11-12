import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowPasswordSvg from "../assets/svg/ShowPassword.jsx";
import HidePasswordSvg from "../assets/svg/HidePassword.jsx";
import API from "../utils/utilRequest.js";
import axios from "axios";
import { useColorContext } from "../ui/ColorContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { PRIMARY, setColors } = useColorContext();

  const navigate = useNavigate();

  // On component mount, check if email/password are saved in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true); // Set rememberMe to true if credentials are found
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.login({
        user_email: email,
        user_password: password,
      });

      if (response.data.message === "Login successful") {
        const token = response.data.token;
        setColors({ PRIMARY: "#1ed6b7" });
        localStorage.setItem("token", token);

        // If "Remember Me" is checked, save email and password to localStorage
        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
        } else {
          // If unchecked, remove email and password from localStorage
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }

        navigate("/mainpage");
      } else {
        setMessage("Login failed. Please check your credentials. Acaba1");
      }
    } catch (error) {
      setMessage("Login failed. Please check your credentials. Acaba2");
    }
  };

  return (
    <div className="flex items-center justify-center relative">
      <div className="bg-white md:p-8 px-5 py-4 rounded-lg shadow-lg w-full md:w-96 md:h-screen">
        <h2 className="text-2xl font-bold text-center text-[#09006F] md:my-2 ">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#9747FF]"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#9747FF]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-end pr-3 pb-2"
            >
              {showPassword ? (
                <ShowPasswordSvg alt="Hide password" />
              ) : (
                <HidePasswordSvg alt="Show password" />
              )}
            </button>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Remember Me</label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#09006F] text-white p-2 rounded hover:bg-[#9747FF] transition duration-200"
          >
            Login
          </button>
        </form>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
