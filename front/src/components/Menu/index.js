import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const Menu = ({
  toggleMenu,
  mobileMenuVisibility,
}) => (
  <nav
    role="navigation"
    aria-label="principal"
    className={classNames('header-wrapper__menu', {
      'header-wrapper__menu--open': mobileMenuVisibility,
    })}
  >
    <button
      className="header-wrapper__menu__toggle-btn"
      type="button"
      aria-expanded={mobileMenuVisibility}
      aria-controls="menu-toggle-area"
      onClick={toggleMenu}
    >
      <span className="sr-only">Menu</span>
      <div className={classNames('header-wrapper__menu__toggle-btn__stripes', {
        'header-wrapper__menu__toggle-btn__stripes--cross': mobileMenuVisibility,
      })}
      >
        <span />
        <span />
        <span />
      </div>
    </button>
    <ul
      id="menu-toggle-area"
      className={classNames('header-wrapper__menu__list', {
        'header-wrapper__menu__list--visible': mobileMenuVisibility,
      })}
    >
      <li>
        <NavLink className="header-wrapper__menu__list__link" to="/" exact activeClassName="header-wrapper__menu__list__link--active">
          Accueil
        </NavLink>
      </li>
      <li>
        <NavLink className="header-wrapper__menu__list__link" to="/challenges" activeClassName="header-wrapper__menu__list__link--active">
          Challenges
        </NavLink>
      </li>
      <li>
        <NavLink className="header-wrapper__menu__list__link" to="/a-propos" exact activeClassName="header-wrapper__menu__list__link--active">
          À propos
        </NavLink>
      </li>
      <li>
        <NavLink className="header-wrapper__menu__list__link" to="/contact" exact activeClassName="header-wrapper__menu__list__link--active">
          Contact
        </NavLink>
      </li>
    </ul>
  </nav>
);

Menu.propTypes = {
  toggleMenu: PropTypes.func,
  mobileMenuVisibility: PropTypes.bool,
};

Menu.defaultProps = {
  toggleMenu: () => { },
  mobileMenuVisibility: false,
};

export default Menu;
