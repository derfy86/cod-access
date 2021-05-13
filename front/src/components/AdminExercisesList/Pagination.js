import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const Pagination = ({ totalPages, activePage }) => {
  const pageLinks = [];

  for (let i = 1; i <= totalPages; i += 1) {
    pageLinks.push(
      <li key={i}>
        <NavLink
          className={classNames('pagination__link',
            { 'pagination__link--active': i === activePage })}
          to={`/admin/exercices?page=${i}`}
        >
          {i}
        </NavLink>
      </li>,
    );
  }

  return (
    <nav role="navigation" aria-label="pagination">
      <ul className="pagination">
        {pageLinks}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
};

export default Pagination;
