import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../utils/getToken';
import CreateRegistersBirdsFights from '../components/registersFights/crudRegistersFights/CreateRegistersBirdsFights';
import TableRegistersFights from '../components/registersFights/TableRegistersFights';
import UpdateBirdsFights from '../components/registersFights/crudRegistersFights/UpdateBirdsFights';
import DeleteBirdsFight from '../components/registersFights/crudRegistersFights/DeleteBirdsFight';

const RegisterFight = () => {
  const [crud, setcrud] = useState();
  const [birdId, setbirdId] = useState();
  const [search, setsearch] = useState('');
  const [allBirds, setallBirds] = useState();
  const [allFights, setallFights] = useState();
  const [selectFight, setselectFight] = useState();

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
    const url = `${import.meta.env.VITE_URL_API}/bird-fight/${birdId}`;

    axios
      .get(url, config)
      .then((res) => {
        setallFights(res.data.birdFights);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [birdId, crud]);

  return (
    <div className="page__container">
      <section className="page___sectionOne">
        <h1>REGISTRO DE PELEAS</h1>
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
        <button onClick={() => setcrud('Create')}>Registrar Pelea</button>
      </section>

      <section className="page___sectionThree">
        <h2>Lista de las peleas del ave</h2>
        <TableRegistersFights
          allFights={allFights}
          setselectFight={setselectFight}
          setcrud={setcrud}
        />
      </section>
      {crud === 'Create' && <CreateRegistersBirdsFights setcrud={setcrud} />}
      {crud === 'update' && (
        <UpdateBirdsFights setcrud={setcrud} selectFight={selectFight} />
      )}
      {crud === 'delete' && (
        <DeleteBirdsFight setcrud={setcrud} selectFight={selectFight} />
      )}
    </div>
  );
};

export default RegisterFight;
