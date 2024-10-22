import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PencilSvg from '../assets/svg/Pencil';
import TrashSvg from '../assets/svg/Trash';
import useColors from "../ui/Colors";
import API from "../utils/utilRequest.js";
import DownArrowSvg from '../assets/svg/DownArrow';
import AddDevice from '../components/AddDevice.jsx';
import PutDevice from '../components/PutDevice.jsx';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmationModal from '../components/ConfirmationModal.jsx';



function Devices() {
    const [devices, setDevices] = useState([]);
    const [deviceStatus, setDeviceStatus] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [totalDevices, setTotalDevices] = useState(0);
    const [ascentHeader, setAscentHeader] = useState('device_id');
    const [ascentDescent, setAscentDescent] = useState(true);
    const [searchItem, setSearchItem] = useState(''); // New state for search input
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchItem); // State for debounced search input
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { PRIMARY } = useColors();
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [deviceData, setDeviceData] = useState(null);
    const [SelectdeviceId, setSelectDeviceId] = useState(null); 

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isAddCihazOpen, setIsAddCihazOpen] = useState(false);
    const openAddCihaz = () => setIsAddCihazOpen(true);
    const closeAddCihaz = () => setIsAddCihazOpen(false);

    const [isPutCihazOpen, setIsPutCihazOpen] = useState(false);

    const openPutCihaz = async (deviceId) => {
        setSelectedDeviceId(deviceId); // Set the selected device ID
        try {
            const response = await API.getDeviceById(deviceId); // Fetch device data
            setDeviceData(response.data); // Set the fetched device data
            setIsPutCihazOpen(true); // Open PutDevice component
        } catch (error) {
            console.error('Error fetching device data:', error); // Handle any errors
        }
    };

    const closePutCihaz = () => setIsPutCihazOpen(false);

    useEffect(() => {
        // Debouncing logic for search
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchItem);
        }, 300); // 300ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [searchItem]);

    const fetchDevices = async () => {
        try {
            setIsLoading(true);
            const requestPayload = {
                limit: 10,
                offset: offset,
                ascent_header: ascentHeader,
                ascent_descent: ascentDescent,
                search_item: debouncedSearchTerm
            };

            const response = await API.getDevices(requestPayload);

            if (response.data && Array.isArray(response.data.devices)) {
                setDevices(response.data.devices);
                setTotalDevices(response.data.totalDevices);
            } else {
                if (response.status === 404 && response.data.message === "No devices found for these rooms.") {
                    console.warn('No devices found for these rooms. Resetting devices state.');
                    setDevices([]);
                    setTotalDevices(0);
                } else {
                    setDevices([]);
                    setTotalDevices(0);
                }
            }
        } catch (error) {
            console.error('Error fetching devices:', error);
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                setIsLoading(true);
                const requestPayload = {
                    limit: 10,
                    offset: offset,
                    ascent_header: ascentHeader,
                    ascent_descent: ascentDescent,
                    search_item: debouncedSearchTerm
                };

                const response = await API.getDevices(requestPayload);

                if (response.data && Array.isArray(response.data.devices)) {
                    setDevices(response.data.devices);
                    setTotalDevices(response.data.totalDevices);
                } else {
                    if (response.status === 404 && response.data.message === "No devices found for these rooms.") {
                        console.warn('No devices found for these rooms. Resetting devices state.');
                        setDevices([]);
                        setTotalDevices(0);
                    } else {
                        setDevices([]);
                        setTotalDevices(0);
                    }
                }
            } catch (error) {
                console.error('Error fetching devices:', error);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDevices();
    }, [offset, ascentHeader, ascentDescent, debouncedSearchTerm, token, navigate]);


    const handleStatusChange = (deviceId) => {
        const currentStatus = deviceStatus[deviceId] ?? (devices.find(device => device.device_id === deviceId)?.device_status === 1);
        setDeviceStatus((prevState) => ({
            ...prevState,
            [deviceId]: !currentStatus,
        }));
    };

    const handleNext = () => {
        setOffset(prevOffset => prevOffset + 10);
    };

    const handlePrevious = () => {
        setOffset(prevOffset => Math.max(prevOffset - 10, 0));
    };

    const isNextDisabled = offset + 10 >= totalDevices;



    const deleteConfirm = async (device_id) => {

        setSelectDeviceId(device_id);
        setIsModalOpen(true);
        
    };


    const handleDelete = async () => {

        setIsModalOpen(true);
        
        try {
            const response = await API.deleteDevice(SelectdeviceId);
            toast.success('CİHAZ SİLİNMİŞTİR!');
        } catch (error) {
            toast.error('DAHA SONRA TEKRAR DENEYİN');
            console.error('Error fetching device data:', error);
        }
        fetchDevices()

        setIsModalOpen(false); // Close the modal
    };



    const handleCancel = () => {
        setIsModalOpen(false); // Close the modal without action
      };

    return (
        <div className="p-4 pt-0 relative">
            <ToastContainer />
            <div className="justify-between flex pb-4 items-start">
                <h1 className="flex items-start justify-center h-8">CİHAZLAR</h1>
            </div>
            <div className="w-full bg-custom-primary-300/20 rounded-lg p-4 relative flex items-center md:justify-end jusrify-center">
                <div>
                    <input
                        type="text"
                        placeholder="Cihaz Ara"
                        className="border border-gray-300 rounded-lg p-2 mr-2 flex-grow"
                        value={searchItem} // Controlled input
                        onChange={(e) => setSearchItem(e.target.value)} // Update search item state
                    />
                </div>
                <div>
                    <button
                        className="bg-custom-primary-700 text-white rounded-lg md:px-4 py-2"
                        onClick={openAddCihaz}
                    >
                        Cihaz Ekle +
                    </button>
                </div>
            </div>

            <div className="w-full rounded-lg shadow-lg p-4">
                <div className="overflow-x-auto relative">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                {['Cihaz ID', 'Cihaz MAC Id', 'Cihaz Türü', 'Konum', 'Son Güncelleme', 'Ort. Sıcaklık', 'Ort. Nem', 'Durum', 'Düzenle'].map((header, index) => {
                                    const headerKey = ['device_id','device_mac_id', 'device_type', 'room_name', 'last_update', 'temperature', 'humidity', 'device_status', 'edit'][index];
                                    return (
                                        <th
                                            key={headerKey}
                                            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center ${ascentHeader === headerKey ? 'bg-custom-primary-300/20' : ''}`}
                                            onClick={() => {
                                                setAscentHeader(headerKey);
                                                setAscentDescent(prev => !prev);
                                            }}
                                        >
                                            <button className="flex items-center">
                                                <span>{header}</span>
                                                <DownArrowSvg className="w-4 h-4" />
                                            </button>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {devices.map((device) => (
                                <tr key={device.device_id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{device.device_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{device.device_mac_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{device.device_type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{device.room_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{device.device_update_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{device.temperature}°C</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{device.humidity}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className='flex justify-center items-center'>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={deviceStatus[device.device_id] ?? (device.device_status === 1)}
                                                    onChange={() => handleStatusChange(device.device_id)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-custom-primary-300/60 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer-checked:bg-custom-primary-700 peer transition-all"></div>
                                                <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full transition-all peer-checked:translate-x-full"></div>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center space-x-2">
                                        <button
                                            className=""
                                            onClick={() => openPutCihaz(device.device_id)}
                                        >
                                            <PencilSvg color={PRIMARY[500]} />
                                        </button>
                                        <button className=""
                                            onClick={() => deleteConfirm(device.device_id)}>
                                            <TrashSvg color={'#ff0000'} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrevious}
                    disabled={offset === 0}
                    className={`bg-custom-primary-700 text-white px-4 py-2 rounded ${offset === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Önceki
                </button>
                <button
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className={`bg-custom-primary-700 text-white px-4 py-2 rounded ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Sonraki
                </button>
            </div>
            {isAddCihazOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className='bg-white rounded-lg'>
                        <div className="bg-custom-primary-300/20 rounded-lg p-6 shadow-lg relative">
                            <button
                                onClick={closeAddCihaz}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            >
                                &times; {/* Close icon */}
                            </button>
                            {/* Render the AddDevice component here */}
                            <AddDevice closeAddCihaz={closeAddCihaz} onChange={fetchDevices} />
                        </div>
                    </div>
                </div>
            )}
            {isPutCihazOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className='bg-white rounded-lg'>
                        <div className="bg-custom-primary-300/20 rounded-lg p-6 shadow-lg relative">
                            <button
                                onClick={closePutCihaz}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            >
                                &times; {/* Close icon */}
                            </button>
                            {/* Render the AddDevice component here */}
                            <PutDevice closeAddCihaz={closePutCihaz} deviceId={selectedDeviceId} deviceData={deviceData} onChange={fetchDevices} />
                        </div>
                    </div>
                </div>
            )}
            <ConfirmationModal
                isOpen={isModalOpen}
                message="Cihazı Silmek İstediğinizden Emin Misiniz?"
                onConfirm={handleDelete}
                onCancel={handleCancel}
            />
        </div>
    );
}

export default Devices;
