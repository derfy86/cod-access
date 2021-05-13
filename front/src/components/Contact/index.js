import React from 'react';
import Proptypes from 'prop-types';

import useFormManager from 'src/hooks/useFormManager';
import Message from 'src/containers/Message';
import CircleLoader from 'src/components/CircleLoader';
import TextField from 'src/components/TextField';

import picture from 'src/assets/img/contact-signup.svg';

import './styles.scss';

const Contact = ({
  trySendContactMessage,
  loading,
  messageParams,
  displayMessage,
}) => {
  const formManagerConfig = {
    submitCallback: trySendContactMessage,
    cannotSubmitCallback: () => displayMessage({
      type: 'error',
      message: 'Le formulaire contient des erreurs. Veuillez les corriger avant de soumettre le formulaire.',
      targetComponent: 'Contact',
    }),
    initialFields: {
      email: {
        value: '',
        isRequired: true,
      },
      name: {
        value: '',
        isRequired: true,
      },
      message: {
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
    <div className="contact wave-double-bottom">
      <img className="contact__illustration" src={picture} alt="" />
      <div className="contact__content">
        <h1 className="title-h1 center contact__content__title">Contactez-nous</h1>
        <form action="" method="get" className="contact__content__form" onSubmit={handleSubmit}>
          {
            messageParams.targetComponent === 'Contact'
            && (
              <Message {...messageParams} />
            )
          }
          <TextField
            type="text"
            id="name"
            inputClassName="full"
            value={formManager.fields.name.value}
            label="Nom / Prénom"
            name="name"
            changeValue={formManager.updateValue}
            isRequired
            errorMessage={formManager.fieldErrors.name}
            checkLength={formManager.checkLength}
            requiredLength={2}
            checkIsFilled={formManager.checkIsFilled}
          />
          <TextField
            type="email"
            id="emailContact"
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
            type="textarea"
            id="content"
            inputClassName="full"
            value={formManager.fields.message.value}
            label="Votre message (10 caractères minimum)"
            name="message"
            changeValue={formManager.updateValue}
            isRequired
            errorMessage={formManager.fieldErrors.message}
            checkLength={formManager.checkLength}
            requiredLength={10}
            checkIsFilled={formManager.checkIsFilled}
          />
          <div className="contact__content__form__group">
            <button
              className="button button--primary"
              type="submit"
              disabled={messageParams.targetComponent === 'Contact' && messageParams.type === 'confirm'}
            >
              <span>Envoyer le message</span>
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
          </div>
        </form>
      </div>
    </div>
  );
};

Contact.propTypes = {
  messageParams: Proptypes.shape({
    type: Proptypes.string.isRequired,
    targetComponent: Proptypes.string.isRequired,
  }).isRequired,
  trySendContactMessage: Proptypes.func.isRequired,
  loading: Proptypes.bool,
  displayMessage: Proptypes.func.isRequired,
};

Contact.defaultProps = {
  loading: false,
};

export default Contact;
