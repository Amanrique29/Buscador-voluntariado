import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

function Buscador() {
    let [texto, setTexto] = useState('');
    let [resultados, setResultados] = useState('');
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
            } else {
                setResultados(`${datosFiltrados.length} resultados que coinciden con tu búsqueda.`);
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
            };

        });
    };
    console.log(texto);
    return (
        <>
            <input type="text" id="buscar"></input>
            <button onClick={search}>Buscar</button>
            <p>{resultados}</p>
            {texto}
        </>
    )
};

export default Buscador;