import Modal from '../../01-atoms/Modal/ModalLarge'
import ModalHeader from '../../01-atoms/Modal/ModalHeader'
import ModalBody from '../../01-atoms/Modal/ModalBody'
import ModalFooter from '../../01-atoms/Modal/ModalFooter'
import { useEffect } from 'react'

const ModalLarge = ({ children, props, onHide, onConfirm }) => {
  const uniqeId = props?.id ? props.id : 'my-modal'
  const modalState = props?.state ? props?.state : 'hide'
  const hideAction = props?.hideAction ? props.hideAction : false
  const title = props?.title ? props.title : ''
  const subtitle = props?.subtitle ? props.subtitle : ''
  useEffect(() => {
    if (modalState != '') {
      var script = document.createElement('script')
      script.append(
        $(document).ready(function () {
          $('#' + uniqeId).modal(modalState)
        })
      )
    }
  }, [modalState])

  useEffect(() => {
    $('#' + uniqeId).on('hidden.bs.modal', function () {
      onHide()
    })
  }, [])

  return (
    <Modal
      props={{
        id: uniqeId,
        centered: props?.centered,
        addClass: props?.addClass,
      }}
    >
      <ModalHeader>
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
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      {hideAction === false && (
        <ModalFooter
          props={{
            btnConfirmText: props?.btnConfirmText,
            btnConfirmState: props?.btnConfirmState,
            btnCancelText: props?.btnCancelText,
            loadingState: props?.loadingState,
          }}
          onConfirm={() => {
            onConfirm()
          }}
        ></ModalFooter>
      )}
    </Modal>
  )
}
export default ModalLarge
