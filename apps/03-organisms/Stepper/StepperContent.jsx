const StepperContent = ({children, props}) =>{
  const active = props?.active === true ? 'current':'normal';
  return(
    <div className={active} data-kt-stepper-element='content'>
      <div className="w-100">
        {children}
      </div>
    </div>
  )
}
export default StepperContent;