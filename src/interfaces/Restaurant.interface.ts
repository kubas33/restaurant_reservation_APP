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
    tables: Array<any>
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

