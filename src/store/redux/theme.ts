import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    sidebarShow: true,
    theme: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        showSidebar: (state, action) => {
            state.sidebarShow = action.payload
        },
        foldSidebar: (state, action) => {
            state.sidebarUnfoldable = action.payload
        },
    },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
