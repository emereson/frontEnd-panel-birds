import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../utils/getToken';
import './pagesStyle/BirdId.css';
import DeleteBirdId from '../components/birdId/DeleteBirdId';
import UpdateBird from '../components/birdId/UpdateBird';
import DeleteImage from '../components/birdId/DeleteImage';
import CreateImage from '../components/birdId/CreateImage';
import CreateVideo from '../components/birdId/CreateVideo';
import DeleteVideo from '../components/birdId/DeleteVideo';

const BirdId = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataBird, setdataBird] = useState();
  const [crud, setcrud] = useState();
  const [selectImage, setSelectImage] = useState();
  const [selectVideo, setselectVideo] = useState();

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

  function calcularEdad(fechaNacimiento) {
    const fechaNacimientoObj = new Date(fechaNacimiento);
    const fechaActual = new Date();

    // Calcular la diferencia entre las fechas en milisegundos
    const diff = fechaActual - fechaNacimientoObj;

    // Convertir la diferencia a un objeto de fecha
    const diffDate = new Date(diff);

    // Extraer años, meses y días de la diferencia
    const años = diffDate.getUTCFullYear() - 1970; // 1970 es el año base en JavaScript
    const meses = diffDate.getUTCMonth();
    const dias = diffDate.getUTCDate() - 1; // Restar 1 porque getDate() devuelve el día del mes

    return { años, meses, dias };
  }

  console.log(dataBird);
  return (
    <div className="BirdId__container">
      <section className="BirdId__sectionOne">
        <button
          className="BirdId__sectionOne_navigate"
          onClick={() => navigate('/birds')}
        >
          <i class="bx bx-arrow-back"></i>
          Atras
        </button>
        <div className="BirdId__sectionOne__buttonsContainer">
          <button onClick={() => setcrud('update')}>Editar</button>
          <button onClick={() => setcrud('delete')}>Eliminar</button>
        </div>
      </section>

      <section className="BirdId__sectionTwo">
        <h1>Datos de tu Ave</h1>
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
            <b>Edad:</b>{' '}
            <p>
              {calcularEdad(dataBird?.bird.birthdate).años} años,{' '}
              {calcularEdad(dataBird?.bird.birthdate).meses} meses y{' '}
              {calcularEdad(dataBird?.bird.birthdate).dias} días
            </p>
          </li>
          <li>
            <b>Fecha de nacimiento:</b> {dataBird?.bird.birthdate}
          </li>
          <li>
            <b>Color del ave: </b>
            {dataBird?.bird?.bird_color.name}
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
        <article className="BirdId__sectionFour_article">
          <h2>Imagenes del ave</h2>
          <button onClick={() => setcrud('createImage')}>Agregar Imagen</button>
        </article>
        <div className="BirdId__sectionThree__containerImages">
          {dataBird?.bird?.bird_image.map((image) => (
            <div key={image.id}>
              <button
                onClick={() => {
                  setcrud('deleteImage'), setSelectImage(image);
                }}
              >
                Eliminar Imagen
              </button>
              <img
                src={`${import.meta.env.VITE_URL_IMAGE}/${image.link_image}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </section>
      <section className="BirdId__sectionFour">
        <article className="BirdId__sectionFour_article">
          <h2>Videos del ave</h2>
          <button onClick={() => setcrud('createVideo')}>Agregar Video</button>
        </article>{' '}
        <div className=" BirdId__sectionFour__containerVideos">
          {dataBird?.bird?.bird_videos &&
          dataBird?.bird?.bird_videos.length === 0 ? (
            <p>NO HAY VIDEOS DEL AVE</p>
          ) : (
            dataBird?.bird?.bird_videos.map((video) => (
              <div key={video.id}>
                <button
                  onClick={() => {
                    setcrud('deleteVideo'), setselectVideo(video);
                  }}
                >
                  Eliminar Video
                </button>
                <video controls key={video.id}>
                  <source
                    src={`${import.meta.env.VITE_URL_IMAGE}/${
                      video.link_video
                    }`}
                    type="video/mp4"
                  />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            ))
          )}
        </div>
      </section>
      {crud === 'delete' && (
        <DeleteBirdId dataBird={dataBird.bird} setcrud={setcrud} />
      )}
      {crud === 'update' && (
        <UpdateBird dataBird={dataBird} setcrud={setcrud} />
      )}
      {crud === 'deleteImage' && (
        <DeleteImage selectImage={selectImage} setcrud={setcrud} />
      )}

      {crud === 'createImage' && (
        <CreateImage dataBird={dataBird.bird} setcrud={setcrud} />
      )}

      {/* video */}

      {crud === 'deleteVideo' && (
        <DeleteVideo selectVideo={selectVideo} setcrud={setcrud} />
      )}

      {crud === 'createVideo' && (
        <CreateVideo dataBird={dataBird.bird} setcrud={setcrud} />
      )}
    </div>
  );
};

export default BirdId;
