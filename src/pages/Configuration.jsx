import React, { useState } from 'react';
import './pagesStyle/Configuration.css';
import CardPlateColor from '../components/configurations/plateColor/CardPlateColor';
import CardBirdColor from '../components/configurations/birdColor/CardBirdColor';
import CardCrestType from '../components/configurations/crestType/CardCrestType';
import CardLine from '../components/configurations/line/CardLine';
import CardStatus from '../components/configurations/status/CardStatus';
import CardOrigin from '../components/configurations/origin/CardOrigin';
const Configuration = () => {
  return (
    <div className="page__container">
      <section className="page___sectionOne">
        <h1>CONFIIGURACION</h1>
      </section>
      <div className="Configuration__sectionsContainer">
        <CardPlateColor />
        <CardBirdColor />
        <CardCrestType />
        <CardLine />
        <CardStatus />
        <CardOrigin />
      </div>
    </div>
  );
};

export default Configuration;
