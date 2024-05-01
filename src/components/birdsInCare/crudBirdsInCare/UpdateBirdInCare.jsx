import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const UpdateBirdInCare = ({ setCrud, selectBird }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/birds/in-care/${
      selectBird?.id
    }`;

    axios
      .patch(url, data, config)
      .then((res) => {
        setCrud();
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
        <h2>Editar Ave en cuido </h2>
        <section className="crudPopForm__sectionOne">
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="in_care">Poner Ave en Cuido*</label>
            <select
              {...register('in_care')}
              id="in_care"
              type="text"
              defaultValue={selectBird?.in_care}
            >
              <option value="Habilitado">Habilitado</option>
              <option value="Desabilitado">Desabilitado</option>{' '}
            </select>
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

export default UpdateBirdInCare;
