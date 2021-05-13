// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// == Import
import Header from 'src/components/Header';
import Menu from 'src/containers/Menu';
import Connection from 'src/containers/Connection';
import Page from 'src/containers/Page';
import Footer from 'src/components/Footer';
import Modal from 'src/containers/ModalConfirm';
import CircleLoader from '../CircleLoader';
import './styles.scss';

// == Composant
const App = ({
  checkAuth,
  getCSRFToken,
  loadThemes,
  appLoading,
  modalConfirmParams,
}) => {
  useEffect(() => {
    loadThemes();
    getCSRFToken();
    if (localStorage.getItem('isSignedIn')) {
      checkAuth();
    }
  }, []);
  return (
    <>
      <a className="skip-link sr-only-focusable" href="#main-content">Contenu</a> {/* skipLink for a11y, keyboard users mainly */}
      {
        modalConfirmParams.isVisible && (
          <Modal
            {...modalConfirmParams}
          />
        )
      }
      <div className={classNames('modal-background', {
        'modal-background--blur': modalConfirmParams.isVisible,
      })}
      />

      <div className="header-wrapper">
        <Header />
        <Menu />
        <Connection />
      </div>
      {
        appLoading
          ? (
            <div className="loading">
              <CircleLoader
                colour="#7ED8F7"
                radius={100}
                duration={2}
                strokeWidth={20}
              />
            </div>
          )
          : <Page />
      }
      <Footer />
    </>
  );
};

App.propTypes = {
  checkAuth: PropTypes.func.isRequired,
  getCSRFToken: PropTypes.func.isRequired,
  loadThemes: PropTypes.func.isRequired,
  appLoading: PropTypes.bool,
  modalConfirmParams: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirmParams: PropTypes.shape({
      onConfirm: PropTypes.func.isRequired,
      params: PropTypes.object,
      label: PropTypes.string.isRequired,
    }),
    cancelParams: PropTypes.shape({
      onCancel: PropTypes.func,
      label: PropTypes.string.isRequired,
    }),
    isVisible: PropTypes.bool.isRequired,
  }).isRequired,
};

App.defaultProps = {
  appLoading: false,
};

// == Export
export default App;
