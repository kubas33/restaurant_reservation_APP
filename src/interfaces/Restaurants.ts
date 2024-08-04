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

export interface GetRestaurantsParams {
    token: string;
    page: number;
    limit: number;
    keyword: string;
}