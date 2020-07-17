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
    let [provinciasJSX, setProvinciasJSX] = useState('')
    let [valorInput, setValorInput] = useState('');
    let [temaSelect, setTemaSelect] = useState([]);
    let [oportunidadesAMostrar, setOportunidadesAMostrar] = useState([]);
    // let temaSelect=[];
    let [provinciaSelect, setProvinciaSelect] = useState("");

    let oportunidadesAMostrarJSX;


    function search() {

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

        fetch('http://localhost:3000/buscador', {
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
        })
    };

    console.log(oportunidadesAMostrar)
    
    oportunidadesAMostrarJSX = oportunidadesAMostrar.map(function (activity) {

        return (
        <DescripcionBuscador activity={activity}/>
        );
    })

    function MostrarFiltros() {

        fetch('http://localhost:3000/cargarTematicas')
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

        fetch('http://localhost:3000/cargarProvincias')
            .then(function (respuesta) {
                return respuesta.json()
            }).then(function (datos) {

                setProvinciasJSX(datos.map(function (provincia) {
                    return (
                        <>
                            <option value={provincia}>{provincia}</option>
                        </>

                    )
                }))

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

        fetch('http://localhost:3000/actividadesPorTematica', {
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

    return (
        <>
            <input type="text" id="buscar" value={valorInput} onChange={selectValor}></input>
            <button onClick={search}>Buscar</button>
            <div>
                <button onClick={MostrarFiltros}>Filtros avanzados</button>

            </div>

            <div className="checkboxes">
                {tematicasJSX}
            </div>
            <>
                <select name="provincias" id="provincias" value={provinciaSelect} onChange={selectProvincia}>
                    <option value="Seleccione una provincia">Elige una provincia</option>
                    {provinciasJSX}
                </select>
            </>
            <p>{resultados}</p>
            {texto}
            <p>{temaSelect.map(el => <>{el} </>)}</p>
            <div>
                <div>{oportunidadesAMostrarJSX.length !== 0 ? oportunidadesAMostrarJSX : <p>No hay resultados que mostrar</p>}</div>
            </div>
        </>
    )
};

export default Buscador;