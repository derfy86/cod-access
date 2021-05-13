import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

const Message = ({
  type, message, closeMessage, canBeClosed,
}) => {
  const messageContainer = useRef('');
  let classname = '';
  switch (type) {
    case 'confirm':
      classname = 'confirm';
      break;
    case 'error':
      classname = 'error';
      break;
    default:
      classname = 'neutral';
  }

  useEffect(() => {
    messageContainer.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div role="alert" className={`message-box ${classname}`} ref={messageContainer}>
      <p className={`message-box__content ${classname}__content`}>{message}</p>
      {
        canBeClosed && (
          <button className={`message-box__cross ${classname}__cross`} type="button" onClick={closeMessage}>
            <FontAwesomeIcon icon={faTimes} size="1x" aria-hidden="true" focusable="false" role="presentation" />
            <span className="sr-only">Fermer le message</span>
          </button>
        )
      }
    </div>
  );
};

Message.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  closeMessage: PropTypes.func.isRequired,
  canBeClosed: PropTypes.bool,
};

Message.defaultProps = {
  canBeClosed: true,
};

export default Message;
