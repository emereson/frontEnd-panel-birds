import React, { useState } from 'react';
import TableBirdsInCare from '../components/birdsInCare/TableBirdsInCare';
import UpdateBirdInCare from '../components/birdsInCare/crudBirdsInCare/UpdateBirdInCare';

const BirdsInCare = () => {
  const [crud, setCrud] = useState();
  const [search, setsearch] = useState('');
  const [inCare, setinCare] = useState('all');
  const [selectBird, setSelectBird] = useState();

  return (
    <div className="page__container">
      <section className="page___sectionOne">
        <h1>AVES EN CUIDO</h1>
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
              name="in_care"
              id="in_care"
              onChange={(e) => setinCare(e.target.value)}
            >
              {' '}
              <option value="all">Todos</option>
              <option value="Habilitado">Habilitados</option>
              <option value="Desabilitado">Desabilitados</option>
            </select>{' '}
          </div>
        </form>
      </section>

      <section className="page___sectionThree">
        <TableBirdsInCare
          search={search}
          inCare={inCare}
          setCrud={setCrud}
          setSelectBird={setSelectBird}
          crud={crud}
        />
      </section>
      {crud === 'update' && (
        <UpdateBirdInCare selectBird={selectBird} setCrud={setCrud} />
      )}
    </div>
  );
};

export default BirdsInCare;
