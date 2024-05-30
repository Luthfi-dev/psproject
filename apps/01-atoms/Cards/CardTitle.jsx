const CardTitle = ({children, props}) =>{
  const title = props?.title ? props?.title:'';
  const subtitle = props?.subtitle ? props?.subtitle:'';

  return(
    <h3 className="card-title align-items-start flex-column">
      <span className="fw-bolder m-0">{title}</span>
      <span className="text-muted mt-1 fw-bold fs-7">{subtitle}</span>
    </h3>
  )
}
export default CardTitle;