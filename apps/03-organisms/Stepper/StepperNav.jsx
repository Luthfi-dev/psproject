import StepperItem from "../../02-molecules/Stepper/StepperItem";
import StepperItemLine from "../../01-atoms/Stepper/StepperItemLine";
import StepperIcon from "../../02-molecules/Stepper/StepperIcon";
import StepperLabel from "../../02-molecules/Stepper/StepperLabel";

const StepperNav = ({children, props}) =>{
  const list = props?.list ? props.list : [];
  return(
    <div className="stepper-nav">
      {
        list.map((item, index)=>{
          return(
            <StepperItem props={{ index:index }} key={'item_nav'+index}>
              <StepperItemLine/>
              <StepperIcon props={{ text:item.text }}/>
              <StepperLabel props={{ title:item.title, description:item.description }}/>
            </StepperItem>
          )
        })
      }
		</div>
  )
}
export default StepperNav;