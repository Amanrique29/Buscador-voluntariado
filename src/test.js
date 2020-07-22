import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import Slider from './Slider';
import './Test.css';
import Mapa from './Mapa.js';

function Test() {

    let mapaJSX = <main className="mainMapa">
        <svg viewBox="0 0 200 200" className="blobMapa">
            <path d="M70,-23.1C78.8,4.2,65.7,38.3,41.7,55.2C17.7,72.1,-17.2,71.9,-41.8,54.7C-66.3,37.5,-80.6,3.3,-71.9,-23.9C-63.2,-51.2,-31.6,-71.5,-0.5,-71.4C30.6,-71.2,61.2,-50.5,70,-23.1Z" transform="translate(100 100)" />
        </svg>
        <h3 className="titularPagina">Elige tu área geográfica</h3>
        {/* <img className="test-img" src="spain.jpg" alt=""></img> */}
        <div className="provincias">
            <Mapa siguiente={siguiente} />
        </div>

    </main>;

    let provincias = [];

    let slidersJSX = <main className="mainMapa">
        <h3 className="titularPagina">Define tus preferencias</h3>
        <Slider provincias={provincias} />

        <Link to="/resultados" className="botonBuscarMapa">Resultados</Link>
    </main>;

    let [test, setTest] = useState(mapaJSX);
    let [num, setNum] = useState(1);

    //Cogemos el valor de la provincia para guardarlo en el array provincias[] si no existe el valor dentro
    function registrarProvincia(event) {
        console.log(event.target.value);
        if (provincias.indexOf(event.target.value) === -1) {
            provincias.push(event.target.value);
        }
        console.log(provincias)

        //Meter en el local storage el array provincias
        let listadoProvinciasEnJson = JSON.stringify(provincias);
        localStorage.setItem('provincias', listadoProvinciasEnJson);
    }

    function siguiente() {
        console.log(num);
        switch (num) {

            case 1:
                setTest(slidersJSX);
                setNum(num++);
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