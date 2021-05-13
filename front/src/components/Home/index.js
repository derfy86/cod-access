import React from 'react';
import { Link } from 'react-router-dom';

import diverImgPath from 'src/assets/img/diver.svg';
import submarineImgPath from 'src/assets/img/submarine.svg';
import sailorImgPath from 'src/assets/img/sailor.svg';

import './styles.scss';

const Home = () => (
  <section className="home-wrapper wave-double-bottom">
    <article className="home-wrapper__article">
      <div className="home-wrapper__article__wrapper">
        <img className="home-wrapper__article__wrapper__img" src={sailorImgPath} alt="" />
        <div className="home-wrapper__article__wrapper__text">
          <h1 className="home-wrapper__article__wrapper__text__page-heading">Bienvenue Moussaillon !</h1>
          <p className="home-wrapper__article__wrapper__text__paraph">Viens aider le capitaine Némo à réparer son Nautilus afin de le rendre <strong>accessible</strong> à l'ensemble de son équipage !</p>
        </div>
      </div>
    </article>

    <article className="home-wrapper__article">
      <div className="home-wrapper__article__wrapper">
        <img className="home-wrapper__article__wrapper__img" src={diverImgPath} alt="" />
        <div className="home-wrapper__article__wrapper__text">
          <h2 className="home-wrapper__article__wrapper__text__heading">Prêt à te jeter à l'eau ?</h2>
          <p className="home-wrapper__article__wrapper__text__paraph">Procède aux différentes réparations du Nautilus en résolvant les challenges du Capitaine et apprends les bonnes pratiques de l'accessibilité web selon le <strong>Référentiel Général d'Amélioration d'Accessibilité français</strong>.</p>
          <Link className="home-wrapper__article__wrapper__text__link button button--primary" to="/challenges">Commencer les challenges</Link>
        </div>
      </div>
    </article>
{/* 
    <article className="home-wrapper__article">
      <div className="home-wrapper__article__wrapper">
        <img className="home-wrapper__article__wrapper__img" src={spyglassImgPath} alt="" />
        <div className="home-wrapper__article__wrapper__text">
          <h2 className="home-wrapper__article__wrapper__text__heading">Etudions un peu !</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor blandit integer aliquam mi nisi habitasse nunc sit mi.</p>
          <p>Vestibulum ullamcorper nibh sagittis etiam mattis adipiscing velit. Sagittis vivamus amet massa suspendisse nunc euismod.</p>
          <p>Tristique tincidunt vestibulum netus justo. Rhoncus leo massa sed quam. Volutpat gravida vitae faucibus sem nulla molestie consectetur.</p>
          <Link className="home-wrapper__article__wrapper__text__link" to="/challenges">Commencer les challenges</Link>
        </div>
      </div>
    </article> */}

    <article className="home-wrapper__article">
      <div className="home-wrapper__article__wrapper">
        <img className="home-wrapper__article__wrapper__img" src={submarineImgPath} alt="" />
        <div className="home-wrapper__article__wrapper__text">
          <h2 className="home-wrapper__article__wrapper__text__heading">Rejoins l'équipage</h2>
          <p className="home-wrapper__article__wrapper__text__paraph">Si tu le souhaites, tu peux t'inscrire pour <strong>visualiser l'avancée</strong> des réparations effectuées et <strong>sauvegarder ta progression</strong>.</p>
          <p className="home-wrapper__article__wrapper__text__paraph">Le capitaine te certifie qu'aucune de tes données personnelles ne seront exploitées et qu'elles ne seront <strong>communiquées à aucun tiers</strong>.</p>
          <Link className="home-wrapper__article__wrapper__text__link button button--primary" to="/inscription">S'inscrire</Link>
        </div>
      </div>
    </article>
  </section>
);

export default Home;
