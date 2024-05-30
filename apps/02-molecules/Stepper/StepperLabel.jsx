import StepperLabelDescription from "../../01-atoms/Stepper/StepperLabelDescription"
import StepperLabelTitle from "../../01-atoms/Stepper/StepperLabelTitle"

const StepperLabel = ({children, props}) =>{
  const title = props?.title ? props.title : 'Title'
  const description = props?.description ? props.description : 'Description'
  return(
    <div className="stepper-label">
      <StepperLabelTitle>{ title }</StepperLabelTitle>
      <StepperLabelDescription>{ description }</StepperLabelDescription>
    </div>
  )
}
export default StepperLabel;