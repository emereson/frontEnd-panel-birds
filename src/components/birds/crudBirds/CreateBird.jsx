import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';
import Loading from '../../../hooks/Loading';

const CreateBird = ({ setcrud }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);

  const [allColorsBird, setallColorsBird] = useState();
  const [allCrestTypes, setallCrestTypes] = useState();
  const [allLines, setallLines] = useState();
  const [allOrigins, setallOrigins] = useState();
  const [allPlateColors, setallPlateColors] = useState();
  const [allStatus, setallStatus] = useState();
  const [father, setfather] = useState();
  const [search, setsearch] = useState('');
  const [search2, setsearch2] = useState('');
  const [mother, setmother] = useState();

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_URL_API
    }/birds/mother?search=${search2}`;

    axios
      .get(url, config)
      .then((res) => {
        setmother(res.data.birds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search2]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/birds/father?search=${search}`;

    axios
      .get(url, config)
      .then((res) => {
        setfather(res.data.birds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

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
  }, []);

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
  }, []);

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
  }, []);

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
  }, []);

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
  }, []);

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
  }, []);

  const submit = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('plate_color_id', Number(data.plate_color_id));
    formData.append('plate_number', data.plate_number);
    formData.append('sex', data.sex);
    formData.append('father_bird_id', data.father_bird_id);
    formData.append('mother_bird_id', data.mother_bird_id);
    formData.append('birthdate', data.birthdate);
    formData.append('bird_color', data.bird_color);
    formData.append('crest_type', data.crest_type);
    formData.append('line', data.line);
    formData.append('weight', data.weight);
    formData.append('status', data.status);
    formData.append('origin', data.origin);
    formData.append('observations', data.observations);

    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file, index) => {
        formData.append(`link_image[]`, file);
      });

      selectedVideos.forEach((file, index) => {
        formData.append(`link_video[]`, file);
      });

      const url = `${import.meta.env.VITE_URL_API}/birds`;

      axios
        .post(url, formData, config)
        .then((res) => {
          setLoading(false);
          setSelectedFiles([]);
          setSelectedVideos([]);
          reset();
          setcrud('');
          toast.success('El ave se registró correctamente');
        })
        .catch((err) => {
          console.log(err);
          setcrud('');
          setSelectedFiles([]);
          setSelectedVideos([]);
          setLoading(false);
          reset();
          toast.error(
            'Hubo un error al crear el ave, por favor verifique bien los datos'
          );
        });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    setSelectedFiles(imageFiles);
  };

  const handleOnClickImg = () => {
    document.getElementById('linkImg').click();
  };

  console.log(selectedVideos);
  const handleFileVideoChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith('video/'));
    setSelectedVideos(imageFiles);
  };

  const handleOnClickVideo = () => {
    document.getElementById('linkVideo').click();
  };

  console.log(selectedFiles);
  return (
    <div className="crud__container">
      {loading && <Loading />}
      <form className="crud__formContainer" onSubmit={handleSubmit(submit)}>
        <h2>INGRESE LOS DATOS DEL AVE</h2>
        <section className="crudForm__sectionOne">
          <div className="crudForm__sectionOne__div">
            <label htmlFor="plate_color_id">Seleccione Color de Placa</label>
            <select
              name="plate_color_id"
              id="plate_color_id"
              {...register('plate_color_id')}
              required
            >
              <option value={null}></option>
              {allPlateColors?.map((plateColor) => (
                <option
                  key={plateColor.id}
                  value={plateColor.id}
                  style={{ borderBottom: `1px solid ${plateColor.code_color}` }}
                >
                  {plateColor.color}
                </option>
              ))}
            </select>
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="plate_number">NUMERO DE PLACA</label>
            <input
              {...register('plate_number')}
              id="plate_number"
              type="text"
              required
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="sex">SEXO DEL AVE</label>
            <select name="sex" id="sex" {...register('sex')} required>
              <option value={null}></option>
              <option value="macho">macho</option>
              <option value="hembra">hembra</option>
            </select>{' '}
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="father">GALLO PADRE</label>
            <input
              id="father"
              onChange={(e) => setsearch(e.target.value)}
              type="text"
              placeholder="Numero de Placa"
            />

            <div>
              <label>Seleccione el Gallo</label>
              <select
                name="father_bird_id"
                id="father_bird_id"
                {...register('father_bird_id')}
                required
              >
                {' '}
                <option
                  value="0"
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  No Tiene Padre
                </option>
                {father?.map((bird) => (
                  <option key={bird.id} value={bird.id}>
                    {bird.plate_number}, placa: {bird.plate_color.color},
                    {bird.id}
                  </option>
                ))}
              </select>{' '}
            </div>
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="mother">GALLINA MADRE</label>
            <input
              id="mother"
              type="text"
              onChange={(e) => setsearch2(e.target.value)}
              placeholder="Numero de Placa"
            />
            <div>
              <label>Seleccione la gallina</label>
              <select
                name="mother_bird_id"
                id="mother_bird_id"
                {...register('mother_bird_id')}
                required
              >
                <option
                  value="0"
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  No Tiene Madre
                </option>
                {mother?.map((bird) => (
                  <option key={bird.id} value={bird.id}>
                    {bird.plate_number}, placa: {bird.plate_color.color}
                  </option>
                ))}
              </select>{' '}
            </div>
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="birthdate">FECHA DE NACIMIENTO</label>
            <input
              {...register('birthdate')}
              id="birthdate"
              type="date"
              required
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="bird_color">COLOR DE AVE</label>
            <select
              name="bird_color"
              id="bird_color"
              {...register('bird_color')}
              required
            >
              <option value={null}></option>
              {allColorsBird?.map((colorBird) => (
                <option
                  key={colorBird.id}
                  value={JSON.stringify(colorBird)}
                  style={{ borderBottom: `1px solid ${colorBird.code_color}` }}
                >
                  {colorBird.name}
                </option>
              ))}
            </select>
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="crest_type">TIPO DE CRESTA</label>
            <select
              name="crest_type"
              id="crest_type"
              {...register('crest_type')}
              required
            >
              <option value={null}></option>

              {allCrestTypes?.map((crestType) => (
                <option key={crestType.id} value={crestType.name}>
                  {crestType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="line">LINEA DEL AVE</label>
            <select name="line" id="line" {...register('line')} required>
              <option value={null}></option>
              {allLines?.map((line) => (
                <option key={line.id} value={line.name}>
                  {line.name}
                </option>
              ))}
            </select>
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="weight">PESO DEL AVE</label>
            <input
              {...register('weight')}
              name="weight"
              id="weight"
              type="text"
              required
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="status">ESTADO DEL AVE</label>
            <select name="status" id="status" {...register('status')} required>
              <option value={null}></option>
              {allStatus?.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="origin">PROCEDENCIA DEL AVE</label>
            <select name="origin" id="origin" {...register('origin')} required>
              <option value={null}></option>

              {allOrigins?.map((origin) => (
                <option key={origin.id} value={origin.name}>
                  {origin.name}
                </option>
              ))}
            </select>
          </div>
          <div className="crudForm__fileInput">
            <input
              {...register('link_image')}
              id="linkImg"
              name="linkImg"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              required
              style={{
                opacity: 0,
                position: 'absolute',
                zIndex: -1,
              }}
            />
            {selectedFiles?.length > 0 ? (
              <article
                className="crudForm__fileInput__article crudForm__fileInput__article2"
                onClick={handleOnClickImg}
              >
                <img
                  className="crudForm__fileInput__articleImg"
                  src="./foto.png"
                />
                <p className="crudForm__fileInput__p">
                  {selectedFiles?.length} imagenes Subidas
                </p>
              </article>
            ) : (
              <article
                className="crudForm__fileInput__article"
                onClick={handleOnClickImg}
              >
                <img
                  className="crudForm__fileInput__articleImg"
                  src="./foto.png"
                />
                <p className="crudForm__fileInput__button">CARGAR FOTOS</p>
              </article>
            )}
          </div>

          <div className="crudForm__fileInput">
            <input
              {...register('link_video')}
              id="linkVideo"
              name="linkVideo"
              type="file"
              multiple
              accept="video/*"
              onChange={handleFileVideoChange}
              style={{
                opacity: 0,
                position: 'absolute',
                zIndex: -1,
              }}
            />
            {selectedVideos?.length > 0 ? (
              <article
                className="crudForm__fileInput__article crudForm__fileInput__article2"
                onClick={handleOnClickVideo}
              >
                <img
                  className="crudForm__fileInput__articleImg"
                  src="./foto.png"
                />
                <p className="crudForm__fileInput__p">
                  {selectedVideos?.length} videos subidos
                </p>
              </article>
            ) : (
              <article
                className="crudForm__fileInput__article"
                onClick={handleOnClickVideo}
              >
                <img
                  className="crudForm__fileInput__articleImg"
                  src="./foto.png"
                />
                <p className="crudForm__fileInput__button">SUBIR VIDEOS</p>
              </article>
            )}
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="observations">OBSERVACIONES</label>
            <input
              {...register('observations')}
              id="observations"
              type="text"
              required
            />
          </div>
        </section>
        <section className="crudForm__sectionButtons">
          <button type="button" onClick={() => setcrud()}>
            CANCELAR
          </button>{' '}
          <button type="submit"> CREAR</button>
        </section>
      </form>
    </div>
  );
};

export default CreateBird;
