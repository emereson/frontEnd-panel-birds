import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const UpdateBirdColor = ({ setCrud, selectItem }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/bird-color/${selectItem.id}`;

    axios
      .patch(url, data, config)
      .then((res) => {
        setCrud('');
        toast.success('El color de la placa se creo exitosamente');
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          'Hubo un error al crear el color de la placa,  verifique bien los datos'
        );
      });
  };
  return (
    <div className="crudPop__container">
      <form onSubmit={handleSubmit(submit)} className="crudPop__formContainer">
        <h2>CREAR COLOR PARA EL AVE</h2>
        <section className="crudPopForm__sectionOne">
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="name">COLOR *</label>
            <input
              {...register('name')}
              id="name"
              type="text"
              defaultValue={selectItem.name}
            />
          </div>{' '}
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="code_color">BUSQUE EL COLOR DESEADO *</label>
            <input
              {...register('code_color')}
              id="code_color"
              type="color"
              defaultValue={selectItem.code_color}
            />
          </div>
        </section>
        <section className="crudPopForm__sectionButtons">
          <button
            type="button"
            onClick={() => {
              setCrud(''), reset();
            }}
          >
            CANCELAR
          </button>{' '}
          <button type="submit"> EDITAR</button>
        </section>
      </form>
    </div>
  );
};

export default UpdateBirdColor;
