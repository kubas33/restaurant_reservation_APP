import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    currentUser: null,
    isLoading: false,
};
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        login(state, action) {
            localStorage.setItem(`${import.meta.env.VITE_STORAGE_KEY}-currentUser`, JSON.stringify(action.payload));
            state.currentUser = action.payload;

        },
        logout(state) {
            localStorage.removeItem(`${import.meta.env.VITE_STORAGE_KEY}-currentUser`);
            state.currentUser = null;
        },
        register(state, action) {
            localStorage.setItem(`${import.meta.env.VITE_STORAGE_KEY}-currentUser`, JSON.stringify(action.payload));
            state.currentUser = action.payload;
        },
        restoreToken(state, action) {
            state.currentUser = action.payload;
        },
        updateCurrentUserData(state, action) {
            const user = {...state.currentUser};
            user.name = action.payload.name;
            user.email = action.payload.email;
            state.currentUser = user;
            localStorage.setItem(`${import.meta.env.VITE_STORAGE_KEY}-currentUser`, JSON.stringify(user));
        },
    },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;