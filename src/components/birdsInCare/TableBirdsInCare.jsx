import React, { useEffect, useState } from 'react';
import '../../pages/pagesStyle/tables.css';
import axios from 'axios';
import config from '../../utils/getToken';
const TableBirdsInCare = ({ search, inCare, setCrud, setSelectBird, crud }) => {
  const [allBirds, setallBirds] = useState();

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/birds/in-care?search=${search}&inCare=${inCare}`;

    axios
      .get(url, config)
      .then((res) => {
        setallBirds(res.data.birds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, inCare, crud]);

  function calcularEdad(fechaNacimiento) {
    const fechaNacimientoObj = new Date(fechaNacimiento);
    const fechaActual = new Date();

    const diff = fechaActual - fechaNacimientoObj; // Diferencia en milisegundos
    const diffDate = new Date(diff);
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
          <th>PESO DEL AVE</th>
          <th>EDAD</th>
          <th>PROCEDENCIA</th>
          <th>AVE EN CUIDO</th>
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
            <td>{bird.weight}</td>
            <td>
              <p>
                {calcularEdad(bird.birthdate).meses} meses y{' '}
                {calcularEdad(bird.birthdate).dias} días
              </p>
            </td>
            <td>{bird.origin}</td>
            <td
              style={{
                background: bird.in_care === 'Habilitado' ? 'green' : 'red',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSelectBird(bird), setCrud('update');
              }}
            >
              {bird.in_care}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableBirdsInCare;
