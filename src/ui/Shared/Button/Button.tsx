import classNames from "classnames";
import { ReactNode } from "react";
import "@sass/components/_button.scss";

interface ButtonBase extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant:
  'primary' |
  'light' |
  'dark' |
  'secondary' |
  'outline' |
  'success' |
  'warning' |
  'danger' |
  'info';
  _type?:
  'simple' |
  'outline';
  color?: string;
  text?: string;
  className?: string;
  size?: 'normal' | 'large' | 'small';
  wide?: boolean;
}


const Button: React.FC<ButtonBase> = (props: ButtonBase) => {
  const { _type = 'simple',size = 'normal', wide, variant, color, text, children, className, ...nativeAttrs } = props;

  const ChildC = children ?? text;

  const typedVariant = _type == 'outline' ? `_type--${_type}` : `type--${variant}`;

  return <div className="button--wrap">
    <button
      className={classNames({
        'btn btn--wrap': true,
        [`size--${size}`]: true,
        [`type--${variant}`]: true,
        [`_type--${_type}`]: true,
        [`wide`]: wide
      }, className)}
      {...nativeAttrs}
    >
      <div className="btn--text">{ChildC}</div>
    </button>
  </div>
}


export default Button