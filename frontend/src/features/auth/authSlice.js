import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: '',
        password: '',
    },
    reducers: {
        setUsername: (state, username) => {
            state.username = username.payload;
        },
        setPassword: (state, password) => {
            state.password = password.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUsername, setPassword } = authSlice.actions
export default authSlice.reducer