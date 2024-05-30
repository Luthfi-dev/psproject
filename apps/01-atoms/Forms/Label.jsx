const Label = ({props}) =>{
  const verticalClass = props?.mb ? 'form-label mb-' + props?.mb : 'form-label mb-3'
  const horizontal = props?.horizontal === true ? 'col-form-label fs-6 fw-bold':verticalClass
  return(
    <label className={horizontal + ' ' +props?.addClass }>{props.text}</label>
  )
}
export default Label;