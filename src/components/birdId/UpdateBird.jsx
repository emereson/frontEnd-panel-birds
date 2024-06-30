import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loading from '../../hooks/Loading';
import config from '../../utils/getToken';

const UpdateBird = ({ setcrud, dataBird }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
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
    const url = `${import.meta.env.VITE_URL_API}/birds/${dataBird.bird.id}`;

    axios
      .patch(url, data, config)
      .then((res) => {
        setLoading(false);

        reset();
        setcrud('');
        toast.success('Los datos del ave se actualizaron correctamente');
      })
      .catch((err) => {
        console.log(err);
        setcrud('');

        setLoading(false);
        reset();
        toast.error(
          'Hubo un error al editar el ave, por favor verifique bien los datos'
        );
      });
  };

  console.log(dataBird?.bird.bird_color);
  return (
    <div className="crudPop__container">
      {loading && <Loading />}
      <form className="crudPop__formContainer" onSubmit={handleSubmit(submit)}>
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
              <option
                value={dataBird?.bird.plate_color.id}
                selected
                disabled
                hidden
              >
                {dataBird?.bird.plate_color.color}
              </option>{' '}
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
              defaultValue={dataBird?.bird.plate_number}
              required
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="sex">SEXO DEL AVE</label>
            <select name="sex" id="sex" {...register('sex')} required>
              <option value={dataBird?.bird.sex} selected disabled hidden>
                {dataBird?.bird.sex}
              </option>
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
              defaultValue={dataBird?.father_bird?.plate_number}
            />

            <div>
              <label>Seleccione el Gallo</label>
              <select
                name="father_bird_id"
                id="father_bird_id"
                {...register('father_bird_id')}
                required
              >
                <option
                  value={dataBird?.father_bird?.id}
                  selected
                  disabled
                  hidden
                >
                  {dataBird?.father_bird?.plate_number}, placa:{' '}
                  {dataBird?.father_bird?.plate_color.color}
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
              defaultValue={dataBird?.mother_bird?.plate_number}
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
                  value={dataBird?.mother_bird?.id}
                  selected
                  disabled
                  hidden
                >
                  {dataBird?.mother_bird?.plate_number}, placa:{' '}
                  {dataBird?.mother_bird?.plate_color.color}
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
              defaultValue={dataBird?.bird.birthdate}
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
              <option
                value={JSON.stringify(dataBird?.bird?.bird_color)}
                selected
                disabled
                hidden
              >
                {dataBird?.bird.bird_color.name}
              </option>
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
              <option
                value={dataBird?.bird.crest_type}
                selected
                disabled
                hidden
              >
                {dataBird?.bird.crest_type}
              </option>
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
              <option value={dataBird?.bird.line} selected disabled hidden>
                {dataBird?.bird.line}
              </option>{' '}
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
              defaultValue={dataBird?.bird.weight}
              required
            />
          </div>
          <div className="crudForm__sectionOne__div">
            <label htmlFor="status">ESTADO DEL AVE</label>
            <select name="status" id="status" {...register('status')} required>
              <option value={dataBird?.bird.status} selected disabled hidden>
                {dataBird?.bird.status}
              </option>{' '}
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
              <option value={dataBird?.bird.origin} selected disabled hidden>
                {dataBird?.bird.origin}
              </option>{' '}
              {allOrigins?.map((origin) => (
                <option key={origin.id} value={origin.name}>
                  {origin.name}
                </option>
              ))}
            </select>
          </div>

          <div className="crudForm__sectionOne__div">
            <label htmlFor="observations">OBSERVACIONES</label>
            <textarea
              {...register('observations')}
              id="observations"
              type="text"
              rows="5"
              defaultValue={dataBird?.bird.observations}
              required
            />
          </div>
        </section>
        <section className="crudPopForm__sectionButtons">
          <button
            type="button"
            onClick={() => {
              setcrud(), reset();
            }}
          >
            CANCELAR
          </button>
          <button type="submit">EDITAR</button>
        </section>
      </form>
    </div>
  );
};

export default UpdateBird;
