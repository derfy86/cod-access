import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import DOMPurify from 'dompurify';

import sailorImgPath from 'src/assets/img/sailor.svg';
import Message from 'src/containers/Message';
import Question from 'src/containers/Exercise/Question';
import CircleLoader from 'src/components/CircleLoader';
import './styles.scss';

const Exercise = ({
  title,
  brief,
  questions,
  loading,
  currentQuestionIndex,
  getExercise,
  changeQuestion,
  submitAnswers,
  resetCurrentExercise,
  messageParams,
  closeMessage,
  isCorrected,
  resultsLoading,
}) => {
  useEffect(() => {
    getExercise();
    return () => {
      resetCurrentExercise();
      closeMessage();
    };
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <CircleLoader
          colour="#7ED8F7"
          radius={100}
          duration={2}
          strokeWidth={20}
        />
      </div>
    );
  }

  return (
    <div className="exercise-wrapper wave-double-bottom">
      <section className="exercise-section">
        <h1 className="title-h1">{title}</h1>
        <Link to="/challenges" className="exercise-section__quit">
          Quitter
          <FontAwesomeIcon className="exercise-section__quit__icon" role="presentation" icon={faSignOutAlt} size="1x" />
        </Link>
        {
          currentQuestionIndex === 0 && (
            messageParams.targetComponent === 'Exercise'
              ? (
                <Message {...messageParams} />
              )
              : (
                <div className="exercise-section__brief">
                  <img src={sailorImgPath} alt="" />
                  <article
                    className="exercise-section__brief__text rte-output"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(brief),
                    }}
                  />
                </div>
              )
          )
        }
        <section className="exercise-section__questions">
          {
            questions.map((question, index) => (
              <Question
                {...question}
                questionIndex={index}
                key={question.id}
              />
            ))
          }
        </section>
        <nav role="navigation" className="exercise-section__navigation" aria-label="questions">
          {
            currentQuestionIndex > 0 && (
              <button
                className="button button--secondary"
                type="button"
                onClick={() => changeQuestion(currentQuestionIndex - 1)}
                disabled={resultsLoading}
              >
                Question précédente
              </button>
            )
          }
          {// move these tests to container later
            currentQuestionIndex < questions.length - 1
            && (
              <button
                title={
                  !questions[currentQuestionIndex].userAnswers.length
                    ? 'Veuillez renseigner une réponse'
                    : ''
                }
                disabled={!questions[currentQuestionIndex].userAnswers.length}
                className="exercise-section__navigation__submit button button--primary"
                type="button"
                onClick={
                  () => changeQuestion(currentQuestionIndex + 1)
                }
              >
                Question suivante
              </button>
            )
          }
          {
            !isCorrected
            && (currentQuestionIndex === questions.length - 1) && (
              <button
                title={
                  !questions[currentQuestionIndex].userAnswers.length
                    ? 'Veuillez renseigner une réponse'
                    : ''
                }
                className="button button--primary"
                type="button"
                disabled={!questions[currentQuestionIndex].userAnswers.length || resultsLoading}
                onClick={submitAnswers}
              >
                {
                  resultsLoading
                    ? (
                      <>
                        Calcul du score en cours
                        <CircleLoader
                          colour="#7ED8F7"
                          radius={8}
                          duration={2}
                          strokeWidth={3}
                        />
                      </>
                    )
                    : 'Valider mes réponses'
                }
              </button>
            )
          }
          {
            isCorrected
            && (currentQuestionIndex === questions.length - 1) && (
              <Link to="/challenges" className="button button--primary">
                Retourner à la liste des challenges
              </Link>
            )
          }
        </nav>
      </section>
    </div>
  );
};

Exercise.propTypes = {
  title: PropTypes.string.isRequired,
  brief: PropTypes.string,
  questions: PropTypes.array,
  loading: PropTypes.bool,
  currentQuestionIndex: PropTypes.number,
  getExercise: PropTypes.func.isRequired,
  changeQuestion: PropTypes.func.isRequired,
  submitAnswers: PropTypes.func.isRequired,
  resetCurrentExercise: PropTypes.func.isRequired,
  messageParams: PropTypes.shape({
    targetComponent: PropTypes.string.isRequired,
  }).isRequired,
  closeMessage: PropTypes.func.isRequired,
  isCorrected: PropTypes.bool.isRequired,
  resultsLoading: PropTypes.bool.isRequired,
};

Exercise.defaultProps = {
  brief: '',
  questions: [],
  loading: true,
  currentQuestionIndex: 0,
};

export default Exercise;
