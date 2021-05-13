import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NavigationPrompt from 'react-router-navigation-prompt';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import StatusManager from 'src/containers/ExerciseManager/StatusManager';
import QuestionManager from 'src/containers/ExerciseManager/QuestionManager';
import ThemeManager from 'src/containers/ExerciseManager/ThemeManager';
import TextField from './TextField';
import Modal from './Modal';
import CircleLoader from '../CircleLoader';
import './styles.scss';

const ExerciseManager = ({
  loading,
  changeValue,
  title,
  brief,
  questions,
  createQuestion,
  published,
  saveOnBlur,
  isSaved,
  createExercise,
  removeExercise,
  getExercise,
  createNew,
  resetManagerStates,
  isLeaving,
}) => {
  useEffect(() => {
    if (createNew) {
      createExercise();
    }
    else {
      getExercise();
    }
    return () => {
      resetManagerStates();
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-centered">
        <CircleLoader
          colour="#7ED8F7"
          radius={100}
          duration={2}
          strokeWidth={20}
        />
        <p className="loading-text-big">Création d'un brouillon d'exercice en cours</p>
      </div>
    );
  }

  return (
    <section className="admin-exercise">
      <NavigationPrompt when={!published && !isLeaving}>
        {({ onConfirm }, onCancel) => (
          <Modal
            onConfirm={onConfirm}
            onCancel={onCancel}
            removeExercise={removeExercise}
          />
        )}
      </NavigationPrompt>
      <h1 className="title-h1">Créer un exercice</h1>
      <StatusManager />
      <form className="admin-exercise__form grey">
        <section>
          <article className="admin-exercise__form__general-info">
            <TextField
              className="admin-exercise__form__general-info__field-group"
              id="exercise-title"
              label="Titre"
              type="text"
              autocomplete="off"
              name="title"
              value={title}
              changeValue={changeValue}
              isSaved={isSaved}
              saveOnBlur={saveOnBlur}
            />
            <label className="form-label">Intro</label>
            <div className="admin-exercise__form__general-info__editor">
              <CKEditor
                className="form-input textarea"
                editor={ClassicEditor}
                data={brief}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  changeValue({
                    value: data,
                    name: 'brief',
                  });
                }}
                onBlur={() => {
                  if (!isSaved) {
                    saveOnBlur({
                      name: 'brief',
                      value: brief,
                    });
                  }
                }}
              />
            </div>
            <ThemeManager />
          </article>

          {
            questions.map((question, index) => (
              <QuestionManager id={question.id} questionNumber={index + 1} key={question.id} />
            ))
          }

          <button
            className="admin-exercise__form__btn-add button button--primary"
            type="button"
            onClick={createQuestion}
          >
            Ajouter une question
          </button>

        </section>
      </form>
    </section>
  );
};

ExerciseManager.propTypes = {
  loading: PropTypes.bool.isRequired,
  changeValue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  brief: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  createQuestion: PropTypes.func.isRequired,
  published: PropTypes.bool.isRequired,
  saveOnBlur: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
  createExercise: PropTypes.func.isRequired,
  removeExercise: PropTypes.func.isRequired,
  createNew: PropTypes.bool,
  getExercise: PropTypes.func.isRequired,
  resetManagerStates: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool,
};

ExerciseManager.defaultProps = {
  createNew: false,
  isLeaving: false,
};

export default ExerciseManager;
