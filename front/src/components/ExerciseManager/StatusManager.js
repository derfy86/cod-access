import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';

import CircleLoader from 'src/components/CircleLoader';
import './styles.scss';

const StatusManager = ({
  exerciseId,
  isSaved,
  published,
  updateLoading,
  error,
  removeExercise,
  changeExerciseStatus,
  displayModalConfirm,
  setIsLeaving,
}) => {
  const history = useHistory();
  const handleDeleteExercise = () => {
    displayModalConfirm({
      heading: 'Suppression exercice',
      message: 'Souhaitez-vous réellement supprimer l\'exercice ?',
      confirmParams: {
        onConfirm: () => {
          setIsLeaving(true);
          setTimeout(() => removeExercise({
            exerciseId,
          }), 100);
          setTimeout(() => {
            history.push('/admin/exercices');
          }, 200);
        },
        label: 'Supprimer l\'exercice',
      },
      cancelParams: {
        onCancel: () => { },
        label: 'Annuler',
      },
      shouldDisplayHeading: true,
      isVisible: true,
    });
  };

  return (
    <div className="admin-exercise__status-controls grey">
      <h2 className="title-h2 admin-exercise__status-controls__heading">Statut</h2>
      <p className="admin-exercise__status-controls__visibility">
        <span className="admin-exercise__status-controls__visibility__label">Visibilité&nbsp;: </span>
        {
          published
            ? 'Publié'
            : 'Brouillon'
        }
      </p>
      <div className="admin-exercise__status-controls__status">
        {
          updateLoading && (
            <>
              <CircleLoader
                colour="#7ED8F7"
                radius={10}
                duration={2}
                strokeWidth={4}
              />
              <p className="admin-exercise__status-controls__status__message">Sauvegarde en cours</p>
            </>
          )
        }
        {
          isSaved && (
            <>
              <FontAwesomeIcon className="admin-exercise__status-controls__status__is-saved" role="presentation" icon={faCheck} size="2x" />
              <p className="admin-exercise__status-controls__status__message">Sauvegardé</p>
            </>
          )
        }
        {
          error && (
            <>
              <FontAwesomeIcon className="admin-exercise__status-controls__status__error" role="presentation" icon={faTimes} size="2x" />
              <p className="admin-exercise__status-controls__status__message">Erreur</p>
            </>
          )
        }
        {
          !isSaved
          && !error
          && !updateLoading
          && (
            <>
              <FontAwesomeIcon className="admin-exercise__status-controls__status__edit" role="presentation" icon={faPen} size="2x" />
              <p className="admin-exercise__status-controls__status__message">Edition en cours</p>
            </>
          )
        }
      </div>
      <button
        className="button button--primary"
        type="button"
        onClick={() => changeExerciseStatus({
          name: 'published',
          value: !published,
        })}
      >
        {
          published
            ? 'Dépublier l\'exercice'
            : 'Publier l\'exercice'
        }
      </button>
      <button
        className="admin-exercise__form__general-info__button admin-exercise__form__general-info__button--remove-exercise button button--delete"
        type="button"
        onClick={handleDeleteExercise}
      >
        Supprimer l'exercice
      </button>
    </div>
  );
};

StatusManager.propTypes = {
  exerciseId: PropTypes.number.isRequired,
  isSaved: PropTypes.bool.isRequired,
  published: PropTypes.bool.isRequired,
  updateLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  removeExercise: PropTypes.func.isRequired,
  changeExerciseStatus: PropTypes.func.isRequired,
  displayModalConfirm: PropTypes.func.isRequired,
  setIsLeaving: PropTypes.func.isRequired,
};

export default StatusManager;
