const TitleContent = ({children, props}) =>{
  const title = props?.title ? props.title : ''
  return(
    <h2 className="fw-bolder text-dark" dangerouslySetInnerHTML={{ __html:title }}></h2>
  )
}
export default TitleContent;