import VerticalInput from "../../../02-molecules/Form/VerticalInput";
import Label from "../../../01-atoms/Forms/Label";
import Select2Option from "../../../01-atoms/Forms/Select2";
import InvalidMessage from "../../../01-atoms/Forms/InvalidMessage";

const Select2 = ({ props, onChanged }) => {
  const message = props?.message ? props.message : "";
  const label = props?.label ? props.label : "";
  return (
    <VerticalInput props={{ mb: props.mb }}>
      {label != "" && <Label props={{ text: props?.label }} />}
      <Select2Option props={props} onChanged={onChanged} />
      {message != "" && <InvalidMessage>{message}</InvalidMessage>}
    </VerticalInput>
  );
};
export default Select2;
