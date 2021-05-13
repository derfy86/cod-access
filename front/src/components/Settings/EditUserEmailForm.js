import React from 'react';
import PropTypes from 'prop-types';

import Message from 'src/containers/Message';
import TextField from 'src/components/TextField';
import useFormManager from 'src/hooks/useFormManager';
import './styles.scss';

const EditUserEmailForm = ({
  user, onSubmitEmail, displayMessage, messageParams,
}) => {
  const formManagerConfig = {
    submitCallback: onSubmitEmail,
    cannotSubmitCallback: () => displayMessage({
      type: 'error',
      message: 'Le formulaire E-mail contient des erreurs. Veuillez les corriger avant de soumettre le formulaire.',
      targetComponent: 'EditUserEmailForm',
    }),
    initialFields: {
      email: {
        value: user.email,
        isRequired: true,
      },
    },
  };

  const formManager = useFormManager(formManagerConfig);

  const handleSubmitEmail = (event) => {
    event.preventDefault();
    formManager.trySubmit();
  };

  return (
    <form
      className="settings__form"
      onSubmit={handleSubmitEmail}
    >
      {
        messageParams.targetComponent === 'EditUserEmailForm'
        && (
          <Message {...messageParams} />
        )
      }
      <TextField
        type="email"
        id="edit-user-email"
        label="Adresse e-mail (nom@domaine.fr)"
        name="email"
        inputClassName="full"
        placeholder="Saisissez une adresse e-mail"
        value={formManager.fields.email.value}
        changeValue={formManager.updateValue}
        isRequired
        errorMessage={formManager.fieldErrors.email}
        checkIsFilled={formManager.checkIsFilled}
        checkEmailFormat={formManager.checkEmailFormat}
      />
      <div>
        <button
          className="button button--primary"
          type="submit"
        >
          Modifier l'adresse e-mail
        </button>
      </div>
    </form>
  );
};

EditUserEmailForm.propTypes = {
  messageParams: PropTypes.object.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  onSubmitEmail: PropTypes.func.isRequired,
  displayMessage: PropTypes.func.isRequired,
};

export default EditUserEmailForm;
