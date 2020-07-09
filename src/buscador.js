import React from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

function Buscador(){
    
    function search(){
        let valor = document.getElementById("buscar").value;
        fetch('/buscador').then(function (response) {
            return response.json();
        }).then(function (data) {
            let prueba = data[0].titulo;
            console.log(prueba);  
        })
    };
return (
    <>
    <input type="text" id="buscar"></input>
    <button onClick={search}>Buscar</button>
    </>
)
};

export default Buscador;