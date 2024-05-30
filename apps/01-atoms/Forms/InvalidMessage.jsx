const InvalidMessage = ({children, props}) =>{
  return(
    <div className="fv-plugins-message-container invalid-feedback fs-9 mt-0 ms-2 fst-italic opacity-75 fw-bold">
      {children}
    </div>
  )
}
export default InvalidMessage;