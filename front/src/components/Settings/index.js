import React from 'react';
import PropTypes from 'prop-types';

import EditUserImageForm from './EditUserImageForm';
import EditUserEmailForm from './EditUserEmailForm';
import EditUserPseudoForm from './EditUserPseudoForm';
import EditUserPasswordForm from './EditUserPasswordForm';

import './styles.scss';

const Settings = ({
  user,
  onSubmitEmail,
  onSubmitPseudo,
  onSubmitPassword,
  onSubmitFile,
  deleteAccount,
  messageParams,
  displayModalConfirm,
  displayMessage,
}) => {
  const handleDelAccountClick = () => {
    displayModalConfirm({
      heading: 'Suppression de compte',
      message: 'Souhaitez-vous réellement supprimer votre compte ? Cette action est irreversible.',
      confirmParams: {
        onConfirm: deleteAccount,
        label: 'Supprimer mon compte',
      },
      cancelParams: {
        onCancel: () => { },
        label: 'Annuler',
      },
      shouldDisplayHeading: true,
      isVisible: true,
    });
  };

  return (
    <section className="settings wave-double-bottom">
      <h1 className="title-h1 center">Paramètres</h1>

      <EditUserImageForm
        user={user}
        onSubmitFile={onSubmitFile}
        displayMessage={displayMessage}
        messageParams={messageParams}
      />

      <EditUserEmailForm
        user={user}
        onSubmitEmail={onSubmitEmail}
        displayMessage={displayMessage}
        messageParams={messageParams}
      />

      <EditUserPseudoForm
        user={user}
        onSubmitPseudo={onSubmitPseudo}
        displayMessage={displayMessage}
        messageParams={messageParams}
      />

      <EditUserPasswordForm
        onSubmitPassword={onSubmitPassword}
        displayMessage={displayMessage}
        messageParams={messageParams}
      />

      <div className=" to-right">
        <button className="button button--delete" type="button" onClick={handleDelAccountClick}>
          Supprimer mon compte
        </button>
      </div>
    </section>
  );
};

Settings.propTypes = {
  user: PropTypes.shape({
    picturePath: PropTypes.string.isRequired,
    pseudo: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onSubmitPseudo: PropTypes.func.isRequired,
  onSubmitEmail: PropTypes.func.isRequired,
  onSubmitPassword: PropTypes.func.isRequired,
  onSubmitFile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  messageParams: PropTypes.shape({
    targetComponent: PropTypes.string.isRequired,
  }).isRequired,
  displayModalConfirm: PropTypes.func.isRequired,
  displayMessage: PropTypes.func.isRequired,
};

export default Settings;
