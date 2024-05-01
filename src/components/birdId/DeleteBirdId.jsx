import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import config from '../../utils/getToken';
import { useNavigate } from 'react-router-dom';

const DeleteBirdId = ({ setcrud, dataBird }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    const url = `${import.meta.env.VITE_URL_API}/birds/${dataBird.id}`;

    axios
      .delete(url, config)
      .then((res) => {
        setcrud('');
        navigate('/birds');
        toast.success('El ave se eliminó correctamente');
      })
      .catch((err) => {
        setcrud('');
        toast.error('Hubo un error al eliminar el ave');
      });
  };

  return (
    <div className="crudPop__container">
      <div className="crudPop__formContainer">
        <h2>¿Está seguro que quiere eliminar el ave?</h2>

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

export default DeleteBirdId;
