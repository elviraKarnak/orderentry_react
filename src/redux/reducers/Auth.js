import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const REACT_APP_API_SERVICE_URL = process.env.REACT_APP_API_SERVICE_URL;

const initialState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    authUser: {
        user_id: "",
        username: "",
        email: "",
        role_id: "",
        permisionData: [],
    },
    farmUserList: []
};

// "1 => super admin | 2 => Sales | 3 => Buyer | 4 => Farm | 5 => Customer "

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

        Login(state, action) {
            // console.log("authentication",action.payload)
            state.isAuthenticated = true;
            state.authUser = {
                user_id: action.payload.authUser.user_id,
                username: action.payload.authUser.username,
                email: action.payload.authUser.email,
                role_id: Number(action.payload.authUser.role_id),
                permisionData: action.payload.authUser.permisionData
            }
            state.farmUserList = action.payload.farmUserList;
        },

        Logout(state) {
            state.isAuthenticated = false;
            state.authUser = {
                user_id: "",
                username: "",
                email: "",
                role_id: "",
                permisionData: [],
            };
            state.farmUserList = [];
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
                state.authUser = {
                    user_id: action.payload.user_id,
                    username: action.payload.username,
                    email: action.payload.email,
                    role_id: action.payload.role_id,
                    permisionData: action.payload.permisionData
                }
                state.farmUserList = action.payload.farmUserList;
                window.sessionStorage.setItem('access-token', action.payload.token);

                console.log("UserLogin ", action.payload)
            })
            .addCase(UserLoginApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;