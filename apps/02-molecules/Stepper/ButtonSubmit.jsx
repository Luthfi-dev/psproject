import SVGNext from "../../01-atoms/Icons/SVG/SVGNext";
const ButtonSubmit = ({children, props}) =>{
  const text = props?.text ? props.text : 'Submit'
  return(
    <button type="button" className="btn btn-lg btn-primary " data-kt-stepper-action="submit">
      <span className="indicator-label">
        {text}
        <SVGNext/>
      </span>
      <span className="indicator-progress">
        Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </button>
  )
}
export default ButtonSubmit;