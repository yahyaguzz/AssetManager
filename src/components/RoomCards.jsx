import React, { useEffect, useState, useRef } from "react";
import BlueHumiditySvg from "../assets/svg/BlueHumidity.jsx";
import GreenDegreeSvg from "../assets/svg/GreenDegree.jsx";
import GreenHumiditySvg from "../assets/svg/GreenHumidity.jsx";
import LineSvg from "../assets/svg/Line.jsx";
import OrangeDegreeSvg from "../assets/svg/OrangeDegree.jsx";
import RightArrowSvg from "../assets/svg/RightArrow.jsx";
import API from "../utils/utilRequest";

const RoomCard = ({ room, onCardClick, colors }) => {
  // Calculate averages
  const totalDevices = room.devices.length;
  const warehouse_id = room.warehouse_id;
  const room_name = room.room_name;

  // Sort devices by corner_number
  const sortedDevices = room.devices.sort((a, b) => {
    if (a.corner_number === 0) return 1; // Place devices with corner_number 0 at the end
    if (b.corner_number === 0) return -1; // Place devices with corner_number 0 at the end
    return a.corner_number - b.corner_number; // Otherwise sort in ascending order
  });

  const cardClick = () => {
    onCardClick(warehouse_id, room_name);
  };

  const avgTemperature =
    room.devices.reduce(
      (acc, device) => acc + parseFloat(device.temperature),
      0
    ) / totalDevices;

   const avgHumidity =
    room.devices.reduce(
      (acc, device) => acc + parseFloat(device.humidity),
      0
    ) / totalDevices;

  
  const useCurrentValue = (trend, device_id) => {
    const [currentValue, setCurrentValue] = useState('');
  
    const fetchCurrents = async () => {
      try {
        const response = await API.getCurrentValues({ trend, device_id });
        setCurrentValue(response.data[0]?.data[0] || ''); // Default to empty string if data is not available
      } catch (error) {
        console.error("Error fetching current values:", error);
        setCurrentValue(''); // Optionally handle errors by resetting the value
      }
    };
  
    useEffect(() => {
      fetchCurrents();
    }, [trend, device_id]); // Re-fetch when trend or device_id changes
  
    return currentValue;
  };


  // Determine card color based on avgTemperature
  let card_color;
  if (avgTemperature > 0.47) {
    card_color = "#ED2F2F"; // Red color
  } else if (avgTemperature >= 0.43 && avgTemperature <= 0.47) {
    card_color = "#FFB200"; // Orange color
  } else {
    card_color = "#34B53A"; // Green color
  }

  // Check if colors array is empty or if the card color is in the colors array
  if (colors.length > 0 && !colors.includes(card_color)) {
    return null; // Hide this element if colors are not empty and card_color is not in the array
  }

  return (
    <button
      className="w-100 rounded-2xl py-8 relative transition-transform duration-300 hover:scale-105"
      onClick={cardClick}
      style={{
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
        backgroundColor: card_color,
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-[0] text-white flex flex-col rounded-2xl p-2">
        <div className="flex justify-between h-1/2">
          {/* First Corner */}
          <div className="flex items-start justify-start w-1/2 h-full">
            <div>
              <div className="flex items-center">
                <div className="flex items-center p-1">
                  <GreenHumiditySvg alt="Humidity" className="mr-1" />
                  <div className="text-sm font-bold">
                    {room.devices.find(device => device.corner_number === "1")?.humidity}
                  </div>
                </div>
                <div className="flex items-center p-1">
                  <GreenDegreeSvg alt="Temperature" className="mr-1" />
                  <div className="text-sm font-bold">
                    {room.devices.find(device => device.corner_number === "1")?.temperature}
                  </div>
                </div>
              </div>
              <div className="text-center text-lg font-extralight leading-none">
                {room.devices.some(device => device.corner_number === "1") ? "Device 1" : "Boş Köşe"}
              </div>
            </div>
          </div>

          {/* Second Corner */}
          <div className="flex items-start justify-end w-1/2 h-full">
            <div>
              <div className="flex items-center">
                <div className="flex items-center p-1">
                  <GreenHumiditySvg alt="Humidity" className="mr-1" />
                  <div className="text-sm font-bold">
                    {room.devices.find(device => device.corner_number === "2")?.humidity}
                  </div>
                </div>
                <div className="flex items-center p-1">
                  <GreenDegreeSvg alt="Temperature" className="mr-1" />
                  <div className="text-sm font-bold">
                    {room.devices.find(device => device.corner_number === "2")?.temperature}
                  </div>
                </div>
              </div>
              <div className="text-center text-lg font-extralight leading-none">
                {room.devices.some(device => device.corner_number === "2") ? "Device 2" : "Boş Köşe"}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between h-1/2">
          {/* Third Corner */}
          <div className="flex items-end justify-start w-1/2 h-full">
            <div>
              <div className="text-center text-lg font-extralight leading-none">
                {room.devices.some(device => device.corner_number === "3") ? "Device 3" : "Boş Köşe"}
              </div>
              <div className="flex items-center">
                <div className="flex items-center p-1">
                  <GreenHumiditySvg alt="Humidity" className="mr-1" />
                  <div className="text-sm font-bold">
                    {room.devices.find(device => device.corner_number === "3")?.humidity}
                  </div>
                </div>
                <div className="flex items-center p-1">
                  <GreenDegreeSvg alt="Temperature" className="mr-1" />
                  <div className="text-sm font-bold">
                    {room.devices.find(device => device.corner_number === "3")?.temperature}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth Corner */}
          <div className="flex items-end justify-end w-1/2 h-full">
            <div>
              <div className="text-center text-lg font-extralight leading-none">
                {room.devices.some(device => device.corner_number === "4") ? "Device 4" : "Boş Köşe"}
              </div>
              <div className="flex items-center">
                <div className="flex items-center p-1">
                  <GreenHumiditySvg alt="Humidity" className="mr-1" />
                  <div className="text-sm font-bold">
                    {room.devices.find(device => device.corner_number === "4")?.humidity}
                  </div>
                </div>
                <div className="flex items-center p-1">
                  <GreenDegreeSvg alt="Temperature" className="mr-1" />
                  <div className="text-sm font-bold">
                    {room.devices.find(device => device.corner_number === "4")?.temperature}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Arrow */}
      <div className="absolute inset-0 z-[0] text-white flex flex-col justify-center items-end">
        <RightArrowSvg alt="RightArrow" />
      </div>

      {/* Circular Elements */}
      <div className="flex justify-center items-center relative py-4 pt-6">
        {/* White Ring */}
        <div
          className="w-40 h-40 bg-white rounded-full absolute"
          style={{
            clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%, 50% 50%)",
          }}
        >
          {/* Overlaying Div */}
        </div>

        {/* Green Ring */}
        <div
          className="w-40 h-40 bg-[#00B074] rounded-full absolute"
          style={{
            clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 97%, 47% 50%)",
            border: "1px solid white",
          }}
        ></div>

        {/* White Circle */}
        <div
          className="w-32 h-32 bg-white rounded-full flex justify-center items-center flex-col relative z-10"
          style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.8)" }}
        >
          <div className="text-center">
            <div className="flex items-center">
              <OrangeDegreeSvg alt="Degree" className="ml-2" />
              <div className="text-base ml-1 font-bold">
                {isNaN(avgTemperature) ? "-" : avgTemperature.toFixed(1)}
              </div>
            </div>
            <div
              className="text-xs text-[#858585]"
              style={{
                textShadow: "1px 4px 3px rgba(0, 0, 0, 0.1)",
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 400,
              }}
            >
              Ortalama
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg text-[#595959]">{room.room_name}</div>
            <div
              className="text-xs text-[#858585]"
              style={{
                textShadow: "1px 4px 3px rgba(0, 0, 0, 0.1)",
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 300,
              }}
            >
              Toplam Cihaz Sayısı: {totalDevices}
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-xs text-[#858585]"
              style={{
                textShadow: "1px 4px 3px rgba(0, 0, 0, 0.1)",
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 400,
              }}
            >
              Ortalama
            </div>
            <div className="flex items-center">
              <div className="ml-3"> {/* Add margin to the right of the SVG */}
                <BlueHumiditySvg alt="Humidity" />
              </div>
              <div className="text-sm mr-2 font-bold"> {/* Change text size from text-base to text-sm */}
                {isNaN(avgHumidity) ? "-" : avgHumidity.toFixed(1)}
              </div>
            </div>

          </div>
        </div>
      </div>
    </button>
  );
};

export default RoomCard;
