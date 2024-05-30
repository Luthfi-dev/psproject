const Button = ({children, props, onClicked}) =>{
  const addClass = props?.addClass ? props.addClass : '';
  return(
    <button className={'btn  '+addClass} onClick={(e)=>{onClicked(e)}}>
      {children}
    </button>
  )
}
export default Button;