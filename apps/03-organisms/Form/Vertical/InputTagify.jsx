import VerticalInput from "../../../02-molecules/Form/VerticalInput";
import Label from "../../../01-atoms/Forms/Label";
import MoleculInputTagifay from "../../../02-molecules/Form/InputTagify";
import InvalidMessage from "../../../01-atoms/Forms/InvalidMessage";

const InputTagify = ({props,onChanged}) =>{
  const message = props?.message ? props.message : ''
  return(
    <VerticalInput>
      <Label props={{ text:props?.label }}/>
      <MoleculInputTagifay props={props} onChanged={onChanged}/>
      {
        message != '' &&
        <InvalidMessage>{message}</InvalidMessage>
      }
    </VerticalInput>
  )
}
export default InputTagify;