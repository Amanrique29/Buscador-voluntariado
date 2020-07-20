import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import './Buscador.css';
import './DescripcionBuscador.js'
import DescripcionBuscador from './DescripcionBuscador.js';


function Buscador() {
    let [texto, setTexto] = useState('');
    let [resultados, setResultados] = useState('');
    let [filtrar, setFiltrar] = useState(false);
    let [tematicasJSX, setTematicasJSX] = useState('');
    let [valorInput, setValorInput] = useState('');
    let [temaSelect, setTemaSelect] = useState([]);
    let [provincias, setProvincias] = useState([]);
    let [busquedaRealizada, setBusquedaRealizada] = useState(false);

    // ESTADO PARA PAGINACION
    let [oportunidadesAMostrar, setOportunidadesAMostrar] = useState([]);
    // let temaSelect=[];
    let [provinciaSelect, setProvinciaSelect] = useState("");

    //ESTADO PARA PAGINACION
    let [numPagina, setNumPagina] = useState(0);

    let oportunidadesAMostrarJSX;


    function search() {

        setNumPagina(0);

        let filtros = {
            palabra: "",
            tematicas: temaSelect,
            provincia: ""
        }


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
            setBusquedaRealizada(true);
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

    function MostrarFiltros() {

        fetch('cargarTematicas')
            .then(function (respuesta) {
                return respuesta.json()
            }).then(function (datos) {

                setTematicasJSX(datos.map(function (tema) {
                    return (
                        <>
                            <input onChange={selectTema} defaultChecked={false} type="checkbox" id={tema.nombre} value={tema.nombre} className="filtro-avanzado" />
                            <label htmlFor={tema.nombre}>{tema.nombre}</label>
                        </>

                    )
                }))

            });

        fetch('cargarProvincias')
            .then(function (respuesta) {
                return respuesta.json()
            }).then(function (datos) {
                setProvincias(datos);
                setFiltrar(true);
            })

    };


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
        <> <div className="inputyBoton">
            <input type="text" id="buscar" value={valorInput} onChange={selectValor}></input>
            <button className="ancho" onClick={MostrarFiltros}>Filtros avanzados</button>

        </div>

            <div>
                <div className="checkboxes">
                    {tematicasJSX}
                </div>
                {filtrar
                    ?
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
                    :
                    null}
            </div>
            <div className="boton-busqueda">
            <button onClick={search}>Buscar</button>
            </div>
            <p>{resultados}</p>
            {texto}
            {/* <p>{temaSelect.map(el => <>{el} </>)}</p> */}
            <div>
                <div>{
                    busquedaRealizada
                        ?
                        oportunidadesAMostrarJSX.length !== 0
                            ?
                            <>
                            <p>Se ha obtenido un total de {oportunidadesAMostrarJSX.length} resultado(s)</p>{oportunidadesAMostrarJSX}
                            </>
                            :
                            <p>No hay resultados que mostrar</p>
                        :
                        null
                }</div>
            </div>
            {

                numPagina * 6 + 6 <= 6 ? null : <button className="botonPasarPagina" onClick={paginaAnterior}>Anterior </button>
            }
            {
                numPagina * 6 + 6 < oportunidadesAMostrar.length ? <button className="botonPasarPagina" onClick={paginaSiguiente}>Siguiente </button> : null

            }
            {
                numTotalPaginas === 0 ? null : <p className="paginaActual">Página {numPagina + 1} de {numTotalPaginas}</p>
            }
        </>
    )
};

export default Buscador;