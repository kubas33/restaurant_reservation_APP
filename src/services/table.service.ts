import axios from "axios";
import {
  CreateRestaurantTableData,
  RestaurantData,
  RestaurantTableData,
} from "../interfaces/Restaurant.interface";
import {SimpleApiResponse} from "../interfaces/Common.interface.ts";

const API_URL = `${import.meta.env.VITE_API_URL}/restaurant`;

const createTable = async (
  restaurantId: RestaurantData["id"],
  tableData: CreateRestaurantTableData
) => {
  try {
    const response = await axios.post(
      `${API_URL}/${restaurantId}/table/create`,
      tableData
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const getTables = async (restaurantId: RestaurantData["id"]) => {
  try {
    const response = await axios.get(`${API_URL}/${restaurantId}/tables`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const getById = async (
  restaurantId: RestaurantData["id"],
  id: RestaurantTableData["id"]
) => {
  try {
    const response = await axios.get(
      `${API_URL}/${restaurantId}/table/${id}`
    );
    return response.data as SimpleApiResponse<RestaurantTableData>;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const updateTable = async (
  restaurantId: RestaurantData["id"],
  id: RestaurantTableData["id"],
  tableData: CreateRestaurantTableData
) => {
  try {
    const response = await axios.put(
      `${API_URL}/${restaurantId}/table/update/${id}`,
      tableData
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const deleteTable = async (
  restaurantId: RestaurantData["id"],
  id: RestaurantTableData["id"]
) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${restaurantId}/table/remove/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { createTable, getTables, getById, updateTable, deleteTable };
