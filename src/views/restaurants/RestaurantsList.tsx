import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RestaurantData} from "../../interfaces/Restaurants.ts";
import {getRestaurants} from "../../services/restaurant.service.ts";
import {RestaurantCard} from "../../components/restaurant/RestaurantCard.tsx";
import {CCol, CRow} from "@coreui/react";

interface ApiResponse {
    data: {
        response: RestaurantData[];
        pagination: {
            currentPage: number;
            totalPages: number;
            previousPage: number | null;
            nextPage: number | null;
            totalItems: number;
        };
    };
    success: boolean;
}

export const RestaurantsList: React.FC = () => {
    const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const currentUser = useSelector((state: any) => state.auth.currentUser);
    const token = currentUser?.token;

    useEffect(() => {
        const fetchRestaurants = async () => {
            if (!token) {
                setError("No authentication token available");
                setLoading(false);
                return;
            }

            try {
                const response = await getRestaurants({
                    token,
                    page: 1,
                    limit: 10,
                    keyword: ''
                }) as ApiResponse;
                console.log("API response:", response);
                if (response.success && Array.isArray(response.data.response)) {
                    setRestaurants(response.data.response);
                } else {
                    console.error("Unexpected response format:", response);
                    setError("Received unexpected data format from server");
                }
            } catch (error) {
                console.error("Error fetching restaurants:", error);
                setError("Failed to fetch restaurants. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [token]);

    console.log("Current restaurants state:", restaurants);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!Array.isArray(restaurants)) {
        console.error("restaurants is not an array:", restaurants);
        return <div>Error: Invalid data format</div>;
    }

    if (restaurants.length === 0) {
        return <div>No restaurants found.</div>;
    }

    return (
        <CRow className={"row-cols-auto g-4"}>
                {restaurants.map((restaurant) => (
            <CCol key={restaurant.id}>
                    <RestaurantCard
                        restaurantData={restaurant}
                    />
            </CCol>
                ))}

        </CRow>
    );
};