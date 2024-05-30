const SVGCloseCircle = ({children, props}) =>{
  const size = props?.size ? props.size:'2';
  return(
    <span className={'svg-icon svg-icon-'+size+' '+props?.addClass}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black"></rect>
        <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="black"></rect>
        <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="black"></rect>
      </svg>
    </span>
  )
}
export default SVGCloseCircle