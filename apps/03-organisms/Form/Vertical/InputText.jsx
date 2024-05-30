import VerticalInput from "../../../02-molecules/Form/VerticalInput";
import Label from "../../../01-atoms/Forms/Label";
import Inputtext from "../../../01-atoms/Forms/Inputtext";
import InvalidMessage from "../../../01-atoms/Forms/InvalidMessage";

const InputText = ({props,onChanged}) =>{
  const message = props?.message ? props.message : ''
  return(
    <VerticalInput props={{ mb: props?.mb, mt: props?.mt}}>
      <Label props={{ text:props?.label, mb: props?.mb }}/>
      <Inputtext props={{ 
        readOnly: props?.readOnly, 
        addClass: props?.addClass, 
        placeholder: props?.placeholder, 
        row:props?.row , 
        solid: props?.solid,
        defaultValue:props?.defaultValue,
        inputSmall: props?.inputSmall
      }} onChanged={onChanged}/>
      {
        message != '' &&
        <InvalidMessage>{message}</InvalidMessage>
      }
    </VerticalInput>
  )
}
export default InputText;