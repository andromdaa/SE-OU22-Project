import React from 'react';
import LoginRegister from "./components/Authentication/LoginRegister";
import {Provider} from "react-redux";
import {store} from "./app/store";

function App() {

    return (
        <div style={{ backgroundColor: "#f5fbff" }}>
            <Provider store={store}>
                <LoginRegister/>
            </Provider>
        </div>

    );
}

export default App;
