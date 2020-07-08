import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

function Resultados(){
    
    let [resultadosSlidersJSX, setResultadosSildersJSX] = useState('');
    let afinidades = JSON.parse(localStorage.getItem('afinidades'));
    if (afinidades === null) {
        afinidades = [{valor:1}];
        console.log(afinidades)
    }
    

    // if (afinidades === undefined) {
    //     setResultadosSildersJSX (
    //     <p>Tienes una sociabilidad de 1</p>) 
    // }

    // else {
    //     setResultadosSildersJSX (<p>Tienes una sociabilidad de {afinidades[afinidades.length-1].valor}</p>)
    // }

    return(
        <>
         <h1>Resultados del test</h1>
         <p>Tienes una sociabilidad de {afinidades[afinidades.length-1].valor}</p>
         
        </>
    )
};

export default Resultados;