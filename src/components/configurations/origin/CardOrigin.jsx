import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../../utils/getToken';
import CreateOrigin from './CreateOrigin';
import UpdateOrigin from './UpdateOrigin';

const CardOrigin = () => {
  const [selectItem, setselectItem] = useState();
  const [crud, setCrud] = useState('');
  const [allOrigins, setallOrigins] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/origin`;

    axios
      .get(url, config)
      .then((res) => {
        setallOrigins(res.data.origins);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [crud]);
  return (
    <section className="Configuration__section">
      <article className="Configuration__section__article">
        <h2>PROCEDENCIAS</h2>
        <button onClick={() => setCrud('createOrigin')}>
          AGREGAR PROCEDENCIAS
        </button>
      </article>
      <div className="Configuration__section__div">
        {allOrigins?.map((origin) => (
          <ul key={origin.id}>
            <li>{origin.name}</li>
            <li className="Configuration__section__divLiButtons">
              {' '}
              <button
                onClick={() => {
                  setCrud('update'), setselectItem(origin);
                }}
              >
                <i className="bx bxs-edit-alt"></i>
              </button>
              <button>
                <i className="bx bxs-trash-alt"></i>
              </button>
            </li>
          </ul>
        ))}
      </div>
      {crud === 'createOrigin' && <CreateOrigin setCrud={setCrud} />}
      {crud === 'update' && (
        <UpdateOrigin setCrud={setCrud} selectItem={selectItem} />
      )}
    </section>
  );
};

export default CardOrigin;
