import React, { useEffect, useState } from 'react';
import CreateUser from '../components/users/CreateUser';
import axios from 'axios';
import config from '../utils/getToken';
import TableUser from '../components/users/TableUser';
import DeleteUser from '../components/users/DeleteUser';

const Users = () => {
  const [crud, setcrud] = useState();
  const [allUsers, setallUsers] = useState();
  const [selectUser, setselectUser] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/user`;

    axios
      .get(url, config)
      .then((res) => {
        setallUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [crud]);

  console.log(allUsers);

  return (
    <div className="page__container">
      <section className="page___sectionOne">
        <h1>Usuarios</h1>
        <button>Agregar Usuario</button>
      </section>
      <section className="page___sectionTwo">
        <p></p>
        <button onClick={() => setcrud('create')}>Registrar Usuario</button>
      </section>
      <section className="page___sectionThree">
        <TableUser
          allUsers={allUsers}
          setselectUser={setselectUser}
          setcrud={setcrud}
        />
      </section>
      {crud === 'create' && <CreateUser setcrud={setcrud} />}

      {crud === 'delete' && (
        <DeleteUser setcrud={setcrud} selectUser={selectUser} />
      )}
    </div>
  );
};

export default Users;
