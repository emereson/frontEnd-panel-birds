import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const UpdateLine = ({ setCrud, selectItem }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/line/${selectItem.id}`;

    axios
      .patch(url, data, config)
      .then((res) => {
        setCrud('');
        toast.success('El dato se actualizo exitosamente');
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error('hubo un error, al actualizar los datos');
      });
  };
  return (
    <div className="crudPop__container">
      <form onSubmit={handleSubmit(submit)} className="crudPop__formContainer">
        <h2>Editar la linea {selectItem.name}</h2>
        <section className="crudPopForm__sectionOne">
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="name">Linea*</label>
            <input
              {...register('name')}
              id="name"
              type="text"
              defaultValue={selectItem?.name}
            />
          </div>{' '}
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

export default UpdateLine;
