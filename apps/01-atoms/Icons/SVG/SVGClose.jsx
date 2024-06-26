const SVGClose = ({children, props}) =>{
  const size = props?.size ? props.size:'2';
  return(
    <span className={'svg-icon svg-icon-'+size}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
        <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
      </svg>
    </span>
  )
}
export default SVGClose