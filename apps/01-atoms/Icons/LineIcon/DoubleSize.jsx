const DoubleSize = ({children,props}) =>{
  const iconString = props?.icon ? props.icon : '';
  return(
    <i class={iconString+' fs-2'}></i>
  )
}
export default DoubleSize;