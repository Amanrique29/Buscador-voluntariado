import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import './Resultados.css';

function Resultados() {

    let [resultadosSlidersJSX, setResultadosSildersJSX] = useState('');
    let afinidades = JSON.parse(localStorage.getItem('afinidades'));

    let listadoProvincias = JSON.parse(localStorage.getItem('provincias'));


    // if (afinidades === undefined) {
    //     setResultadosSildersJSX (
    //     <p>Tienes una sociabilidad de 1</p>) 
    // }

    // else {
    //     setResultadosSildersJSX (<p>Tienes una sociabilidad de {afinidades[afinidades.length-1].valor}</p>)
    // }

    const cualidadesJSX = afinidades.map(function (afinidad) {
        return (
            <p>Tienes una {afinidad.nombre} de {afinidad.valor}</p>
        )
    })

    const provinciasJSX = listadoProvincias.map(function (provincia) {
        return (
            <p>Ofertas en la provincia de {provincia}</p>
        )
    })

    return (
        <main>
            <h3>Resultados del test</h3>
            <>
                {cualidadesJSX}
            </>
            <>
                {provinciasJSX}
            </>
        </main>
    )
};

export default Resultados;