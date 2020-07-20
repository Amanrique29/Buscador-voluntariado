import React, { useState } from 'react';
import './Buscador.css';

function DescripcionBuscador({ activity }) {
    let [desplegado, setDesplegado] = useState(false);
    let description = null;
    if (desplegado) {
        console.log(activity)
        description = (
            <div className="desplegableYboton">
                <div className="desplegable">
                    <p>{activity.actividad.descripcion}</p>
                </div>
                <button className="botonLeerMas" onClick={cambiarDesplegable}>Leer menos</button>
            </div>
        );
    } else {
        description = (
            <div className="desplegableYboton">
                <div className="desplegable">
                    <p>{activity.actividad.descripcion.substring(0, 80) + '...'}</p>
                </div>
                <button className="botonLeerMas" onClick={cambiarDesplegable}>Leer más</button>
            </div>
        );
    }
    function cambiarDesplegable() {
        setDesplegado(!desplegado);
    }

    return (
        <div className="resultadoActividades">
            <h3><b>{activity.actividad.titulo}</b></h3>
            <p><b>Organización: {activity.actividad.ong}</b></p>
            <p><b><a href={activity.actividad.webOficial}>Ir al sitio web </a></b></p>
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
                </div>
                <p>{description}</p>
                <p>Fechas inicio: {activity.actividad.fechaInicio} </p>
                <p>Fecha fin: {activity.actividad.fechaFin} </p>
            </div>


            <div>
                <p>{activity.ods.map(function (o) {

                    return <><img className="logo-ods" src={o.logo} alt={o.nombre} /></>
                })}</p>
            </div>
        </div>

    )
}


export default DescripcionBuscador
