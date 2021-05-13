import {
  FETCH_THEMES_EXERCISES,
  FETCH_EXERCISE,
  SEND_ANSWERS,
  setThemesExercises,
  setExercisesPageLoading,
  setAllThemesFilterCheckbox,
  setAllThemesIdToDisplay,
  setCurrentExercise,
  setResults,
  setExerciseResultsLoading,
} from 'src/actions/exercises';
import { setMessage } from 'src/actions/other';
import axiosInstance from 'src/api';

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_THEMES_EXERCISES:
      try {
        store.dispatch(setExercisesPageLoading(true));
        const response = await axiosInstance.get('/themes_exercises');
        if (response.status !== 200) {
          throw new Error();
        }
        const ThemesFilterCheckbox = response.data.map((themeWithExercices) => (
          {
            id: themeWithExercices.id,
            name: themeWithExercices.name,
            color: themeWithExercices.color,
            checked: false,
          }));

        const themesIdToDisplay = response.data.map(
          (themeWithExercices) => (themeWithExercices.id),
        );

        store.dispatch(setAllThemesIdToDisplay(themesIdToDisplay));
        store.dispatch(setAllThemesFilterCheckbox(ThemesFilterCheckbox));
        store.dispatch(setThemesExercises(response.data));
      }
      catch (err) {
        console.log('error', err);
      }
      finally {
        store.dispatch(setExercisesPageLoading(false));
      }
      return next(action);
    case FETCH_EXERCISE:
      try {
        const { status, data } = await axiosInstance.get(`/exercises/dragndrop/${action.exerciseId}`); // sanitize ?

        if (status !== 200) {
          throw new Error();
        }

        const questions = data.questions.map((question) => ({
          id: question.id,
          brief: question.brief,
          slicedCode: question.code.split(/(?:\[\[|\]\])+/),
          possibleAnswers: question.possible_answers,
          userAnswers: [],
          picture: question.question_picture
            ? {
              path: question.question_picture.path,
              alternative: question.question_picture.alternative,
            }
            : null,
        }));

        const currentExercise = {
          loading: false,
          id: data.id,
          title: data.title,
          brief: data.brief,
          themes: data.themes,
          questions,
        };

        store.dispatch(setCurrentExercise(currentExercise));
      }
      catch (err) {
        console.log('error', err);
      }
      finally {
        store.dispatch(setExercisesPageLoading(false));
      }
      return next(action);
    case SEND_ANSWERS:
      try {
        store.dispatch(setExerciseResultsLoading(true));
        const {
          exercises: {
            currentExercise,
          },
        } = store.getState();

        const userAnswers = currentExercise.questions.map((question) => ({
          questionId: question.id,
          answers: question.userAnswers,
        }));

        const { status, data } = await axiosInstance.post(`/exercises/dragndrop/${currentExercise.id}`, userAnswers);

        if (status !== 200) {
          throw new Error();
        }

        let resultMessage = '';
        if (data.scoreResult === 100) {
          resultMessage = `Bravo, tu as réussi à totalement réparer l'interface. Tu peux consulter le détail et les explications de la correction en passant sur chaque question comme tu l'as fait auparavant.
          Dès que tu tu seras prêt, retourne sur la liste des réparations à effectuer car il te reste du pain sur la planche et je suis impatient de pouvoir à nouveau sillonner les mers !`;
        }
        else if (data.scoreResult === 0) {
          resultMessage = `Eh bien moussaillon, je te remercie pour ton aide mais rien ne fonctionne. Je te conseille de réviser le sujet et de regarder attentivement la correction.
          Dès que tu tu seras prêt, retourne sur la liste des réparations à effectuer car il te reste du pain sur la planche et je suis impatient de pouvoir à nouveau sillonner les mers !`;
        }
        else if (data.scoreResult >= 50) {
          resultMessage = `Pas mal moussaillon. Il y a encore du boulot mais tu as réparé ${data.scoreResult}% de l'interface.  Tu peux consulter le détail et les explications de la correction en passant sur chaque question comme tu l'as fait auparavant.
          Dès que tu tu seras prêt, retourne sur la liste des réparations à effectuer car il te reste du pain sur la planche et je suis impatient de pouvoir à nouveau sillonner les mers !`;
        }
        else if (data.scoreResult < 50 && data.scoreResult !== null) {
          resultMessage = `Merci pour ton aide moussaillon. Il semble que l'interface soit réparée à ${data.scoreResult}% mais il y a des éléments que tu sembles avoir raté.
          Tu peux consulter le détail et les explications de la correction en passant sur chaque question comme tu l'as fait auparavant.
          Dès que tu tu seras prêt, retourne sur la liste des réparations à effectuer car il te reste du pain sur la planche et je suis impatient de pouvoir à nouveau sillonner les mers !`;
        }

        store.dispatch(setResults({
          corrections: data.correction,
          userScore: data.scoreResult,
        }));

        store.dispatch(setMessage({
          type: data.scoreResult >= 50 ? 'confirm' : 'error',
          message: resultMessage,
          targetComponent: 'Exercise',
        }));
      }
      catch (err) {
        console.log(err);
      }
      finally {
        store.dispatch(setExerciseResultsLoading(false));
      }
      return next(action);
    default:
      return next(action);
  }
};
