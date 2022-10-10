import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        authorized: false,
        authorizedStr: "false",
    },
    reducers: {
        login: (state) => {
            state.authorized = true
            state.authorizedStr = "true"
        },
        logout: (state) => {
            state.authorized = false
            state.authorizedStr = "false"
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer