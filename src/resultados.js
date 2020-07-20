import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import './Resultados.css';
import Chart from 'chart.js';
import Grafica from './Grafica';
import DescripcionBuscador from './DescripcionBuscador.js';
import ReactSpinner from 'react-bootstrap-spinner'

function Resultados() {


    let listadoAfinidades = JSON.parse(localStorage.getItem('afinidades'));

    let listadoProvincias = JSON.parse(localStorage.getItem('provincias'));


    let [actividadesElegidas, setActividadesElegidas] = useState([]);
    let [numPagina, setNumPagina] = useState(0);
    let [cargando, setCargando] = useState(false)

    useEffect(function () {

        setNumPagina(0);

        let afinidadesEnviar = {
            afinidades: listadoAfinidades
        }
        setCargando(true)
        fetch('resultadosAfinidades', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(afinidadesEnviar)
        }).then(function (respuesta) {
            return respuesta.json()
        }).then(function (datos) {
            console.log(datos)

            let arrayElegidas = [];

            for (let i = 0; i < datos.length; i++) {
                for (let j = 0; j < listadoProvincias.length; j++) {

                    if (listadoProvincias[j] === datos[i].actividad.provincia) {
                        arrayElegidas.push(datos[i])
                    }
                }
            }

            setActividadesElegidas(arrayElegidas);
            setCargando(false)

        })

    }, [])

    const actividadesElegidasJSX = actividadesElegidas.map(function (activity, indice) {

        console.log(activity)

        if (actividadesElegidas.length === 0) {
            return <p>No hay resultados que mostrar</p>

        } else {
            if (indice >= numPagina * 6 && indice < (numPagina * 6) + 6) {
                return (
                    <DescripcionBuscador activity={activity} />
                );
            }
        }




    })

    function paginaSiguiente() {
        if (actividadesElegidas.length > 6 && numPagina * 6 + 6 < actividadesElegidas.length) {
            setNumPagina(numPagina + 1)
        }
    }

    function paginaAnterior() {
        setNumPagina(numPagina - 1)
    }

    let numTotalPaginas;
    if (actividadesElegidas.length % 6 === 0) {
        numTotalPaginas = actividadesElegidas.length / 6
    } else if (actividadesElegidas.length % 6 !== 0) {
        numTotalPaginas = Math.floor((actividadesElegidas.length / 6 + 1))
    }

    const provinciasJSX = listadoProvincias.map(function (provincia) {
        return (
            <p>Ofertas en la provincia de {provincia}</p>
        )
    });

    return (
        <main>
            <h3>Resultados del test</h3>
            <Grafica />

            <>
                {provinciasJSX}
            </>

            <div>
                {cargando ?  <div id="loading"></div>: actividadesElegidasJSX}
            </div>
            {

                numPagina * 6 + 6 <= 6 ? null : <button onClick={paginaAnterior}>Anterior </button>
            }
            {
                numPagina * 6 + 6 < actividadesElegidas.length ? <button onClick={paginaSiguiente}>Siguiente </button> : null

            }
            {
                numTotalPaginas === 0 ? null : <p>Página {numPagina + 1} de {numTotalPaginas}</p>
            }

        </main>
    )
};

export default Resultados;