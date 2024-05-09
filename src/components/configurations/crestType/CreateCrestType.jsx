import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const CreateCrestType = ({ setCrud }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/crest-type`;

    axios
      .post(url, data, config)
      .then((res) => {
        setCrud('');
        toast.success('El tipo de cresta  se creo exitosamente');
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          'Hubo un error al crear la cresta  ,  verifique bien los datos'
        );
      });
    // reset();
  };
  return (
    <div className="crudPop__container">
      <form onSubmit={handleSubmit(submit)} className="crudPop__formContainer">
        <h2>CREAR TIPOS DE CRESTA PARA LAS AVES</h2>
        <section className="crudPopForm__sectionOne">
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="name">Cresta*</label>
            <input
              {...register('name')}
              id="name"
              type="text"
              placeholder="Nombre de la cresta "
            />
          </div>{' '}
        </section>
        <section className="crudPopForm__sectionButtons">
          <button type="button" onClick={() => setCrud()}>
            CANCELAR
          </button>{' '}
          <button type="submit"> REGISTRAR</button>
        </section>
      </form>
    </div>
  );
};

export default CreateCrestType;
