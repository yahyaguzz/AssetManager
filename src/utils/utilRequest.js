import axios from "axios";

//DEĞİŞİYOR;

//export const baseUrl = 'https://assetmgmt.niselektronik.com/api/';
export const baseUrl = 'http://localhost:3000/api/';


async function headersF() {
    const token = localStorage.getItem('token');
    return {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
    };
}

const API = {
    login: async (body) => {
        return axios.post(`${baseUrl}login`, body, {
            headers: await headersF(),
        });
    },


    CheckWarrant: async () => {
        return axios.get(`${baseUrl}get_warrant`, {
            headers: await headersF(),
        });
    },

    CheckCustomer: async () => {
        return axios.get(`${baseUrl}get_customer`, {
            headers: await headersF(),
        });
    },
    

    getDevices: async (body) => {
        return axios.post(`${baseUrl}get_devices`, body, {
            headers: await headersF(),
        });
    },

    getUsers: async (body) => {
        return axios.post(`${baseUrl}get_users`, body, {
            headers: await headersF(),
        });
    },

    getRooms: async () => {
        return axios.get(`${baseUrl}get_rooms`, {
            headers: await headersF(),
        });
    },
    getWarehouse: async () => {
        return axios.get(`${baseUrl}get_warehouse`, {
            headers: await headersF(),
        });
    },
    getWarehouseRooms: async (body) => {
        return axios.post(`${baseUrl}get_warehouserooms`, body, {
            headers: await headersF(),
        });
    },
    getTrends: async (body) => {
        return axios.post(`${baseUrl}get_trends`, body, {
            headers: await headersF(),
        });
    },
    getCurrentValues: async (body) => {
        return axios.post(`${baseUrl}get_current_values`, body, {
            headers: await headersF(),
        });
    },
    getDevicesbyRoom: async (body) => {
        return axios.post(`${baseUrl}get_devices_by_room`, body, {
            headers: await headersF(),
        });
    },

    getBranchForm: async () => {
        return axios.get(`${baseUrl}get_branch_form`, {
            headers: await headersF(),
        });
    },

    getDepartmentForm: async () => {
        return axios.post(`${baseUrl}get_department_form`, {
            headers: await headersF(),
        });
    },


    // POST to create a new device
    createDevice: async (body) => {
        return axios.post(`${baseUrl}device`, body, {
            headers: await headersF(),
        });
    },

    // GET a specific device by device_id
    getDeviceById: async (device_id) => {
        return axios.get(`${baseUrl}device/${device_id}`, {
            headers: await headersF(),
        });
    },

    // PUT to update a specific device by device_id
    updateDevice: async (deviceId, newDevice) => {
        const url = `${baseUrl}device/${deviceId}`;
        return axios.put(url, newDevice, {
            headers: await headersF(),
        });
    },


    // DELETE a specific device by device_id
    deleteDevice: async (device_id) => {
        return axios.delete(`${baseUrl}device/${device_id}`, {
            headers: await headersF(),
        });
    },


    // POST to create a new user
    createUser: async (body) => {
        return axios.post(`${baseUrl}users`, body, {
            headers: await headersF(),
        });
    },

    // GET a specific user by device_id
    getUserById: async (user_id) => {
        return axios.get(`${baseUrl}users/${user_id}`, {
            headers: await headersF(),
        });
    },

    // PUT to update a specific user by device_id
    updateUser: async (user_id, newUSer) => {
        const url = `${baseUrl}users/${user_id}`;
        return axios.put(url, newUSer, {
            headers: await headersF(),
        });
    },


    // DELETE a specific user by device_id
    deleteUser: async (user_id) => {
        return axios.delete(`${baseUrl}users/${user_id}`, {
            headers: await headersF(),
        });
    },
};

export default API;
