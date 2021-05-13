import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import TextField from 'src/components/TextField';
import useFormManager from 'src/hooks/useFormManager';
import Message from 'src/containers/Message';
import CircleLoader from 'src/components/CircleLoader';

import './styles.scss';

const SignInForm = ({
  trySignIn,
  messageParams,
  loading,
  displayMessage,
}) => {
  const formManagerConfig = {
    submitCallback: trySignIn,
    cannotSubmitCallback: () => displayMessage({
      type: 'error',
      message: 'Le formulaire contient des erreurs. Veuillez les corriger avant de soumettre le formulaire.',
      targetComponent: 'SignInForm',
    }),
    initialFields: {
      email: {
        value: '',
        isRequired: true,
      },
      password: {
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
    <>
      <form className="header-wrapper__connection__toggle-area__form" onSubmit={handleSubmit}>
        {
          messageParams.targetComponent === 'SignInForm'
          && (
            <Message {...messageParams} />
          )
        }
        <TextField
          type="email"
          id="signin-email"
          label="Adresse e-mail (nom@domaine.fr)"
          name="email"
          autocomplete="email"
          inputClassName="full"
          isRequired
          value={formManager.fields.email.value}
          errorMessage={formManager.fieldErrors.email}
          changeValue={formManager.updateValue}
          checkIsFilled={formManager.checkIsFilled}
          checkEmailFormat={formManager.checkEmailFormat}
        />
        <TextField
          type="password"
          id="signin-password"
          label="Mot de passe"
          name="password"
          autocomplete="current-password"
          inputClassName="full"
          isRequired
          value={formManager.fields.password.value}
          errorMessage={formManager.fieldErrors.password}
          changeValue={formManager.updateValue}
          checkIsFilled={formManager.checkIsFilled}
        />
        <Link className="header-wrapper__connection__toggle-area__form__link" to="/oubli-mot-de-passe">
          Mot de passe oublié
        </Link>
        <button
          className="button button--secondary header-wrapper__connection__toggle-area__form__submit"
          type="submit"
        >
          <span className="button__text">Se connecter</span>
          {
            loading && (
              <CircleLoader
                colour="#7ED8F7"
                radius={8}
                duration={2}
                strokeWidth={3}
              />
            )
          }
        </button>
      </form>
      <div className="header-wrapper__connection__toggle-area__signup">
        <Link className="header-wrapper__connection__toggle-area__signup__link" to="/inscription">
          Inscription
        </Link>
      </div>
    </>
  );
};

SignInForm.propTypes = {
  trySignIn: PropTypes.func.isRequired,
  messageParams: PropTypes.shape({
    targetComponent: PropTypes.string.isRequired,
  }).isRequired,
  displayMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SignInForm;
