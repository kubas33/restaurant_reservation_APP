import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/user`;

const getUsers = async (token, page, limit = 10, keyword = '') => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                page,
                limit,
                keyword
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

const deleteUser = async (token, userId, currentUser) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Email': currentUser.email
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

const createUser = async (token, userData, currentUser) => {
    try {
        const response = await axios.post(`${API_URL}/create`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Email': currentUser.email
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

const editUser = async (token, userId, userData, currentUser) => {
    try {
        const response = await axios.put(`${API_URL}/update/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Email': currentUser.email
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error editing user:", error);
        throw error;
    }
};

const getUser = async (token, userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};


export {
    getUsers,
    deleteUser,
    createUser,
    editUser,
    getUser
}