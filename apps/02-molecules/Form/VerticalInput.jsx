const VerticalInput = ({children, props}) =>{
  const mb = props?.mb ? ' mb-'+props.mb : ' mb-8';
  const mt = props?.mt ? ' mt-'+props.mb : ' mt-0 ';
  return(
    <div className={'fv-row fv-plugins-icon-container '+mb+' '+ mt}>
      { children }
    </div>
  )
}
export default VerticalInput