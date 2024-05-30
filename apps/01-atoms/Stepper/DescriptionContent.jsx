const DescriptionContent = ({children, props}) =>{
  const description = props?.description ? props.description : ''
  return(
    <div className="text-muted fw-bold fs-6" dangerouslySetInnerHTML={{ __html:description }}></div>
  )
}
export default DescriptionContent;