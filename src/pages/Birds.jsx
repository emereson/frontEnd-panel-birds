import React, { useState } from 'react';
import './pagesStyle/pages.css';
import CreateBird from '../components/birds/crudBirds/CreateBird';
import TableBirds from '../components/birds/TableBirds';

const Birds = () => {
  const [crud, setcrud] = useState();
  const [search, setsearch] = useState('');

  return (
    <div className="page__container">
      <section className="page___sectionOne">
        <h1>Tus Aves</h1>
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
        </form>
        <button onClick={() => setcrud('createBird')}>Registrar Ave</button>
      </section>
      {crud === 'createBird' && <CreateBird setcrud={setcrud} />}

      <section className="page___sectionThree">
        <TableBirds search={search} crud={crud} />
      </section>
    </div>
  );
};

export default Birds;
