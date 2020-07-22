import React from 'react';
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import './App.css';
import Test from './test';
import Resultados from './resultados';
import Header from './header';
import Inicio from './Inicio'
import Aboutus from './nosotros';
import Responsabilizate from './responsable';
import Buscador from './buscador';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Route exact path="/">
          <Inicio />
        </Route>
        <Route path="/test">     <Test /></Route>
        <Route path="/buscador">
          <Buscador />
        </Route>
        <Route path="/resultados">
          <Resultados />
        </Route>
        <Route path="/responsabilizate">
          <Responsabilizate />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
