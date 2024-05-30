const CoreStepperVertical = ({children, props}) =>{
  return(
    <div className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid " id="vertical_stepper">
      { children }
    </div>
  )
}
export default CoreStepperVertical;