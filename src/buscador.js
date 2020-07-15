import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import './Buscador.css';



function Buscador() {
    let [texto, setTexto] = useState('');
    let [resultados, setResultados] = useState('');
    let [filtrar, setFiltrar] = useState(false);
    let [tematicasJSX, setTematicasJSX] = useState('');
    let [provinciasJSX, setProvinciasJSX] = useState('')
    let [valorInput, setValorInput] = useState('');
    let [temaSelect, setTemaSelect] = useState([]);
    let [provinciaSelect, setProvinciaSelect] = useState("");


    function search() {
       
        console.log(valorInput)
        console.log(temaSelect)
        console.log(provinciaSelect)

        let filtros = {
            palabra: "",
            tematicas: [],
            provincia: ""
        }


        if (valorInput !== "") {
            filtros.palabra = valorInput
        }

        if (temaSelect.length > 0) {
            filtros.tematicas = temaSelect
        }

        if (provinciaSelect !== 'Seleccione una provincia' || provinciaSelect !== "") {
            filtros.provincia = provinciaSelect
        }

        console.log(filtros)

        fetch('/buscador', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filtros)
        }).then(function(respuesta){
            return respuesta.json()
        }).then(function(datos){
            console.log(datos)
        })

        // fetch('/buscador').then(function (response) {
        //     return response.json();
        // }).then(function (data) {
        //     console.log(data)
        //     let titulo;

        //     let provincia;
        //     let descripcion;
        //     let datosFiltrados = [];
        //     data.filter(function (datos) {
        //         titulo = datos.titulo;

        //         provincia = datos.provincia;
        //         descripcion = datos.descripcion;
        //         if (titulo.toLowerCase().indexOf(valorInput) !== -1 || provincia.toLowerCase().indexOf(valorInput) !== -1) {
        //             datosFiltrados.push(datos);
        //         }
        //     });
        //     if (datosFiltrados.length === 0) {
        //         setTexto(<p>No hay resultados que mostrar</p>)
        //         setResultados('');
        //         setFiltrar('');
        //     } else {
        //         setResultados(`${datosFiltrados.length} resultado(s) que coinciden con tu búsqueda.`);
        //         setTexto(datosFiltrados.map(function (response) {
        //             return (
        //                 <>
        //                     <h1>{response.titulo}</h1>

        //                     <h2>{response.provincia}</h2>
        //                     <p>{response.descripcion}</p>
        //                 </>
        //             );
        //         }));
        //         setFiltrar('');
        //     };

        // });
    };

    function MostrarFiltros() {
        // setFiltrar(true)

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


   function selectValor (event) {
       setValorInput(event.target.value)
   }

    let unTema;
    function selectTema(event) {
        unTema = event.target.value;

        if (event.target.checked === true) {

            setTemaSelect(temaSelect.push(unTema));
        } else {

            for (let i = 0; i < temaSelect.length; i++) {
                if (temaSelect[i].indexOf(unTema) !== -1) {
                    temaSelect.splice(i, 1)
                }
            }
           
            setTemaSelect(temaSelect)
        }

    }

    function selectProvincia (event) {
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
        </>
    )
};

export default Buscador;