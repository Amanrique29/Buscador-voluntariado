import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import './Header.css';

function Header(){
    return (
        <>
        <header className="fijar">
          <div className="header">
            <img className="logo" src="logo_volunteera.png" alt=""></img>

            <div className="navegacion">
              <Link to="/" className="pestanya">Inicio</Link>
              <Link to="/buscador" className="pestanya" >Buscador</Link>
              <Link to="/aboutus"
              className="pestanya"
              >Sobre nosotros</Link>
            </div>
          </div>
        </header>
        </>
    )
}

export default Header;