import React, { useEffect, useState } from 'react';
import API from '../utils/utilRequest';
import useColors from "../ui/Colors";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './ConfirmationModal';

const AddDevice = ({ onChange }) => {
  const [deviceMacID, setDeviceMacID] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [branch, setBranch] = useState('');
  const [department, setDepartment] = useState('');
  const [screenPlacement, setScreenPlacement] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [customer, setCustomer] = useState('');

  // State variables to hold fetched options
  const [deviceTypes, setDeviceTypes] = useState(['NIST']);
  const [branches, setBranches] = useState([]);
  const [branchesId, setBranchesId] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentsId, setDepartmentsId] = useState([]);
  const [screenPlacements, setScreenPlacements] = useState(["Orta", "Sol Üst", "Sağ Üst", "Sol Alt", "Sağ Alt"]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState(null);

  useEffect(() => {
    const fetchUsercustomer = async () => {
      try {
        const response = await API.CheckCustomer();
        setCustomer(response.data.customer_id);
      } catch (error) {
        console.error("Error fetching user colors:", error);
      }
    };
  
    fetchUsercustomer();
  }, []);

  useEffect(() => {

    const fetchWarehouses = async () => {
      try {
        const response = await API.getWarehouse();
        setBranches(response.data.warehouses.map(item => item.warehouse_name));
        setBranchesId(response.data.warehouses.map(item => item.warehouse_id));
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);


  const handleBranchChange = async (e) => {
    const selectedBranch = e.target.value;
    setBranch(selectedBranch);
    setDepartment('');
    setDepartments([]);

    if (selectedBranch) {
      const index = branches.indexOf(selectedBranch);
      const warehouseId = branchesId[index]

      try {
        const response = await API.getWarehouseRooms({
          warehouse_ids: [warehouseId],
        });
        setDepartments(response.data.map(item => item.room_name));
        setDepartmentsId(response.data.map(item => item.room_id));
      } catch (error) {
        console.error("Error fetching warehouse rooms:", error);
      }

    }
  };

  const handleDepartmentChange = async (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);

    if (selectedDepartment) {
      const index1 = branches.indexOf(branch);
      const warehouseId = branchesId[index1];

      try {
        const response = await API.getRooms();
        const filteredRooms = response.data.filter(
          (room) => room.room_name === selectedDepartment && room.warehouse_id === warehouseId
        );

        const corners = filteredRooms[0].devices.map((item) => item.corner_number);

        // Copy the initial screenPlacements to a new variable
        let updatedPlacements = [...screenPlacements];

        // Conditionally remove items based on corners
        if (corners.includes("1")) {
          updatedPlacements = updatedPlacements.filter((placement) => placement !== "Sol Üst");
        }
        if (corners.includes("2")) {
          updatedPlacements = updatedPlacements.filter((placement) => placement !== "Sağ Üst");
        }
        if (corners.includes("3")) {
          updatedPlacements = updatedPlacements.filter((placement) => placement !== "Sol Alt");
        }
        if (corners.includes("4")) {
          updatedPlacements = updatedPlacements.filter((placement) => placement !== "Sağ Alt");
        }

        // If all corners are present, set to "Orta"
        if (["1", "2", "3", "4"].every((corner) => corners.includes(corner))) {
          updatedPlacements = ["Orta"];
        }

        // Update the state with the new placements
        setScreenPlacements(updatedPlacements);

      } catch (error) {
        console.error("Error fetching warehouse rooms:", error);
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const screenPlacementMap = {
      "Sol Üst": "1",
      "Sağ Üst": "2",
      "Sol Alt": "3",
      "Sağ Alt": "4",
      "Orta": "0"
    };

    const index = departments.indexOf(department);
    const selected_departement_id = departmentsId[index];

    const screen_placement = screenPlacementMap[screenPlacement] !== undefined ? screenPlacementMap[screenPlacement] : null;

    const newDevice = {
      device_mac_id: deviceMacID,
      device_type: deviceType,
      device_status: true,
      department: selected_departement_id,
      screen_placement: screen_placement,
      customer_id: customer,
    };

    setNewDevice(newDevice);

    setIsModalOpen(true);

  };

  const handleConfirm = async () => {
    try {
      onChange();
      const response = await API.createDevice(newDevice);
      toast.success('CİHAZ EKLENMIŞTIR!');
    } catch (err) {
      toast.error('DAHA SONRA TEKRAR DENEYİN');
      console.error('Error adding device:', err);
    }

    // Clear form fields
    setDeviceMacID('');
    setDeviceType('');
    setBranch('');
    setDepartment('');
    setScreenPlacement('');
    setIsModalOpen(false); // Close the modal
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal without action
  };


  return (
    <div className='sm:w-[800px] '>
      <label className="mb-4 flex justify-between">
        Cihaz Ekle
        <button
          onClick={() => { handleCancel }}
          className="text-gray-600 hover:text-gray-900"
        >
        </button>
      </label>
      <hr className="my-4 border-gray-300" />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="deviceMacID">
            Cihaz MacID:
          </label>
          <input
            type="text"
            id="deviceMacID"
            value={deviceMacID}
            onChange={(e) => setDeviceMacID(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="deviceType">
            Cihaz Türü:
          </label>
          <select
            id="deviceType"
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2"
            required
          >
            <option value="">Seçin...</option>
            {deviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="branch">
            Şube:
          </label>
          <select
            id="branch"
            value={branch}
            onChange={handleBranchChange} // Use the new handleBranchChange function
            className="border border-gray-300 rounded-lg w-full p-2"
            required
          >
            <option value="">Seçin...</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="department">
            Bölüm:
          </label>
          <select
            id="department"
            value={department}
            onChange={handleDepartmentChange} // Use the new handleBranchChange function
            className="border border-gray-300 rounded-lg w-full p-2"
            required
          >
            <option value="">Seçin...</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="screenPlacement">
            Ana Ekran Yerleşimi:
          </label>
          <select
            id="screenPlacement"
            value={screenPlacement}
            onChange={(e) => setScreenPlacement(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2"
            required
          >
            <option value="">Seçin...</option>
            {screenPlacements.map((placement) => (
              <option key={placement} value={placement}>
                {placement}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-custom-primary-700 text-white rounded-lg px-4 py-2"
          >
            Tamam
          </button>
        </div>
      </form>
      <ConfirmationModal
        isOpen={isModalOpen}
        message="Yeni Cihazı Kaydetmek İstediğinizden Emin Misiniz?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AddDevice;
