import React from 'react';
import {connect, Provider, useStore} from "react-redux";
import {persistor, store} from "./app/store";
import Dash from "./stories/Pages/Dash/Dash";
import Login from "./stories/Pages/Login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Welcome from "./stories/Pages/Dash/Welcome";
import mapStateToProps from "./features/user/userSlice"
import {PersistGate} from "redux-persist/integration/react";
import {StockDetailed} from "./stories/Pages/StockDetailed/StockDetailed";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Welcome />} />
                        <Route path="/dash" element={ <Dash /> } />
                        <Route path="/stock/detailed/:symbol" element={ <StockDetailed/> } />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default connect(mapStateToProps)(App);

