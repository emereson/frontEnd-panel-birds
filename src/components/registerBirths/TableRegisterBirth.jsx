import React from 'react';
import '../../pages/pagesStyle/tables.css';

const TableRegisterBirth = ({ allBirths }) => {
  return (
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
        {allBirths?.map((birth) => (
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

export default TableRegisterBirth;
