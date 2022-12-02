import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist";

const initialState = {
    username: '',
    password: '',
    authorized: false,
    favorites: [],
    symbols: []
}

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
        setSymbols: (state, symbols) => {
            return {
                ...state,
                symbols: symbols.payload
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
        addSymbol: (state, symbol) => {
            state.symbols.push(symbol.payload);
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
        builder.addCase(PURGE, (state) => {
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

const mapStateToProps = (state) => {
    return {
        username: state.username,
        password: state.password
    }
}

// Action creators are generated for each case reducer function
export const { login, logout, setFavorites, setSymbols, setUsername, setPassword, addFavorite, removeFavorite } = userSlice.actions
export default userSlice.reducer