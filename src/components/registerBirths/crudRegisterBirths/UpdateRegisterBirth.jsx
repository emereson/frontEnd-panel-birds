import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const UpdateRegisterBirth = ({ setcrud, selectBirths }) => {
  const { register, handleSubmit, reset } = useForm();
  const [search, setsearch] = useState('');
  const [search2, setsearch2] = useState('');
  const [mother, setmother] = useState();
  const [father, setfather] = useState();

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/birds/mother?search=${search2}`;

    axios
      .get(url, config)
      .then((res) => {
        setmother(res.data.birds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search2]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/birds/father?search=${search}`;

    axios
      .get(url, config)
      .then((res) => {
        setfather(res.data.birds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/births/${selectBirths.id}`;

    axios
      .patch(url, data, config)
      .then((res) => {
        setcrud('');
        toast.success('el  registro de nacimiento se edito  correctamente');
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          'Hubo un error al editar el registro de nacimiento,  verifique bien los datos'
        );
      });
  };

  return (
    <div className="crudPop__container">
      <form className="crudPop__formContainer" onSubmit={handleSubmit(submit)}>
        <h2>EDITAR LOS DATOS DEL NACIMIENTO</h2>
        <section className="crudForm__sectionOne">
          <div className="crudForm__sectionOne__div">
            <label htmlFor="search2">Ave madre *</label>
            <input
              id="search2"
              type="text"
              placeholder="Numero de Placa"
              defaultValue={selectBirths?.mother.plate_number}
              onChange={(e) => setsearch2(e.target.value)}
            />

            <div style={{ marginTop: '10px' }}>
              <label htmlFor="mother_id">Seleccione el Ave</label>
              <select
                name="mother_id"
                id="mother_id"
                {...register('mother_id')}
                required
              >
                <option
                  value={selectBirths?.mother.id}
                  selected
                  disabled
                  hidden
                >
                  {selectBirths?.mother.plate_number}, placa:{' '}
                  {selectBirths?.mother.plate_color.color},
                </option>
                {mother?.map((bird) => (
                  <option key={bird.id} value={bird.id}>
                    {bird.plate_number}, placa: {bird.plate_color.color},
                  </option>
                ))}
              </select>{' '}
            </div>
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="search">Ave Padre *</label>
            <input
              id="search"
              type="text"
              placeholder="Numero de Placa"
              defaultValue={selectBirths?.father.plate_number}
              onChange={(e) => setsearch(e.target.value)}
            />

            <div style={{ marginTop: '10px' }}>
              <label htmlFor="father_id">Seleccione el Ave</label>
              <select
                name="father_id"
                id="father_id"
                {...register('father_id')}
                required
              >
                <option
                  value={selectBirths?.father.id}
                  selected
                  disabled
                  hidden
                >
                  {selectBirths?.father.plate_number}, placa:{' '}
                  {selectBirths?.father.plate_color.color},
                </option>
                {father?.map((bird) => (
                  <option key={bird.id} value={bird.id}>
                    {bird.plate_number}, placa: {bird.plate_color.color},
                    {bird.id}
                  </option>
                ))}
              </select>{' '}
            </div>
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="number_eggs">Numero de huevos *</label>
            <input
              {...register('number_eggs')}
              id="number_eggs"
              type="text"
              defaultValue={selectBirths?.number_eggs}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="number_births">Numero de crias nacidas</label>
            <input
              {...register('number_births')}
              id="number_births"
              type="text"
              defaultValue={selectBirths?.number_births}
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="date_eggs">Fecha de incubación</label>
            <input
              {...register('date_eggs')}
              id="date_eggs"
              type="date"
              defaultValue={selectBirths?.date_eggs}
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

export default UpdateRegisterBirth;
