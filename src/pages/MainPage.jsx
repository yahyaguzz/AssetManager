import React, { useEffect, useState, useRef } from "react";
import RoomCard from "../components/RoomCards";
import { useNavigate } from "react-router-dom";
import API from "../utils/utilRequest";
import DownArrowSvg from "../assets/svg/DownArrow";

function MainPage() {
  const [rooms, setRooms] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const dropdownRef = useRef(null);
  const [buttonText, setButtonText] = useState("Tümü");
  const token = localStorage.getItem("token");

  const [toggledButtons, setToggledButtons] = useState({
    yesil_button: false,
    sari_button: false,
    kirmizi_button: false,
  }); // State for button states

  const [colors, setColors] = useState([]); // Add colors list here

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const response = await API.getRooms();
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [token, navigate]);

  // Fetch all warehouses data
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await API.getWarehouse();
        setWarehouses(response.data.warehouses);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
        navigate("/login");
      }
    };

    fetchWarehouses();
  }, [token, navigate]);

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const fetchRoomsByWarehouse = async (warehouseId) => {
    try {
      setIsLoading(true); // Start loading animation
      const response = await API.getWarehouseRooms({
        warehouse_ids: [warehouseId],
      });
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching warehouse rooms:", error);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleButton = (event) => {
    const buttonId = event.target.id;

    setToggledButtons((prev) => ({
      ...prev,
      [buttonId]: !prev[buttonId],
    }));

    handleColor(buttonId);
  };

  const handleColor = (buttonName) => {
    // Define color codes based on button names
    const colorCodes = {
      yesil_button: "#34B53A",  // Green
      sari_button: "#FFB200",    // Yellow
      kirmizi_button: "#ED2F2F"  // Red
    };

    setColors((prevColors) => {
      const isToggled = prevColors.includes(colorCodes[buttonName]);
      const updatedColors = isToggled
        ? prevColors.filter((color) => color !== colorCodes[buttonName])
        : [...prevColors, colorCodes[buttonName]];

      return updatedColors;
    });
  };

  const handleSelect = (text, warehouseId = null) => {
    setButtonText(text);
    setIsDropdownOpen(false);

    // Reset all toggle buttons
    setToggledButtons({
      yesil_button: false,
      sari_button: false,
      kirmizi_button: false,
    });

    setColors([]);

    if (warehouseId) {
      fetchRoomsByWarehouse(warehouseId);
    } else {
      // Fetch all rooms if "Tümü" is selected
      const fetchRooms = async () => {
        try {
          setIsLoading(true); // Start loading animation
          const response = await API.getRooms();
          setRooms(response.data); // Reset rooms to show all
        } catch (error) {
          console.error("Error fetching rooms:", error);
          navigate("/login");
        } finally {
          setIsLoading(false);
        }
      };
      fetchRooms();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCardClick = (warehouse_id, room_name, passTemperature, passHumidity) => {
    navigate(`/sube/${warehouse_id}/oda/${room_name}`, {
      state: {
        passTemperature,
        passHumidity,
      },
    });
  };

  return (
    <div className="p-4 pt-0 relative">

      <div className="flex flex-col">
        <div className="flex items-start justify-between pb-4">
          <div className="flex items-start justify-center h-8">ANA SAYFA</div>
          <div className="relative" ref={dropdownRef}>
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="text-white bg-[#EBA258] gap-2 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center inline-flex items-center transform hover:scale-105 transition-transform duration-200"
              type="button"
            >
              {buttonText} {/* Display the current button text */}
              <DownArrowSvg size={16} color="white" />
            </button>

            {isDropdownOpen && (
              <div
                id="dropdown"
                className="absolute z-40 rounded-lg bg-[#3D0099] w-full"
                style={{ top: "100%", left: 0 }}
              >
                <ul
                  className="py-2 text-sm text-white"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li onClick={() => handleSelect("Tümü")}>
                    <a
                      href="#"
                      className="block w-full px-4 py-2 hover:bg-[#09006F] dark:hover:text-white"
                    >
                      Tümü
                    </a>
                  </li>
                  {warehouses.map((warehouse) => (
                    <li
                      key={warehouse.warehouse_id}
                      onClick={() =>
                        handleSelect(
                          warehouse.warehouse_name,
                          warehouse.warehouse_id
                        )
                      }
                    >
                      <a
                        href="#"
                        className="block w-full px-4 py-2 hover:bg-[#09006F] dark:hover:text-white"
                      >
                        {warehouse.warehouse_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pb-5">
          <button
            id="yesil_button"
            className={`font-medium rounded-lg text-sm w-auto px-5 py-2 text-center inline-flex items-center transform hover:scale-105 transition-transform duration-200 ${toggledButtons.yesil_button ? 'bg-[#34B53A] text-white border border-[#34B53A]' : 'bg-white text-[#34B53A] border border-[#34B53A]'}`}
            type="button"
            onClick={(event) => {
              toggleButton(event);
            }}
          >
            Yeşil
          </button>
          <button
            id="sari_button"
            className={`font-medium rounded-lg text-sm w-auto px-5 py-2 text-center inline-flex items-center transform hover:scale-105 transition-transform duration-200 ${toggledButtons.sari_button ? 'bg-[#FFB200] text-white border border-[#FFB200]' : 'bg-white text-[#FFB200] border border-[#FFB200]'}`}
            type="button"
            onClick={(event) => {
              toggleButton(event);
            }}
          >
            Sarı
          </button>
          <button
            id="kirmizi_button"
            className={`font-medium rounded-lg text-sm w-auto px-5 py-2 text-center inline-flex items-center transform hover:scale-105 transition-transform duration-200 ${toggledButtons.kirmizi_button ? 'bg-[#ED2F2F] text-white border border-[#ED2F2F]' : 'bg-white text-[#ED2F2F] border border-[#ED2F2F]'}`}
            type="button"
            onClick={(event) => {
              toggleButton(event);
            }}
          >
            Kırmızı
          </button>
        </div>

      </div>

      {/* Loading animation */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {rooms.map((room) => (
            <RoomCard
              key={room.room_id}
              room={room}
              onCardClick={handleCardClick}
              colors={colors}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MainPage;
