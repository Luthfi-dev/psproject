import React,{ useState , useEffect} from "react";

const LengthChange =({ props, onChange })=>{
  const addClass = props?.addClass ? props.addClass : "";
  return (
    <div className={'d-flex align-items-center justify-content-center justify-content-md-start'}>
      <div className="dataTables_length">
        <label>
          <select  className="form-select form-select-sm form-select-solid" onChange={(e)=>{onChange(e.target.value)}}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
      <div className="dataTables_info text-muted"  aria-live="polite">Rows Per Page</div>
    </div>
  )
}
export default LengthChange;