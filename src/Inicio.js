import React from 'react';
import { BrowserRouter, Route, Link, useParams, useHistory } from 'react-router-dom';
import './Inicio.css';

function Inicio() {

    let history = useHistory()
    
    function irATest () {
        history.push('/test')
    }

    let testJSX = <main>
      
        <div className="test">
            <h1>Tu buscador de voluntariado</h1>
            <button className="botonContinuar" onClick={irATest}>Continuar</button>
        </div>
        {/* <img className="test-img" src="test.jpg" alt=""></img> */}
        <Link to="/buscador" className="buscadorConvencional">... Ir a buscador convencional</Link> 
    </main>;

    return (
<>
        {testJSX}
        </>
    )
}
export default Inicio