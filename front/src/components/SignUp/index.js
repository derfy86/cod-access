import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'src/components/TextField';
import useFormManager from 'src/hooks/useFormManager';
import picture from 'src/assets/img/contact-signup.svg';
import Message from 'src/containers/Message';
import CircleLoader from 'src/components/CircleLoader';

import './styles.scss';

const SignUp = ({
  trySignUp,
  loading,
  messageParams,
  displayMessage,
}) => {
  const formManagerConfig = {
    submitCallback: trySignUp,
    cannotSubmitCallback: () => displayMessage({
      type: 'error',
      message: 'Le formulaire contient des erreurs. Veuillez les corriger avant de soumettre le formulaire.',
      targetComponent: 'SignUp',
    }),
    initialFields: {
      email: {
        value: '',
        isRequired: true,
      },
      pseudo: {
        value: '',
        isRequired: true,
      },
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    formManager.trySubmit();
  };

  return (
    <div className="signup wave-double-bottom">
      <img className="signup__illustration" src={picture} alt="" />
      <div className="signup__content">
        <h1 className="title-h1 signup__content__title">Inscription</h1>

        <form action="" method="get" className="signup__content__form" onSubmit={handleSubmit}>
          <h1 className="title-h1 center">Inscription</h1>
          {
            messageParams.targetComponent === 'SignUp'
            && (
              <Message {...messageParams} />
            )
          }
          <TextField
            type="email"
            id="email"
            inputClassName="full"
            value={formManager.fields.email.value}
            label="Adresse e-mail (nom@domaine.fr)"
            name="email"
            changeValue={formManager.updateValue}
            isRequired
            errorMessage={formManager.fieldErrors.email}
            checkEmailFormat={formManager.checkEmailFormat}
            checkIsFilled={formManager.checkIsFilled}
          />
          <TextField
            type="text"
            id="pseudo"
            inputClassName="full"
            value={formManager.fields.pseudo.value}
            label="Pseudo"
            name="pseudo"
            changeValue={formManager.updateValue}
            isRequired
            errorMessage={formManager.fieldErrors.pseudo}
            checkIsFilled={formManager.checkIsFilled}
          />
          <TextField
            type="password"
            id="password"
            inputClassName="full"
            value={formManager.fields.password.value}
            label="Mot de passe"
            name="password"
            changeValue={formManager.updateValue}
            isRequired
            errorMessage={formManager.fieldErrors.password}
            checkLength={formManager.checkLength}
            requiredLength={6}
            checkIsFilled={formManager.checkIsFilled}
          />
          <TextField
            type="password"
            id="password_confirm"
            inputClassName="full"
            value={formManager.fields.passwordConfirm.value}
            label="Confirmez votre mot de passe"
            name="passwordConfirm"
            changeValue={formManager.updateValue}
            isRequired
            errorMessage={formManager.fieldErrors.passwordConfirm}
            checkPasswordConfirm={formManager.checkPasswordConfirm}
            valueToCompare={formManager.fields.password.value}
            checkIsFilled={formManager.checkIsFilled}
          />
          <div className="signup__content__form__group">
            <button
              className="button button--primary signup__content__form__group__submit"
              type="submit"
            >
              <span>S'enregistrer</span>
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
          </div>
        </form>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  trySignUp: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  messageParams: PropTypes.shape({
    targetComponent: PropTypes.string.isRequired,
  }).isRequired,
  displayMessage: PropTypes.func.isRequired,
};

SignUp.defaultProps = {
  loading: false,
};

export default SignUp;
