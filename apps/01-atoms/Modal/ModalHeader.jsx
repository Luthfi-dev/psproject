import SVGClose from "../Icons/SVG/SVGClose";

const ModalHeader = ({children, props})=>{
  const addClass = props?.addClass ? props.addClass : '';
  return(
    <div className={'modal-header '+addClass}>
      {children}
      <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
        <SVGClose props={{ size:1 }} />
      </div>
    </div>
  )
}
export default ModalHeader