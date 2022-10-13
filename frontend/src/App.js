import React from 'react';
import LoginRegister from "./components/Authentication/LoginRegister";
import {Provider} from "react-redux";
import {store} from "./app/store";

function App() {

    return (
        <Provider store={store}>
            <LoginRegister/>
        </Provider>
    );
}

export default App;
