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


            <p className="organizacion"><b>Organización: {activity.actividad.ong}</b></p>
            <div className="contenedorIrAWeb">
                <p className="contenidoTarjeta"><b>{activity.actividad.webOficial !== null
                    ?
                    <a className="irASitioWeb" href={activity.actividad.webOficial}> Ir al sitio web </a>
                    :
                    null}</b></p>

            </div>

            <p className="contenidoTarjeta"><b>Provincia: {activity.actividad.provincia}</b></p>
            <p className="tematicas"><b>Temáticas:</b> {activity.tema.map(function (t, i) {
                if (i < activity.tema.length - 1) {
                    return <>{t}, </>
                }
                return <>{t}</>
            })}</p>

            <div className="dibujosLogos">{activity.logotema.map(function (logo) {

                return <><img src={logo.url} className="logo-ods" /></>
            })}</div>


            <div>
                <div>
                    <p className="titularNegrita"><b>Descripción</b></p>
                </div>
                <p className="contenidoTarjeta">{description}</p>
                {activity.actividad.fechaInicio !== ''
                    ?
                    <p className="contenidoTarjeta">Fecha inicio: {activity.actividad.fechaInicio} </p>
                    :
                    <p className="contenidoTarjeta">Fecha inicio: N.H.</p>}
                {activity.actividad.fechaFin !== ''
                    ?
                    <p className="contenidoTarjeta">Fecha fin: {activity.actividad.fechaFin} </p>
                    :
                    <p className="contenidoTarjeta">Fecha fin: N.H.</p>}
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

