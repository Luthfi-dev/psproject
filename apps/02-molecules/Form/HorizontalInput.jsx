const HorizontalInput = ({children, props}) =>{
  const mb = props?.mb ? ' mb-'+props.mb : ' mb-5 ';
  const mt = props?.mt ? ' mt-'+props.mb : ' mt-0 ';
  return(
    <div className={'row '+mb+' '+ mt}>
      { children }
    </div>
  )
}
export default HorizontalInput