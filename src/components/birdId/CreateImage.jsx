import axios from 'axios';
import React, { useState } from 'react'; // Asegúrate de importar useState desde 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../utils/getToken';
import Loading from '../../hooks/Loading';

const CreateImage = ({ setcrud, dataBird }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Inicializa selectedImage como null
  console.log(selectedImage);
  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('bird_id', dataBird.id);
    formData.append('link_image', selectedImage); // Usa selectedImage directamente aquí

    const url = `${import.meta.env.VITE_URL_API}/bird-images`;

    axios
      .post(url, formData, config)
      .then((res) => {
        setLoading(false);
        setcrud('');
        toast.success('El origen se creó exitosamente'); // Corrige la ortografía de 'creó'
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(
          'Hubo un error al crear el origen, verifique bien los datos'
        ); // Corrige la ortografía de 'creó'
      });
    // reset();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    setSelectedImage(imageFiles[0]); // Establece selectedImage como el primer archivo de imagen
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
          <h2>AGREGA UNA IMAGEN PARA EL AVE</h2>
          <section className="crudPopForm__sectionOne">
            <div className="crudForm__fileInput">
              <input
                {...register('link_image')}
                id="linkImg"
                name="linkImg"
                type="file"
                multiple={false} // Cambia multiple a false ya que solo estás seleccionando una imagen
                accept="image/*"
                onChange={handleFileChange}
                required
                style={{
                  opacity: 0,
                  position: 'absolute',
                  zIndex: -1,
                }}
              />
              {selectedImage ? ( // Corrige la condición aquí
                <article
                  className="crudForm__fileInput__article "
                  onClick={handleOnClickImg}
                  style={{ height: 'auto' }}
                >
                  <img
                    className="crudForm__fileInput__articleImg"
                    src={URL.createObjectURL(selectedImage)} // Usa URL.createObjectURL para mostrar la imagen seleccionada
                    alt="Selected Image"
                    style={{
                      width: '100%',
                      height: 'auto',
                      position: 'relative',
                    }}
                  />
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
                  <p className="crudForm__fileInput__button">CARGAR IMAGEN</p>
                </article>
              )}
            </div>
          </section>
          <section className="crudPopForm__sectionButtons">
            <button type="button" onClick={() => setcrud()}>
              CANCELAR
            </button>{' '}
            <button type="submit">REGISTRAR</button>{' '}
            {/* Corrige el espacio antes de REGISTRAR */}
          </section>
        </form>
      )}
    </div>
  );
};

export default CreateImage;
