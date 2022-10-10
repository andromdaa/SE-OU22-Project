import React from 'react';
import AuthModule from "./AuthModule";
import {useSelector} from "react-redux";

function App() {
    const authorized = useSelector((state) => state.user.authorizedStr);

    return (
    <div className="App">
        <p>Logged in: <strong>{authorized}</strong></p>
        <br/>
        <AuthModule type={'register'}/>
        <AuthModule type={'login'}/>
    </div>
    );
}

export default App;
