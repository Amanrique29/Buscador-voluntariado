import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import './Sobrenosotros.css';
function SobreNosotros(){
    return(
        <>
        <div className="doscolumnas">
        <div className="columna1">
            <h1>SOBRE EL PROYECTO</h1>
            <p>Nuestro proyecto ha sido propuesto en la fase final del BBK Bootcamp por Idatis, organización dedicada a divulgar y desarrollar aplicaciones tecnológicas e innovadoras para conseguir un impacto positivo en la sociedad, tal y como expresan ellos mismos en su página web, que pueden consultar <a href="https://www.idatis.org/">aquí</a>.</p>
            <br></br>
            <p>Nuestro reto consiste en la creación de un buscador de oportunidades de voluntariado a lo largo de todo el territorio nacional, para lo cual hemos optado por una doble vía de búsqueda:</p>
            <br></br>
            <ul>
                <li>Test: mide las afinidades e inclinaciones del usuario, lo cual combinado con la región en la que le gustaría participar, devolverá (por medio de algoritmos ideados por nosotros) una serie de resultados recomendados.</li>
                <br></br>
                <li>Buscador convencional: esta opción más habitual permite realizar una búsqueda simple al usuario buscando coincidencias directas, pero también le permite filtrar por provincias y temáticas. Estas últimas han sido escogidas atendiendo a los criterios de la Ley 45/2015, del 14 de octubre, de Voluntariado.</li>
            </ul>
        </div>
        <div className="columna2">
            <h1>EL EQUIPO</h1>
            <p>Integrantes:</p>
            <ul>
            <br></br>
                <li>María Escalada Marco-Gardoqui</li>
                <br></br>
                <li>Julián Martín García </li>
                <br></br>
                <li>Aitor Manrique Díez</li>
            </ul>
            <br></br>
            <p>Nuestro grupo está compuesto por 3 estudiantes de la 7ª edición del BBK Bootcamp, donde hemos aprendido programación orientada a objetos utilizando principalmente (aunque no únicamente) el lenguaje Javascript. En este proyecto hemos aplicado todos los conocimientos obtenidos a lo largo de este coding camp y en el proceso del mismo hemos aprendido muchísimo más. </p>
            
        </div>
        </div>
        </>
    )
}
export default SobreNosotros;