import VerticalInput from "../../../02-molecules/Form/VerticalInput";
import Label from "../../../01-atoms/Forms/Label";
import InputDatepicker from "../../../02-molecules/Form/Datepicker";
import InvalidMessage from "../../../01-atoms/Forms/InvalidMessage";

const Datepicker = ({ props, onChanged }) => {
  const message = props?.message ? props.message : "";
  const label = props?.label ? props.label : "";
  return (
    <VerticalInput props={{ mb: props?.mb, mt: props?.mt }}>
      {label != "" && <Label props={{ text: props?.label, mb: 2 }} />}
      <InputDatepicker props={{ placeholder: props?.placeholder, defaultValue: props?.defaultValue, id: props.id, focus: props?.focus, disabled: props?.disabled, addClass: props?.addClass }} onChanged={onChanged} />
      {message != "" && <InvalidMessage>{message}</InvalidMessage>}
    </VerticalInput>
  );
};
export default Datepicker;
