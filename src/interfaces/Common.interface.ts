import {RestaurantData} from "./Restaurant.interface.ts";

interface Pagination {
    currentPage: number;
    totalPages: number;
    previousPage: number | null;
    nextPage: number | null;
    totalItems: number;
}

export interface ApiResponse<T> {
    data: {
        response: T;
        pagination: Pagination;
    };
    success: boolean;
}

