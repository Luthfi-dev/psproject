import ModalStandar from "../../01-atoms/Modal/ModalStandar";
import ModalHeader from "../../01-atoms/Modal/ModalHeader";
import ModalBody from "../../01-atoms/Modal/ModalBody";
import ModalFooter from "../../01-atoms/Modal/ModalFooter";
import { useEffect } from "react";

const Modal = ({children, props,onHide,onConfirm}) =>{
  const uniqeId = props?.id ? props.id : 'my-modal';
  const modalState = props?.state ? props?.state : 'hide';
  const subtitle = props?.subtitle ? props.subtitle : ''
  const hideAction = props?.hideAction ? props.hideAction : false;

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
    <ModalStandar props={{ id:uniqeId, addClass:props?.addClass, centered: props?.centered }} >
      <ModalHeader>
        <div className="modal-title">
          {
            props?.title != '' && 
            <h5 className="">{props?.title}</h5>
          }
          {
            subtitle != '' && 
            <div className="text-muted fs-8">{subtitle}</div>
          }
        </div>
      </ModalHeader>
      <ModalBody props={{ addClass: props?.addClassToBody}}>{children}</ModalBody>
      {
         hideAction === false && 
        <ModalFooter 
          props={{ btnConfirmText:props?.btnConfirmText, btnCancelText:props?.btnCancelText, loadingState:props?.loadingState }} 
          onConfirm={()=>{onConfirm()}}
        ></ModalFooter>
      }
    </ModalStandar>
  )
}
export default Modal;