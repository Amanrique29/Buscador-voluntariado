import React, { useState, useEffect } from 'react';



function SliderDibujo(props) {
    const [valor, setValor] = useState(1);
    let porcentaje = (valor - 1) * 25;
    let barStyle = {background: `linear-gradient(to right, rgb(228, 192, 76) ${porcentaje}%, white ${porcentaje}%)`};
    

    function handleChange(event) {
        const valorNuevo = event.target.value;
        
        setValor(valorNuevo);
        props.onChange(props.nombre, valorNuevo);
    }

    return (
        <>
            <div className="sliderContainer">
                <p className="fraseSlider">{props.frase}</p>
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
                <div className="stepsSlider">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                </div>
                <div className="stepsSlider">
                    <p className="nivel">POCO</p>
                    <p className="nivel">MUCHO</p>
                    
                </div>
                {/* <p>Puntuación: {valor}</p> */}
            </div>
        </>
    );
}

export default SliderDibujo