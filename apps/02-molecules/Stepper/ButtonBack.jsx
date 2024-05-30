import SVGBack from "../../01-atoms/Icons/SVG/SVGBack";
const ButtonBack = ({children, props}) =>{
  const text = props?.text ? props.text : 'Back'
  return(
    <div className="me-2">
      <button type="button" className="btn btn-lg btn-light btn-active-light-primary" data-kt-stepper-action="previous">
        <SVGBack/>
        {text}
      </button>
    </div>
  )
}
export default ButtonBack;