import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const UpdateVaccine = ({ setcrud, selectVaccine }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/vaccine/${selectVaccine?.id}`;

    axios
      .patch(url, data, config)
      .then((res) => {
        setcrud('');
        toast.success('Los datos de la vacuna se editaron correctamente');
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          'Hubo un error al editar la vacuna,  verifique bien los datos'
        );
      });
    reset();
  };

  return (
    <div className="crudPop__container">
      <form className="crudPop__formContainer" onSubmit={handleSubmit(submit)}>
        <h2>INGRESE LOS DATOS DE LA VACUNA</h2>
        <section className="crudForm__sectionOne">
          <div className="crudForm__sectionOne__div">
            <label htmlFor="blister">AMPOLLA</label>
            <input
              {...register('blister')}
              id="blister"
              type="text"
              defaultValue={selectVaccine.blister}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="pill">PASTILLA</label>
            <input
              {...register('pill')}
              id="pill"
              type="text"
              defaultValue={selectVaccine.pill}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="drops">GOTAS</label>
            <input
              {...register('drops')}
              id="drops"
              type="text"
              defaultValue={selectVaccine.drops}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="internal_deworming">DESPARASITACION INTERNA</label>
            <input
              {...register('internal_deworming')}
              id="internal_deworming"
              type="text"
              defaultValue={selectVaccine.internal_deworming}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="external_deworming">DESPARASITACION EXTERNA</label>
            <input
              {...register('external_deworming')}
              id="external_deworming"
              type="text"
              defaultValue={selectVaccine.external_deworming}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="date">FECHA</label>
            <input
              {...register('date')}
              id="date"
              type="date"
              defaultValue={selectVaccine.date}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="observations">OBSERVACIONES</label>
            <textarea
              {...register('observations')}
              id="observations"
              type="text"
              rows="5"
              defaultValue={selectVaccine.observations}
            />
          </div>
        </section>
        <section className="crudPopForm__sectionButtons">
          <button type="button" onClick={() => setcrud()}>
            CANCELAR
          </button>{' '}
          <button type="submit">EDITAR</button>
        </section>
      </form>
    </div>
  );
};

export default UpdateVaccine;
