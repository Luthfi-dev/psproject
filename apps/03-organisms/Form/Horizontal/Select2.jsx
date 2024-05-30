import HorizontalInput from "../../../02-molecules/Form/HorizontalInput";
import Label from "../../../01-atoms/Forms/Label";
import Select2Option from "../../../01-atoms/Forms/Select2";
import InvalidMessage from "../../../01-atoms/Forms/InvalidMessage";

const Select2 = ({ props, onChanged }) => {
  const message = props?.message ? props.message : ''
  const gridLabel = props?.labelCol? props.labelCol : '3';
  const gridInput = props?.inputCol ? props.inputCol : '9';
  return (
    <HorizontalInput props={{ mb: props?.mb, mt: props?.mt}}>
    <div className={'col-'+gridLabel}>
      <Label props={{ text:props?.label, horizontal:true }}/>
    </div>
    <div className={'col-'+gridInput}>
      <div id={props.id + '_loading'}>
      <Select2Option props={props} onChanged={onChanged} />
      {
        message != '' &&
        <InvalidMessage>{message}</InvalidMessage>
      }
      </div>
    </div>      
  </HorizontalInput>
  );
};
export default Select2;
