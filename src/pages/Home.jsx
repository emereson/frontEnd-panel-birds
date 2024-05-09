import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../utils/getToken';
import Graph from '../components/home/Graph';
import './pagesStyle/Home.css';
import GraphFight from '../components/home/GraphFight';

const Home = () => {
  const [allBirds, setallBirds] = useState();
  const [allUsers, setallUsers] = useState();
  const [allFight, setallFight] = useState();
  console.log(allFight);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/bird-fight`;

    axios
      .get(url, config)
      .then((res) => {
        setallFight(res.data.fights);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <div>
          <span>
            {' '}
            <i className="bx bxs-hot"></i> {allFight?.length}
          </span>
          <p>Peleas</p>
        </div>
      </section>
      <section className="Home__sectionTwo">
        <Graph allBirds={allBirds} />
        <GraphFight allFight={allFight} />
      </section>
    </div>
  );
};

export default Home;
