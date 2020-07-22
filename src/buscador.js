import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import './Buscador.css';
import './DescripcionBuscador.js'
import DescripcionBuscador from './DescripcionBuscador.js';


function Buscador() {
    let [texto, setTexto] = useState('');
    let [resultados, setResultados] = useState('');
    let [filtrar, setFiltrar] = useState(false);
    let [valorInput, setValorInput] = useState('');
    let [temaSelect, setTemaSelect] = useState([]);
    let [provincias, setProvincias] = useState([]);
    let [tematicas, setTematicas] = useState([]);

    // let [busquedaRealizada, setBusquedaRealizada] = useState(false);
    let [cargando, setCargando] = useState(false)

    let oportunidadesAMostrarJSX;

    // ESTADO PARA PAGINACION
    let [oportunidadesAMostrar, setOportunidadesAMostrar] = useState([]);

    useEffect(function () {
        fetch('cargarProvincias')
            .then(function (respuesta) {
                return respuesta.json()
            }).then(function (datos) {
                setProvincias(datos);

            });

        fetch('cargarTematicas')
            .then(function (respuesta) {
                return respuesta.json()
            }).then(function (datos) {
                setTematicas(datos);
            });
    }, []);

    useEffect(function () {
        let sinFiltros = {
            palabra: "",
            tematicas: temaSelect,
            provincia: ""
        }
        setCargando(true)
        fetch('buscador', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sinFiltros)
        }).then(function (respuesta) {
            return respuesta.json()
        }).then(function (datos) {
            console.log(datos)
            setOportunidadesAMostrar(datos)
            setCargando(false)
        })

    }, []);

    // let temaSelect=[];
    let [provinciaSelect, setProvinciaSelect] = useState("");

    //ESTADO PARA PAGINACION
    let [numPagina, setNumPagina] = useState(0);

    function search() {

        setNumPagina(0);

        let filtros = {
            palabra: "",
            tematicas: temaSelect,
            provincia: ""
        }

        setCargando(true)
        if (valorInput !== "") {
            filtros.palabra = valorInput
        }

        if (temaSelect.length >= 0) {
            filtros.tematicas = temaSelect
        }

        if (provinciaSelect !== 'Seleccione una provincia' || provinciaSelect !== "") {
            filtros.provincia = provinciaSelect
        }

        console.log(filtros)

        fetch('buscador', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filtros)
        }).then(function (respuesta) {
            return respuesta.json()
        }).then(function (datos) {
            console.log(datos)

            setOportunidadesAMostrar(datos);
            setCargando(false)

        })
    };

    //¿PODRÍA DAR ERROR PORQUE NO SE HA HECHO EL FETCH Y NO SABE LO QUE HAY DENTRO DE OPORTUNIDADES A MOSTRAR?
    console.log(oportunidadesAMostrar)

    oportunidadesAMostrarJSX = oportunidadesAMostrar.map(function (activity, indice) {
        if (indice >= numPagina * 6 && indice < (numPagina * 6) + 6) {

            return (
                <DescripcionBuscador activity={activity} />
            );
        }
    })


    let [desplegado, setDesplegado] = useState(false);
    let filters = null;

    if (desplegado) {
        let tematicasJSX = tematicas.map(function (tema) {
            return (
                <>
                    <input onChange={selectTema} defaultChecked={false} type="checkbox" id={tema.nombre} value={tema.nombre} className="filtro-avanzado" />
                    <label htmlFor={tema.nombre}>{tema.nombre}</label>
                </>
            )
        });

        filters = (
            <>
                <div className="checkboxes">{tematicasJSX}</div>

                <select className="desplegables" name="provincias" id="provincias" value={provinciaSelect} onChange={selectProvincia}>
                    <option value="Seleccione una provincia">Elige una provincia</option>
                    {
                        provincias.map(function (provincia) {
                            return (
                                <>
                                    <option value={provincia}>{provincia}</option>
                                </>

                            )
                        })
                    }
                </select>
            </>
        )


    } else {
        filters = null
    }

    function MostrarFiltros() {
        setDesplegado(!desplegado);
    }


    function selectValor(event) {
        setValorInput(event.target.value)
    }

    function selectTema(event) {
        let unTema;
        unTema = event.target.value;

        if (event.target.checked === true) {
            setTemaSelect(function (estadoAnterior) {
                let a = [...estadoAnterior, unTema];
                return a;
            });
            // temaSelect.push(unTema)
        } else {

            // for (let i = 0; i < temaSelect.length; i++) {
            //     if (temaSelect[i].indexOf(unTema) !== -1) {
            //         temaSelect.splice(i, 1)
            //     }
            // }
            setTemaSelect(function (estadoAnterior) {
                let filtrado = estadoAnterior.filter(elemento => elemento !== unTema);
                return filtrado;
            })
            // console.log(temaSelect)
        }

    }

    function selectProvincia(event) {
        setProvinciaSelect(event.target.value)
        console.log(provinciaSelect)
    }

    function mostrarPorTemas(temaSelect) {
        console.log(temaSelect)
        let tematicasEnviar = {
            temas: temaSelect
        }

        fetch('actividadesPorTematica', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tematicasEnviar)
        }).then(function (respuesta) {
            return respuesta.json()
        }).then(function (datos) {
            console.log(datos)
        })


    }

    function paginaSiguiente() {
        if (oportunidadesAMostrar.length > 6 && numPagina * 6 + 6 < oportunidadesAMostrar.length) {
            setNumPagina(numPagina + 1)
        }
    }

    function paginaAnterior() {
        setNumPagina(numPagina - 1)
    }

    let numTotalPaginas;
    if (oportunidadesAMostrar.length % 6 === 0) {
        numTotalPaginas = oportunidadesAMostrar.length / 6
    } else if (oportunidadesAMostrar.length % 6 !== 0) {
        numTotalPaginas = Math.floor((oportunidadesAMostrar.length / 6 + 1))
    }

    return (
        <>
            <div class="blobBuscador">

                <svg viewBox="0 0 200 200">
                    <path d="M41.3,-16C48.8,9.6,46.8,35.6,34.1,44.1C21.5,52.6,-1.8,43.6,-13.9,31.9C-25.9,20.1,-26.6,5.6,-22.5,-15.5C-18.3,-36.6,-9.1,-64.3,3.9,-65.5C16.9,-66.8,33.8,-41.6,41.3,-16Z" transform="translate(100 100)" />
                </svg>
            </div>

            <main className="mainBuscador">
                <div className="inputyBoton">
                    <input type="text" placeholder="  Teclea lo que quieras" id="buscar" value={valorInput} onChange={selectValor}></input>
                    <button className="ancho" onClick={MostrarFiltros}>Filtros avanzados</button>
                </div>

                <div>
                    {/* <div className="checkboxes">
                    {tematicasJSX}
                </div> */}
                    <div>{filters}</div>



                </div>
                <div >
                    <button className="botonBuscarBuscador" onClick={search}>Buscar</button>
                </div>
                <p>{resultados}</p>
                {texto}
                {/* <p>{temaSelect.map(el => <>{el} </>)}</p> */}

                <div>
                    {cargando
                        ?
                        <div id="loading"></div>
                        :
                        !cargando && oportunidadesAMostrar.length === 0
                            ?
                            <p>No hay resultados que mostrar</p>
                            :
                            <> <p className="numResultados">Hay un total de {oportunidadesAMostrar.length} resultado(s)</p>
                                <div className="totalActividades">{oportunidadesAMostrarJSX}</div>
                            </>
                    }
                </div>

                <div className="botonesAtrasSiguiente">
                    {

                        numPagina * 6 + 6 <= 6 ? null : <button className="botonPasarPagina" onClick={paginaAnterior}>Anterior </button>
                    }
                    {
                        numPagina * 6 + 6 < oportunidadesAMostrar.length ? <button className="botonPasarPagina" onClick={paginaSiguiente}>Siguiente </button> : null

                    }
                </div>
                {
                    numTotalPaginas === 0 ? null : <p className="paginaActual">Página {numPagina + 1} de {numTotalPaginas}</p>
                }




                {/* <div>
                <div>
                    {cargando
                        ?
                        <div id="loading"></div>
                         :

                        <div className="contenidoFichas">
                            <p className="numResultados">Se ha obtenido un total de {oportunidadesAMostrarJSX.length} resultado(s)</p>{oportunidadesAMostrarJSX}
                            <div className="botonesAtrasSiguiente">

                                {

                                    numPagina * 6 + 6 <= 6 ? null : <button className="botonPasarPagina" onClick={paginaAnterior}>Anterior </button>
                                }
                                {
                                    numPagina * 6 + 6 < oportunidadesAMostrar.length ? <button className="botonPasarPagina" onClick={paginaSiguiente}>Siguiente </button> : null

                                }
                            </div>
                            {
                                numTotalPaginas === 0 ? null : <p className="paginaActual">Página {numPagina + 1} de {numTotalPaginas}</p>
                            }
                        </div>

                }</div> */}

            </main>
        </>

    )
};

export default Buscador;