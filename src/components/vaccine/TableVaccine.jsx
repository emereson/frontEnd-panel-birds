import React from 'react';
import '../../pages/pagesStyle/tables.css';
const TableVaccine = ({ allvacines }) => {
  return (
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
          <th>ACCIONES</th>
        </tr>
      </thead>

      <tbody>
        {allvacines?.vaccine?.map((vaccine) => (
          <tr key={vaccine.id}>
            <td>{allvacines?.plate_number}</td>
            <td>{allvacines?.plate_color.color}</td>
            <td>{vaccine.blister}</td>
            <td>{vaccine.pill}</td>
            <td>{vaccine.drops}</td>
            <td>{vaccine.internal_deworming}</td>
            <td>{vaccine.external_deworming}</td>
            <td>{vaccine.date}</td>
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

export default TableVaccine;
