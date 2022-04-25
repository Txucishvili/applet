import { InputModel } from "."

const Radio = (props: InputModel) => {
  const {...inputProps} = props;
  return <div className="input input--radio input--radio--wrap">
    <input type="radio" {...inputProps} />
    <div className="_radio">
      <div className="icon">
      </div>
    </div>
  </div>
}

export default Radio