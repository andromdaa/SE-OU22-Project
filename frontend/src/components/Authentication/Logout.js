import {Fragment, useState} from 'react';
import Inputs from "./components/Inputs";

export default function Container(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Inputs/>
    );
}