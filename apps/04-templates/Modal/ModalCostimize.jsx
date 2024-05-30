import SVGClose from "../../01-atoms/Icons/SVG/SVGClose"
import { useEffect } from "react"

const ModalCostumize = ({children, props, onHide, onConfirm}) =>{
  const uniqeId = props?.id ? props.id : 'my-modal'
  const addClass = props?.addClass ? props.addClass : 'mw-650px'
  const title = props?.title ? props.title : ''
  const subtitle = props?.subtitle ? props.subtitle : ''
  const modalState = props?.state ? props.state : 'hide';
  const btnConfirmText = props?.btnConfirmText ? props.btnConfirmText : 'Save'
  const btnCancelText = props?.btnCancelText ? props.btnCancelText : 'Close'
  const hideAction = props?.hideAction ? props.hideAction : false;
  const height = props?.height ?? ''

  useEffect(() => {
    if(modalState !=''){
      var script = document.createElement('script');
      script.append($(document).ready(function(){$("#"+uniqeId).modal(modalState)}))
    }
  }, [modalState]);

  useEffect(()=>{
    $('#'+uniqeId).on('hidden.bs.modal', function () {
      onHide()
    })
  },[])

  return(
    <div className="modal fade" id={uniqeId} tabIndex="-1" aria-hidden="true">
      <div className={'modal-dialog '+addClass}>
        <div className={'modal-content h-' + height}>
          <div className="modal-header py-5">
            <div className="modal-title">
              {
                title != '' && 
                <h5 className="">{title}</h5>
              }
              {
                subtitle != '' && 
                <div className="text-muted fs-8">{subtitle}</div>
              }
            </div>
            <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
              <SVGClose props={{ size:1 }} />
            </div>
          </div>
          <div className="modal-body scroll-y py-5">
            {children}
            {
              hideAction === false && 
              <div className="text-center pt-10">
                <button type="reset" className="btn btn-light-danger me-3 rounded-1" data-bs-dismiss="modal">{btnCancelText}</button>
                <button type="submit" className="btn btn-primary rounded-1"  
                  data-kt-indicator={props?.loadingState === true ? 'on':''} 
                  disabled={props?.loadingState === true ? true:false} 
                  onClick={()=>{onConfirm()}}>
                  <span className="indicator-label">{btnConfirmText}</span>
                  <span className="indicator-progress">Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalCostumize;