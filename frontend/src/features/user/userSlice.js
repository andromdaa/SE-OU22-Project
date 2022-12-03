import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist";

const initialState = {
    username: '',
    password: '',
    authorized: false,
    favorites: [],
    symbols: []
}

// redux tool usage, used to handle user actions as they navigate the site
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            return {
                ...state,
                authorized: true
            }
        },
        logout: (state) => {
            return {
                ...state,
                authorized: false
            }
        },
        setFavorites: (state, favorites) => {
            return {
                ...state,
                favorites: favorites.payload
            }
        },
        setUsername: (state, username) => {
            return {
                ...state,
                username: username.payload
            }
        },
        setPassword: (state, password) => {
            return {
                ...state,
                password: password.payload
            }
        },
        addFavorite: (state, favorite) => {
            if(!state.favorites.includes(favorite.payload)) state.favorites.push(favorite.payload);
        },
        removeFavorite: (state, symbol) => {
            if(state.favorites.includes(symbol.payload)) {
                let index = state.favorites.indexOf(symbol.payload);
                state.favorites.splice(index, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => { // called when the user logs out to destroy their data locally
            return {
                username: '',
                password: '',
                authorized: false,
                favorites: [],
                symbols: []
            }
        });
    }
});

// used at the bottom of components to wrap them in a connect wrapper, which will use this function to map state
// to the components props
const mapStateToProps = (state) => {
    return {
        username: state.username,
        password: state.password
    }
}

export const { login, logout, setFavorites, setUsername, setPassword, addFavorite, removeFavorite } = userSlice.actions
export default userSlice.reducer