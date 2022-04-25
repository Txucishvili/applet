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
      break;
  }
  return null;
}

const FormField = (props: InputModel) => {
  const { label, ...inputFields } = props;

  const InputTarget = InputTypeSwitch(inputFields);

  return (
    <div className="form--field--wrap">
      <label className={
        classNames(
          'form--field',
          `form--field--type-${inputFields.type}`,

        )
      }>
        {label
          ? <div className="form--field-label">
            {label}
          </div>
          : null}
        <div className="form--field-input">
          <InputTypeSwitch {...inputFields} />
          {/* <InputTypeSwitch {...inputFields} /> */}
        </div>
      </label>
      {
        props.formik && props.formik.touched && props.formik.error
          ? <div className="form--field--errors">
            {props.formik['error']}
          </div>
          : null
      }
    </div>
  )
}
export default FormField;
