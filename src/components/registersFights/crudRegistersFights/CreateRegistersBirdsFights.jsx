import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const CreateRegistersBirdsFights = ({ setcrud }) => {
  const { register, handleSubmit, reset } = useForm();
  const [search, setsearch] = useState('');
  const [allBirds, setallBirds] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/birds?search=${search}`;

    axios
      .get(url, config)
      .then((res) => {
        setallBirds(res.data.birds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/bird-fight`;

    axios
      .post(url, data, config)
      .then((res) => {
        setcrud('');
        toast.success('La pelea se a registro correctamente');
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          'Hubo un error al registrar la pelea,  verifique bien los datos'
        );
      });
    reset();
  };

  return (
    <div className="crudPop__container">
      <form className="crudPop__formContainer" onSubmit={handleSubmit(submit)}>
        <h2>INGRESE LOS DATOS DE LA PELEA</h2>
        <section className="crudForm__sectionOne">
          <div className="crudForm__sectionOne__div">
            <label htmlFor="search2">BUSCAR AVE</label>
            <input
              id="search2"
              type="text"
              placeholder="Numero de Placa"
              onChange={(e) => setsearch(e.target.value)}
            />

            <div style={{ marginTop: '10px' }}>
              <label htmlFor="bird_id">Seleccione el Ave</label>
              <select name="bird_id" id="bird_id" {...register('bird_id')}>
                {' '}
                <option
                  value="0"
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Elija un ave
                </option>
                {allBirds?.map((bird) => (
                  <option key={bird.id} value={bird.id}>
                    {bird.plate_number}, placa: {bird.plate_color.color},
                    {bird.id}
                  </option>
                ))}
              </select>{' '}
            </div>
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="number_fight">Numero de pelea *</label>
            <input
              {...register('number_fight')}
              id="number_fight"
              type="text"
              required
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="coliseum">Coliseo *</label>
            <input
              {...register('coliseum')}
              id="coliseum"
              type="text"
              required
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="opponent">Contrincante *</label>
            <input
              {...register('opponent')}
              id="opponent"
              type="text"
              required
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="weight">Peso *</label>
            <input {...register('weight')} id="weight" type="text" required />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="date_fight">Fecha de la pelea *</label>
            <input
              {...register('date_fight')}
              id="date_fight"
              type="date"
              required
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="minutes">Tiempo que duro la pelea</label>
            <input {...register('minutes')} id="minutes" type="text" required />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="state">Resultado de la pelea</label>
            <select name="state" id="state" {...register('state')} required>
              <option value="0"></option>
              <option value="Ganado">Ganado</option>
              <option value="Perdido">Perdido</option>
              <option value="Empate">Empate</option>
            </select>{' '}
          </div>
        </section>
        <section className="crudPopForm__sectionButtons">
          <button type="button" onClick={() => setcrud()}>
            CANCELAR
          </button>{' '}
          <button type="submit">REGISTRAR</button>
        </section>
      </form>
    </div>
  );
};

export default CreateRegistersBirdsFights;
