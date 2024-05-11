import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const DeleteBirdsFight = ({ setcrud, selectFight }) => {
  const handleDelete = () => {
    const url = `${import.meta.env.VITE_URL_API}/bird-fight/${selectFight.id}`;

    axios
      .delete(url, config)
      .then((res) => {
        setcrud('');
        toast.success('La pelea se eliminó correctamente');
      })
      .catch((err) => {
        console.log(err);
        setcrud('');
        toast.error('Hubo un error al eliminar la pelea');
      });
  };

  return (
    <div className="crudPop__container">
      <div className="crudPop__formContainer">
        <h2>¿Está seguro que quiere eliminar la pelea?</h2>

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

export default DeleteBirdsFight;
