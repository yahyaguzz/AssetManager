import React, { useEffect, useState } from 'react';
import API from "../utils/utilRequest.js";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import DownArrowSvg from '../assets/svg/DownArrow';
import PencilSvg from '../assets/svg/Pencil';
import TrashSvg from '../assets/svg/Trash';
import useColors from "../ui/Colors";
import AddUser from '../components/AddUser.jsx';
import PutUser from '../components/PutUser.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';

function UserSettings() {
    const [users, setUsers] = useState([]);
    const [userStatus, setUserStatus] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [searchItem, setSearchItem] = useState(''); // New state for search input
    const [ascentHeader, setAscentHeader] = useState(""); // Add state for ascentHeader
    const [ascentDescent, setAscentDescent] = useState(true); // Add state for ascentDescent
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Add state for search term
    const [userData, setUserData] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const [token, setToken] = useState(""); // Example for token if needed
    const navigate = useNavigate(); // Assuming you're using react-router
    const { PRIMARY } = useColors();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const openAddUser = () => setIsAddUserOpen(true);
    const closeAddUser = () => setIsAddUserOpen(false);


    const [isPutUserOpen, setIsPutUserOpen] = useState(false);

    const openPutUser = async (UserId) => {
        setSelectedUserId(UserId); // Set the selected device ID
        try {
            const response = await API.getUserById(UserId); // Fetch device data
            setUserData(response.data); // Set the fetched device data
            setIsPutUserOpen(true); // Open PutDevice component
        } catch (error) {
            console.error('Error fetching device data:', error); // Handle any errors
        }
    };

    const closePutUser = () => setIsPutUserOpen(false);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const requestPayload = {
                limit: 10,
                offset: offset,
                ascent_header: ascentHeader,
                ascent_descent: ascentDescent,
                search_item: debouncedSearchTerm
            };
            const response = await API.getUsers(requestPayload);
            setUsers(response.data.data);

            setTotalUsers(users.length);
        } catch (error) {
            console.error('Error fetching devices:', error);
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const requestPayload = {
                    limit: 10,
                    offset: offset,
                    ascent_header: ascentHeader,
                    ascent_descent: ascentDescent,
                    search_item: debouncedSearchTerm
                };
                const response = await API.getUsers(requestPayload);
                setUsers(response.data.data);
                setTotalUsers(users.length);
            } catch (error) {
                console.error('Error fetching devices:', error);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();  // Make sure to call the function
    }, [offset, ascentHeader, ascentDescent, debouncedSearchTerm, token, navigate]);


    const handleStatusChange = (userId) => {
        const user = users.find(user => user.user_id === userId);
        const currentStatus = userStatus[userId] ?? (user.user_status === 1);
        setUserStatus((prevState) => ({
            ...prevState,
            [userId]: !currentStatus, // Toggle the status
        }));

    };


    const handleNext = () => {
        setOffset(prevOffset => prevOffset + 10);
    };

    const handlePrevious = () => {
        setOffset(prevOffset => Math.max(prevOffset - 10, 0));
    };

    const isNextDisabled = offset + 10 >= totalUsers;

    useEffect(() => {
        // Debouncing logic for search
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchItem);
        }, 300); // 300ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [searchItem]);

    const deleteConfirm = async (user_id) => {

        setSelectedUserId(user_id);
        setIsModalOpen(true);

    };


    const handleDelete = async () => {

        setIsModalOpen(true);

        try {
            const response = await API.deleteUser(selectedUserId);
            toast.success('KULLANICI SİLİNMİŞTİR!');
        } catch (error) {
            toast.error('DAHA SONRA TEKRAR DENEYİN');
            console.error('Error fetching device data:', error);
        }

        fetchUsers();
        setIsModalOpen(false); // Close the modal
    };

    const handleCancel = () => {
        setIsModalOpen(false); // Close the modal without action
      };

    return (
        <div className="p-4 pt-0 relative">
            <ToastContainer />
            <div className="justify-between flex pb-4 items-start">
                <h1 className="flex items-start justify-center h-8">KULLANICILAR</h1>
            </div>
            <div className="w-full bg-custom-primary-300/20 rounded-lg p-4 relative flex items-center md:justify-end jusrify-center">
                <div>
                    <input
                        type="text"
                        placeholder="User Ara"
                        className="border border-gray-300 rounded-lg p-2 mr-2 flex-grow"
                        value={searchItem} // Controlled input
                        onChange={(e) => setSearchItem(e.target.value)} // Update search item state
                    />
                </div>
                <div>
                    <button
                        className="bg-custom-primary-700 text-white rounded-lg md:px-4 py-2"
                        onClick={openAddUser}
                    >
                        Kullaıcı Ekle +
                    </button>
                </div>
            </div>

            <div className="w-full rounded-lg shadow-lg p-4">
                <div className="overflow-x-auto relative">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                {['Kullanıcı ID', 'Kullanıcı Adı', 'E-posta', 'Yetki', 'Telefon', 'Durum', 'Düzenle'].map((header, index) => {
                                    const headerKey = ['user_id', 'user_name', 'user_email', 'user_warrant', 'user_phone', 'user_active', 'düzenle'][index];
                                    return (
                                        <th
                                            key={headerKey} // Ensure each header has a unique key
                                            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${ascentHeader === headerKey ? 'bg-custom-primary-300/20' : ''} text-center`}
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
                            {users.map((user) => (
                                <tr key={`user_${user.user_id}`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{user.user_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{user.user_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{user.user_email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{user.user_warrant}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{user.user_phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className='flex justify-center items-center'>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={userStatus[user.user_id] ?? (user.user_status === 1)}
                                                    onChange={() => handleStatusChange(user.user_id)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-custom-primary-300/60 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer-checked:bg-custom-primary-700 peer transition-all"></div>
                                                <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full transition-all peer-checked:translate-x-full"></div>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center space-x-2">
                                        <button
                                            onClick={() => openPutUser(user.user_id)}>
                                            <PencilSvg color={PRIMARY[500]} />
                                        </button>
                                        <button
                                            onClick={() => deleteConfirm(user.user_id)}>
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


            {isAddUserOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className='bg-white rounded-lg'>
                        <div className="bg-custom-primary-300/20 rounded-lg p-6 shadow-lg relative">
                            <button
                                onClick={closeAddUser}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            >
                                &times; {/* Close icon */}
                            </button>
                            {/* Render the AddDevice component here */}
                            <AddUser closeAddUser={closeAddUser} onChange={fetchUsers} />
                        </div>
                    </div>
                </div>
            )}
            {isPutUserOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className='bg-white rounded-lg'>
                        <div className="bg-custom-primary-300/20 rounded-lg p-6 shadow-lg relative">
                            <button
                                onClick={closePutUser}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            >
                                &times; {/* Close icon */}
                            </button>
                            {/* Render the AddDevice component here */}
                            <PutUser closeAddUser={closePutUser} userId={selectedUserId} UserData={userData} onChange={fetchUsers} />
                        </div>
                    </div>
                </div>
            )}
            <ConfirmationModal
                isOpen={isModalOpen}
                message="Kullanıcıyı Silmek İstediğinizden Emin Misiniz?"
                onConfirm={handleDelete}
                onCancel={handleCancel}
            />
        </div>
    );
}

export default UserSettings;
