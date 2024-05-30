const ButtonIndicator = ({children, props, onConfirm}) => {
  const btnText = props?.text ? props?.text : 'Submit'
  const addClass = props?.addClass ? props?.addClass : ''
  const btnState = props?.disabled === true ? true : false
  return(
    <button type="submit" className={'btn btn-primary '+addClass}
      data-kt-indicator={props?.loadingState === true ? 'on':''} 
      disabled={props?.loadingState === true || btnState === true ? true:false}
      onClick={()=>{onConfirm()}}>
      <span className="indicator-label">{btnText}{children}</span>
      <span className="indicator-progress">Please wait...
      <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
    </button>
  )
}
export default ButtonIndicator