import SVGBell from "../../01-atoms/Icons/SVG/SVGBell";

const Bordered = ({children, props}) =>{
  const color = props?.color ? props?.color : 'danger ';
  const title = props?.title ? props.title : '';
  const description = props?.description ? props.description : '';
  const size = props?.size ? props.size : '2'

  return(
    <div className={'border rounded-1 border-' + color + ' border-'+size+' d-flex flex-column flex-sm-row w-100 p-5 mb-5 alert bg-light-'+color} >
      <span className={'svg-icon svg-icon-2hx svg-icon-'+color+' me-4 mb-5 mb-sm-0'}>
        <SVGBell/>
      </span>
      <div className="d-flex flex-column pe-0 pe-sm-10">
        <h5 className={'mb-1 fw-bolder text-' + color}>{title}</h5>
        <span className={'text-gray '+ props?.addClass}><div dangerouslySetInnerHTML={{ __html:description }}></div>{children}</span>
      </div>
      <button type="button" className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" data-bs-dismiss="alert">
        <i className={'bi bi-x fs-1 text-'+color}></i>
      </button>
    </div>
  )
}
export default Bordered;