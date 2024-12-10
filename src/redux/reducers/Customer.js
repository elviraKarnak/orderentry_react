import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    SelectCustomer: null,
};

// "1 => super admin | 2 => Sales | 3 => Buyer | 4 => Farm | 5 => Customer "

const customerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {
        setSelectCustomer(state, action) {
            state.SelectCustomer = action.payload;
        },

        shipMethodChange(state, action) {
            state.SelectCustomer.ship_addr.ship_method = action.payload;
        },

        clearCustomerData(state) {
            state.SelectCustomer = null;
        },
    },
});


export const customerActions = customerSlice.actions;
export default customerSlice.reducer;