import MenuItem from "../../01-atoms/Menus/MenuItem";

const MenuSection = ({children,props}) =>{
  return(
    <MenuItem>
      <div className="menu-content pt-8 pb-2">
        <span className="menu-section text-muted text-uppercase fs-8 ls-1">{children}</span>
      </div>
    </MenuItem>
  )
}
export default MenuSection;