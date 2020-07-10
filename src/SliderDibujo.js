import React, { useState, useEffect } from 'react';


function SliderDibujo(props) {
    const [valor, setValor] = useState(1);

    function handleChange(event) {
        const valorNuevo = event.target.value;
        setValor(valorNuevo);
        props.onChange(props.nombre, valorNuevo);
    }

    return (
        <>
            <div className="sliderContainer">
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
                <p>{valor}</p>
            </div>
        </>
    );
}

export default SliderDibujo