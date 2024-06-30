import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../../utils/getToken';
import CreateStatus from './CreateStatus';
import UpdateStatus from './UpdateStatus';
import DeleteStatus from './DeleteStatus';

const CardStatus = () => {
  const [crud, setCrud] = useState('');
  const [selectItem, setselectItem] = useState();
  const [allStatus, setallStatus] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/status`;

    axios
      .get(url, config)
      .then((res) => {
        setallStatus(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [crud]);
  return (
    <section className="Configuration__section">
      <article className="Configuration__section__article">
        <h2>STATUS</h2>
        <button onClick={() => setCrud('createStatus')}>AGREGAR STATUS</button>
      </article>
      <div className="Configuration__section__div">
        {allStatus?.map((state) => (
          <ul key={state.id}>
            <li>{state.name}</li>
            <li className="Configuration__section__divLiButtons">
              {' '}
              <button
                onClick={() => {
                  setCrud('update'), setselectItem(state);
                }}
              >
                <i class="bx bxs-edit-alt"></i>
              </button>
              <button
                onClick={() => {
                  setCrud('delete'), setselectItem(state);
                }}
              >
                <i class="bx bxs-trash-alt"></i>
              </button>
            </li>
          </ul>
        ))}
      </div>
      {crud === 'createStatus' && <CreateStatus setCrud={setCrud} />}
      {crud === 'update' && (
        <UpdateStatus setCrud={setCrud} selectItem={selectItem} />
      )}
      {crud === 'delete' && (
        <DeleteStatus setCrud={setCrud} selectItem={selectItem} />
      )}
    </section>
  );
};

export default CardStatus;
