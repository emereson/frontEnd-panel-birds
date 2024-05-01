import React from 'react';
import '../../pages/pagesStyle/tables.css';

const TableRegistersFights = ({ allFights }) => {
  return (
    <table className="table__container">
      <thead>
        <tr>
          <th>NUMERO DE PELEA</th>
          <th>COLISEO</th>
          <th>CONTRINCANTE</th>
          <th>PESO</th>
          <th>TIEMPO QUE DURO LA PELEA</th>
          <th>RESULTADO DE LA PELEA </th>
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

            <td className="tablle__tdButton">
              <div>
                <i className="bx bxs-edit-alt"></i>
                <i className="bx bxs-trash-alt"></i>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableRegistersFights;
