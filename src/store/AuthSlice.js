import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    isUserLoggedIn: false
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.userData
            state.isUserLoggedIn = true
        },

        logout: (state) => {
            state.userData = null,
                state.isUserLoggedIn = false;
        }
    }

})

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer