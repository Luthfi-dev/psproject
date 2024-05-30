const HeaderToolbar = ({children,prop}) =>{
  return(
    <div className="toolbar">
      <div className="container-fluid py-6 py-lg-0 d-flex flex-column flex-lg-row align-items-lg-stretch justify-content-lg-between">
        { children }
      </div>
    </div>
  )
}
export default HeaderToolbar;