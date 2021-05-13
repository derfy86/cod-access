import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import SignInForm from 'src/containers/Connection/SignInForm';
import UserMenu from 'src/containers/Connection/UserMenu';

import './styles.scss';

const Connection = ({
  isVisible,
  toggleConnection,
  hideConnection,
  isLogged,
  profileImage,
}) => {
  const toggleContainer = useRef();
  const closeConnectionArea = (evt) => {
    if (!toggleContainer.current.contains(evt.target)) {
      hideConnection();
    }
  };

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('click', closeConnectionArea);
    }
    return () => {
      window.removeEventListener('click', closeConnectionArea);
    };
  }, [isVisible]);

  return (
    <div className="header-wrapper__connection">
      <button
        className={classNames('header-wrapper__connection__toggle-btn', {
          'header-wrapper__connection__toggle-btn--logged': isLogged,
          'button button--primary': !isLogged,
        })}
        type="button"
        aria-expanded={isVisible}
        aria-controls="connection-menu"
        onClick={toggleConnection}
      >
        {
          isLogged
            ? (
              <>
                <img className="header-wrapper__connection__toggle-btn__profile-img" src={`${process.env.IMAGE}${profileImage}`} alt="Profil" />
              </>
            )
            : (
              <>
                <FontAwesomeIcon className="header-wrapper__connection__toggle-btn__icon" icon={faUser} size="2x" />
                <span className="header-wrapper__connection__toggle-btn__text">Connexion</span>
              </>
            )
        }

      </button>
      <div
        id="connection-menu"
        className={classNames('header-wrapper__connection__toggle-area', {
          'header-wrapper__connection__toggle-area--visible': isVisible,
        })}
        ref={toggleContainer}
      >
        {
          isLogged
            ? <UserMenu closeConnectionArea={toggleConnection} />
            : <SignInForm closeConnectionArea={toggleConnection} />
        }
      </div>
    </div>
  );
};

Connection.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleConnection: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  hideConnection: PropTypes.func.isRequired,
  profileImage: PropTypes.string,
};

Connection.defaultProps = {
  profileImage: '',
};

export default Connection;
