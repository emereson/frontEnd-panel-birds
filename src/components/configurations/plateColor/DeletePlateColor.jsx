import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const DeletePlateColor = ({ setCrud, selectItem }) => {
  const handleDelete = () => {
    const url = `${import.meta.env.VITE_URL_API}/plate-color/${selectItem.id}`;

    axios
      .delete(url, config)
      .then((res) => {
        console.log(res);
        setCrud('');
        toast.success('Se eliminó correctamente');
      })
      .catch((err) => {
        console.log(err);
        setCrud('');
        toast.error(
          'No se puede eliminar este color de placa porque hay aves que lo están usando.'
        );
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

export default DeletePlateColor;
