import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useParams, useHistory } from 'react-router-dom';
import './Resultados.css';
import Chart from 'chart.js';
import Grafica from './Grafica';
import DescripcionBuscador from './DescripcionBuscador.js';

function Resultados() {

    let history = useHistory();

    let listadoAfinidades = JSON.parse(localStorage.getItem('afinidades'));

    let listadoProvincias = JSON.parse(localStorage.getItem('provincias'));


    let [actividadesElegidas, setActividadesElegidas] = useState([]);
    let [numPagina, setNumPagina] = useState(0);
    let [cargando, setCargando] = useState(false);
    let [tematicasElegidasNombre, setTematicasElegidasNombre] = useState([]);
    let [tematicasElegidasLogo, setTematicasElegidasLogo] = useState([]);

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

    let tematicasNombreNew = [];
    let tematicasLogoNew = [];

    for (let a = 0; a < actividadesElegidas.length; a++) {
        if (tematicasElegidasNombre.length === 0 && tematicasElegidasLogo.length === 0) {
            tematicasNombreNew = [...tematicasElegidasNombre, actividadesElegidas[a].tema[0]]
            setTematicasElegidasNombre(tematicasNombreNew);
            tematicasLogoNew = [...tematicasElegidasLogo, actividadesElegidas[a].logotema[0]]
            setTematicasElegidasLogo(tematicasLogoNew);

        } else {
            let tematicaExiste = false;
            for (let b = 0; b < tematicasElegidasNombre.length; b++) {
                if (actividadesElegidas[a].tema[0] === tematicasElegidasNombre[b] && actividadesElegidas[a].logotema[0].alt === tematicasElegidasLogo[b].alt) {
                    tematicaExiste = true;
                }
            }
            if (tematicaExiste === false) {
                tematicasNombreNew = [...tematicasElegidasNombre, actividadesElegidas[a].tema[0]]
                setTematicasElegidasNombre(tematicasNombreNew);
                tematicasLogoNew = [...tematicasElegidasLogo, actividadesElegidas[a].logotema[0]]
                setTematicasElegidasLogo(tematicasLogoNew);
            }
        }
    }

    function irABuscador() {
        history.push("/buscador")
    }

    console.log(tematicasElegidasNombre);
    console.log(tematicasElegidasLogo);


    const tematicasLogosJSX = tematicasElegidasLogo.map(function (logo) {
        return (
            <>
                <img src={logo.url} className="logo-ods-round" />
            </>
        )
    })

    const tematicasNombresJSX = tematicasElegidasNombre.map(function (nombre, i) {
        if (i < tematicasElegidasNombre.length - 1) {
            return <>{nombre}, </>
        }
        return <>{nombre}</>
    })


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



    const provinciasJSX = listadoProvincias.map(function (provincia, i) {

        if (i < listadoProvincias.length - 1) {
            return <>{provincia}, </>
        }
        return <>{provincia}</>
    });

    return (
        <main>
            <h3 className="titularPagina">Resultados del test</h3>
            <Grafica />

            <div className="textos">
                <p>En función de tus preferencias, creemos que puedes tener afinidad con las siguientes temáticas:</p>
            </div>
            <div>
                {tematicasNombresJSX}
            </div>
            <div>
                {tematicasLogosJSX}
            </div>

            <div className="textos">
                <p>Si no te convencen las sugerencias, prueba nuestro buscador convencional.</p>
            </div>
            <div>
                <button class="botonLeerMas" onClick={irABuscador}>Ir a buscador</button>
            </div>
            <div className="ofertasProvincia">
                <p>Ofertas en la(s) provincia(s) de: </p>
                {provinciasJSX}
            </div>

            <div>
                {cargando
                    ?
                    <div id="loading"></div>
                    :
                    !cargando && actividadesElegidas.length === 0
                        ?
                        <p>No hay resultados que mostrar</p>
                        :
                        <> <p className="numResultados">Hay un total de {actividadesElegidas.length} resultado(s)</p> 
                        <div className="totalActividades">{actividadesElegidasJSX}</div>
                        </>
                }
            </div>
            <div className="botonesAtrasSiguiente">
                {

                    numPagina * 6 + 6 <= 6 ? null : <button className="botonPasarPagina" onClick={paginaAnterior}>Anterior </button>
                }
                {
                    numPagina * 6 + 6 < actividadesElegidas.length ? <button className="botonPasarPagina" onClick={paginaSiguiente}>Siguiente </button> : null

                }
            </div>
            {
                numTotalPaginas === 0 ? null : <p className="paginaActual">Página {numPagina + 1} de {numTotalPaginas}</p>
            }

        </main>
    )
};

export default Resultados;