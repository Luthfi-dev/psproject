import HorizontalInput from "../../../02-molecules/Form/HorizontalInput";
import Label from "../../../01-atoms/Forms/Label";
import AtomInputtext from "../../../01-atoms/Forms/Inputtext";
import InvalidMessage from "../../../01-atoms/Forms/InvalidMessage";

const Inputtext = ({props,onChanged}) =>{
  const message = props?.message ? props.message : ''
  const gridLabel = props?.labelCol? props.labelCol : '3';
  const gridInput = props?.inputCol ? props.inputCol : '9';
  const readOnly = props?.readOnly ? props.readOnly:false;
  return(
    <HorizontalInput props={{ mb: props?.mb, mt: props?.mt}}>
      <div className={'col-'+gridLabel}>
        <Label props={{ text:props?.label, horizontal:true }}/>
      </div>
      <div className={'col-'+gridInput}>
        <AtomInputtext props={{ placeholder: props?.placeholder, defaultValue:props?.defaultValue, readOnly:readOnly, addClass: props?.addClass}} onChanged={onChanged}/>
        {
          message != '' &&
          <InvalidMessage>{message}</InvalidMessage>
        }
      </div>      
    </HorizontalInput>
  )
}
export default Inputtext;