import React, {useEffect, useState} from 'react';
import {Alert, Box, Button as Mbutton, Container, Fade, Paper, TextField, Typography} from "@mui/material";
import './stockcard.css';

export const StockCard = ({ symbol, gain, price, full_name, percent_change, ...props }) => {
    return (
        <div className="grid_items card">
            <Box elevation={8} sx={{
                bgcolor: "#ffffff",
                padding: '10px',
                margin: '10px',
                mb: '20px',
                boxShadow: 2,
                borderRadius: '10px',
                '&:hover': {
                    backgroundColor: '#f0f6fa',
                }
            }}>
                <Box>
                    <Typography color="#333333" variant="subtitle2"><strong>{ symbol }</strong></Typography>
                    <Typography color="#999999" variant="caption">{ full_name }</Typography>
                </Box>
                <Box>
                    <Typography color="#333333" variant="subtitle1"><strong>{ price }</strong></Typography>
                </Box>
                <Box>
                    <Typography color={ gain ? "#73e0bb" : "#FF5733" } variant="caption"><strong>{ percent_change }</strong></Typography>
                </Box>
            </Box>
        </div>
    );
};

