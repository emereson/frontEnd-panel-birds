import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const UpdateBirdsFights = ({ setcrud, selectFight }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/bird-fight/${selectFight.id}`;

    axios
      .patch(url, data, config)
      .then((res) => {
        console.log(res);
        setcrud('');
        toast.success('La pelea se a editado correctamente');
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          'Hubo un error al editado la pelea,  verifique bien los datos'
        );
      });
    reset();
  };

  return (
    <div className="crudPop__container">
      <form className="crudPop__formContainer" onSubmit={handleSubmit(submit)}>
        <h2>EDITAR DATOS DE LA PELEA</h2>
        <section className="crudForm__sectionOne">
          <div className="crudForm__sectionOne__div">
            <label htmlFor="number_fight">Numero de pelea *</label>
            <input
              {...register('number_fight')}
              id="number_fight"
              type="text"
              defaultValue={selectFight.number_fight}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="coliseum">Coliseo *</label>
            <input
              {...register('coliseum')}
              id="coliseum"
              type="text"
              defaultValue={selectFight.coliseum}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="opponent">Contrincante *</label>
            <input
              {...register('opponent')}
              id="opponent"
              type="text"
              defaultValue={selectFight.opponent}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="weight">Peso *</label>
            <input
              {...register('weight')}
              id="weight"
              type="text"
              defaultValue={selectFight.weight}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="date_fight">Fecha de la pelea *</label>
            <input
              {...register('date_fight')}
              id="date_fight"
              type="date"
              defaultValue={selectFight.date_fight}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="minutes">Tiempo que duro la pelea</label>
            <input
              {...register('minutes')}
              id="minutes"
              type="text"
              defaultValue={selectFight.minutes}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="state">Resultado de la pelea</label>
            <select name="state" id="state" {...register('state')} required>
              <option value={selectFight?.state} selected disabled hidden>
                {selectFight?.state}
              </option>{' '}
              <option value="Ganado">Ganado</option>
              <option value="Perdido">Perdido</option>
              <option value="Empate">Empate</option>
            </select>{' '}
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="observations">Obervaciones</label>
            <textarea
              {...register('observations')}
              id="observations"
              type="text"
              rows="5"
              defaultValue={selectFight.observations}
            />
          </div>
        </section>
        <section className="crudPopForm__sectionButtons">
          <button
            type="button"
            onClick={() => {
              setcrud();
              reset();
            }}
          >
            CANCELAR
          </button>{' '}
          <button type="submit">EDITAR</button>
        </section>
      </form>
    </div>
  );
};

export default UpdateBirdsFights;
