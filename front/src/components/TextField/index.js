import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';

/*
Generic component 
*/

const TextField = ({
  value,
  changeValue,
  id,
  label,
  type,
  autocomplete,
  inputClassName,
  groupClassName,
  labelClassName,
  name,
  errorMessage,
  isRequired,
  checkIsFilled,
  checkEmailFormat,
  checkLength,
  requiredLength,
  checkPasswordConfirm,
  valueToCompare,
}) => {
  const handleOnBlur = (valueToTest) => {
    checkIsFilled({
      fieldName: name,
      valueToTest,
    });
    if (valueToTest) {
      checkEmailFormat({
        fieldName: name,
        valueToTest,
      });
      checkLength({
        fieldName: name,
        valueToTest,
        requiredLength,
      });
      checkPasswordConfirm({
        fieldName: name,
        passwordConfirm: valueToTest,
        password: valueToCompare,
      });
    }
  };

  const handleOnChange = (newValue) => {
    changeValue({
      fieldName: name,
      fieldValue: newValue,
      isRequired,
    });
  };

  return (
    <div className={classNames(groupClassName)}>
      <label htmlFor={id} className={classNames('form-label', labelClassName)}>
        {label}
      </label>
      {
        type !== 'textarea'
          ? (
            <input
              id={id}
              className={classNames('form-input', inputClassName)}
              type={type}
              value={value}
              autoComplete={autocomplete}
              aria-required={isRequired}
              name={name}
              onChange={(evt) => handleOnChange(evt.target.value)}
              onBlur={(evt) => handleOnBlur(evt.target.value)}
            />
          )
          : (
            <textarea
              className={classNames('form-input', inputClassName)}
              id={id}
              value={value}
              autoComplete={autocomplete}
              aria-required={isRequired}
              name={name}
              onChange={(evt) => handleOnChange(evt.target.value)}
              onBlur={(evt) => handleOnBlur(evt.target.value)}
            />
          )
      }
      {
        errorMessage && (
          <p className="message--warning">{errorMessage}</p>
        )
      }
    </div>
  );
};

TextField.propTypes = {
  id: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  changeValue: Proptypes.func.isRequired,
  type: Proptypes.string,
  name: Proptypes.string.isRequired,
  autocomplete: Proptypes.string,
  groupClassName: Proptypes.string,
  isRequired: Proptypes.bool,
  inputClassName: Proptypes.string,
  labelClassName: Proptypes.string,
  checkIsFilled: Proptypes.func,
  checkEmailFormat: Proptypes.func,
  checkLength: Proptypes.func,
  requiredLength: Proptypes.number,
  checkPasswordConfirm: Proptypes.func,
  valueToCompare: Proptypes.string,
  errorMessage: Proptypes.string,
};

TextField.defaultProps = {
  type: 'text',
  autocomplete: 'off',
  groupClassName: '',
  inputClassName: '',
  labelClassName: '',
  isRequired: false,
  errorMessage: '',
  checkIsFilled: () => { },
  checkEmailFormat: () => { },
  checkLength: () => { },
  requiredLength: 0,
  checkPasswordConfirm: () => { },
  valueToCompare: '',
};

export default TextField;
