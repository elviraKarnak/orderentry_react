import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pageTitle: '',
    menuList: [],
};

// "1 => super admin | 2 => Sales | 3 => Buyer | 4 => Farm | 5 => Customer "

const commonSlice = createSlice({
    name: 'common',
    initialState: initialState,
    reducers: {
        setPageTitle(state, action) {
            state.pageTitle = action.payload;
        },

        clearCommonState(state) {
            state.pageTitle = "";
            state.menuList = [];
        },
    },
});


export const commonActions = commonSlice.actions;
export default commonSlice.reducer;