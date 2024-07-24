import React, {useEffect} from "react";

import axios from "axios";
import {useDispatch} from "react-redux";
import {authActions} from "../store/redux/auth";

const MainNavigation = ({children}) => {
    const dispatch = useDispatch();

    axios.interceptors.request.use(
        async config => {
            const storageData = localStorage.getItem(`${import.meta.env.VITE_STORAGE_KEY}-currentUser`);
            if (storageData == null) {
                return config;
            }

            const currentUser = JSON.parse(storageData);
            config.headers = {
                'Authorization': `Bearer ${currentUser.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...config.headers
            }

            return config;
        },
        error => {
            return Promise.reject(error)
        }
    );

    axios.interceptors.response.use(
        async (res) => {
            return res;
        },
        async (error) => {
            const status = error.response.status;

            if (error.response.config.url.toString().includes('login')) {
                return Promise.reject(error);
            }

            if (status === 401) {
                // Clear from storage
                dispatch(authActions.logout())
                window.location.href = '/login';
            }

            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const bootstrapAsync = async () => {
            let currentUser;

            try {
                const storageData = localStorage.getItem(`${import.meta.env.VITE_STORAGE_KEY}-currentUser`);
                currentUser = JSON.parse(storageData);
            } catch (e) {
                return;
            }

            if (currentUser === undefined || currentUser === null) {
                return;
            }

            // Restore token
            dispatch(authActions.restoreToken(currentUser));
        };

        bootstrapAsync();
    }, [dispatch]);

    return (
        <>{children}</>
    )
}
export default MainNavigation;
