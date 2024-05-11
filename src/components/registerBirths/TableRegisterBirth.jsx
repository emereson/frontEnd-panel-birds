import React, { useState } from 'react';
import '../../pages/pagesStyle/tables.css';

const TableRegisterBirth = ({ allBirths, setcrud, setselectBirths }) => {
  const [numberPage, setNumberPage] = useState(1);
  const birdsPerPage = 10;

  // Define el rango de números de página que se mostrarán
  const [startRange, setStartRange] = useState(1);
  const totalPages = Math.ceil(allBirths?.length / birdsPerPage);
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
  const endIndex = Math.min(startIndex + birdsPerPage, allBirths?.length);
  const currentBirds = allBirths?.slice(startIndex, endIndex);

  return (
    <div className="TableBirds_container">
      <table className="table__container">
        <thead>
          <tr>
            <th>AVE MADRE</th>
            <th>AVE PADRE</th>
            <th>NUMERO DE HUEVOS</th>
            <th>NUMERO DE CRIAS NACIDAS</th>
            <th>FECHA DE INCUBACION</th>
            <th>FECHA DE ECLOSION</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {currentBirds?.map((birth) => (
            <tr key={birth.id}>
              <td>
                {birth?.mother?.plate_number},<br /> placa:{' '}
                {birth?.mother?.plate_color.color}
              </td>
              <td>
                {birth?.father?.plate_number},<br /> placa:{' '}
                {birth?.father?.plate_color.color}
              </td>
              <td>{birth.number_eggs}</td>
              <td>{birth.number_births}</td>
              <td>{birth.date_eggs}</td>
              <td>{birth.date_hatching}</td>
              <td className="tablle__tdButton">
                <div>
                  <i
                    className="bx bxs-edit-alt"
                    onClick={() => {
                      setcrud('update');
                      setselectBirths(birth);
                    }}
                  ></i>
                  <i
                    className="bx bxs-trash-alt"
                    onClick={() => {
                      setcrud('delete');
                      setselectBirths(birth);
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

export default TableRegisterBirth;
