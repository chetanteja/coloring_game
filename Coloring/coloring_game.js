import React from 'react';
// import ScriptTag from 'react-script-tag';
// import {Helmet} from "react-helmet";
import Testing from './testing';

function Coloring(){

    return(
        <div>
            <h1>Coloring Game</h1>
            <div id="container">
            <div id="palette"></div>
            <canvas id="canvas"></canvas>
            </div>
            <Testing/>
            
            
        </div>
    )
}

export default Coloring;