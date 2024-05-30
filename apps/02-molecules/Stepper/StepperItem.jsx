const StepperItem = ({children, props}) =>{
  const state = props?.index === 0 ? 'current':'';
  return(
    <div className={'stepper-item '+state} data-kt-stepper-element="nav" data-kt-stepper-action="step">
      {children}
    </div>
  )
}
export default StepperItem;