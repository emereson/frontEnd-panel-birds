import React from 'react';

const TableUser = ({ allUsers, setselectUser }) => {
  return (
    <div>
      <table className="table__container">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>APELLIDOS</th>
            <th>CORREO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td className="tablle__tdButton">
                <div>
                  <i className="bx bxs-edit-alt"></i>
                  <i className="bx bxs-trash-alt"></i>
                </div>
              </td>{' '}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
