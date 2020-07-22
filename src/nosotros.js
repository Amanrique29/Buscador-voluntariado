import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import './Sobrenosotros.css';
function SobreNosotros() {
    return (
        <div>

            <svg viewBox="0 0 200 200" className="blobNosotros">
                <path d="M43.8,-26.3C58.8,-16,74.6,2.3,73.4,20.4C72.1,38.5,53.9,56.3,31.8,67.5C9.7,78.7,-16.3,83.2,-36.4,74.1C-56.5,65,-70.8,42.2,-73.1,20.1C-75.5,-2.1,-66,-23.5,-51.8,-33.6C-37.6,-43.6,-18.8,-42.2,-2.2,-40.4C14.4,-38.6,28.7,-36.5,43.8,-26.3Z" transform="translate(100 100)" />
            </svg>

            <div className="doscolumnas">
                <div className="columna">
                    <h1 className="titulos_">EL PROYECTO</h1>
                    <p>Nuestro proyecto ha sido propuesto en la fase final del BBK Bootcamp por Idatis, organización dedicada a divulgar y desarrollar aplicaciones tecnológicas e innovadoras para conseguir un impacto positivo en la sociedad, tal y como expresan ellos mismos en su página web, que pueden consultar <a className="idatis-web" href="https://www.idatis.org/"><b>aquí.</b></a></p>
                    <br></br>
                    <p>Nuestro reto consiste en la creación de un buscador de oportunidades de voluntariado a lo largo de todo el territorio nacional, para lo cual hemos optado por una doble vía de búsqueda:</p>
                    <br></br>

                    <p><b>Test</b>: Mide las afinidades e inclinaciones del usuario, lo cual combinado con la región en la que le gustaría participar, devolverá (por medio de algoritmos ideados por nosotros) una serie de resultados recomendados.</p>
                    <br></br>
                    <p><b>Buscador convencional</b>: Esta opción más habitual permite realizar una búsqueda simple al usuario buscando coincidencias directas, pero también le permite filtrar por provincias y temáticas. Estas últimas han sido escogidas atendiendo a los criterios de la Ley 45/2015 de Voluntariado.</p>

                </div>
                <div className="columna">
                    <h1 className="titulos_">EL EQUIPO</h1>
                    <h3>Integrantes:</h3>

                    <p><b>María Escalada Marco-Gardoqui</b></p>

                    <p><b>Julián Martín García</b> </p>

                    <p><b>Aitor Manrique Díez</b></p>

                    <p className="ancho-parrafo">Nuestro grupo está compuesto por 3 estudiantes de la 7ª edición del BBK Bootcamp, donde hemos aprendido programación orientada a objetos utilizando principalmente (aunque no únicamente) el lenguaje Javascript. En este proyecto hemos aplicado todos los conocimientos obtenidos a lo largo de este coding camp y en el proceso del mismo hemos aprendido muchísimo más. </p>

                </div>
            </div>
        </div>
    )
}
export default SobreNosotros;