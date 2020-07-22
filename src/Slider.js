import React, { useEffect } from 'react';
import { useState } from 'react';
import SliderDibujo from './SliderDibujo';

let arrayAfinidades = [
  {
    nombre: "trabajo físico",
    frase: "Me motivan el deporte o las actividades físicas de gran intensidad"
  },
  {
    nombre: "sociabilidad",
    frase: "Tengo facilidad para tratar con personas que no conozco"
  },
  {
    nombre: "pensamiento creativo",
    frase: "Propongo ideas novedosas o alternativas cuando me encargan un nuevo proyecto"
  },
  {
    nombre: "capacidad de trabajar bajo presión",
    frase: "Puedo mantener la calma en situaciones bajo presión o en una emergencia"
  },
  {
    nombre: "empatía",
    frase: "Empatizo con aquellas personas que están abrumadas por algún duelo"
  },
  {
    nombre: "habilidades digitales",
    frase: "Me manejo bien con herramientas digitales y redes sociales"
  },
  {
    nombre: "capacidad de liderazgo",
    frase: "Busco maximizar la eficiencia de los recursos y el tiempo de los miembros del equipo"
  },
  {
    nombre: "jovialidad",
    frase: "Me decanto por experiencias que no supongan una gran carga emocional"

  }
];


function Slider() {


  useEffect(function () {
    let afinidades = [];
    for (let i = 0; i < arrayAfinidades.length; i++) {
      afinidades.push({ nombre: arrayAfinidades[i].nombre, valor: 1 });
    }
    let afinidadenJson = JSON.stringify(afinidades);
    localStorage.setItem('afinidades', afinidadenJson);
  }, [])

  function onSliderChange(nombreSlider, valor) {
    console.log('ha cambiado el valor de ' + nombreSlider + ' y su valor es ' + valor);
    // 1) Coger el array en json del local storage
    let afinidades = JSON.parse(localStorage.getItem('afinidades'));
    //2.Hacemos un for para buscar la afinidad que hemos modificado y sustituir el valor del modificado de los 8 de arrayAfinidades
    for (let i = 0; i < afinidades.length; i++) {
      if (afinidades[i].nombre === nombreSlider) {
        afinidades[i].valor = valor;
      }
    }
    // modifico el nombre a su valor que nos llega

    let afinidadenJson = JSON.stringify(afinidades);
    localStorage.setItem('afinidades', afinidadenJson);
  }

  const sliderJSX = arrayAfinidades.map(function (slider) {

    return (
      <SliderDibujo nombre={slider.nombre} frase={slider.frase} onChange={onSliderChange} />
    )
  })

  return (
    <div className="allSliders">
      {sliderJSX}
    </div>

  );

}
export default Slider

