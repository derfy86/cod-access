import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';

import Message from 'src/containers/Message';
import useFormManager from 'src/hooks/useFormManager';
import { returnFileSize } from 'src/utils';
import './styles.scss';

const EditUserImageForm = ({
  user, onSubmitFile, displayMessage, messageParams,
}) => {
  const formManagerConfig = {
    submitCallback: onSubmitFile,
    cannotSubmitCallback: () => displayMessage({
      type: 'error',
      message: 'Le formulaire Image contient des erreurs. Veuillez les corriger avant de soumettre le formulaire.',
      targetComponent: 'EditUserImageForm',
    }),
    initialFields: {
      selectedFile: {
        value: null,
        isRequired: true,
      },
    },
  };

  const formManager = useFormManager(formManagerConfig);

  const handleFileChange = (event) => {
    formManager.updateValue({
      fieldName: 'selectedFile',
      fieldValue: event.target.files[0],
      isRequired: true,
    });
  };

  const handleSubmitFile = (event) => {
    event.preventDefault();
    formManager.trySubmit();
  };

  useEffect(() => {
    formManager.updateValue({
      fieldName: 'selectedFile',
      fieldValue: null,
      isRequired: true,
    });
  }, [user]);

  return (
    <form
      className="settings__form__upload"
      onSubmit={handleSubmitFile}
    >
      <h2 className="form-label">Modifier la photo de profil</h2>
      {
        messageParams.targetComponent === 'EditUserImageForm'
        && (
          <Message {...messageParams} />
        )
      }
      <div className="flex">
        <label className="settings__form__upload__label" htmlFor="upload">
          Télécharger une image
            </label>
        <label className="title-h1 center-margin" htmlFor="upload">
          <FontAwesomeIcon icon={faCloudDownloadAlt} />
        </label>
      </div>
      <input
        className="settings__form__upload__input full"
        id="upload"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      <div className="settings__form__upload__preview">
        {
          formManager.fields.selectedFile.value === null
            ? (
              <p>Aucun fichier selectionné</p>
            )
            : (
              <>
                <p>Nom : {formManager.fields.selectedFile.value.name}</p>
                <p>Taille : {returnFileSize(formManager.fields.selectedFile.value.size)}</p>
                {
                  formManager.fields.selectedFile.value.type.substring(0, 5) === 'image'
                    ? (
                      <p>
                        Format : {formManager.fields.selectedFile.value.type},
                        {formManager.fields.selectedFile.value.type.substring(0, 5)}
                      </p>
                    )
                    : <p>Le document sélectionné n'est pas une image, veuillez réessayer.</p>
                }
                <img src={window.URL.createObjectURL(formManager.fields.selectedFile.value)} alt="" />

              </>
            )
        }
      </div>
      {
        formManager.fieldErrors.selectedFile && (
          <p className="message--warning">{formManager.fieldErrors.selectedFile}</p>
        )
      }
      <div>
        <button
          className="button button--primary"
          type="submit"
        >
          Valider la modification
        </button>
      </div>
    </form>
  );
};

EditUserImageForm.propTypes = {
  messageParams: PropTypes.object.isRequired,
  user: PropTypes.shape({
    picturePath: PropTypes.string.isRequired,
  }).isRequired,
  onSubmitFile: PropTypes.func.isRequired,
  displayMessage: PropTypes.func.isRequired,
};

export default EditUserImageForm;
