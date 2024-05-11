import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const CreateVaccine = ({ setcrud }) => {
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
    const url = `${import.meta.env.VITE_URL_API}/vaccine`;

    console.log(data);

    axios
      .post(url, data, config)
      .then((res) => {
        console.log(res);
        setcrud('');
        toast.success('La vacuna se registro correctamente');
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          'Hubo un error al registrar la vacuna,  verifique bien los datos'
        );
      });
    // reset();
  };
  return (
    <div className="crudPop__container">
      <form className="crudPop__formContainer" onSubmit={handleSubmit(submit)}>
        <h2>INGRESE LOS DATOS DE LA VACUNA</h2>
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
            <label htmlFor="blister">AMPOLLA</label>
            <input {...register('blister')} id="blister" type="text" />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="pill">PASTILLA</label>
            <input {...register('pill')} id="pill" type="text" />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="drops">GOTAS</label>
            <input {...register('drops')} id="drops" type="text" />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="internal_deworming">DESPARASITACION INTERNA</label>
            <input
              {...register('internal_deworming')}
              id="internal_deworming"
              type="text"
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="external_deworming">DESPARASITACION EXTERNA</label>
            <input
              {...register('external_deworming')}
              id="external_deworming"
              type="text"
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="date">FECHA</label>
            <input {...register('date')} id="date" type="date" required />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="observations">OBSERVACIONES</label>
            <textarea
              {...register('observations')}
              id="observations"
              type="text"
              rows="5"
            />
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

export default CreateVaccine;
