import classNames from 'classnames';
import React, { cloneElement, createElement } from 'react';
import {Checkbox, Radio, Text} from '../Input';

export interface InputModel extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  formik?: any;
}

const InputTypeSwitch = (props) => {
  switch (props.type) {
    case 'text':
      return Text(props);
      break;
    case 'radio':
      return Radio(props);
      break;
    case 'checkbox':
      return Checkbox(props);
      break;

    default:
      return Text(props);
      break;
  }
  return null;
}

const FormField = (props: InputModel) => {
  const { label,formik, ...inputFields } = props;

  const InputTarget = InputTypeSwitch(inputFields);
  const hasError = formik && formik.touched && formik.error;

  return (
    <div className="form--field--wrap">
      <label className={
        classNames(
          'form--field',
          `form--field--type-${inputFields.type}`,
          {'error': hasError}
        )
      }>
        {label
          ? <div className="form--field-label">
            <p>{label}</p>
          </div>
          : null}
        <div className="form--field-input">
          <InputTypeSwitch {...inputFields} />
          {/* <InputTypeSwitch {...inputFields} /> */}
        </div>
      </label>
      {
        formik && formik.touched && formik.error
          ? <div className="form--field--errors">
            {formik['error']}
          </div>
          : null
      }
    </div>
  )
}
export default FormField;
