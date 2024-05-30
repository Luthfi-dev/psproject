const ModalBody = ({children, props})=>{
  const addClass = props?.addClass ? props.addClass : '';
  return(
    <div className={'modal-body '+addClass}>{children}</div>
  )
}
export default ModalBody