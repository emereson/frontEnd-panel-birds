import React, { useState } from 'react';
import './pagesStyle/Header.css';
import { Link } from 'react-router-dom';
const Header = () => {
  const [viewMain, setviewMain] = useState(false);
  return (
    <header className="Header__container">
      <div className="Header__buttons">
        {viewMain ? (
          <i className="bx bx-menu" onClick={() => setviewMain(false)}></i>
        ) : (
          <i className="bx bx-x" onClick={() => setviewMain(true)}></i>
        )}
      </div>
      <section className={`Header__sectionOne  ${viewMain ? 'closeMain' : ''}`}>
        <Link to="/">
          <i className="bx bx-home"></i> <p>INICIO</p>
        </Link>
        <Link to="/birds">
          <img src="/rooster.svg" alt="" />
          <p>AVES</p>
        </Link>
        <Link to="/vaccine">
          <img src="/vaccine.svg" alt="" />
          <p>REGISTRO DE VACUNAS</p>
        </Link>
        <Link to="/familyTree">
          <img src="/tree.png" alt="" />
          <p>ARBOL GENEALOGICO</p>
        </Link>
        <Link to="/birds-in-care">
          <i className="bx bx-clinic"></i>
          <p>AVES EN CUIDO</p>
        </Link>
        <Link to="/register-fight">
          <i className="bx bxs-hot"></i> <p>REGISTRO DE PELEAS</p>
        </Link>
        <Link to="/register-births">
          <i className="bx bxs-baby-carriage"></i>{' '}
          <p>REGISTRO DE NACIMIENTOS</p>
        </Link>
        <Link to="/configuration">
          <i className="bx bx-cog bx-spin"></i> <p>CONFIGURACION</p>
        </Link>
        <Link to="/users">
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
