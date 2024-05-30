const ModalFooter = ({children, props, onConfirm})=>{
  const btnConfirmText = props?.btnConfirmText ? props.btnConfirmText : 'Save Changes'
  const btnCancelText = props?.btnCancelText ? props.btnCancelText : 'Close'
  const addClass = props?.addClass ? props.addClass : '';
  return(
    <div className={'modal-footer '+addClass}>
      <button
        type="button"
        className="btn btn-light-danger rounded-1"
        data-bs-dismiss="modal" >{btnCancelText}</button>
      <button
        type="button"
        className="btn btn-lg btn-primary rounded-1"
        data-kt-indicator={props?.loadingState === true ? 'on':''}
        disabled={props?.loadingState === true || props?.btnConfirmState === true ? true:false}
        onClick={()=>{onConfirm()}}
      >
        <span className="indicator-label">
          {btnConfirmText}
        </span>
        <span className="indicator-progress">
          Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      </button>
    </div>
  )
}
export default ModalFooter
