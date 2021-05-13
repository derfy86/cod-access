import React from 'react';
import PropTypes from 'prop-types';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import AnswerManager from 'src/containers/ExerciseManager/AnswerManager';
import Message from 'src/containers/Message';
import { returnFileSize } from 'src/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import TextField from './TextField';
import './styles.scss';

const QuestionManager = ({
  id,
  brief,
  code,
  explanation,
  selectedFile,
  imageAlternative,
  possibleAnswers,
  questionNumber,
  changeValue,
  removeQuestion,
  createAnswer,
  saveOnBlur,
  isSaved,
  sendImageFile,
  changeSelectedFile,
  imageId,
  imagePath,
  deleteImage,
  messageParams,
}) => {
  const handleImageChange = (evt) => {
    evt.preventDefault();
    changeSelectedFile(evt.target.files[0]);
  };

  const handleSaveImage = () => {
    if (selectedFile && !isSaved) {
      sendImageFile({
        questionId: id,
        file: selectedFile,
        alternative: imageAlternative,
      });
    }
  };

  const handleDeleteImage = () => {
    deleteImage({
      imageId,
      questionId: id,
    });
  };

  return (
    <article className="admin-exercise__form__question">
      <fieldset>
        <div className="admin-exercise__form__question__header">
          <legend className="title-h2__without-magin">
            <h2 className="admin-exercise__form__question__header__title title-h2">Question {questionNumber}</h2>
          </legend>
          <button type="button" onClick={removeQuestion} className="button button--delete">
            Supprimer
            <span className="sr-only">Question {questionNumber}</span>
          </button>
        </div>
        <div className="admin-exercise__form__question__general-info">
          <label className="form-label">Brief</label>
          <div className="admin-exercise__form__question__general-info__editor">
            <CKEditor
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
          {
            imagePath
              ? (
                <>
                  <div className="flex-space">
                    <p>Image actuelle :</p>
                    <button className="button button--delete" onClick={handleDeleteImage} type="button">Supprimer l'image</button>
                  </div>
                  <img className="preview" src={`${process.env.IMAGE}${imagePath}`} alt="" />
                </>
              )
              : (
                <>
                  <div className="flex large">
                    <label className="settings__form__upload__label" htmlFor={`exercise-q${questionNumber}-upload`}>
                      Télécharger une image
                    </label>
                    <label className="title-h1 center-margin" htmlFor={`exercise-q${questionNumber}-upload`}>
                      <FontAwesomeIcon icon={faCloudDownloadAlt} />
                    </label>
                  </div>
                  <input
                    className="admin-exercise__form__question__general-info__upload__input"
                    id={`exercise-q${questionNumber}-upload`}
                    type="file"
                    onChange={handleImageChange}
                    value=""
                    accept="image/*"
                  />

                  <div className="admin-exercise__form__question__general-info__upload__preview">
                    {
                      !selectedFile
                        ? (
                          <p>Aucun fichier selectionné</p>
                        )
                        : (
                          <>
                            <p>Nom : {selectedFile.name}</p>
                            <p>Taille : {returnFileSize(selectedFile.size)}</p>
                            {
                              selectedFile.type.substring(0, 5) === 'image'
                                ? <p>Format : {selectedFile.type}, {selectedFile.type.substring(0, 5)}</p>
                                : <p>Le document sélectionné n'est pas une image, veuillez réessayer.</p>
                            }
                            <img src={window.URL.createObjectURL(selectedFile)} alt="" />
                            <TextField
                              className="admin-exercise__form__question__general-info__field-group"
                              id={`exercise-q${questionNumber}-alternative`}
                              label="Alternative de l'image (attribut alt)"
                              type="text"
                              autocomplete="off"
                              name="imageAlternative"
                              value={imageAlternative}
                              changeValue={changeValue}
                            />
                          </>
                        )
                    }
                  </div>
                  <div className="large">
                    <button className="button button--secondary" type="button" onClick={handleSaveImage}>Sauvegarder l'image</button>
                  </div>
                </>
              )
          }
          {
            messageParams.targetComponent === `QuestionManager-q${id}`
            && (
              <div className="large">
                <Message {...messageParams} />
              </div>
            )
          }
          <TextField
            className="code"
            id={`exercise-q${questionNumber}-code`}
            label="Code"
            type="textarea"
            autocomplete="off"
            name="code"
            value={code}
            changeValue={changeValue}
            isSaved={isSaved}
            saveOnBlur={saveOnBlur}
          />
        </div>

        <fieldset className="admin-exercise__form__question__answers">
          <legend>
            <h2 className="admin-exercise__form__question__answers__heading title-h2">
              <span className="sr-only">Question {questionNumber} -</span> Réponses possibles
            </h2>
          </legend>
          {
            possibleAnswers.map((answer, index) => (
              <AnswerManager
                questionId={id}
                id={answer.id}
                questionNumber={questionNumber}
                answerNumber={index + 1}
                key={answer.id}
              />
            ))
          }

          <button
            className="admin-exercise__form__question__answers__btn-add button--primary"
            type="button"
            onClick={createAnswer}
          >
            Ajouter une réponse
          </button>
          {
            possibleAnswers.length > 0 && (
              <div className="admin-exercise__form__question__answers__correction">
                <label className="title-h3">Explication de la correction</label>
                <div className="admin-exercise__form__question__answers__correction__editor">
                  <CKEditor
                    editor={ClassicEditor}
                    data={explanation}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      changeValue({
                        value: data,
                        name: 'explanation',
                      });
                    }}
                    onBlur={() => {
                      if (!isSaved) {
                        saveOnBlur({
                          name: 'explanation',
                          value: explanation,
                        });
                      }
                    }}
                  />
                </div>
              </div>
            )
          }
        </fieldset>
      </fieldset>
    </article>
  );
};

QuestionManager.propTypes = {
  id: PropTypes.number.isRequired,
  brief: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
  possibleAnswers: PropTypes.array.isRequired,
  questionNumber: PropTypes.number.isRequired,
  changeValue: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired,
  createAnswer: PropTypes.func.isRequired,
  saveOnBlur: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
  messageParams: PropTypes.shape({
    targetComponent: PropTypes.string.isRequired,
  }).isRequired,
  selectedFile: PropTypes.object,
  imageAlternative: PropTypes.string,
  sendImageFile: PropTypes.func.isRequired,
  changeSelectedFile: PropTypes.func.isRequired,
  imageId: PropTypes.number,
  imagePath: PropTypes.string,
  deleteImage: PropTypes.func.isRequired,
};

QuestionManager.defaultProps = {
  imageAlternative: '',
  imageId: null,
  imagePath: '',
  selectedFile: null,
};

export default QuestionManager;
