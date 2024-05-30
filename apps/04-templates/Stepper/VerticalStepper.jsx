import CoreStepperVertical from "../../01-atoms/Stepper/CoreStepperVertical";
import SectionContentStepperVertical from "../../01-atoms/Stepper/SectionContentStepperVertical";
import SectionNavStepperVertical from "../../01-atoms/Stepper/SectionNavStepperVertical";
import StepperNav from "../../03-organisms/Stepper/StepperNav";
import StepperAction from "../../03-organisms/Stepper/StepperAction";
import { useEffect, useState } from "react";  

const VerticalStepper = ({children, props, onNext, onBack, onChanged}) =>{
  const [stepper, setStepper] = useState('');
  useEffect(() => {
    initializeStepper()
  }, []);
  const initializeStepper = ()=>{
    if(! stepper){
      const element = document.querySelector("#vertical_stepper");
      const options = {startIndex: 1};
      const wizard = new KTStepper(element,options);
      setStepper(wizard);
      wizard.on("kt.stepper.previous", function (stepper) {
        onBack(stepper)
      });
      wizard.on("kt.stepper.changed", function (stepper) {
        onChanged(stepper)
      });
      wizard.on("kt.stepper.next", function (stepper) {
        onNext(stepper)
      });
    }
  }

  const list = props?.list ? props.list : []
  return(
    <CoreStepperVertical>
      <SectionNavStepperVertical>
        <StepperNav props={{ list:list }}/>
      </SectionNavStepperVertical>
      <SectionContentStepperVertical>
        <form className="py-10 w-100 px-9" onSubmit={(e)=>{e.preventDefault()}}>
          { children }
          <StepperAction/>
        </form>
      </SectionContentStepperVertical>
    </CoreStepperVertical>
  )
}
export default VerticalStepper;