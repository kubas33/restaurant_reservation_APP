import { configureStore } from '@reduxjs/toolkit'

import authReducer from './redux/auth.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})
