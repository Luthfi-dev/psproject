const MenuItemAccording = ({children,props}) =>{
  return(
    <div data-kt-menu-trigger="click" className="menu-item menu-accordion ">{children}</div>
  )
}
export default MenuItemAccording;