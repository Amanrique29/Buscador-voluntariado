import React, { useState } from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

function Header(){
    return (
        <>
        <header className="fijar">
          <div className="language">
            <Link to="/castellano">ES</Link>
            <Link to="/ingles">EN</Link>
          </div>
          <div className="header">
            <img className="logo" src="logorandom.jpg" alt=""></img>

            <div className="navegacion">
              <Link to="/">Inicio</Link>
              <Link to="/aboutus">Sobre nosotros</Link>
              <Link to="/responsabilizate">Responsabilízate</Link>
            </div>
          </div>

        </header>
        </>
    )
}

export default Header;