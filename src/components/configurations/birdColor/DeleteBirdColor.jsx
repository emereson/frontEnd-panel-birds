import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const DeleteBirdColor = ({ setCrud, selectItem }) => {
  const handleDelete = () => {
    const url = `${import.meta.env.VITE_URL_API}/bird-color/${selectItem.id}`;

    axios
      .delete(url, config)
      .then((res) => {
        console.log(res);
        setCrud('');
        toast.success('Se eliminó correctamente');
      })
      .catch((err) => {
        setCrud('');
        toast.error('Hubo un error al eliminar');
      });
  };

  return (
    <div className="crudPop__container">
      <div className="crudPop__formContainer">
        <h2>¿Está seguro que quiere eliminarlo?</h2>

        <section className="crudPopForm__sectionButtons">
          <button type="button" onClick={() => setCrud()}>
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

export default DeleteBirdColor;
