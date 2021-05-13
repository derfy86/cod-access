import { useState, useEffect } from 'react';

/*
* hook used to manage form state and validation
* PARAMETERS
* needs a config object with these arguments :
* - submitCallback: a function to execute when the user submits the form and there is no error.
* - cannotSubmitCallback: a function to execute when the user submits the form but the there are
* errors. [optional]
* - initialFields: object containing the initial state with each field stored into an object :
* {
*    fieldName: {
*     value: string,
*     isRequired: bool,
*   }
*   ...
* }
* RETURNS
* state (fields + fieldErrors)
* all methods to be used in form validation (checkIsFilled, checkLength, etc.)
*/

const useFormManager = ({ submitCallback, cannotSubmitCallback = () => { }, initialFields }) => {
  const [fields, setFields] = useState(initialFields);

  /* errors are stored in an object with their fieldName as key and the error message as value
  * example :
  * {
  *   email: 'This field is required',
  *   password: 'This field is required',
  * }
  */
  const [fieldErrors, setFieldErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Only does something if the user is submitting.
  * if submitting, checks whether or not the form contains error messages.
  *   if no error messages, calls the submitCallback passing the fieldValues as a parameter.
  *   if error messages, calls the cannotSubmitCallback.
  */
  useEffect(() => {
    if (!isSubmitting) {
      return null;
    }

    if (Object.keys(fieldErrors).length === 0) {
      const fieldValues = Object.fromEntries(
        Object.entries(fields).map(
          ([fieldName, field]) => [fieldName, field.value],
        ),
      );

      return submitCallback(fieldValues);
    }

    return cannotSubmitCallback();
  }, [fieldErrors, isSubmitting]);

  const checkIsFilled = ({ fieldName, valueToTest }) => {
    if (!valueToTest) {
      setFieldErrors({
        ...fieldErrors,
        [fieldName]: 'Ce champ est obligatoire. Veuillez renseigner une valeur.',
      });
    }
  };

  const checkEmailFormat = ({ fieldName, valueToTest }) => {
    const emailRegex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

    if (valueToTest && !emailRegex.test(valueToTest)) {
      setFieldErrors({
        ...fieldErrors,
        [fieldName]: 'Veuillez saisir un format d\'adresse e-mail valide. Exemple : capitaine@nautilus.fr',
      });
    }
  };

  const checkLength = ({ fieldName, valueToTest, requiredLength }) => {
    if (valueToTest.length < requiredLength) {
      setFieldErrors({
        ...fieldErrors,
        [fieldName]: `Ce champ doit comporter au moins ${requiredLength} caractère${requiredLength > 1 ? 's' : ''}.`,
      });
    }
  };

  const checkPasswordConfirm = ({ fieldName, passwordConfirm, password }) => {
    if (passwordConfirm !== password) {
      setFieldErrors({
        ...fieldErrors,
        [fieldName]: 'Vous avez saisi deux mots de passe différents.',
      });
    }
  };

  const updateValue = ({ fieldName, fieldValue }) => {
    // if user tried to submit, reset isSubmitting to false since they are now editing the form
    if (isSubmitting) {
      setIsSubmitting(false);
    }

    setFields({
      ...fields,
      [fieldName]: {
        ...fields[fieldName],
        value: fieldValue,
      },
    });

    // remove error messages related to the field being edited.
    if (fieldErrors[fieldName]) {
      const updatedFieldErrors = { ...fieldErrors };

      delete updatedFieldErrors[fieldName];

      setFieldErrors({
        ...updatedFieldErrors,
      });
    }
  };

  /* checks every required field to make sure they are filled.
  * If not, set the corresponding errors, meaning the form will not be submitted
  * and the "cannotSubmitCallback" will be called
  */
  const checkBeforeSubmit = () => {
    const errors = {};

    Object.entries(fields).forEach(([fieldName, field]) => {
      if (field.isRequired && !field.value) {
        errors[fieldName] = 'Ce champ est obligatoire. Veuillez renseigner une valeur.';
      }
    });

    // since setState is async, all errors must be set at once.
    setFieldErrors({
      ...fieldErrors,
      ...errors,
    });
  };

  /* called when the user submits the form (enter key or click on submit button) */
  const trySubmit = () => {
    checkBeforeSubmit();
    setIsSubmitting(true);
  };

  return {
    fields,
    fieldErrors,
    updateValue,
    trySubmit,
    checkIsFilled,
    checkEmailFormat,
    checkBeforeSubmit,
    checkLength,
    checkPasswordConfirm,
  };
};

export default useFormManager;
