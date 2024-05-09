import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const CreateLine = ({ setCrud }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/line`;

    axios
      .post(url, data, config)
      .then((res) => {
        setCrud('');
        toast.success('La linea  se creo exitosamente');
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          'Hubo un error al crear la linea  ,  verifique bien los datos'
        );
      });
    // reset();
  };
  return (
    <div className="crudPop__container">
      <form onSubmit={handleSubmit(submit)} className="crudPop__formContainer">
        <h2>CREAR LINEA PARA LAS AVES</h2>
        <section className="crudPopForm__sectionOne">
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="name">LINEA*</label>
            <input
              {...register('name')}
              id="name"
              type="text"
              placeholder="ingrese la linea para las aves"
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

export default CreateLine;
