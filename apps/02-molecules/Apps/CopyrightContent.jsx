const CopyrightContent = ({children,props}) =>{
  return(
    <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
      <div className="text-dark order-2 order-md-1">
        <span className="text-muted fw-bold me-1">2022 © </span>
        <a href="/dashboard" className="text-gray-800 text-hover-primary">Faster Version 2.0</a>
      </div>
      <ul className="menu menu-gray-600 menu-hover-primary fw-bold order-1">
        <li className="menu-item">
          <a href="#" target="_blank" className="menu-link px-2">EpiC</a>
        </li>
        <li className="menu-item">
          <a href="#" target="_blank" className="menu-link px-2">FHI360 - INDONESIA</a>
        </li>
      </ul>
    </div>
  )
}
export default CopyrightContent;