import MenuIcon from "../../01-atoms/Menus/MenuIcon";
import MenuItem from "../../01-atoms/Menus/MenuItem";
import MenuLink from "../../01-atoms/Menus/MenuLink";
import MenuTitle from "../../01-atoms/Menus/MenuTitle";
import StandartSize from "../../01-atoms/Icons/LineIcon/StandartSize";
import Link from "next/link";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const MenuStandartSVGIcon = ({children,props}) =>{
  const title = props?.title ? props.title:'Default Menu'
  const link = props?.link ? publicRuntimeConfig.BASE_URL+props.link:'#'
  const icon = props?.icon ? props.icon:'lni lni-dashboard'
  const state = props.state ? props.state : '';
  return(
    <MenuItem>
      <MenuLink props={{ state:state }}>
        <MenuIcon>
          {children}
        </MenuIcon>
        <Link href={link}>
          <a>
            <MenuTitle>{title}</MenuTitle>
          </a>
        </Link>
      </MenuLink>
    </MenuItem>
  )
}
export default MenuStandartSVGIcon;