import axios from "axios";
import {GetRestaurantsParams, RestaurantData} from "../interfaces/Restaurants.ts";

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

export {
    getRestaurants,
    deleteRestaurant
}