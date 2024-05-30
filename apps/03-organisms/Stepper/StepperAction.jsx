import ButtonBack from "../../02-molecules/Stepper/ButtonBack";
import ButtonNext from "../../02-molecules/Stepper/ButtonNext";
import ButtonSubmit from "../../02-molecules/Stepper/ButtonSubmit";

const StepperAction = ({children, props}) =>{
  const list = props?.list ? props.list : [];
  return(
    <div className="d-flex flex-stack">
      <ButtonBack/>
      <div>
        <ButtonSubmit props={{ text:'Submit Request' }}/>
        <ButtonNext/>
      </div>
    </div>
  )
}
export default StepperAction;