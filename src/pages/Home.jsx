import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../utils/getToken';
import Graph from '../components/home/Graph';
import './pagesStyle/Home.css';

const Home = () => {
  const [allBirds, setallBirds] = useState();
  const [allUsers, setallUsers] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/birds`;

    axios
      .get(url, config)
      .then((res) => {
        setallBirds(res.data.birds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/user`;

    axios
      .get(url, config)
      .then((res) => {
        setallUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(allUsers);
  return (
    <div className="Home__container">
      {/* <section>
        <h1>Inicio</h1>
      </section> */}
      <section className="Home__sectionOne">
        <div>
          <span>
            {' '}
            <img src="./rooster.svg" alt="" /> {allBirds?.length}
          </span>
          <p>Aves registradas</p>
        </div>
        <div>
          <span>
            {' '}
            <i className="bx bx-user"></i>
            {allUsers?.length}
          </span>
          <p>Usuarios</p>
        </div>
      </section>
      <Graph allBirds={allBirds} />
    </div>
  );
};

export default Home;
