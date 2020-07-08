import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import Slider from './Slider';

function Test() {

    
    
    let mapaJSX = <main>
        <h3>Elige tu área geográfica</h3>
        <img className="test-img" src="españa.jpg" alt=""></img>
        <button onClick={siguiente}>Continuar</button>
    </main>;
    let slidersJSX = <main>
       
        <h3>Define tus preferencias</h3>
        <Slider/>
       
        <button onClick={siguiente}>Continuar</button>
    </main>;

    let temasJSX = <main>
        <img className="test-img" src="temas.png" alt=""></img>
        <Link to="/resultados">Resultados</Link>
    </main>;

    let [test, setTest] = useState(mapaJSX);
    let [num, setNum] = useState(1);
    
    function siguiente() {
        console.log(num);
        switch (num) {
           
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