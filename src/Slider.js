import React, { useEffect } from 'react';
import { useState } from 'react';
import SliderDibujo from './SliderDibujo';

let arrayAfinidades = [
  {
    nombre: "trabajo físico",
  },
  {
    nombre: "sociabilidad",
  },
  {
    nombre: "pensamiento creativo",
  },
  {
    nombre: "capacidad de trabajar bajo presión",
  },
];


function Slider() {
  function onSliderChange(nombreSlider, valor) {
    console.log('ha cambiado el valor de ' + nombreSlider + ' y su valor es ' + valor);
    // 1) Coger el array en json del local storage
    let afinidades = JSON.parse(localStorage.getItem('afinidades'));
    //2.Hacemos un for para buscar la afinidad que hemos modificado y sustituir el valor del modificado de los 4 de arrayAfinidades
    for (let i = 0; i < afinidades.length; i++) {
      if (afinidades[i].nombre === nombreSlider) {
        afinidades[i].valor = valor;
      }
    }
    // modifico el nombre a su valor que nos llega

    let afinidadenJson = JSON.stringify(afinidades);
    localStorage.setItem('afinidades', afinidadenJson);
  }

  useEffect(function () {
    let afinidades = [];
    for (let i = 0; i < arrayAfinidades.length; i++) {
      afinidades.push({ nombre: arrayAfinidades[i].nombre, valor: 1 });
    }
    let afinidadenJson = JSON.stringify(afinidades);
    localStorage.setItem('afinidades', afinidadenJson);
  }, [])

const sliderJSX = arrayAfinidades.map(function (slider) {

  return (
    <SliderDibujo nombre={slider.nombre} onChange={onSliderChange} />
  )
})

return (
  <>
    {sliderJSX}
  </>

);

}
export default Slider

