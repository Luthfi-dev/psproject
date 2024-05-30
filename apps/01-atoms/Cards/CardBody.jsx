const CardBody = ({children, props})=>{
  const addClass = props?.addClass ? props?.addClass:'py-5';
  return(
    <div className={'card-body '+addClass}>
      {children}
    </div>
  )
}

export default CardBody;