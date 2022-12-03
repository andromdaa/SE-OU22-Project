import React from 'react';
import {connect, Provider, useStore} from "react-redux";
import {persistor, store} from "./app/store";
import Dash from "./main/Pages/Dash/Dash";
import Login from "./main/Pages/Login/Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Welcome from "./main/Pages/Dash/Welcome";
import mapStateToProps from "./features/user/userSlice"
import {PersistGate} from "redux-persist/integration/react";
import {StockDetailed} from "./main/Pages/StockDetailed/StockDetailed";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

// our main parent component
function App() {
    return (
        <Provider store={store}> {/* provider is from react-redux, which allows all child components to access the store */}
            <PersistGate loading={null} persistor={persistor}> {/* from redux-persist, stores data as cookies in case of refresh */}
                <BrowserRouter> {/* from react-router, used for client-side routing */}
                    <Routes> {/* routes available */}
                        <Route index element={<Welcome />} />
                        <Route path="/dash" element={ <Dash /> } />
                        <Route path="/docs" element={ <SwaggerUI url={"./swagger.json"} /> } />
                        <Route path="/stock/detailed/:symbol" element={ <StockDetailed/> } />
                        <Route path="/login" element={<Login />} />
                        <Route path="/*" element={<Navigate to={'/'} replace />} /> {/* if route does not match redirect to home page */}
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default connect(mapStateToProps)(App);

