import React from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from './TextField';
import Checkbox from './Checkbox';
import './styles.scss';

const AnswerManager = ({
  content,
  correct,
  questionNumber,
  answerNumber,
  changeValue,
  removeAnswer,
  saveOnBlur,
  isSaved,
}) => (
  <div className="admin-exercise__form__question__answers__answer">
    <fieldset>
      <div className="admin-exercise__form__question__answers__answer__header">
        <legend  className="title-h2__without-magin">
          <h2 className="admin-exercise__form__question__header__title title-h3"> Réponse {answerNumber}</h2>
        </legend>
        <button type="button" className="button button--delete" onClick={removeAnswer}>
          Supprimer
            <span className="sr-only">Question {questionNumber}</span>
        </button>
      </div>
      <TextField
        className="admin-exercise__form__question__general-info__field-group"
        id={`exercise-q${questionNumber}-r${answerNumber}-content`}
        label="Contenu"
        type="text"
        autocomplete="off"
        name="content"
        value={content}
        changeValue={changeValue}
        isSaved={isSaved}
        saveOnBlur={saveOnBlur}
      />

      <Checkbox
        className="admin-exercise__form__question__general-info__field-group"
        id={`exercise-q${questionNumber}-r${answerNumber}-correct`}
        label="Bonne réponse"
        type="checkbox"
        name="correct"
        value={correct}
        saveCheckboxChange={saveOnBlur}
        updateState={changeValue}
      />
    </fieldset>
  </div>
);

AnswerManager.propTypes = {
  content: PropTypes.string.isRequired,
  correct: PropTypes.bool.isRequired,
  questionNumber: PropTypes.number.isRequired,
  answerNumber: PropTypes.number.isRequired,
  changeValue: PropTypes.func.isRequired,
  removeAnswer: PropTypes.func.isRequired,
  saveOnBlur: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
};

export default AnswerManager;
