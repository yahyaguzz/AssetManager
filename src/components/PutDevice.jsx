import React, { useEffect, useState } from 'react';
import API from '../utils/utilRequest';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';


const PutDevice = ({ closeAddCihaz, deviceId, deviceData, onChange }) => {

  const [deviceMacID, setDeviceMacID] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [branch, setBranch] = useState('');
  const [department, setDepartment] = useState('');
  const [screenPlacement, setScreenPlacement] = useState('');
  const [error, setError] = useState('');


  const [deviceTypes, setDeviceTypes] = useState(['NIST']);
  const [branches, setBranches] = useState([]);
  const [branchesId, setBranchesId] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentsId, setDepartmentsId] = useState([]);
  const [screenPlacements, setScreenPlacements] = useState(["Orta", "Sol Üst", "Sağ Üst", "Sol Alt", "Sağ Alt"]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState(null);

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

  useEffect(() => {
    const simulateSelections = async () => {

      setDeviceMacID(deviceData.device_mac_id);
      setDeviceType(deviceData.device_type);
      await new Promise(resolve => setTimeout(resolve, 0));


      const selectedBranch = deviceData.warehouse_name;
      setBranch(selectedBranch);
      handleBranchChange(selectedBranch);

      const index = branches.indexOf(selectedBranch);
      const warehouseId = branchesId[index];

      if (warehouseId) {
        try {
          const response = await API.getWarehouseRooms({
            warehouse_ids: [warehouseId],
          });
          setDepartments(response.data.map(item => item.room_name));
          setDepartmentsId(response.data.map(item => item.room_id));

          const selectedDepartment = deviceData.room_name;
          setDepartment(selectedDepartment);
          
          handleDepartmentChange(selectedDepartment);
          const roomsResponse = await API.getRooms();

          const roomsarray = roomsResponse.data;

          const selectedRoom = roomsarray.find(room => room.room_name === selectedDepartment);
          const devices = (selectedRoom.devices)
          const device_data = devices.find(device => device.device_id === deviceId);
          const corner_number = (device_data.corner_number);
          const corners_names = ["Orta", "Sol Üst", "Sağ Üst", "Sol Alt", "Sağ Alt"];


          const filteredRooms = roomsResponse.data.filter(
            (room) => room.room_name === selectedDepartment && room.warehouse_id === warehouseId
          );

          if (filteredRooms.length > 0) {
            const corners = filteredRooms[0].devices.map((item) => item.corner_number);
            let updatedPlacements = ["Orta", "Sol Üst", "Sağ Üst", "Sol Alt", "Sağ Alt"];
            

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

            if (["1", "2", "3", "4"].every((corner) => corners.includes(corner))) {
              updatedPlacements = ["Orta"];
            }

            updatedPlacements.push(corners_names[corner_number]);

            setScreenPlacements(updatedPlacements);
            setScreenPlacement(corners_names[corner_number]);
            

          }
        } catch (error) {
          console.error("Error fetching warehouse rooms:", error);
        }
      }
    };

    simulateSelections();
  }, [branches, branchesId, deviceData]);

  const handleBranchChange = async (selectedBranch) => {
    const index = branches.indexOf(selectedBranch);
    const warehouseId = branchesId[index];
    setDepartment('');
    setScreenPlacement('');

    if (warehouseId) {
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

  const handleDepartmentChange = async (selectedDepartment) => {
    const index = branches.indexOf(branch);
    const warehouseId = branchesId[index];
    setScreenPlacement('');

    if (warehouseId) {
      try {
        const roomsResponse = await API.getRooms();
        const filteredRooms = roomsResponse.data.filter(
          (room) => room.room_name === selectedDepartment && room.warehouse_id === warehouseId
        );



        if (filteredRooms.length > 0) {
          const corners = filteredRooms[0].devices.map((item) => item.corner_number);
          let updatedanotherPlacements = ["Orta", "Sol Üst", "Sağ Üst", "Sol Alt", "Sağ Alt"];

          if (corners.includes("1")) {
            updatedanotherPlacements = updatedanotherPlacements.filter((placement) => placement !== "Sol Üst");
          }
          if (corners.includes("2")) {
            updatedanotherPlacements = updatedanotherPlacements.filter((placement) => placement !== "Sağ Üst");
          }
          if (corners.includes("3")) {
            updatedanotherPlacements = updatedanotherPlacements.filter((placement) => placement !== "Sol Alt");
          }
          if (corners.includes("4")) {
            updatedanotherPlacements = updatedanotherPlacements.filter((placement) => placement !== "Sağ Alt");
          }

          if (["1", "2", "3", "4"].every((corner) => corners.includes(corner))) {
            updatedanotherPlacements = ["Orta"];
          }

          setScreenPlacements(updatedanotherPlacements);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
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

    const deviceData = {
      device_mac_id: deviceMacID,
      device_type: deviceType,
      device_status: true,
      room_id: selected_departement_id,
      screen_placement: screen_placement,
    };

    setNewDevice(deviceData);
    setIsModalOpen(true); 
  };

  const handleConfirm = async () => {
    try {
      onChange();
      const response = await API.updateDevice(deviceId, newDevice); 
      toast.success('CİHAZ GÜNCELLENMİŞTİR!');
    } catch (error) {
      toast.error('DAHA SONRA TEKRAR DENEYİN');
      console.error('Error:', error);
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
        Cihaz Güncelle
        <button
          onClick={closeAddCihaz} // Pass the close modal action
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
            onChange={(e) => {
              setBranch(e.target.value);
              handleBranchChange(e.target.value);
            }}
            className="border border-gray-300 rounded-lg w-full p-2"
            required
          >
            <option value="">Seçin...</option>
            {branches.map((branchName, index) => (
              <option key={index} value={branchName}>
                {branchName}
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
            onChange={(e) => {
              setDepartment(e.target.value);
              handleDepartmentChange(e.target.value); 
            }}
            className="border border-gray-300 rounded-lg w-full p-2"
            required
          >
            <option value="">Seçin...</option>
            {departments.map((deptName, index) => (
              <option key={index} value={deptName}>
                {deptName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="screenPlacement">
            Ekran Yerleşimi:
          </label>
          <select
            id="screenPlacement"
            value={screenPlacement}
            onChange={(e) => setScreenPlacement(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2"
            required
          >
            <option value="">Seçin...</option>
            {screenPlacements.map((placement, index) => (
              <option key={index} value={placement}>
                {placement}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Güncelle
          </button>
        </div>
      </form>
      <ConfirmationModal
        isOpen={isModalOpen}
        message="Değişiklikleri Kaydetmek İstediğinizden Emin Misiniz?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default PutDevice;
