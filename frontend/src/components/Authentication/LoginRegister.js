import Inputs from "./components/Inputs";
import LoginBtn from "./components/buttons/LoginBtn";
import RegisterBtn from "./components/buttons/RegisterBtn";
import './auth.css';
import { Box } from "@mui/material";

export default function LoginRegister() {
    return (
            <Box sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                width: 'auto',
                alignContent: 'center',
                boxShadow: 12,
                borderRadius: '4px'
            }}>
                <Inputs />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <Box sx={{ m: '2%' }}><LoginBtn /></Box>
                    <Box sx={{ m: '2%' }}><RegisterBtn style={{ margin: '5px' }}/></Box>
                </Box>
            </Box>
    );
}