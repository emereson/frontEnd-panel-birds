import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../utils/getToken';
import Loading from '../../hooks/Loading';

const CreateVideo = ({ setcrud, dataBird }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('bird_id', dataBird.id);
    formData.append('link_video', selectedVideo);

    const url = `${import.meta.env.VITE_URL_API}/bird-videos`;

    axios
      .post(url, formData, config)
      .then((res) => {
        setLoading(false);
        setcrud('');
        toast.success('El video se agregó exitosamente');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(
          'Hubo un error al agregar el video, verifique bien los datos'
        );
      });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const videoFiles = files.filter((file) => file.type.startsWith('video/'));
    setSelectedVideo(videoFiles[0]);
  };

  const handleOnClickImg = () => {
    document.getElementById('linkImg').click();
  };

  return (
    <div className="crudPop__container">
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className="crudPop__formContainer"
        >
          <h2>AGREGA UN VIDEO PARA EL AVE</h2>
          <section className="crudPopForm__sectionOne">
            <div className="crudForm__fileInput">
              <input
                {...register('link_video')}
                id="linkImg"
                name="linkImg"
                type="file"
                multiple={false}
                accept="video/*"
                onChange={handleFileChange}
                required
                style={{
                  opacity: 0,
                  position: 'absolute',
                  zIndex: -1,
                }}
              />
              {selectedVideo ? (
                <article
                  className="crudForm__fileInput__article "
                  onClick={handleOnClickImg}
                  style={{ height: 'auto' }}
                >
                  <video
                    className="crudForm__fileInput__articleVideo"
                    controls
                    style={{
                      width: '300px',
                      height: 'auto',
                      position: 'relative',
                    }}
                  >
                    <source
                      src={URL.createObjectURL(selectedVideo)}
                      type={selectedVideo.type}
                    />
                    Your browser does not support the video tag.
                  </video>
                </article>
              ) : (
                <article
                  className="crudForm__fileInput__article"
                  onClick={handleOnClickImg}
                >
                  <img
                    className="crudForm__fileInput__articleImg"
                    src="./foto.png"
                    alt="Default Image"
                  />
                  <p className="crudForm__fileInput__button">CARGAR VIDEO</p>
                </article>
              )}
            </div>
          </section>
          <section className="crudPopForm__sectionButtons">
            <button type="button" onClick={() => setcrud()}>
              CANCELAR
            </button>
            <button type="submit">REGISTRAR</button>
          </section>
        </form>
      )}
    </div>
  );
};

export default CreateVideo;
