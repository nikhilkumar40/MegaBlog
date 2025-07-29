import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    userLoggedIn: false
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.userData
            state.userLoggedIn = true
        },

        logout: (state) => {
            state.userData = null,
                state.userLoggedIn = false;
        }
    }

})

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer