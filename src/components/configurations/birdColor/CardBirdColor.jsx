import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../../utils/getToken';
import CreateBirdColor from './CreateBirdColor';
import UpdateBirdColor from './UpdateBirdColor';

const CardBirdColor = () => {
  const [crud, setCrud] = useState('');
  const [selectItem, setselectItem] = useState();
  const [allColorsBird, setallColorsBird] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/bird-color`;

    axios
      .get(url, config)
      .then((res) => {
        setallColorsBird(res.data.birdColors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [crud]);

  return (
    <section className="Configuration__section">
      <article className="Configuration__section__article">
        <h2>Color de Ave</h2>
        <button onClick={() => setCrud('createBirdColor')}>
          AGREGAR COLOR DE AVE
        </button>
      </article>
      <div className="Configuration__section__div">
        {allColorsBird?.map((color) => (
          <ul key={color.id}>
            <li>
              {color.name}

              <span style={{ backgroundColor: color.code_color }}></span>
            </li>
            <li className="Configuration__section__divLiButtons">
              {' '}
              <button
                onClick={() => {
                  setCrud('updateBirdColor'), setselectItem(color);
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
      {crud === 'createBirdColor' && <CreateBirdColor setCrud={setCrud} />}
      {crud === 'updateBirdColor' && (
        <UpdateBirdColor setCrud={setCrud} selectItem={selectItem} />
      )}
    </section>
  );
};

export default CardBirdColor;
