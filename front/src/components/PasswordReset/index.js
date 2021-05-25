import React from 'react';
import { useParams } from 'react-router-dom';
import Proptypes from 'prop-types';

import useFormManager from 'src/hooks/useFormManager';
import Message from 'src/containers/Message';
import CircleLoader from 'src/components/CircleLoader';
import TextField from 'src/components/TextField';
import './styles.scss';

const PasswordReset = ({
  saveNewPassword,
  loading,
  messageParams,
  displayMessage,
}) => {
  const formManagerConfig = {
    submitCallback: (fields) => saveNewPassword({
      token: token.replace(/\$/g, '.'),
      ...fields,
    }),
    cannotSubmitCallback: () => displayMessage({
      type: 'error',
      message: 'Le formulaire contient des erreurs. Veuillez les corriger avant de soumettre le formulaire.',
      targetComponent: 'PasswordReset',
    }),
    initialFields: {
      password: {
        value: '',
        isRequired: true,
      },
      passwordConfirm: {
        value: '',
        isRequired: true,
      },
    },
  };
  const formManager = useFormManager(formManagerConfig);

  const { token } = useParams();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    formManager.trySubmit();
  };

  return (
    <section className="passwordreset">
      <div className="container wave-double-bottom">
        <h1 className="title-h1 center">Nouveau mot de passe</h1>
        <form action="" method="get" className="passwordreset__form" onSubmit={handleSubmit}>
          {
            messageParams.targetComponent === 'PasswordReset'
            && (
              <Message {...messageParams} />
            )
          }
          <TextField
            id="password-reset-password"
            type="password"
            name="password"
            label="Saisissez votre nouveau mot de passe"
            inputClassName="full"
            placeholder="Veuillez renseigner votre nouveau mot de passe"
            isRequired
            value={formManager.fields.password.value}
            errorMessage={formManager.fieldErrors.password}
            checkIsFilled={formManager.checkIsFilled}
            checkLength={formManager.checkLength}
            requiredLength={6}
            changeValue={formManager.updateValue}
          />
          <TextField
            id="password-reset-password-confirm"
            type="password"
            name="passwordConfirm"
            label="Saisissez à nouveau votre mot de passe"
            placeholder="Veuillez confirmer votre nouveau mot de passe"
            isRequired
            inputClassName="full"
            value={formManager.fields.passwordConfirm.value}
            errorMessage={formManager.fieldErrors.passwordConfirm}
            checkIsFilled={formManager.checkIsFilled}
            changeValue={formManager.updateValue}
            checkPasswordConfirm={formManager.checkPasswordConfirm}
            valueToCompare={formManager.fields.password.value}
          />
          <button
            className="button button--primary passwordreset__form__submit"
            type="submit"
            disabled={messageParams.targetComponent === 'PasswordReset' && messageParams.type === 'confirm'}
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

PasswordReset.propTypes = {
  saveNewPassword: Proptypes.func.isRequired,
  loading: Proptypes.bool,
  messageParams: Proptypes.shape({
    type: Proptypes.string.isRequired,
    targetComponent: Proptypes.string.isRequired,
  }).isRequired,
  displayMessage: Proptypes.func.isRequired,
};

PasswordReset.defaultProps = {
  loading: false,
};

export default PasswordReset;
