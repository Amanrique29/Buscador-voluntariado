import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import './Resultados.css';

function Resultados() {

    let [resultadosSlidersJSX, setResultadosSildersJSX] = useState('');
    let listadoAfinidades = JSON.parse(localStorage.getItem('afinidades'));

    let listadoProvincias = JSON.parse(localStorage.getItem('provincias'));

    // let [actividadesPorProvincia, setActividadesPorProvincia] = useState([]);

    // Consultar si es preferible hacer el fetch en un useEffect o hacerlo como consecuencia de un onClick
    let actividadesElegidas = []

    useEffect(function () {

        let afinidadesEnviar = {
            afinidades: listadoAfinidades
        }

        fetch('http://localhost:3000/resultadosAfinidades', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(afinidadesEnviar)
        }).then(function (respuesta) {
            return respuesta.json()
        }).then(function (datos) {
            console.log(datos)

            for (let i = 0; i < datos.length; i++) {
                for (let j = 0; j < listadoProvincias.length; j++) {
                    for (let k = 0; k < datos[i].actividades.length; k++) {
                        if (listadoProvincias[j] === datos[i].actividades[k].provincia) {
                            actividadesElegidas.push(datos[i].actividades[k])
                        }
                    }
                }
            }

            console.log(actividadesElegidas)
        })

    }, [])

    // Comparamos las actividades con la provincia o provincias almacenadas en local storage

    // useEffect(function () {

    //     let provinciasEnviar = {
    //         provincias: listadoProvincias
    //     }

    //     fetch('http://localhost:3000/actividadesPorAfinidades', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(provinciasEnviar)
    //     }).then(function(respuesta){
    //         return respuesta.json()
    //     }).then (function (datos){
    //         console.log(datos)
    //         setActividadesPorProvincia(datos)

    //     })


    // }, [])




    // if (afinidades === undefined) {
    //     setResultadosSildersJSX (
    //     <p>Tienes una sociabilidad de 1</p>) 
    // }

    // else {
    //     setResultadosSildersJSX (<p>Tienes una sociabilidad de {afinidades[afinidades.length-1].valor}</p>)
    // }

    const cualidadesJSX = listadoAfinidades.map(function (afinidad) {
        return (
            <>

                <p>Tienes una {afinidad.nombre} de {afinidad.valor}</p>
            </>
        )
    })

    const provinciasJSX = listadoProvincias.map(function (provincia) {
        return (
            <p>Ofertas en la provincia de {provincia}</p>
        )
    });

    // const actividadesProvinciasJSX = actividadesPorProvincia.map(function (actividad) {
    //     return (
    //         <>
    //             <h3>{actividad.titulo}</h3>
    //             <p>{actividad.descripcion}</p>
    //         </>
    //     )
    // });

    return (
        <main>
            <h3>Resultados del test</h3>
            <>
                {cualidadesJSX}
            </>
            <>
                {provinciasJSX}

            </>
            {/* <>
                {actividadesProvinciasJSX}
            </> */}
        </main>
    )
};

export default Resultados;