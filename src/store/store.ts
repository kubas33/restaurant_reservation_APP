import { configureStore } from '@reduxjs/toolkit'

import authReducer from './redux/auth';
import themeReducer from './redux/theme';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer
    },
})
