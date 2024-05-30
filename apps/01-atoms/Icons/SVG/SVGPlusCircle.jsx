const SVGPlusCircle = ({children, props}) =>{
  const size = props?.size ? props.size:'2';
  return(
    <span className={'svg-icon svg-icon-'+size+' '+props?.addClass}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="black"/>
      <rect x="10.8891" y="17.8033" width="12" height="2" rx="1" transform="rotate(-90 10.8891 17.8033)" fill="black"/>
      <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="black"/>
      </svg>
    </span>
  )
}
export default SVGPlusCircle