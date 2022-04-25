import Box from './Form';
import FormField, { InputModel } from './FormField';
import '@sass/components/_form.scss';


interface FormModel {
  Box: any,
  Field: React.FunctionComponent<InputModel>
}

const Form: FormModel = {
  Box: Box,
  Field: FormField
};

export default Form