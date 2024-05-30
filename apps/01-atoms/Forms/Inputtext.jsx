const Inputtext = ({children, props, onChanged}) =>{
  const solid = props?.solid === false ? '':'form-control-solid border'
  const placeholder = props?.placeholder ? props.placeholder : 'Type here ...'
  const value = props?.defaultValue ? props.defaultValue : ''
  const addClass = props?.addClass ? props.addClass : ''
  const uniqeID = props?.id ? props.id : ''
  const readOnly = props?.readOnly ? props.readOnly : false
  const disabled = props?.disabled === true ? true : false
  const inputSmall = props?.inputSmall === true ? 'form-control-sm':''
  const inputlarge = props?.inputlarge === true ? 'form-control-lg':''
  return(
    <input
      disabled={disabled}
      type={'text'}
      className={'form-control  ' + solid + ' ' + addClass + ' ' + inputSmall}
      placeholder={placeholder}
      value={value}
      onChange={(e)=>{onChanged(e.target.value)}}
      id={uniqeID}
      readOnly={readOnly}
    >
    </input>
  )
}
export default Inputtext;
