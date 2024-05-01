import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const CreateStatus = ({ setCrud }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/status`;

    axios
      .post(url, data, config)
      .then((res) => {
        setCrud('');
        toast.success('El estado  se creo exitosamente');
      })
      .catch((err) => {
        toast.success(
          'Hubo un error al crear el estado  ,  verifique bien los datos'
        );
      });
    // reset();
  };
  return (
    <div className="crudPop__container">
      <form onSubmit={handleSubmit(submit)} className="crudPop__formContainer">
        <h2>CREA ESTADOS PARA LAS AVES</h2>
        <section className="crudPopForm__sectionOne">
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="name">ESTADO*</label>
            <input
              {...register('name')}
              id="name"
              type="text"
              placeholder="nombre del estado"
            />
          </div>{' '}
        </section>
        <section className="crudPopForm__sectionButtons">
          <button type="button" onClick={() => setCrud()}>
            CANCELAR
          </button>{' '}
          <button type="submit"> CREAR</button>
        </section>
      </form>
    </div>
  );
};

export default CreateStatus;
