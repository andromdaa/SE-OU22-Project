import React, {useEffect, useState} from 'react';
import '../../container.css'
import { Default } from "../../StockGrid/StockGrid.stories";
import {User} from "../../Header/Header.stories";
import {StockGrid} from "../../StockGrid/StockGrid";
import {StockCard} from "../../StockGrid/StockCard/StockCard";
import {Header} from "../../Header/Header";
import {Search} from "@mui/icons-material";
import {Alert, Fade} from "@mui/material";
import {InteractionBox} from "../../InteractionBox/InteractionBox";

export function Dash({ ...props }) {
    // TODO: LINKING DATA - this is where we should put the data call
    /*
       given a list of symbols, fetch all data from api about the stock
       fill in the data
       render
     */
    // const authorized = useSelector((state) => state.authorized);
    const authorized = true;

    let stock_cards = [
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"$143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"$143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"$143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"$143.45"} /> </div>,
        <div className="grid_items"> <StockCard symbol="APPL" gain={true} full_name={"Apple Inc."} percent_change={"+2.56"} price={"$143.45"} /> </div>,
    ]

    if(authorized) {
        return <div>
            <Header authorized={authorized} />
            <StockGrid stock_cards={stock_cards}/>
            <div className="center">
                <form onSubmit="myFunction()">
                    <input placeholder="Enter symbol"/>
                </form></div>
        </div>
    } else {
        return <div>
            <Header authorized={authorized} />
                <Fade in={true} timeout={ 1000 }>
                    <div className="center_column" style={{ marginTop: "5%"}}>
                        <h1>Welcome to Track-N-Train</h1>
                        <Fade in={true} timeout={ 3000 }>
                            <p>An efficient solution to test your trading algorithms.</p>
                        </Fade>
                    </div>
                </Fade>

                <div className="center_column app_border">
                    <InteractionBox type="register" msg={{
                            success: "Registration Successful, redirecting",
                            fail: "Username already in use"
                        }}/>
                </div>
        </div>;
    }
}
