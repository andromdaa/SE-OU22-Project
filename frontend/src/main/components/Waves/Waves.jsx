import React from "react";
import ('./waves.css');

function Waves() {
    return (
            <svg className="waves" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill='rgba(163,22,33,0.7)' />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(78,128,152,0.5)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(14,39,60,0.3)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(196, 32, 33 ,0.1)" />
                </g>
            </svg>
    );
}

export default Waves;