import React, { useEffect } from 'react';
import Proptypes from 'prop-types';

import useFormManager from 'src/hooks/useFormManager';
import TextField from 'src/components/TextField';
import Message from 'src/containers/Message';
import CircleLoader from 'src/components/CircleLoader';

import './styles.scss';

const PasswordResetRequest = ({
  sendResetPasswordEmail,
  loading,
  messageParams,
  displayMessage,
}) => {
  const formManagerConfig = {
    submitCallback: sendResetPasswordEmail,
    cannotSubmitCallback: () => displayMessage({
      type: 'error',
      message: 'Le formulaire contient des erreurs. Veuillez les corriger avant de soumettre le formulaire.',
      targetComponent: 'PasswordResetRequest',
    }),
    initialFields: {
      email: {
        value: '',
        isRequired: true,
      },
    },
  };

  const formManager = useFormManager(formManagerConfig);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    formManager.trySubmit();
  };

  return (
    <section className="passwordreset">
      <div className="container wave-double-bottom">
        <h1 className="title-h1 center">Mot de passe oublié</h1>
        <form action="" method="get" className="passwordreset__form" onSubmit={handleSubmit}>
          {
            messageParams.targetComponent === 'PasswordResetRequest'
            && (
              <Message {...messageParams} />
            )
          }
          <TextField
            id="password-reset-email"
            type="text"
            name="email"
            inputClassName="full"
            label="Renseignez votre e-mail pour recevoir le lien de réinitialisation. (nom@domaine.fr)"
            placeholder="Veuillez renseigner votre e-mail"
            isRequired
            value={formManager.fields.email.value}
            changeValue={formManager.updateValue}
            checkIsFilled={formManager.checkIsFilled}
            checkEmailFormat={formManager.checkEmailFormat}
            errorMessage={formManager.fieldErrors.email}
          />
          <button
            className="button button--primary passwordreset__form__submit"
            type="submit"
            disabled={messageParams.targetComponent === 'PasswordResetRequest' && messageParams.type === 'confirm'}
          >
            <span>Envoyer la demande de réinitialisation</span>
            {
              loading && (
                <CircleLoader
                  colour="#FFFFFF"
                  radius={8}
                  duration={2}
                  strokeWidth={3}
                />
              )
            }
          </button>
        </form>
      </div>
    </section>
  );
};

PasswordResetRequest.propTypes = {
  displayMessage: Proptypes.func.isRequired,
  sendResetPasswordEmail: Proptypes.func.isRequired,
  loading: Proptypes.bool,
  messageParams: Proptypes.shape({
    type: Proptypes.string.isRequired,
    targetComponent: Proptypes.string.isRequired,
  }).isRequired,
};
PasswordResetRequest.defaultProps = {
  loading: false,
};

export default PasswordResetRequest;
