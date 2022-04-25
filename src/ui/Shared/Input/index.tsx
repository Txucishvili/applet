import Text from './TextInput';
import Radio from './Radio';
import Checkbox from './Checkbox';

import '@sass/components/_input.scss';

export interface InputModel extends React.InputHTMLAttributes<HTMLInputElement> {}

export {Text, Radio, Checkbox}