import React from 'react';
import { BrowserRouter, Route, Link, useParams, useHistory } from 'react-router-dom';
import './Inicio.css';

function Inicio() {

    let history = useHistory()

    function irATest() {
        history.push('/test')
    }

    let testJSX = <main>

        <div className="test">
            <div className="titularLandingPage">
                <h1>Tu buscador </h1>
                <h1>de voluntariado</h1>
            </div>
            <button className="botonContinuarLp" onClick={irATest}>¡Ir al test!</button>
        </div>
        {/* <img className="test-img" src="test.jpg" alt=""></img> */}
        <Link to="/buscador" className="buscadorConvencionalLp">... Ir a buscador convencional</Link>
    </main>;

    return (
        <div style={{ overflow: 'hidden', maxWidth: '100%', position: 'relative', minHeight: '95vh' }}>
            <div class="blob">

                <svg viewBox="0 0 200 200">
                    <path  d="M64.3,-20.1C70.7,-1.2,54.5,25.7,31.1,42.7C7.7,59.7,-22.8,66.6,-44.9,52.7C-67.1,38.8,-80.7,4,-71.8,-18.3C-62.9,-40.6,-31.5,-50.5,-1.3,-50.1C28.9,-49.7,57.9,-39,64.3,-20.1Z" transform="translate(100 100)" />
                </svg>
            </div>

            {testJSX}
        </div>
    )
}
export default Inicio