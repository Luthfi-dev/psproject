import Inputtext from "../../01-atoms/Forms/Inputtext"
import { useEffect } from "react";
import Calender from "../../../helper/Calender";

const Datepicker = ({children, props, onChanged}) =>{
  const value = props?.defaultValue ?props?.defaultValue : ''
  const uniqeID = props?.id ? props.id : 'datepicker'
  const placeholder = props?.placeholder ?props?.placeholder : 'Select a date'
  const calender = new Calender();

  useEffect(()=>{
    $("#"+uniqeID).flatpickr({dateFormat: "d-m-Y"});
    $("#"+uniqeID).flatpickr({dateFormat: "d-m-Y",
      onChange: function(selectedDates, dateStr, instance) {
        onChanged(selectedDates)
      }
    })
  },[])

  useEffect(()=>{
   if(props?.focus === true){
    $("#"+uniqeID).flatpickr().open()
   }
   if(props?.focus === true){
    $("#"+uniqeID).flatpickr().close()
   }
  },[props?.focus])

  return(
    <div className="position-relative d-flex align-items-center">
      <span className="svg-icon svg-icon-2 position-absolute mx-4">
        <i className="bi bi-calendar-date fs-4"></i>
      </span>
      <Inputtext props={{ 
        disabled:props?.disabled,
        readOnly: props?.readOnly,
        addClass:'ps-12 datepicker ' + props?.addClass, 
        placeholder:placeholder, 
        defaultValue:value!='' ? calender.dateFormat(new Date(value),'dd-mm-yyyy'):'',
        id:uniqeID
      }}/>
    </div>
  )
}
export default Datepicker