import React, { createContext, useReducer } from "react";
import { getFromLocal, setFromLocal } from "./Store_comm_function";

const InitialState = {
    id: getFromLocal("id", ""),
    role_type: getFromLocal("role_type", ""),
    firstname: getFromLocal("firstname", ""),
    lastname: getFromLocal("lastname", ""),
    email: getFromLocal("email", ""),
    token: getFromLocal("token", ""),
    user_status: false,
    email_verification_status: false,
    store_status: false,
    OrderItemsData: [],
    ProductData: [],
    AddProductArr: [],
    TotalPM: {
        margin: 0,
        total: 0
    },

};

function reducer(state, action) {
    switch (action.type) {
        case "id":
            setFromLocal("id", action.value);
            return {
                ...state,
                id: action.value,
            };


        case "role_type":
            setFromLocal("role_type", action.value);
            return {
                ...state,
                role__type: action.value,
            };

        case "firstname":
            setFromLocal("firstname", action.value);
            return {
                ...state,
                firstname: action.value,
            };


        case "lastname":
            setFromLocal("lastname", action.value);
            return {
                ...state,
                lastname: action.value,
            };

        case "email":
            setFromLocal("email", action.value);
            return {
                ...state,
                email: action.value,
            };

        case "token":
            setFromLocal("token", action.value);
            return {
                ...state,
                token: action.value,
            };


        case "user_status":
            return {
                ...state,
                user_status: action.value,
            };

        case "email_verification_status":
            return {
                ...state,
                email_verification_status: action.value,
            };


        case "new_OrderItemsData":
            return {
                ...state,
                OrderItemsData: [...state.OrderItemsData, action.value],
            };

        case "replace_OrderItemsData":
            console.log("replace_OrderItemsData ",action.value)
            return {
                ...state,
                OrderItemsData: action.value,
            };

        case "new_ProductData":
            return {
                ...state,
                ProductData: [...state.ProductData, action.value],
            };


        case "replace_ProductData":
            console.log("replace_ProductData ",action.value)
            return {
                ...state,
                ProductData: action.value,
            };

        case "new_AddProductArr":
            return {
                ...state,
                AddProductArr: [...state.AddProductArr, action.value],
            };

        case "replace_AddProductArr":
            console.log("replace_AddProductArr ",action.value)
            return {
                ...state,
                AddProductArr: action.value,
            };


        case "TotalPM":
            return {
                ...state,
                TotalPM: action.value,
            };

        case "order_data_reset":
            return {
                ...state,
                ProductData: [],
                OrderItemsData: [],
                AddProductArr: [],
                TotalPM: {
                    margin: 0,
                    total: 0
                },
            };




        case "store_status":
            return {
                ...state,
                store_status: action.value,
            };

        case "firstLoad":
            return {
                ...state,
                id: getFromLocal("id", ""),
                role_type: getFromLocal("role_type", ""),
                firstname: getFromLocal("firstname", ""),
                lastname: getFromLocal("lastname", ""),
                email: getFromLocal("email", ""),
                token: getFromLocal("token", ""),
            };

        case "reset":
            return { ...InitialState };

        default:
            return { ...state };
    }
}

export const userContext = createContext();

function Store({ children }) {
    const [userState, dispatch] = useReducer(reducer, InitialState);


    return (
        <userContext.Provider value={{ userState, dispatch }}>
            {children}
        </userContext.Provider>
    );
}

export default Store;