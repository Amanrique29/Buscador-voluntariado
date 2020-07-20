import React, { useState, useEffect } from 'react';
import $ from 'jquery'


function SliderDibujo(props) {
    const [valor, setValor] = useState(1);
    let barStyle = {background: 'linear-gradient(toright, rgba(255,0,0,1) 0%, rgba(0,255,0,1) 0%)'};
    // let $slider = $(".sliderPrueba");
    // let $fill = $(".bar .fill");

    // function setBar() {
    //     $fill.css("width", $slider.val() + "%");
    // }

    // $slider.on("input", setBar);

    // setBar();

    function handleChange(event) {
        const valorNuevo = event.target.value;
        let porcentaje = (valorNuevo - 1) * 25;
        barStyle = {background: `linear-gradient(toright, rgba(255,0,0,1) ${porcentaje}%, rgba(0,255,0,1) ${porcentaje}%)`};
        setValor(valorNuevo);
        props.onChange(props.nombre, valorNuevo);
      
    }

    return (
        <>
            <div className="sliderContainer">
                <p>{props.frase}</p>
                <div className="slider-container">
                    <span className="bar"><span className="fill" style={barStyle}></span></span>
                    <input
                        
                        className="sliderPrueba"
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={valor}
                        onChange={handleChange}
                        onMouseUp={handleChange}
                    />
                </div>
                <p>{valor}</p>
            </div>
        </>
    );
}

export default SliderDibujo