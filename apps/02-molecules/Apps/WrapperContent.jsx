const WrapperContent = ({children, props}) =>{
  return(
    <div className="wrapper d-flex flex-column flex-row-fluid">
      { children }
    </div>
  )
}
export default WrapperContent;