import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/utilRequest"; // Adjust the import path based on your project structure

const WarrantContext = createContext();

export const WarrantProvider = ({ children }) => {
  const [warrant, setWarrant] = useState(null);

  useEffect(() => {
    const fetchWarrant = async () => {
      try {
        const response = await API.CheckWarrant();
        setWarrant(response.data.user_warrant);
      } catch (error) {
        console.error("Error fetching warrant:", error);
      }
    };

    fetchWarrant();
  }, []);

  return (
    <WarrantContext.Provider value={warrant}>
      {children}
    </WarrantContext.Provider>
  );
};

export const useWarrant = () => {
  return useContext(WarrantContext);
};
