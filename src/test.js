import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

function Test() {
    let testJSX = <main>
        <div className="test">
            <h1>¡Prueba nuestro test!</h1>
            <Link to="/buscador">Ir a buscador convencional</Link>
        </div>
        <img className="test-img" src="test.jpg" alt=""></img>
        <button onClick={siguiente}>Continuar</button>
    </main>;

    let mapaJSX = <main>
        <img className="test-img" src="españa.jpg" alt=""></img>
        <button onClick={siguiente}>Continuar</button>
    </main>;
    let slidersJSX = <main>
        <img className="test-img" src="sliders.jpg" alt=""></img>
        <button onClick={siguiente}>Continuar</button>
    </main>;

    let temasJSX = <main>
        <img className="test-img" src="temas.png" alt=""></img>
        <Link to="/resultados">Resultados</Link>
    </main>;
    let [test, setTest] = useState(testJSX);
    let [num, setNum] = useState(0);
    function siguiente() {
        console.log(num);
        switch (num) {
            case 0:
                setTest(mapaJSX);
                setNum(num++);
                break;
            case 1:
                setTest(slidersJSX);
                setNum(num++);
                break;
            case 2:
                setTest(temasJSX);
                break;
            default:
                console.log("Ha habido un error.");
        }
    };

    return (
        <>
            {test}
        </>
    )
}

export default Test;