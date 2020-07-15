import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import './Resultados.css';

function Resultados() {


    let listadoAfinidades = JSON.parse(localStorage.getItem('afinidades'));

    let listadoProvincias = JSON.parse(localStorage.getItem('provincias'));

    // let [actividadesPorProvincia, setActividadesPorProvincia] = useState([]);


    let actividadesElegidas = [];
    let [actividadesElegidasJSX, setActividadesElegidasJSX] = useState('');


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

                    if (listadoProvincias[j] === datos[i].actividad.provincia) {
                        actividadesElegidas.push(datos[i])
                    }

                }
            }


            setActividadesElegidasJSX(actividadesElegidas.map(function (activity) {


                console.log(activity)

                // function Descripcion() {
                    // let [desplegado, setDesplegado] = useState(false);
                    // let description = null;
                    // if (desplegado) {
                    //     description =
                    //         <div className="desplegable">
                    //             <p>{activity.actividad.descripcion}</p>
                    //         </div>
                    // }
                    // function cambiarDesplegable() {
                    //     setDesplegado(!desplegado);
                    // }

                    return (
                        <div className="resultadoActividades">
                            <h3><b>{activity.actividad.titulo}</b></h3>
                            <p><b>Organización: {activity.actividad.ong}</b></p>
                            <p><b>Enlace: <a href={activity.actividad.webOficial}></a></b></p>
                            <p>Provincia: {activity.actividad.provincia}</p>
                            <p><b>Temáticas:</b> {activity.tema.map(function (t, i) {
                                if (i < activity.tema.length - 1) {

                                    return <>{t}, </>
                                }
                                return <>{t}</>
                            })}</p>
                            <div>
                                <div className="descripcionBoton">
                                    <p><b>Descripción</b></p>
                                    {/* <button className="botonBusq2" onClick={cambiarDesplegable}>Leer más</button> */}
                                    <button className="botonBusq2">Leer más</button>
                                </div>
                                {/* <p>{description}</p> */}
                                <p>{activity.actividad.descripcion}</p>
                                <p>Fechas inicio: {activity.actividad.fechaInicio} </p>
                                <p>Fecha fin: {activity.actividad.fechaFin} </p>
                            </div>
                            <div>
                                <p>ODS:Logos</p>
                            </div>
                        </div>

                    )
                // }
            }))

        })

    }, [])








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



    return (
        <main>
            <h3>Resultados del test</h3>
            <>
                {cualidadesJSX}
            </>
            <>
                {provinciasJSX}

            </>
            <>
                {actividadesElegidasJSX}
            </>
        </main>
    )
};

export default Resultados;