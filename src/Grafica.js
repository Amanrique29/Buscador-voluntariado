import { Doughnut } from 'react-chartjs-2';
import React, { useState } from 'react';
import './Donut.css';

function Grafica() {
    let listadoAfinidades = JSON.parse(localStorage.getItem('afinidades'));

    let afinidadesGraficaJSX = listadoAfinidades.map(function (nombre) {

        return (
            <>
                <p className="afinidadTest">{nombre.nombre}</p>
            </>
        )
    })

    let colores = [
        'rgba(130, 141, 46, 1)',
        'rgba(183, 78, 35, 1)',
        'rgba(94, 125, 117, 1)',
        'rgba(172, 135, 0, 1)',
        'rgba(38, 105, 138, 1)',
        'rgba(138, 117, 149, 1)',
        'rgba(161, 55, 105, 1)',
        'rgba(55, 146, 119, 1)',
    ]

    let circuloJSX = colores.map(function (color) {

        return (
            <svg version="1.1" className="circulo" x="0px" y="0px"
	 width="229.6px" height="229.6px" viewBox="0 0 229.6 229.6"
	>
            <circle cx="114.8" cy="114.8" r="114.8" fill={color}/>
            </svg>
        )
    })

    let [newData, setNewData] = useState([
        listadoAfinidades[0].valor,
        listadoAfinidades[1].valor,
        listadoAfinidades[2].valor,
        listadoAfinidades[3].valor,
        listadoAfinidades[4].valor,
        listadoAfinidades[5].valor,
        listadoAfinidades[6].valor,
        listadoAfinidades[7].valor,])
    let [data] = useState({
        labels: [
            listadoAfinidades[0].nombre,
            listadoAfinidades[1].nombre,
            listadoAfinidades[2].nombre,
            listadoAfinidades[3].nombre,
            listadoAfinidades[4].nombre,
            listadoAfinidades[5].nombre,
            listadoAfinidades[6].nombre,
            listadoAfinidades[7].nombre,
        ],

        datasets: [
            {
                label: { display: false },
                backgroundColor: [
                    'rgba(130, 141, 46, 1)',
                    'rgba(183, 78, 35, 1)',
                    'rgba(94, 125, 117, 1)',
                    'rgba(172, 135, 0, 1)',
                    'rgba(38, 105, 138, 1)',
                    'rgba(138, 117, 149, 1)',
                    'rgba(161, 55, 105, 1)',
                    'rgba(55, 146, 119, 1)',
                ],
                borderColor: "white",
                borderWidth: 2,
                hoverBackgroundColor: [
                    'rgba(130, 141, 46, 0.7)',
                    'rgba(183, 78, 35, 0.7)',
                    'rgba(94, 125, 117, 0.7)',
                    'rgba(172, 135, 0, 0.7)',
                    'rgba(38, 105, 138, 0.7)',
                    'rgba(138, 117, 149, 0.7)',
                    'rgba(161, 55, 105, 0.7)',
                    'rgba(55, 146, 119, 0.7)',
                ],
                hoverBorderColor: "white",
                data: newData,
            }
        ]
    })

    let [options] = useState({
        legend: {
            display: false
        },
        tooltips: {
            enabled: true
        }
    })

    return (
        <div className="graficaYLeyenda">
            <div className="cajaDonut">
                <Doughnut className="donut" data={data} options={options} />
            </div>
            <div class="leyendaGrafica">
                <div className="leyendaPuntos">{circuloJSX}</div>
                <div className="afinidades">{afinidadesGraficaJSX}</div>
            </div>
        </div>
    )
}

export default Grafica