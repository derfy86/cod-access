import React from 'react';
import ErrorPage from 'src/assets/img/404.svg'
import './styles.scss';

const Error = () => (
  <div className="errorPage">
    <img className="errorPage__picture" src={ErrorPage} alt="page-non-trouvé" />
  </div>
);

export default Error;
