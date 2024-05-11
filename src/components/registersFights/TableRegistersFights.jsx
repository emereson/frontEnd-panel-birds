import React, { useState } from 'react';
import '../../pages/pagesStyle/tables.css';

const TableRegistersFights = ({ allFights, setselectFight, setcrud }) => {
  const [numberPage, setNumberPage] = useState(1);
  const birdsPerPage = 10;

  // Define el rango de números de página que se mostrarán
  const [startRange, setStartRange] = useState(1);
  const totalPages = Math.ceil(allFights?.length / birdsPerPage);
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
  const endIndex = Math.min(startIndex + birdsPerPage, allFights?.length);
  const currentBirds = allFights?.slice(startIndex, endIndex);

  return (
    <div className="TableBirds_container">
      <table className="table__container">
        <thead>
          <tr>
            <th>NUMERO DE PELEA</th>
            <th>COLISEO</th>
            <th>CONTRINCANTE</th>
            <th>PESO</th>
            <th>TIEMPO QUE DURO LA PELEA</th>
            <th>RESULTADO DE LA PELEA </th>
            <th>OBSERVACIONES </th>
            <th>ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          {allFights?.map((fight) => (
            <tr key={fight.id}>
              <td>{fight?.number_fight}</td>
              <td>{fight?.coliseum}</td>
              <td>{fight?.opponent}</td>
              <td>{fight?.weight}</td>
              <td>{fight?.minutes}</td>
              <td>{fight?.state}</td>
              <td>{fight?.observations}</td>
              <td className="tablle__tdButton">
                <div>
                  <i
                    className="bx bxs-edit-alt"
                    onClick={() => {
                      setcrud('update');
                      setselectFight(fight);
                    }}
                  ></i>
                  <i
                    className="bx bxs-trash-alt"
                    onClick={() => {
                      setcrud('delete');
                      setselectFight(fight);
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

export default TableRegistersFights;
