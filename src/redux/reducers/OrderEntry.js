import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    store_status: false,
    OrderItemsData: [],
    // use
    ProductData: [],

    AddProductArr: [],

    // use
    TotalPM: {
        margin: 0,
        total: 0
    },
};

// "1 => super admin | 2 => Sales | 3 => Buyer | 4 => Farm | 5 => Customer "

const orderEntrySlice = createSlice({
    name: 'OrderEntry',
    initialState: initialState,
    reducers: {
        setPageTitle(state, action) {
            state.pageTitle = action.payload;
        },

        new_OrderItemsData(state, action) {
            state.OrderItemsData = [...state.OrderItemsData, action.payload];
        },

        replace_OrderItemsData(state, action) {
            state.OrderItemsData = action.payload;
        },

        new_ProductData(state, action) {
            state.ProductData = [...state.ProductData, action.payload];
        },

        // use
        replace_ProductData(state, action) {
            state.ProductData = action.payload;
        },

        new_AddProductArr(state, action) {
            state.AddProductArr = [...state.AddProductArr, action.payload];
        },

        replace_AddProductArr(state, action) {
            state.AddProductArr = action.payload;
        },


        TotalPM(state, action) {
            state.TotalPM = action.payload
        },

        OrderItemDelete(state, action) {

            var updatedData = state.ProductData;

            for (const [l_index, item] of updatedData.entries()) {
                if (item.product_details.id === action.payload.product_id) {

                    var total_price = ((Number(item.product_details.cost_price) * 100) / (100 - Number(item.product_details.margin_data.t_1_m)));
                    total_price = (total_price * Number(item.product_details.minqty)).toFixed(2);

                    console.log("OrderItemDelete2 ", updatedData[l_index].quantity, l_index, item.product_details.minqty);

                    updatedData[l_index].quantity = item.product_details.minqty;
                    updatedData[l_index].total = total_price;
                    updatedData[l_index].margin = item.product_details.margin_data.t_1_m;
                    updatedData[l_index].status = 'new';

                    break;
                }
            }

            state.ProductData = updatedData;

        },

        order_data_reset(state) {
            state.ProductData = [];
            state.OrderItemsData = [];
            state.AddProductArr = [];
            state.TotalPM = {
                margin: 0,
                total: 0
            };
        }
    },
});


export const orderEntryActions = orderEntrySlice.actions;
export default orderEntrySlice.reducer;