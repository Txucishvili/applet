import { InputModel } from "."

const Text = (props: InputModel) => {
  const {...inputProps} = props;
  return <div className="input input--text">
    <input type="text" {...inputProps} />
  </div>
}

export default Text