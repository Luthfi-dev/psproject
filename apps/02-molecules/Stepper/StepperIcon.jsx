const StepperIcon = ({children, props}) =>{
  const text = props?.text ? props.text : '0'
  return(
    <div className="stepper-icon w-40px h-40px">
      <i className="stepper-check fas fa-check"></i>
      <span className="stepper-number">{text}</span>
    </div>
  )
}
export default StepperIcon;