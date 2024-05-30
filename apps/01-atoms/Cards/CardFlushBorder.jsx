const CardFlushBorder = ({children, props})=>{
  const addClass = props?.addClass ? props?.addClass:'';
  return(
    <div className={'card card-flush shadow-sm '+addClass}>
      {children}
    </div>
  )
}
export default CardFlushBorder;