import VerticalInput from "../../../02-molecules/Form/VerticalInput";
import Label from "../../../01-atoms/Forms/Label";
import InputTextare from "../../../01-atoms/Forms/Textarea";
import InvalidMessage from "../../../01-atoms/Forms/InvalidMessage";

const Textarea = ({ props, onChanged }) => {
  const message = props?.message ? props.message : "";
  const label = props?.label ? props.label : "";
  return (
    <VerticalInput props={{ mb: props.mb }}>
      {label != "" && <Label props={{ text: props?.label }} />}
      <InputTextare props={{ placeholder: props?.placeholder, row: props?.row, defaultValue: props?.defaultValue, addClass: props?.addClass, readOnly: props?.readOnly }} onChanged={onChanged} />
      {message != "" && <InvalidMessage>{message}</InvalidMessage>}
    </VerticalInput>
  );
};
export default Textarea;
