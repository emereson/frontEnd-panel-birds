import React, { useState } from 'react';
import './pagesStyle/Header.css';
import { Link } from 'react-router-dom';
import { findAllInRenderedTree } from 'react-dom/test-utils';
const Header = () => {
  const [viewMain, setviewMain] = useState(false);
  return (
    <header className="Header__container">
      <div className="Header__buttons">
        {viewMain ? (
          <i className="bx bx-x" onClick={() => setviewMain(false)}></i>
        ) : (
          <i className="bx bx-menu" onClick={() => setviewMain(true)}></i>
        )}
      </div>
      <section
        className={`Header__sectionOne  ${!viewMain ? 'closeMain' : ''}`}
      >
        <Link to="/" onClick={() => setviewMain(false)}>
          <i className="bx bx-home"></i> <p>INICIO</p>
        </Link>
        <Link to="/birds" onClick={() => setviewMain(false)}>
          <img src="/rooster.svg" alt="" />
          <p>AVES</p>
        </Link>
        <Link to="/vaccine" onClick={() => setviewMain(false)}>
          <img src="/vaccine.svg" alt="" />
          <p>REGISTRO DE VACUNAS</p>
        </Link>
        <Link to="/familyTree" onClick={() => setviewMain(false)}>
          <img src="/tree.png" alt="" />
          <p>ARBOL GENEALOGICO</p>
        </Link>
        <Link to="/birds-in-care" onClick={() => setviewMain(false)}>
          <i className="bx bx-clinic"></i>
          <p>AVES EN CUIDO</p>
        </Link>
        <Link to="/register-fight" onClick={() => setviewMain(false)}>
          <i className="bx bxs-hot"></i> <p>REGISTRO DE PELEAS</p>
        </Link>
        <Link to="/register-births" onClick={() => setviewMain(false)}>
          <i className="bx bxs-baby-carriage"></i>{' '}
          <p>REGISTRO DE NACIMIENTOS</p>
        </Link>
        <Link to="/configuration" onClick={() => setviewMain(false)}>
          <i className="bx bx-cog bx-spin"></i> <p>CONFIGURACION</p>
        </Link>
        <Link to="/users" onClick={() => setviewMain(false)}>
          <i className="bx bxs-user-plus"></i> <p>USUARIOS</p>
        </Link>
        <Link
          onClick={() => {
            localStorage.clear();
            // navigate('/');
            window.location.reload();
          }}
        >
          <i className="bx bxs-door-open"></i>
          <p>CERRAR SESION</p>
        </Link>
      </section>
    </header>
  );
};

export default Header;
