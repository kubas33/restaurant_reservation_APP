import axios from "axios";
import {
    CreateRestaurantData,
    GetRestaurantsParams,
    RestaurantData
} from "../interfaces/Restaurant.interface.ts";

const API_URL = `${import.meta.env.VITE_API_URL}/restaurant`


const getRestaurants = async ({ token, page, limit, keyword }: GetRestaurantsParams): Promise<RestaurantData[]> => {
    try {
        const response = await axios.get(`${API_URL}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page,
                limit: limit,
                keyword: keyword
            }
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const getRestaurant = async (token: string, id: number): Promise<RestaurantData> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const deleteRestaurant = async (token: string, id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/remove/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const createRestaurant = async (token: string, restaurantData: CreateRestaurantData): Promise<RestaurantData> => {
    try {
        const response = await axios.post(`${API_URL}/create`, restaurantData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const updateRestaurant = async (token: string, id: number, restaurantData: CreateRestaurantData): Promise<RestaurantData> => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, restaurantData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export {
    getRestaurants,
    deleteRestaurant,
    createRestaurant,
    updateRestaurant,
    getRestaurant
}