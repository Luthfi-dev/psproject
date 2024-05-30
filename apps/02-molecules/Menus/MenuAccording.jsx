import MenuItemAccording from "../../01-atoms/Menus/MenuItemAccording";
import MenuLink from "../../01-atoms/Menus/MenuLink";
import MenuIcon from "../../01-atoms/Menus/MenuIcon";
import MenuTitle from "../../01-atoms/Menus/MenuTitle";
import MenuArrow from "../../01-atoms/Menus/MenuArrow";
import SubMenuAccording from "../../01-atoms/Menus/SubMenuAccording";
import MenuItem from "../../01-atoms/Menus/MenuItem";
import MenuBullet from "../../01-atoms/Menus/MenuBullet";
import StandartSize from "../../01-atoms/Icons/LineIcon/StandartSize";
import Link from "next/link";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const MenuAccording = ({children,props}) =>{
  const title = props?.title ? props.title : 'Sub Menu';
  const icon = props?.icon ? props.icon : '';
  const subMenus = props?.sub ? props.sub : [];
  return(
    <>
      <MenuItemAccording>
        <MenuLink>
          <MenuIcon>
            <StandartSize props={{ icon:icon }}/>
          </MenuIcon>
          <MenuTitle>{title}</MenuTitle>
          <MenuArrow/>
        </MenuLink>
        <SubMenuAccording>
        {
          subMenus.map((sub,index)=>{
            const link = sub?.link ? publicRuntimeConfig.BASE_URL+sub.link:'#'
            return(
              <MenuItem key={'subMenu_'+index}>
                <MenuLink>
                  <MenuBullet />
                  <Link href={link}>
                    <a><MenuTitle>{sub.title}</MenuTitle></a>
                  </Link>
                </MenuLink>
              </MenuItem>
            )
          })
        }
        </SubMenuAccording>
      </MenuItemAccording>
    </>
  )
}
export default MenuAccording;