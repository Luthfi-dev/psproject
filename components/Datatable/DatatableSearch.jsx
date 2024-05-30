import { useEffect, useState } from "react"
import Script from "next/script";

const DatatableSearch = ({props,searchData,filterStateId})=>{
  useEffect(()=>{
    listenFilterChange();
    // filterStateId(props.filterStateData[0].id)
  },[])

  const doSearch = (event)=>{
    if( (event.key === 'Enter' || event.keyCode===13) || event.target.value==='' ){
      searchData(event.target.value)
    }
  }
  const listenFilterChange = () =>{
    $("#filterStateInput").on('select2:select',function(e){
      filterStateId(this.value)
    })
  }
  return (
    <>
    <div className="col-8">
      <div className="row">
        {
          props.filterState === true &&
          <div className="col-4 pt-1">
            <select 
              className="form-select form-select-solid " 
              id={'filterStateInput'}
              data-control="select2" 
              data-hide-search="true" 
              data-placeholder="Select"
              >
              {
                props.filterStateData.map((filter,index)=>{
                  return(
                  <option value={filter.id} key={'filter_items_'+index}>{filter.value}</option>
                  )
                })
              }
            </select>
          </div>
        }
        <div className="col-8">
          <div className="d-flex align-items-center position-relative my-1">
            <span className="svg-icon svg-icon-1 position-absolute ms-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black"></rect>
                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black"></path>
              </svg>
            </span>
            <input type="text" data-kt-docs-table-filter="search" className="form-control form-control-solid w-350px ps-15" placeholder="Search Here..." onKeyUp={(e)=>{doSearch(e)}}/>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default DatatableSearch;