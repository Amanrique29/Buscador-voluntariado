import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import './Header.css';

function Header(){
    return (
        <>
        <header className="fijar">
          <div className="header">
            <img className="logo" src="logorandom.jpg" alt=""></img>

            <div className="navegacion">
              <Link to="/" className="pestanya">Inicio</Link>
              <Link to="/buscador" className="pestanya" >Buscador</Link>
              <Link to="/responsabilizate"
              className="pestanya"
              >Responsabilízate</Link>
            </div>
          </div>

        </header>
        </>
    )
}

export default Header;