const CardHeader = ({appsData}) =>{
  return(
    <>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder fs-3 mb-1">{appsData.headers.title}</span>
          <span className="text-muted mt-1 fw-bold fs-7">Completing the request form</span>
        </h3>
        <div className="card-toolbar">
          <ul className="nav">
         
          </ul>
        </div>
      </div>
    </>
  )
}
export default CardHeader;