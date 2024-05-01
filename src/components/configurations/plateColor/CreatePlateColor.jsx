import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const CreatePlateColor = ({ setCrud }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/plate-color`;

    axios
      .post(url, data, config)
      .then((res) => {
        setCrud('');
        toast.success('El color de la placa se creo exitosamente');
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          'Hubo un error al crear el color de la placa,  verifique bien los datos'
        );
      });
    // reset();
  };
  return (
    <div className="crudPop__container">
      <form onSubmit={handleSubmit(submit)} className="crudPop__formContainer">
        <h2>CREAR COLOR DE PLACA</h2>
        <section className="crudPopForm__sectionOne">
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="color">COLOR DE LA PLACA *</label>
            <input
              {...register('color')}
              id="color"
              type="text"
              placeholder="color de la placa"
            />
          </div>{' '}
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="code_color">BUSQUE EL COLOR DESEADO *</label>
            <input {...register('code_color')} id="code_color" type="color" />
          </div>
        </section>
        <section className="crudPopForm__sectionButtons">
          <button type="button" onClick={() => setCrud('')}>
            CANCELAR
          </button>{' '}
          <button type="submit"> CREAR</button>
        </section>
      </form>
    </div>
  );
};

export default CreatePlateColor;
