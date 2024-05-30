const Row = ({children, props}) =>{
  const addClass = props?.addClass ? props.addClass : '';
  return(<div className={'row '+addClass}>{children}</div>)
}
export default Row;