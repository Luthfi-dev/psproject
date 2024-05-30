const CardHeader = ({children, props})=>{
  const addClass = props?.addClass ? props?.addClass:'';
  return(
    <div className={'card-header '+addClass}>
      {children}
    </div>
  )
}
export default CardHeader;