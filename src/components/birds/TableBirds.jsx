import React, { useEffect, useState } from 'react';
import '../../pages/pagesStyle/tables.css';
import './birdStyle/TableBirds.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../utils/getToken';
const TableBirds = ({ search, crud }) => {
  const [allBirds, setAllBirds] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const birdsPerPage = 10;

  // Define el rango de números de página que se mostrarán
  const [startRange, setStartRange] = useState(1);
  const totalPages = Math.ceil(allBirds.length / birdsPerPage);
  const endRange = Math.min(startRange + 4, totalPages);

  const handlePrevClick = () => {
    if (startRange > 1) {
      setStartRange(startRange - 10);
    }
  };

  const handleNextClick = () => {
    if (endRange < totalPages) {
      setStartRange(startRange + 10);
    }
  };

  const handlePageChange = (page) => {
    setNumberPage(page);
  };

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/birds?search=${search}`;

    axios
      .get(url, config)
      .then((res) => {
        setAllBirds(res.data.birds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, crud]);

  // Calcula los índices de inicio y fin para los pájaros actuales
  const startIndex = (numberPage - 1) * birdsPerPage;
  const endIndex = Math.min(startIndex + birdsPerPage, allBirds.length);
  const currentBirds = allBirds.slice(startIndex, endIndex);

  function calcularEdad(fechaNacimiento) {
    const fechaNacimientoObj = new Date(fechaNacimiento);
    const fechaActual = new Date();

    const diff = fechaActual - fechaNacimientoObj; // Diferencia en milisegundos
    const diffDate = new Date(diff); // Convertir la diferencia a un objeto de fecha

    // Extraer meses y días de la diferencia
    const meses = diffDate.getMonth();
    const dias = diffDate.getDate() - 1; // Restar 1 porque getDate() devuelve el día del mes

    return { meses, dias };
  }

  return (
    <div className="TableBirds_container">
      <table className="table__container">
        <thead>
          <tr>
            <th>NRO DE PLACA</th>
            <th>COLOR DE PLACA</th>
            <th>TIPO DE CRESTA</th>
            <th>SEXO</th>
            <th>LINEA</th>
            <th>CRUCE</th>
            <th>PESO DEL AVE</th>
            <th>EDAD</th>
            <th>ESTADO</th>
            <th>PROCEDENCIA</th>
            <th style={{ width: '100px' }}>VER MAS</th>
          </tr>
        </thead>
        <tbody>
          {currentBirds?.map((bird) => (
            <tr key={bird.id}>
              <td>{bird.plate_number}</td>
              <td
                style={{
                  borderBottom: `4px solid ${bird.plate_color.code_color}`,
                }}
              >
                {bird.plate_color.color}
              </td>
              <td>{bird.crest_type}</td>
              <td>{bird.sex}</td>
              <td>{bird.line}</td>
              <td>{bird.crest_type}</td>
              <td>{bird.weight}</td>
              <td>
                <p>
                  {calcularEdad(bird.birthdate).meses} meses y{' '}
                  {calcularEdad(bird.birthdate).dias} días
                </p>
              </td>
              <td>{bird.status}</td>
              <td>{bird.origin}</td>
              <td>
                <Link to={`/bird/${bird.id}`}>ver mas</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="TableBirds_paginations_container">
        <i className="bx bx-chevrons-left" onClick={handlePrevClick}></i>
        <i className="bx bx-chevron-left"></i>
        {Array.from(
          { length: endRange - startRange + 1 },
          (_, index) => startRange + index
        ).map((page) => (
          <div key={page} className="TableBirds_paginations_number">
            <p
              onClick={() => handlePageChange(page)}
              style={{
                color: page === numberPage ? 'var(--text-color-red)' : null,
              }}
            >
              {page}
            </p>

            <span>-</span>
          </div>
        ))}
        <i className="bx bx-chevron-right"></i>
        <i className="bx bx-chevrons-right" onClick={handleNextClick}></i>
      </div>
    </div>
  );
};

export default TableBirds;
