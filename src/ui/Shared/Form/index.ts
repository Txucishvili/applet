import Box from './Form';
import FormField, { InputModel } from './FormField';
import '@sass/components/_form.scss';


interface FormModel {
  Box: React.FunctionComponent<any>,
  Field: React.FunctionComponent<InputModel>
}

const Form: FormModel = {
  Box: Box,
  Field: FormField
};

export { Box, FormField };
export type { FormModel };

export default Form