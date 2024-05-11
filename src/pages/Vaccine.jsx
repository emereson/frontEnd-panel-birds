import React, { useEffect, useState } from 'react';
import TableVaccine from '../components/vaccine/TableVaccine';
import axios from 'axios';
import config from '../utils/getToken';
import CreateVaccine from '../components/vaccine/crudVaccine/CreateVaccine';
import UpdateVaccine from '../components/vaccine/crudVaccine/UpdateVaccine';
import DeleteVaccine from '../components/vaccine/crudVaccine/DeleteVaccine';

const Vaccine = () => {
  const [crud, setcrud] = useState();
  const [birdId, setbirdId] = useState();
  const [search, setsearch] = useState('');
  const [allBirds, setallBirds] = useState();
  const [allvacines, setallvacines] = useState();
  const [selectVaccine, setselectVaccine] = useState();

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
    const url = `${import.meta.env.VITE_URL_API}/vaccine/${birdId}`;

    axios
      .get(url, config)
      .then((res) => {
        setallvacines(res.data.vaccines);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [birdId, crud]);

  return (
    <div className="page__container">
      <section className="page___sectionOne">
        <h1>REGISTRO DE VACUNAS</h1>
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
        <button onClick={() => setcrud('CreateVaccine')}>Agregar Vacuna</button>
      </section>

      <section className="page___sectionThree">
        <TableVaccine
          allvacines={allvacines}
          setselectVaccine={setselectVaccine}
          setcrud={setcrud}
        />
      </section>
      {crud === 'CreateVaccine' && <CreateVaccine setcrud={setcrud} />}
      {crud === 'update' && (
        <UpdateVaccine setcrud={setcrud} selectVaccine={selectVaccine} />
      )}
      {crud === 'delete' && (
        <DeleteVaccine setcrud={setcrud} selectVaccine={selectVaccine} />
      )}
    </div>
  );
};

export default Vaccine;
