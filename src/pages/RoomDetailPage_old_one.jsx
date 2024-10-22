import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import ThermometerSvg from "../assets/svg/Thermometer.jsx";
import ExcelIconSvg from "../assets/svg/ExcelIcon.jsx";
import DropletsSvg from "../assets/svg/Droplets.jsx";
import SelectDateButton from "../components/SelectDateButton";
import CustomDatePicker from "../components/CustomDatePicker";
import ChartTable from '../components/ChartTable';


const RoomDetailPage = () => {
    const chartTableRef = useRef();

    const { warehouse_id, room_name } = useParams();
    const averageHeat = 0.8;
    const averageMoisture = 64;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTrend, setSelectedTrend] = useState("temperature");

    const handleDownload = () => {
        if (chartTableRef.current) {
            chartTableRef.current.downloadExcel();
        }
    };

    const onChangeDate = (date) => {
        setSelectedDate(date);
    };

    const avarageBackgroundColor = () => {
        return (
            (averageHeat <= 0.5 && "#34B53A") ||
            (averageHeat > 0.5 && averageHeat <= 1 && "#FFB200") ||
            "#ED2F2F"
        );
    };

    useEffect(() => {
    }, [warehouse_id, room_name]);

    return (
        <div className="p-4 pt-0 relative ">
            <div className="justify-between flex pb-4 items-start">
                <div className="flex items-start justify-center h-8">
                    DETAY
                </div>
            </div>
            <div>
                {/* Average Cards Bar */}
                <div className="sm:flex sm:flex-row justify-between sm:pb-5">
                    <div className="flex flex-row justify-between sm:gap-4 pb-6 sm:pb-0">
                        {/* Average Heat */}
                        <button className="grid grid-cols-12 rounded-2xl p-1 shadow-md hover:shadow-xl transition-shadow duration-300 w-36"
                            style={{ backgroundColor: avarageBackgroundColor() }}
                            onClick={() => setSelectedTrend("temperature")} 
                        >

                            <div className="col-span-2"></div>
                            <div className="grid col-span-8 self-center justify-center py-2">
                                <div className="text-center font-bold text-customGray-700 leading-none text-xl ">
                                    {averageHeat}°C
                                </div>
                                <div className="text-customGray-700 leading-none uppercase text-center">
                                    Sıcaklık
                                </div>
                            </div>
                            <div className="flex col-span-2 items-start justify-end">
                                <ThermometerSvg className="w-18 right-1 top-1" />
                            </div>
                        </button>
                        {/* Average Moisture */}
                        <button className="grid grid-cols-12 rounded-2xl p-1 shadow-md hover:shadow-xl transition-shadow duration-300 w-36 bg-[#40E0D0]"
                            onClick={() => setSelectedTrend("humidity")} 
                        >
                            <div className="col-span-2"></div>
                            <div className="grid col-span-8 self-center justify-center py-2">
                                <div className="text-center font-bold text-customGray-700 leading-none text-xl ">
                                    {averageMoisture}%
                                </div>
                                <div className="text-customGray-700 leading-none uppercase text-center">
                                    Nem
                                </div>
                            </div>
                            <div className="flex col-span-2 items-start justify-end">
                                <DropletsSvg className="w-18 mr-1" />
                            </div>
                        </button>
                    </div>

                    {/* Right Container */}
                    <div className="flex flex-row justify-between pb-6 sm:pb-0">
                        {/* Excel Download Icon */}
                        <div
                            onClick={handleDownload}
                            className="filter hover:drop-shadow-xl drop-shadow-md hover:scale-105 active:scale-95 transition-transform duration-300 cursor-pointer pr-10"
                        >
                            <ExcelIconSvg />
                        </div>

                        <CustomDatePicker
                            onChangeDate={onChangeDate}
                            customInput={(isOpen) => (
                                <SelectDateButton isOpenCalendar={isOpen} />
                            )}
                        />
                    </div>
                </div>
                <div className='h-100'>
                    <ChartTable ref={chartTableRef} selectedDate={selectedDate} selectedTrend={selectedTrend}/>
                </div>
            </div>

            {/* Add more content as needed */}
        </div>
    );
};

export default RoomDetailPage;
