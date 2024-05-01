import React, { useEffect, useState } from 'react';
import '../../pages/pagesStyle/tables.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../utils/getToken';
const TableBirds = ({ search, crud }) => {
  const [allBirds, setallBirds] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/birds?search=${search}`;

    axios
      .get(url, config)
      .then((res) => {
        setallBirds(res.data.birds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, crud]);

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
        {allBirds?.map((bird) => (
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
  );
};

export default TableBirds;
