import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const Sitemap = () => (
  <section className="sitemap">
    <h1 className="title-h1">Plan du site</h1>
    <h2 className="title-h2">Navigation En-tête</h2>
    <ul>
      <li>
        <Link className="sitemap__link" to="/">
          Accueil
        </Link>
      </li>
      <li>
        <Link className="sitemap__link" to="/challenges">
          Challenges
        </Link>
      </li>
      <li>
        <Link className="sitemap__link" to="/a-propos">
          À propos
        </Link>
      </li>
      <li>
        <Link className="sitemap__link" to="/contact">
          Contact
        </Link>
      </li>
    </ul>
    <h2 className="title-h2">Gestion du compte</h2>
    <ul>
      <li>
        <Link className="sitemap__link" to="/oubli-mot-de-passe">
          Mot de passe oublié
        </Link>
      </li>
      <li>
        <Link className="sitemap__link" to="/inscription">
          Inscription
        </Link>
      </li>
    </ul>
    <h2 className="title-h2">Navigation Pied de page</h2>
    <ul>
      <li>
        <Link className="sitemap__link" to="/mentions-legales">
          Mentions légales
        </Link>
      </li>
      <li>
        <Link className="sitemap__link" to="/plan-du-site">
          Plan du site
        </Link>
      </li>
    </ul>
  </section>
);

export default Sitemap;
