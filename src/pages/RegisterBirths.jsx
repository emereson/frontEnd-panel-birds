import React, { useEffect, useState } from 'react';
import TableVaccine from '../components/vaccine/TableVaccine';
import axios from 'axios';
import config from '../utils/getToken';
import CreateVaccine from '../components/vaccine/crudVaccine/CreateVaccine';
import CreateRegisterBirth from '../components/registerBirths/crudRegisterBirths/CreateRegisterBirth';
import TableRegisterBirth from '../components/registerBirths/TableRegisterBirth';
import UpdateRegisterBirth from '../components/registerBirths/crudRegisterBirths/UpdateRegisterBirth';
import DeleteBirth from '../components/registerBirths/crudRegisterBirths/DeleteBirth';

const RegisterBirths = () => {
  const [crud, setcrud] = useState();
  const [search, setsearch] = useState('');
  const [allBirths, setallBirths] = useState();
  const [birdId, setbirdId] = useState('');
  const [allBirds, setallBirds] = useState();
  const [selectBirths, setselectBirths] = useState();

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

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/births?birdId=${birdId}`;

    axios
      .get(url, config)
      .then((res) => {
        setallBirths(res.data.births);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [birdId, crud]);

  console.log(allBirths);

  return (
    <div className="page__container">
      <section className="page___sectionOne">
        <h1>REGISTRO DE NACIMIENTO</h1>
      </section>
      <section className="page___sectionTwo">
        <form className="page___sectionTwo__form">
          <div>
            <label>Buscar Ave</label>

            <input
              id="search"
              type="text"
              placeholder="Buscar Ave Por Placa"
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>

          <div>
            <label>Seleccione el Ave</label>
            <select
              name="father_bird_id"
              id="father_bird_id"
              onChange={(e) => setbirdId(e.target.value)}
            >
              {' '}
              <option
                value="0"
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Elija un ave
              </option>
              {allBirds?.map((bird) => (
                <option key={bird.id} value={bird.id}>
                  {bird.plate_number}, placa: {bird.plate_color.color},{bird.id}
                </option>
              ))}
            </select>{' '}
          </div>
        </form>
        <button onClick={() => setcrud('create')}>Agregar Nacimiento</button>
      </section>

      <section className="page___sectionThree">
        <TableRegisterBirth
          allBirths={allBirths}
          setcrud={setcrud}
          setselectBirths={setselectBirths}
        />
      </section>

      {crud === 'create' && <CreateRegisterBirth setcrud={setcrud} />}
      {crud === 'update' && (
        <UpdateRegisterBirth setcrud={setcrud} selectBirths={selectBirths} />
      )}
      {crud === 'delete' && (
        <DeleteBirth setcrud={setcrud} selectBirths={selectBirths} />
      )}
    </div>
  );
};

export default RegisterBirths;
