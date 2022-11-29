import React from 'react';
import LoginRegister from "./components/Authentication/LoginRegister";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {Dash} from "./stories/Pages/Dash/Dash";
import {Login} from "./stories/Pages/Login/Login";

function App() {

    return (
        <div>
            <Provider store={store}>
                <Dash />
            </Provider>
        </div>

    );
}

export default App;
