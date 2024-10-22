import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './ConfirmationModal';
import API from "../utils/utilRequest";

const PutUser = ({ closeAddUser, userId, UserData, onChange }) => {
    // Individual states for each input field
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [permission, setPermission] = useState('');
    const [rooms, setRooms] = useState([]);
    const token = localStorage.getItem("token");

    const [depotRooms, setDepotRooms] = useState({});
    const [checkedRooms, setCheckedRooms] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [NewUserData, setNewUserData] = useState('');

    // Prefill the form with UserData
    useEffect(() => {
        if (UserData) {
            setUsername(UserData.user_name || '');
            setEmail(UserData.user_email || '');
            setPhoneNumber(UserData.user_phone || '');
            setPassword(UserData.user_password || '');
            setPermission(UserData.user_warrant === 'user' ? 0 : 1);
            setRooms(UserData.room_id || []); // Use UserData to set rooms
        }
    }, [UserData]);

    //console.log(UserData.user_id);

    useEffect(() => {
        const fetchRoomsAndWarehouses = async () => {
            try {
                const roomsResponse = await API.getRooms();
                const warehousesResponse = await API.getWarehouse();

                const rooms = roomsResponse.data;
                const warehouses = warehousesResponse.data.warehouses;

                const warehouseMap = warehouses.reduce((acc, warehouse) => {
                    acc[warehouse.warehouse_id] = warehouse.warehouse_name;
                    return acc;
                }, {});

                const organizedRooms = rooms.reduce((acc, room) => {
                    const warehouseName = warehouseMap[room.warehouse_id];
                    if (!acc[warehouseName]) {
                        acc[warehouseName] = [];
                    }
                    acc[warehouseName].push({ id: room.room_id, name: room.room_name });
                    return acc;
                }, {});

                setDepotRooms(organizedRooms);

                // Initialize checkedRooms based on UserData.room_id
                const initialCheckedRooms = Object.fromEntries(
                    Object.keys(organizedRooms).map(depo => [
                        depo,
                        organizedRooms[depo].map(room => ({
                            ...room,
                            checked: (UserData.room_id || []).includes(room.id) // Check if room is in UserData.room_id
                        }))
                    ])
                );
                setCheckedRooms(initialCheckedRooms);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchRoomsAndWarehouses();
    }, [UserData.room_id]);
    
    const handleDepotCheck = (depo, checked) => {
        setCheckedRooms((prev) => ({
            ...prev,
            [depo]: depotRooms[depo].map((room) => ({
                ...room,
                checked: checked,
            })),
        }));
    };



    const handleRoomCheck = (depo, roomId) => {
        setCheckedRooms((prev) => {
            const currentDepotRooms = prev[depo] || [];
            return {
                ...prev,
                [depo]: currentDepotRooms.map((r) =>
                    r.id === roomId ? { ...r, checked: !r.checked } : r
                ),
            };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "phoneNumber":
                setPhoneNumber(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "permission":
                setPermission(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedRooms = Object.entries(checkedRooms).flatMap(([depo, rooms]) =>
            rooms.filter(room => room.checked).map(room => room.id)
        );

        const formattedData = {
            user_name: username,
            user_email: email,
            user_password: password,
            user_warrant: permission,
            user_phone: phoneNumber,
            user_active: "1",
            room_id: selectedRooms
        };

        setIsModalOpen(true);
        setNewUserData(formattedData);
    };

    const handleConfirm = async () => {
        try {
            const response = await API.updateUser(userId ,NewUserData);
            toast.success('KULLANICI GÜNCELLENMİŞTİR!');

            // Clear all input states
            setUsername('');
            setEmail('');
            setPhoneNumber('');
            setPassword('');
            setPermission('');

            // Clear checked rooms
            const resetCheckedRooms = Object.fromEntries(
                Object.keys(depotRooms).map(depo => [
                    depo,
                    depotRooms[depo].map(room => ({ ...room, checked: false }))
                ])
            );
            setCheckedRooms(resetCheckedRooms);
        } catch (err) {
            toast.error('DAHA SONRA TEKRAR DENEYİN');
            console.error('Error adding user:', err);
        }
        onChange();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='sm:w-[800px]'>
            <label className="mb-4 flex justify-between">
                Kullanıcı Güncelle
                <button
                    onClick={() => closeAddUser()}
                    className="text-gray-600 hover:text-gray-900"
                >
                    {/* Optional close button can go here */}
                </button>
            </label>
            <hr className="my-4 border-gray-300" />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Column */}
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="username">
                                Kullanıcı adı:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                                value={username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                Mail adresi:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="phoneNumber">
                                Telefon Numarası:
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                                value={phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="password">
                                Şifre:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                                value={password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1" htmlFor="permission">
                                Yetki:
                            </label>
                            <select
                                id="permission"
                                name="permission"
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                                value={permission}
                                onChange={handleChange}
                            >
                                <option value="">Seçin...</option>
                                <option value="1">Admin</option>
                                <option value="0">Kullanıcı</option>
                            </select>
                        </div>
                    </div>

                    {/* Second Column */}
                    <div>
                        {/* Rooms selection logic */}
                        <div className="mb-4 h-full">
                            <label className="block text-gray-700 mb-1" htmlFor="permission">
                                Şubeler :
                            </label>
                            <div className="md:max-h-96 max-h-40 overflow-y-auto border border-gray-300 rounded-lg shadow-sm p-4 bg-white">
                                {Object.entries(depotRooms).map(([depo, rooms]) => {
                                    const depotCheckedRooms = checkedRooms[depo] || rooms.map((room) => ({ ...room, checked: false }));
                                    const allChecked = depotCheckedRooms.every(room => room.checked);

                                    return (
                                        <div key={depo}>
                                            <div className="flex items-center mb-2">
                                                <input
                                                    type="checkbox"
                                                    id={`depot-${depo}`}
                                                    checked={allChecked}
                                                    onChange={(e) => handleDepotCheck(depo, e.target.checked)}
                                                />
                                                <label htmlFor={`depot-${depo}`} className="ml-2 font-semibold">{depo}</label>
                                            </div>
                                            <div className="pl-6">
                                                {depotCheckedRooms.map((room) => (
                                                    <div key={room.id} className="flex items-center mb-1">
                                                        <input
                                                            type="checkbox"
                                                            id={`room-${room.id}`}
                                                            checked={room.checked}
                                                            onChange={() => handleRoomCheck(depo, room.id)}
                                                        />
                                                        <label htmlFor={`room-${room.id}`} className="ml-2">{room.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Kullanıcı Güncelle
                </button>
            </form>

            <ConfirmationModal
                message="Kullanıcıyı Güncellemek İstediğinizden Emin Misiniz?"
                isOpen={isModalOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default PutUser;