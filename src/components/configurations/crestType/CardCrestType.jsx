import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../../utils/getToken';
import CreateCrestType from './CreateCrestType';
import UpdateCrestType from './UpdateCrestType';
import DeleteCrestType from './DeleteCrestType';

const CardCrestType = () => {
  const [allCrestTypes, setallCrestTypes] = useState();
  const [crud, setCrud] = useState('');
  const [selectItem, setselectItem] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/crest-type`;

    axios
      .get(url, config)
      .then((res) => {
        setallCrestTypes(res.data.crestTypes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [crud]);
  return (
    <section className="Configuration__section">
      <article className="Configuration__section__article">
        <h2>TIPOS DE CRESTA</h2>
        <button onClick={() => setCrud('createCrestType')}>
          AGREGAR CRESTA
        </button>
      </article>
      <div className="Configuration__section__div">
        {allCrestTypes?.map((crestType) => (
          <ul key={crestType.id}>
            <li>{crestType.name}</li>
            <li className="Configuration__section__divLiButtons">
              {' '}
              <button
                onClick={() => {
                  setCrud('update'), setselectItem(crestType);
                }}
              >
                <i className="bx bxs-edit-alt"></i>
              </button>
              <button
                onClick={() => {
                  setCrud('delete'), setselectItem(crestType);
                }}
              >
                <i className="bx bxs-trash-alt"></i>
              </button>
            </li>
          </ul>
        ))}
      </div>
      {crud === 'createCrestType' && <CreateCrestType setCrud={setCrud} />}
      {crud === 'update' && (
        <UpdateCrestType setCrud={setCrud} selectItem={selectItem} />
      )}
      {crud === 'delete' && (
        <DeleteCrestType setCrud={setCrud} selectItem={selectItem} />
      )}
    </section>
  );
};

export default CardCrestType;
