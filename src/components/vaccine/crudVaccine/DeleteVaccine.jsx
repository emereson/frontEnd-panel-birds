import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import config from '../../../utils/getToken';

const DeleteVaccine = ({ setcrud, selectVaccine }) => {
  const handleDelete = () => {
    const url = `${import.meta.env.VITE_URL_API}/vaccine/${selectVaccine.id}`;

    axios
      .delete(url, config)
      .then((res) => {
        setcrud('');
        toast.success('La vacuna se eliminó correctamente');
      })
      .catch((err) => {
        setcrud('');
        toast.error('Hubo un error al eliminar la vacuna');
      });
  };

  return (
    <div className="crudPop__container">
      <div className="crudPop__formContainer">
        <h2>¿Está seguro que quiere eliminar la vacuna?</h2>

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

export default DeleteVaccine;
