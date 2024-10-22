import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useParams } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import ChartButton from './ChartButton.jsx';
import useColors from "../ui/Colors";
import API from "../utils/utilRequest.js";
import * as XLSX from 'xlsx';
import AlertWindow from '../components/AlertWindow.jsx';

const ChartTable = forwardRef(({ selectedDate, selectedTrend }, ref) => {
    const token = localStorage.getItem("token");
    const { warehouse_id, room_name } = useParams();
    const { PRIMARY } = useColors();

    // State variables
    const [series, setSeries] = useState([]);
    const [visibleSeries, setVisibleSeries] = useState([]);
    const [allChecked, setAllChecked] = useState(true);
    const [alldeviceIds, setAllDeviceIds] = useState([]);
    const [averageHeat, setAverageTemperature] = useState([]);
    const [averageMoisture, setAverageHumidity] = useState([]);
    const [macids, setMacIds] = useState([]);
    const [cornerids, setCornerIds] = useState([]);



    // Chart options
    const [options, setOptions] = useState({
        chart: {
            type: 'line',
            zoom: { enabled: false },
            events: {
                legendClick: (chartContext, seriesIndex) => true,
            },
        },
        stroke: { width: 2, curve: 'smooth' },
        xaxis: {
            type: 'datetime',
            categories: Array.from({ length: 24 }, (_, i) => {
                const date = new Date();
                date.setHours(i, 0, 0, 0);
                return date.getTime();
            }),
            tickAmount: 24,
            labels: {
                formatter: (value, timestamp) => {
                    const date = new Date(timestamp);
                    return date.getHours().toString().padStart(2, '0') + ':00';
                },
            },
        },
        yaxis: {
            min: -5,
            max: 10,
            tickAmount: 7,
            labels: {
                formatter: value => value.toFixed(2),
            },
        },
        title: {
            text: 'Sıcaklık °C',
            align: 'left',
            style: {
                fontSize: "16px",
                color: '#666',
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#FDD835'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100],
            },
        },
        legend: {
            onItemClick: { toggleDataSeries: false },
            onItemHover: { highlightDataSeries: false },
        },
    });

    // Fetch data on mount and when dependencies change
    useEffect(() => {
        const fetchData = async () => {
            try {
                const devicesResponse = await API.getDevicesbyRoom({
                    room: room_name,
                    warehouse_id,
                });

                const deviceIds = devicesResponse.data.map(device => device.device_id);
                setAllDeviceIds(deviceIds);

                // Fetch MAC IDs and corner numbers
                const macs = await Promise.all(
                    deviceIds.map(device => API.getDeviceById(device).then(response => response.data.device_mac_id))
                );
                const corners = await Promise.all(
                    deviceIds.map(async device => {
                        const response = await API.getDeviceById(device);
                        const cornerNumber = response.data.corner_number;

                        // Map corner_number to the corresponding label
                        switch (cornerNumber) {
                            case "0":
                                return "Orta"; // Center
                            case "1":
                                return "Sol Üst"; // Top Left
                            case "2":
                                return "Sağ Üst"; // Top Right
                            case "3":
                                return "Sol Alt"; // Bottom Left
                            case "4":
                                return "Sağ Alt"; // Bottom Right
                            default:
                                return "Unknown"; // Handle unexpected corner numbers
                        }
                    })
                );

                setCornerIds(corners);
                setMacIds(macs);

                const dateObject = new Date(selectedDate);
                const formattedDate = dateObject.toISOString().split('T')[0];

                const responses = await Promise.all(
                    deviceIds.map(device_id =>
                        API.getTrends({ trend: selectedTrend, device_id, choosendate: formattedDate })
                    )
                );

                const fetchedData = responses.map(response => response.data);

                if (fetchedData && fetchedData.length > 0) {
                    const seriesData = fetchedData.map((data, index) => {
                        const availableTimes = data[0].datetime;
                        const availableValues = data[0].data;

                        // Prepare hourly data with null values for missing hours
                        const hourlyData = Array.from({ length: 24 }, (_, hour) => {
                            const timeString = `${hour.toString().padStart(2, '0')}:00`;
                            const timeIndex = availableTimes.indexOf(timeString);
                            return timeIndex !== -1 ? availableValues[timeIndex] : null;
                        });

                        return {
                            name: `${macs[index]} - ${corners[index]}`, // Combine MAC ID and corner label here
                            data: hourlyData,
                        };
                    });

                    // Generate categories (timestamps for each hour in the day)
                    const categories = Array.from({ length: 24 }, (_, i) => {
                        const date = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), i);
                        return date.getTime();
                    });

                    setSeries(seriesData);
                    setVisibleSeries(new Array(seriesData.length).fill(true));

                    const allData = seriesData.flatMap(serie => serie.data.filter(value => value !== null));
                    const maxYValue = Math.max(...allData, 10); // Fallback to 10 if all values are null



                    setOptions(prevOptions => ({
                        ...prevOptions,
                        xaxis: { ...prevOptions.xaxis, categories },
                        yaxis: {
                            min: selectedTrend === 'temperature' ? -5 : 10,
                            max: maxYValue,
                            tickAmount: 5,
                            labels: {
                                formatter: value => value.toFixed(2),
                            },
                        },
                        title: {
                            text: selectedTrend === 'temperature' ? 'Sıcaklık °C' : 'Nem %',
                        },
                    }));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token, selectedDate, room_name, warehouse_id, selectedTrend]);



    // Reset checked state when date or trend changes
    useEffect(() => {
        setAllChecked(true);
    }, [selectedDate, selectedTrend]);

    // Toggle series visibility
    const toggleSeries = index => {
        setVisibleSeries(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    // Calculate averages for temperature and humidity
    useEffect(() => {
        const calculateAverages = async () => {
            try {
                const temperatures = [];
                const humidities = [];

                for (const device of alldeviceIds) {
                    const temperature = await fetchCurrentValue('temperature', device);
                    const humidity = await fetchCurrentValue('humidity', device);

                    temperatures.push(temperature.toFixed(1));
                    humidities.push(humidity.toFixed(0));
                }

                setAverageTemperature(temperatures);
                setAverageHumidity(humidities);
            } catch (error) {
                console.error("Error calculating averages:", error);
            }
        };

        if (alldeviceIds.length > 0) {
            calculateAverages();
        }
    }, [alldeviceIds]);

    // Fetch current values for trends
    const fetchCurrentValue = async (trend, device_id) => {
        try {
            const response = await API.getCurrentValues({ trend, device_id });
            return response.data[0]?.data[0] || '';
        } catch (error) {
            console.error("Error fetching current values:", error);
            return '';
        }
    };

    // Imperative handle for downloading Excel
    useImperativeHandle(ref, () => ({
        downloadExcel: () => {
            const worksheetData = series.map(serie => [serie.name, ...serie.data]);
            const worksheet = XLSX.utils.aoa_to_sheet([
                ['Time', ...options.xaxis.categories.map(category => new Date(category).toLocaleString())],
                ...worksheetData,
            ]);

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'ChartData');
            XLSX.writeFile(workbook, 'chart_data.xlsx');
        },
    }));

    // Render component


    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="sm:col-span-6 lg:col-span-7 col-span-12 sm:p-5 bg-custom-primary-300/20 rounded-lg ">
                <ReactApexChart
                    options={options}
                    series={series.filter((_, index) => visibleSeries[index])} // Filter series based on visibility
                    type="line"
                    height={450}
                />
            </div>
            <div className="sm:col-span-6 lg:col-span-5 col-span-12 flex flex-col h-full">
                <div className="flex flex-col h-full">
                    <div className="flex flex-col sm:h-1/2 cihazlar order-1 sm:order-2 py-5">
                        <div className='py-2 px-5'>Cihazlar</div>
                        <div className="h-full grid grid-cols-2 gap-4 xl:grid-cols-3 px-5">
                            {series.map((s, index) => (
                                <div
                                    key={index}
                                    onClick={() => toggleSeries(index)}
                                    className='flex justify-center'
                                >
                                    <ChartButton
                                        buttondatas={{
                                            ison: true,
                                            isactive: true,
                                            device_name: macids[index],
                                            temperature: averageHeat[index],
                                            humidity: averageMoisture[index]
                                        }}
                                        allChecked={allChecked}
                                        setAllChecked={setAllChecked}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-center uyarilar order-2 sm:order-1 sm:h-1/2 bg-custom-primary-300/20 rounded-lg pb-4">
                        <AlertWindow />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ChartTable;

