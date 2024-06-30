import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../../utils/getToken';
import CreatePlateColor from './CreatePlateColor';
import UpdatePlateColor from './UpdatePlateColor';
import DeletePlateColor from './DeletePlateColor';

const CardPlateColor = () => {
  const [crud, setCrud] = useState('');
  const [selectItem, setselectItem] = useState();
  const [allPlateColors, setallPlateColors] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/plate-color`;

    axios
      .get(url, config)
      .then((res) => {
        setallPlateColors(res.data.plateColors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [crud]);
  return (
    <section className="Configuration__section">
      <article className="Configuration__section__article">
        <h2>Color de Placa</h2>
        <button onClick={() => setCrud('createPlateColor')}>
          AGREGAR COLOR DE PLACA
        </button>
      </article>
      <div className="Configuration__section__div">
        {allPlateColors?.map((plateColor) => (
          <ul key={plateColor.id}>
            <li>
              {plateColor.color}

              <span style={{ backgroundColor: plateColor.code_color }}></span>
            </li>{' '}
            <li className="Configuration__section__divLiButtons">
              {' '}
              <button
                onClick={() => {
                  setCrud('update'), setselectItem(plateColor);
                }}
              >
                <i className="bx bxs-edit-alt"></i>
              </button>
              <button
                onClick={() => {
                  setCrud('delete'), setselectItem(plateColor);
                }}
              >
                <i className="bx bxs-trash-alt"></i>
              </button>
            </li>
          </ul>
        ))}
      </div>
      {crud === 'createPlateColor' && <CreatePlateColor setCrud={setCrud} />}
      {crud === 'update' && (
        <UpdatePlateColor setCrud={setCrud} selectItem={selectItem} />
      )}
      {crud === 'delete' && (
        <DeletePlateColor setCrud={setCrud} selectItem={selectItem} />
      )}
    </section>
  );
};

export default CardPlateColor;
