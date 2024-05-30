import { useEffect, useState } from "react";

const Select2 = ({ children, props, onChanged }) => {
  const allowClear = props?.allowClear ? props.allowClear : "false";
  const hideSearch = props?.hideSearch ? props.hideSearch : "false";
  const placeholder = props?.placeholder ? props.placeholder : "Select a option";
  const multiple = props?.multiple === "true" ? "multiple" : "";
  const options = props?.options ? props.options : [];
  const [defaultValue, setDefaultValue] = useState(props?.defaultValue ? props.defaultValue : "");
  const uniqeID = props?.id ? props.id : "my_select_2";
  const disabled = props?.disabled === true ? true : false;
  const inputSize = props?.inputSmall === true ? 'form-select-sm':''
  const inputSizeLarge = props?.inputLarge === true ? 'form-select-lg':''

  useEffect(() => {
    if (options.length > 0) {
      $("#" + uniqeID).trigger("change");
    }
  }, [props?.options]);

  useEffect(() => {
    $("#" + uniqeID)
      .val(props?.defaultValue)
      .trigger("change");
  }, [props]);

  useEffect(() => {
    initializeSelect2();
  }, []);

  const initializeSelect2 = () => {
    $("#" + uniqeID).select2({ width: "resolve" });
    $("#" + uniqeID).on("select2:select", function (e) {
      onChanged(e.params.data.id);
      $("#" + uniqeID)
        .val(e.params.data.id)
        .trigger("change");
    });
  };

  return (
    <select
      className={"form-select " + inputSize + inputSizeLarge + " form-select-solid " + props?.addClass}
      id={uniqeID}
      data-control="select2"
      data-placeholder={placeholder}
      data-allow-clear={allowClear}
      data-hide-search={hideSearch}
      value={defaultValue}
      onChange={(e) => {}}
      disabled={disabled}
      multiple={multiple}
    >
      <option></option>
      {options.map((option, index) => {
        return (
          <option value={option.id} key={"opt_select" + index}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
};
export default Select2;
