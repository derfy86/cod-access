import React from 'react';
import './styles.scss';
import flo from 'src/assets/img/flo.jpg';
import fred from 'src/assets/img/fred.jpg';
import jerem from 'src/assets/img/jerem.jpg';
import annekim from 'src/assets/img/anne-kim.jpg';

const About = () => (
  <>
    <section className="about wave-double-bottom">
      <h1 className="title-h1 center">À propos</h1>
      <div className="about__text">
        <p className="title-h3 center about__text__detail">Mais au bout du compte, comment ce site a t'il vu le jour ?!</p>
        <p className="center about__text__detail">Prenez une marmite du nom de O'clock, 400g de travail intensif, 500g de bonnes volonté, 1kg de fatigue, une pincée de sel, et avec un peu de magie vous obtiendrez cette superbe équipe, quatre développeurs en parfaite harmonie qui ont un but en commun, le partage et l'envie d'en apprendre toujours plus.</p>
        <p className="center about__text__detail">Nous avons donné le meilleur de nous-même pour parfaire ce projet via des technologies de pointe : React, Redux, Sass, Node, Express, Sequelize, Sql...</p>
        <p className="title-h3 center">Qui sommes-nous réellement ??</p>
      </div>
      <div className="about__members">

        <article className="about__members__team">
          <div className="about__members__team__imageLeft">
            <img className="about__members__team__img" src={annekim} alt="" />
          </div>
          <div className="about__members__team__texte">
            <h2 className="about__members__team__name">Anne-Kim BANCHEREAU</h2>
            <p className="about__members__team__profil">Scrum Master, Développeuse Front</p>
          </div>
        </article>

        <article className="about__members__team">
          <div className="about__members__team__imageRight">
            <img className="about__members__team__img" src={flo} alt="" />
          </div>
          <div className="about__members__team__texte"> 
            <h2 className="about__members__team__name">Florian SANDERS</h2>
            <p className="about__members__team__profil">Product Owner, Lead Dev Front</p>
          </div>
        </article>

        <article className="about__members__team">
          <div className="about__members__team__imageLeft">
            <img className="about__members__team__img" src={fred} alt="" />
          </div>
          <div className="about__members__team__texte">
            <h2 className="about__members__team__name">Frédéric BOURIGEAUD</h2>
            <p className="about__members__team__profil">Lead Dev Back, Développeur Front</p>
          </div>
        </article>

        <article className="about__members__team">
          <div className="about__members__team__imageRight">
            <img className="about__members__team__img" src={jerem} alt="" />
          </div>
          <div className="about__members__team__texte">
            <h2 className="about__members__team__name">Jérémy YVON</h2>
            <p className="about__members__team__profil">Git Master, Développeur Back</p>
          </div>
        </article>
      </div>
    </section>
  </>
);

export default About;
