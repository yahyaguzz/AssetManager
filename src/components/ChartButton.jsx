import React, { useState, useEffect } from "react";
import ChartButtonImage from "../assets/images/ChartButton.png"; // Adjust the path to your image
import GreenHumiditySvg from "../assets/svg/GreenHumidity";
import GreenDegreeSvg from "../assets/svg/GreenDegree";
import ChartButtonCheck from "../assets/svg/ChartButtonCheck";
import useColors from "../ui/Colors";

const ChartButton = ({ buttondatas, allChecked, setAllChecked }) => {
    const [isChecked, setIsChecked] = useState(true);
    const { PRIMARY } = useColors();


    // Destructure the data passed in the buttondatas prop
    const { ison, isactive, device_name, temperature, humidity } = buttondatas;

    // Set the background color based on the isactive value
    const circleColor = isactive ? '#00B074' : '#FF0000'; // Green if active, red if not

    // Function to handle button click
    const handleButtonClick = () => {
        setIsChecked(!isChecked); 
        setAllChecked(false);
    };

    // Effect to set isChecked to true if allChecked is true
    useEffect(() => {
        if (allChecked) {
            setIsChecked(true); // Set isChecked to true if allChecked is true
        }
    }, [allChecked]); // Runs when allChecked changes

    return (
        <button className="relative" onClick={handleButtonClick}>
            <div className="flex flex-row items-center mb-2">
                <div className="relative flex justify-center items-center">
                    <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center border-black border-2">
                        <ChartButtonCheck
                            className={`rounded-md ${!isChecked && 'hidden'}`} 
                            color={PRIMARY[900]}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center mx-2">
                    {/* Circle that changes color based on isactive */}
                    <div
                        style={{
                            backgroundColor: circleColor,
                            borderRadius: '50%',
                            width: '15px', // Diameter of the circle
                            height: '15px',
                        }}
                        className="flex justify-center items-center"
                    ></div>
                </div>
                <div className="text-xs">
                    {device_name} {/* Dynamic device name */}
                </div>
            </div>
            <div className="relative">
                <img
                    src={ChartButtonImage}
                    alt="Chart Button"
                    className="w-full" 
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-[#707070] mr-2">
                    <div className="flex items-center">
                        <div className="flex items-center mr-1">
                            <GreenHumiditySvg alt="Humidity" className="" color="#707070" size="15px" />
                            <div className="text-sm font-bold ml-1">
                                {humidity} {/* Dynamic humidity */}
                            </div>
                        </div>
                        <div className="flex items-center mr-1">
                            <GreenDegreeSvg alt="Temperature" className="" color="#707070" size="17px" />
                            <div className="text-sm font-bold ml-1">
                                {temperature} {/* Dynamic temperature */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default ChartButton;
