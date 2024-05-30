import HorizontalInput from "../../../02-molecules/Form/HorizontalInput";
import Label from "../../../01-atoms/Forms/Label";
import InputTextare from "../../../01-atoms/Forms/Textarea";
import InvalidMessage from "../../../01-atoms/Forms/InvalidMessage";

const Textarea = ({props,onChanged}) =>{
  const message = props?.message ? props.message : ''
  const gridLabel = props?.labelCol? props.labelCol : '3';
  const gridInput = props?.inputCol ? props.inputCol : '9';
  const readOnly = props?.readOnly ? props.readOnly:false;
  return(
    <HorizontalInput props={{mb: props?.mb}}>
      <div className={'col-'+gridLabel}>
        <Label props={{ text:props?.label, horizontal:true }}/>
      </div>
      <div className={'col-'+gridInput}>
        <InputTextare props={{ addClass: props?.addClass, placeholder: props?.placeholder, row:props?.row , defaultValue:props?.defaultValue, readOnly:readOnly, autoSize: true}} onChanged={onChanged}/>
        {
          message != '' &&
          <InvalidMessage>{message}</InvalidMessage>
        }
      </div>      
    </HorizontalInput>
  )
}
export default Textarea;