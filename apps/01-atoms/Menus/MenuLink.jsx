const MenuLink = ({children,props}) =>{
  const state = props?.state ? props.state : '';
  return(
    <span className={'menu-link '+ state}>{children}</span>
  )
}
export default MenuLink;