import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

const initialState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    userData: {},
    userType: null,
};

// Define the async thunk to fetch user data from the API
export const UserLoginApi = createAsyncThunk(
    'user/UserLogin',
    async (payload) => {
        try {

            // console.log("UserPasswoard ",payload.userEmail,"  ",payload.UserPasswoard)

            // const basicAuthcode = window.btoa(`${payload.userEmail}:${payload.UserPasswoard}`);

            const myHeaders = new Headers();
            myHeaders.append("x-api-key", "b1d1I0p7A2Er2n0eD2b0As8c0kT8p2M9");
            myHeaders.append("Content-Type", "application/json");
            // myHeaders.append("Authorization", `Basic ${basicAuthcode}`);

            const response = await fetch(REACT_APP_API_SERVICE_URL + '/api/v1/admin/login', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch user data');
        }
    }
);

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {


        Logout(state) {
            state.isAuthenticated = false;
            state.userData = {};
            state.userType = null;
            localStorage.clear();
            sessionStorage.clear();
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(UserLoginApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UserLoginApi.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.userData = action.payload;
                state.userType=action.payload.user_type;
                window.sessionStorage.setItem('access-token', action.payload.token);

                console.log("UserLogin ",action.payload)
            })
            .addCase(UserLoginApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;