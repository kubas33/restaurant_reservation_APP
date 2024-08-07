import {ApiResponse} from "./Common.interface.ts";

export interface RestaurantData {
    id: number
    name: string
    address: string
    phone: string
    cuisine: string
    description: string
    createdAt: string
    updatedAt: string
    tables: Array<RestaurantTableData>
}

export interface CreateRestaurantData {
    name: string
    address: string
    phone: string
    cuisine: string
    description: string
}

export type RestaurantsResponse = ApiResponse<RestaurantData[]>;

export type SingleRestaurantResponse = ApiResponse<RestaurantData>;


export interface GetRestaurantsParams {
    token: string;
    page: number;
    limit: number;
    keyword: string;
}

export interface CreateRestaurantTableData {
    name: string
    seats: number
    restaurantId: number
}


export interface UpdateRestaurantTableData {
    name: string | undefined
    seats: number | undefined
}

export interface RestaurantTableData {
    id: number
    name: string
    seats: number
    createdAt: string
    updatedAt: string
    reservations: Array<any>
}
