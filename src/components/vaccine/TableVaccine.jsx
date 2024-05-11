import React, { useState } from 'react';
import '../../pages/pagesStyle/tables.css';
const TableVaccine = ({ allvacines, setselectVaccine, setcrud }) => {
  const [numberPage, setNumberPage] = useState(1);
  const birdsPerPage = 10;

  // Define el rango de números de página que se mostrarán
  const [startRange, setStartRange] = useState(1);
  const totalPages = Math.ceil(allvacines?.vaccine?.length / birdsPerPage);
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

  const startIndex = (numberPage - 1) * birdsPerPage;
  const endIndex = Math.min(
    startIndex + birdsPerPage,
    allvacines?.vaccine?.length
  );
  const currentBirds = allvacines?.vaccine?.slice(startIndex, endIndex);

  return (
    <div>
      <table className="table__container">
        <thead>
          <tr>
            <th>NUMERO DE PLACA</th>
            <th>COLOR DE PLACA</th>
            <th>AMPOLLA</th>
            <th>PASTILLA</th>
            <th>GOTAS</th>
            <th>DESPARASITACION INTERNA </th>
            <th>DESPARASITACION EXTERNA </th>
            <th>FECHA</th>
            <th>OBSERVACIONES</th>
            <th>ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          {currentBirds?.map((vaccine) => (
            <tr key={vaccine.id}>
              <td>{allvacines?.plate_number}</td>
              <td>{allvacines?.plate_color.color}</td>
              <td>{vaccine.blister}</td>
              <td>{vaccine.pill}</td>
              <td>{vaccine.drops}</td>
              <td>{vaccine.internal_deworming}</td>
              <td>{vaccine.external_deworming}</td>
              <td>{vaccine.date}</td>
              <td>{vaccine.observations}</td>
              <td className="tablle__tdButton">
                <div>
                  <i
                    className="bx bxs-edit-alt"
                    onClick={() => {
                      setselectVaccine(vaccine);
                      setcrud('update');
                    }}
                  ></i>
                  <i
                    className="bx bxs-trash-alt"
                    onClick={() => {
                      setselectVaccine(vaccine);
                      setcrud('delete');
                    }}
                  ></i>
                </div>
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

export default TableVaccine;
