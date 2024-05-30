const ModalLarge = ({children, props}) =>{
  const centered = props?.centered === false ? '' : 'modal-dialog-centered'
  const addClass = props?.addClass ? props?.addClass : ''
  return (
    <div className="modal fade " id={props?.id} role="dialog" data-bs-focus="false">
      <div className={'modal-dialog modal-lg ' + centered + ' ' + addClass}>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}
export default ModalLarge