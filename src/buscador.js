import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';


function Buscador() {
    let [texto, setTexto] = useState('');
    let [resultados, setResultados] = useState('');
    let [filtrar, setFiltrar] = useState(false);
    function search() {
        let valor = document.getElementById("buscar").value.toLowerCase();
        fetch('/buscador').then(function (response) {
            return response.json();
        }).then(function (data) {
            let titulo;
            let pais;
            let provincia;
            let descripcion;
            let datosFiltrados = [];
            data.filter(function (datos) {
                titulo = datos.titulo;
                pais = datos.pais;
                provincia = datos.provincia;
                descripcion = datos.descripcion;
                if (titulo.toLowerCase().indexOf(valor) !== -1 || pais.toLowerCase().indexOf(valor) !== -1 || provincia.toLowerCase().indexOf(valor) !== -1) {
                    datosFiltrados.push(datos);
                }
            });
            if (datosFiltrados.length === 0) {
                setTexto(<p>No hay resultados que mostrar</p>)
                setResultados('');
                setFiltrar('');
            } else {
                setResultados(`${datosFiltrados.length} resultado(s) que coinciden con tu búsqueda.`);
                setTexto(datosFiltrados.map(function (response) {
                    return (
                        <>
                            <h1>{response.titulo}</h1>
                            <h2>{response.pais}</h2>
                            <h2>{response.provincia}</h2>
                            <p>{response.descripcion}</p>
                        </>
                    );
                }));
                setFiltrar('');
            };

        });
    };
    
    function mostrarFiltros() {
        setFiltrar(true)

        fetch('http://localhost:3000/listadoTematicas')
        .then(function(respuesta){
            return respuesta.json()
        }).then(function(datos){
            console.log(datos)
        })
    };
    
    function Filtros() {



        if (filtrar === true) {
            return (<>
                <input type="checkbox" name="uno" id="madrid" /> <label>Madrid</label>
                <input type="checkbox" name="dos" id="Barcelona" /> <label>Barcelona</label>
                <input type="checkbox" name="tres" id="Valencia" /> <label>Valencia</label>
                <input type="checkbox" name="cuatro" id="Guadalajara" /> <label>Guadalajara</label>
            </>);
        } else {
            return (<button onClick={mostrarFiltros}>Filtros avanzados</button>
            )
        }
    };

    return (
        <>
            <input type="text" id="buscar"></input>
            <button onClick={search}>Buscar</button>
            <div>
                <Filtros />
            </div>
            <p>{resultados}</p>
            {texto}
        </>
    )
};

export default Buscador;