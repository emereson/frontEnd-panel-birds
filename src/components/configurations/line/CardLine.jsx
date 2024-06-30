import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../../utils/getToken';
import CreateLine from './CreateLine';
import UpdateLine from './UpdateLine';
import DeleteLine from './DeleteLine';

const CardLine = () => {
  const [allLines, setallLines] = useState();
  const [crud, setCrud] = useState('');
  const [selectItem, setselectItem] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/line`;

    axios
      .get(url, config)
      .then((res) => {
        setallLines(res.data.lines);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [crud]);
  return (
    <section className="Configuration__section">
      <article className="Configuration__section__article">
        <h2>LINEAS</h2>
        <button onClick={() => setCrud('createLine')}>AGREGAR LINEA</button>
      </article>
      <div className="Configuration__section__div">
        {allLines?.map((line) => (
          <ul key={line.id}>
            <li>{line.name}</li>
            <li className="Configuration__section__divLiButtons">
              {' '}
              <button
                onClick={() => {
                  setCrud('update'), setselectItem(line);
                }}
              >
                <i className="bx bxs-edit-alt"></i>
              </button>
              <button
                onClick={() => {
                  setCrud('delete'), setselectItem(line);
                }}
              >
                <i className="bx bxs-trash-alt"></i>
              </button>
            </li>
          </ul>
        ))}
      </div>
      {crud === 'createLine' && <CreateLine setCrud={setCrud} />}
      {crud === 'update' && (
        <UpdateLine setCrud={setCrud} selectItem={selectItem} />
      )}{' '}
      {crud === 'delete' && (
        <DeleteLine setCrud={setCrud} selectItem={selectItem} />
      )}
    </section>
  );
};

export default CardLine;
