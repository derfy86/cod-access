import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ThemeCheckBox from './ThemeCheckBox';

import './styles.scss';

const Filter = ({
  visibility,
  themes,
  toggleFilter,
  validateFilter,
  handleCheckbox,
}) => (
  <>
    <button
      type="button"
      className={classNames('exercises__wrapper__header__intro__filter__btn', {
        'exercises__wrapper__header__intro__filter__btn--visible': visibility,
      })}
      onClick={toggleFilter}
    >
      <FontAwesomeIcon icon={faFilter} className="exercises__wrapper__header__intro__filter__btn__icon" />
      Thèmes
    </button>
    {
      visibility && (
        <fieldset className="exercises__wrapper__header__intro__filter">
          <legend className="exercises__wrapper__header__intro__filter__legend">Thèmes</legend>
          <ul>
            {
              themes.map((theme) => (
                <ThemeCheckBox theme={theme} key={theme.id} handleCheckbox={handleCheckbox} />
              ))
            }
          </ul>
          <button type="button" className="exercises__wrapper__header__intro__filter__btn--valid button button--secondary" onClick={validateFilter}>Valider</button>
        </fieldset>
      )
    }
  </>
);

Filter.propTypes = {
  themes: PropTypes.array,
  visibility: PropTypes.bool,
  toggleFilter: PropTypes.func,
  validateFilter: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  themes: [],
  visibility: false,
  toggleFilter: () => {},
};

export default Filter;
