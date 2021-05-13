import React from 'react';
import PropTypes from 'prop-types';

import Message from 'src/containers/Message';
import TextField from 'src/components/TextField';
import useFormManager from 'src/hooks/useFormManager';
import './styles.scss';

const EditUserPasswordForm = ({
  onSubmitPassword, displayMessage, messageParams,
}) => {
  const formManagerConfig = {
    submitCallback: onSubmitPassword,
    cannotSubmitCallback: () => displayMessage({
      type: 'error',
      message: 'Le formulaire Mot de passe contient des erreurs. Veuillez les corriger avant de soumettre le formulaire.',
      targetComponent: 'EditUserPasswordForm',
    }),
    initialFields: {
      currentPassword: {
        value: '',
        isRequired: true,
      },
      newPassword: {
        value: '',
        isRequired: true,
      },
      newPasswordConfirm: {
        value: '',
        isRequired: true,
      },
    },
  };

  const formManager = useFormManager(formManagerConfig);

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    formManager.trySubmit();
  };

  return (
    <form
      className="settings__form"
      onSubmit={handleSubmitPassword}
    >
      {
        messageParams.targetComponent === 'EditUserPasswordForm'
        && (
          <Message {...messageParams} />
        )
      }
      <TextField
        type="password"
        id="currentPassword"
        label="Mot de passe actuel"
        name="currentPassword"
        inputClassName="full"
        isRequired
        errorMessage={formManager.fieldErrors.currentPassword}
        value={formManager.fields.currentPassword.value}
        changeValue={formManager.updateValue}
        checkIsFilled={formManager.checkIsFilled}
      />
      <TextField
        type="password"
        id="edit-user-new-password"
        label="Nouveau mot de passe"
        name="newPassword"
        inputClassName="full"
        isRequired
        errorMessage={formManager.fieldErrors.newPassword}
        value={formManager.fields.newPassword.value}
        changeValue={formManager.updateValue}
        checkLength={formManager.checkLength}
        requiredLength={6}
        checkIsFilled={formManager.checkIsFilled}
      />
      <TextField
        type="password"
        id="edit-user-passwordConfirm"
        label="Confirmez votre nouveau mot de passe"
        name="newPasswordConfirm"
        inputClassName="full"
        isRequired
        value={formManager.fields.newPasswordConfirm.value}
        changeValue={formManager.updateValue}
        errorMessage={formManager.fieldErrors.newPasswordConfirm}
        checkPasswordConfirm={formManager.checkPasswordConfirm}
        valueToCompare={formManager.fields.newPassword.value}
        checkIsFilled={formManager.checkIsFilled}
      />
      <div className="">
        <button
          className="button button--primary"
          type="submit"
        >
          Modifier le mot de passe
        </button>
      </div>
    </form>
  );
};

EditUserPasswordForm.propTypes = {
  messageParams: PropTypes.object.isRequired,
  onSubmitPassword: PropTypes.func.isRequired,
  displayMessage: PropTypes.func.isRequired,
};

export default EditUserPasswordForm;
