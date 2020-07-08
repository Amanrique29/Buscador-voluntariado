import React from 'react';
import { BrowserRouter, Route, Link, useParams, useHistory } from 'react-router-dom';

function Inicio() {

    let history = useHistory()
    
    function irATest () {
        history.push('/test')
    }

    let testJSX = <main>
        <div className="test">
            <h1>¡Prueba nuestro test!</h1>
            <Link to="/buscador">Ir a buscador convencional</Link>
        </div>
        <img className="test-img" src="test.jpg" alt=""></img>

        <button onClick={irATest}>Continuar</button>
    </main>;

    return (
<>
        {testJSX}
        </>
    )
}
export default Inicio