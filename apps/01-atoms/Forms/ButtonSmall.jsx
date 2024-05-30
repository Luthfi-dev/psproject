const ButtonSmall = ({children, props, onClicked}) =>{
  const addClass = props?.addClass ? props.addClass : '';
  return(
    <button className={'btn btn-sm '+addClass} onClick={(e)=>{onClicked(e)}}>
      {children}
    </button>
  )
}
export default ButtonSmall;