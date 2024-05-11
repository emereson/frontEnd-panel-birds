import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const DeleteBirth = ({ setcrud, selectBirths }) => {
  const handleDelete = () => {
    const url = `${import.meta.env.VITE_URL_API}/births/${selectBirths.id}`;

    axios
      .delete(url, config)
      .then((res) => {
        setcrud('');
        toast.success('El registro de nacimiento se eliminó correctamente');
      })
      .catch((err) => {
        console.log(err);
        setcrud('');
        toast.error('Hubo un error al eliminar el registro de nacimiento');
      });
  };

  return (
    <div className="crudPop__container">
      <div className="crudPop__formContainer">
        <h2>¿Está seguro que quiere eliminar el nacimiento?</h2>

        <section className="crudPopForm__sectionButtons">
          <button type="button" onClick={() => setcrud()}>
            Cancelar
          </button>
          <button type="button" onClick={handleDelete}>
            Eliminar
          </button>
        </section>
      </div>
    </div>
  );
};

export default DeleteBirth;
