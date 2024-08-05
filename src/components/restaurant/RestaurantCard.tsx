import {CButton, CCard, CCardBody, CCardFooter, CCardImage, CCardText, CCardTitle} from "@coreui/react";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RestaurantData} from "../../interfaces/Restaurant.interface.ts";
import {number} from "yup";

interface RestaurantCardProps {
    restaurantData: RestaurantData,
    key?: number
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({restaurantData, key}: { restaurantData: RestaurantData }) => {

    // const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;
    const currentUser = useSelector((state) => state.auth.currentUser);
    const token = currentUser?.token;


    return <CCard style={{width: '24rem'}}>
        <CCardImage orientation="top" src={'https://picsum.photos/300/200'}/>
        <CCardBody>
            <CCardTitle>{restaurantData.name}</CCardTitle>
            <CCardText>
                <p>
                    {restaurantData.description}
                </p>
                <strong>Kuchnia: </strong>{restaurantData.cuisine}
            </CCardText>
            <CButton color="primary" href="#">Zarezerwuj stolik</CButton>
        </CCardBody>
        <CCardFooter>
            <strong>Adres: </strong> {restaurantData.address}
        </CCardFooter>
    </CCard>
}

export {RestaurantCard}