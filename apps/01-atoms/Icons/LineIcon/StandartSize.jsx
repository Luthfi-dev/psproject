const StandartSize = ({children,props}) =>{
  const iconString = props?.icon ? props.icon : '';
  return(
    <i className={iconString}></i>
  )
}
export default StandartSize;