import React from 'react';
import PropTypes from 'prop-types';

import Message from 'src/containers/Message';
import TextField from 'src/components/TextField';
import useFormManager from 'src/hooks/useFormManager';
import './styles.scss';

const EditUserPseudoForm = ({
  user, onSubmitPseudo, displayMessage, messageParams,
}) => {
  const formManagerConfig = {
    submitCallback: onSubmitPseudo,
    cannotSubmitCallback: () => displayMessage({
      type: 'error',
      message: 'Le formulaire Pseudo contient des erreurs. Veuillez les corriger avant de soumettre le formulaire.',
      targetComponent: 'EditUserPseudoForm',
    }),
    initialFields: {
      pseudo: {
        value: user.pseudo,
        isRequired: true,
      },
    },
  };

  const formManager = useFormManager(formManagerConfig);

  const handleSubmitPseudo = (event) => {
    event.preventDefault();
    formManager.trySubmit();
  };

  return (
    <form
      className="settings__form"
      onSubmit={handleSubmitPseudo}
    >
      {
        messageParams.targetComponent === 'EditUserPseudoForm'
        && (
          <Message {...messageParams} />
        )
      }
      <TextField
        type="text"
        id="edit-user-pseudo"
        isRequired
        label="Pseudo"
        name="pseudo"
        inputClassName="full"
        placeholder="Saisissez un pseudo"
        value={formManager.fields.pseudo.value}
        errorMessage={formManager.fieldErrors.pseudo}
        changeValue={formManager.updateValue}
        checkIsFilled={formManager.checkIsFilled}
      />
      <div className="">
        <button
          className="button button--primary"
          type="submit"
        >
          Modifier le pseudo
        </button>
      </div>
    </form>
  );
};

EditUserPseudoForm.propTypes = {
  messageParams: PropTypes.object.isRequired,
  user: PropTypes.shape({
    pseudo: PropTypes.string.isRequired,
  }).isRequired,
  onSubmitPseudo: PropTypes.func.isRequired,
  displayMessage: PropTypes.func.isRequired,
};

export default EditUserPseudoForm;
