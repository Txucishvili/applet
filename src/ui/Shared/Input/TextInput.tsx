import classNames from "classnames";
import { InputModel } from "."

const Text = (props: InputModel) => {
  const {...inputProps} = props;
  return <div className={classNames('input input--' + props.type)}>
    <input type="text" {...inputProps} />
  </div>
}

export default Text