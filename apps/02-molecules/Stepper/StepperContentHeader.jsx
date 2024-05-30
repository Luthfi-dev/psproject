import DescriptionContent from "../../01-atoms/Stepper/DescriptionContent";
import TitleContent from "../../01-atoms/Stepper/TitleContent";

const StepperContentHeader = ({children, props}) =>{
  return(
    <div className="pb-5 pb-lg-5">
      <TitleContent props={props}/>
      <DescriptionContent props={props}/>
    </div>
  )
}
export default StepperContentHeader;