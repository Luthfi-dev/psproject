const ModalStandar = ({children, props}) =>{
  const addClass = props?.addClass ? props?.addClass: '';
  const centered = props?.centered === false ? '' : 'modal-dialog-centered'
  return (
    <div className="modal fade " id={props?.id} data-bs-focus="false" >
      <div className={'modal-dialog ' + addClass + ' ' + centered}>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}
export default ModalStandar