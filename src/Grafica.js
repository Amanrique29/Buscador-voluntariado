import { Doughnut } from 'react-chartjs-2';
import React, { useState } from 'react';
import './Donut.css';

function Grafica() {
    let listadoAfinidades = JSON.parse(localStorage.getItem('afinidades'));

    let afinidadesGraficaJSX = listadoAfinidades.map(function (nombre) {

        return (
            <>
                <p>{nombre.nombre}</p>
            </>
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
                    'rgba(130, 141, 46, 0.5)',
                    'rgba(183, 78, 35, 0.5)',
                    'rgba(94, 125, 117, 0.5)',
                    'rgba(172, 135, 0, 0.5)',
                    'rgba(38, 105, 138, 0.5)',
                    'rgba(138, 117, 149, 0.5)',
                    'rgba(161, 55, 105, 0.5)',
                    'rgba(55, 146, 119, 0.5)',
                    'rgba(58, 60, 123, 0.5)',
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
                    'rgba(58, 60, 123, 0.7)',
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
        <>
            <div className="cajaDonut">
                <Doughnut className="donut" data={data} options={options} />
            </div>
            <div class="leyendaGrafica">{afinidadesGraficaJSX}</div>
        </>
    )
}

export default Grafica