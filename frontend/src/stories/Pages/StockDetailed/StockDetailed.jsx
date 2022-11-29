import React, {useEffect, useState} from 'react';
import './stockdetailed.css'
import {Box, Typography} from "@mui/material";
import * as PropTypes from "prop-types";

function DataGrid(props) {
    return null;
}

DataGrid.propTypes = {
    columns: PropTypes.any,
    checkboxSelection: PropTypes.bool,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    pageSize: PropTypes.number,
    rows: PropTypes.any
};

export function StockDetailed({ symbol, ...props }) {



    return (
        <table className="" >
            <tr>
                <th>Prev. Close:</th>
                <td>144.22</td>
                <th>Market Cap:</th>
                <td>2.248T</td>
            </tr>
            <tr>
                <th>Open:</th>
                <td>144.29</td>
                <th>Beta:</th>
                <td>1.25</td>
            </tr>
            <tr>
                <th>Bid:</th>
                <td>140.94 x 1300</td>
                <th>PE Ratio:</th>
                <td>23.13</td>
            </tr>
            <tr>
                <th>Ask:</th>
                <td>140.97 x 1100</td>
                <th>EPS:</th>
                <td>6.11</td>
            </tr>
            <tr>
                <th>Day's Range</th>
                <td>140.50 - 144.81</td>
                <th>Earnings Date:</th>
                <td>Jan 25, 2023 - Jan 30, 2023</td>
            </tr>
            <tr>
                <th>52 Week Range</th>
                <td>129.04 - 182.94</td>
                <th>FRWD Dividend & Yield:</th>
                <td>0.92 (0.62%)</td>
            </tr>
            <tr>
                <th>Volume</th>
                <td>59,426,809</td>
                <th>Ex-Dividend Date</th>
                <td>Nov 04, 2022</td>
            </tr>
            <tr>
                <th>Avg. Volume</th>
                <td>89,654,822</td>
                <th>1y Target Est:</th>
                <td>178.15</td>
            </tr>


        </table>
    );
}
