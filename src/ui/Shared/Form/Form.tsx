import React from 'react';
import { getChildrenByTypeDeep } from 'react-nanny';
import FormField from './FormField';

export interface FormBoxModel extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: () => any;
  name: string;
}

export default function FormBox(props: FormBoxModel) {
  const {name, children, ...formAttrs} = props;
  // const formFields: any = getChildrenByTypeDeep(children, [FormField]);

  // console.log("[FormBox formFields]", formFields)
  
  // formFields.forEach((field) => {
  //   console.log(field)
  //   // field.props['formikx'] = 'formik';
  // })
  
  return (
    <div id={name} className='form form--wrap'>
      <form {...formAttrs} className='form--body' action="">
        {children}
      </form>
    </div>
  )
}
