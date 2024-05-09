import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import config from '../../utils/getToken';

const DeleteImage = ({ setcrud, selectImage }) => {
  const handleDelete = () => {
    const url = `${import.meta.env.VITE_URL_API}/bird-images/${selectImage.id}`;

    axios
      .delete(url, config)
      .then((res) => {
        setcrud('');
        toast.success('la imagen se eliminó correctamente');
      })
      .catch((err) => {
        setcrud('');
        toast.error('Hubo un error al eliminar la imagen');
      });
  };

  return (
    <div className="crudPop__container">
      <div className="crudPop__formContainer">
        <h2>¿Está seguro que quiere la imagen?</h2>

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

export default DeleteImage;
