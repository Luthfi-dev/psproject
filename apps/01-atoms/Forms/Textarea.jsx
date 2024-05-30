const Textarea = ({props, onChanged}) =>{
  const solid = props?.solid === false ? '':'form-control-solid'
  const placeholder = props?.placeholder ? props.placeholder : 'Type here ...'
  const value = props?.defaultValue ? props.defaultValue : ''
  const readOnly = props?.readOnly ? props.readOnly : false;
  const autoSize = props?.autoSize ? props.autoSize : 'true'
  return(
    <textarea 
      className={'form-control form-control-lg fw-normal '+solid+' '+props?.addClass} 
      rows={props?.row ? props.row : 3}
      placeholder={placeholder}
      value={value}
      onChange={(e)=>{onChanged(e.target.value)}}
      readOnly={readOnly}
      data-kt-autosize={autoSize}
    >
    </textarea>
  )
}
export default Textarea