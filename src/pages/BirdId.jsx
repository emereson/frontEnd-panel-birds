import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../utils/getToken';
import './pagesStyle/BirdId.css';
import DeleteBirdId from '../components/birdId/DeleteBirdId';

const BirdId = () => {
  const { id } = useParams();
  const [dataBird, setdataBird] = useState();
  const [crud, setcrud] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/birds/${id}`;

    axios
      .get(url, config)
      .then((res) => {
        setdataBird(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, crud]);

  return (
    <div className="BirdId__container">
      <section className="BirdId__sectionOne">
        <h1>Datos de tu Ave</h1>
        <div className="BirdId__sectionOne__buttonsContainer">
          <button onClick={() => setcrud('delete')}>Eliminar Ave</button>
        </div>
      </section>

      <section className="BirdId__sectionTwo">
        <ul>
          <li>
            <b>Placa:</b> {dataBird?.bird?.plate_number}
          </li>
          <li>
            <b> Color de placa:</b> {dataBird?.bird?.plate_color.color}
          </li>
          <li>
            <b>Tipo de cresta:</b> {dataBird?.bird?.crest_type}
          </li>
          <li>
            <b>Sexo:</b> {dataBird?.bird?.sex}
          </li>
          <li>
            <b>Ave padre:</b>
            {dataBird?.father_bird?.plate_number}, Color de placa:{' '}
            {dataBird?.father_bird?.plate_color.color}
          </li>
          <li>
            <b>Ave madre:</b>
            {dataBird?.mother_bird?.plate_number}, Color de placa:{' '}
            {dataBird?.mother_bird?.plate_color.color}
          </li>
          <li>
            <b>Peso del ave:</b> {dataBird?.bird?.weight}
          </li>
          <li>
            <b>Edad:</b> {dataBird?.bird?.birthdate}
          </li>
          <li>
            <b>Estado del ave: </b>
            {dataBird?.bird?.status}
          </li>
          <li>
            <b>Procedencia del ave:</b> {dataBird?.bird?.origin}
          </li>
          <li>
            <b>Observaciones: </b>
            {dataBird?.bird?.observations}
          </li>
        </ul>
      </section>

      <section className="BirdId__sectionThree">
        <h2>Imagenes del ave</h2>
        <div className="BirdId__sectionThree__containerImages">
          {dataBird?.bird?.bird_image.map((image) => (
            <img
              key={image.id}
              src={`${import.meta.env.VITE_URL_IMAGE}/${image.link_image}`}
              alt=""
            />
          ))}
        </div>
      </section>
      <section className="BirdId__sectionFour">
        <h2>Videos del ave</h2>
        <div className="BirdId__sectionFour__containerVideos">
          {dataBird?.bird?.bird_videos &&
          dataBird?.bird?.bird_videos.length === 0 ? (
            <p>NO HAY VIDEOS DEL AVE</p>
          ) : (
            dataBird?.bird?.bird_videos.map((video) => (
              <video controls key={video.id}>
                <source
                  src={`${import.meta.env.VITE_URL_IMAGE}/${video.link_video}`}
                  type="video/mp4"
                />
                Tu navegador no soporta el elemento de video.
              </video>
            ))
          )}
        </div>
      </section>
      {crud === 'delete' && (
        <DeleteBirdId dataBird={dataBird.bird} setcrud={setcrud} />
      )}
    </div>
  );
};

export default BirdId;
