import { useState, useEffect} from "react";
import SVGDashboard from "../../01-atoms/Icons/SVG/SVGDashboard";
import MenuAccording from "../../02-molecules/Menus/MenuAccording";
import MenuSection from "../../02-molecules/Menus/MenuSection";
import MenuStandart from "../../02-molecules/Menus/MenuStandart";
import MenuStandartSVGIcon from "../../02-molecules/Menus/MenuStandartSVGIcon";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const LeftMenu = () =>{
  const [listMenu,setListMenu] = useState([]);
  const loadData = async () =>{
    const menu = JSON.parse(localStorage.getItem("fast_menu"));
    setListMenu(menu);
  }

  useEffect(() => {
    const fastMenus = localStorage.getItem('fast_menu');
    if(fastMenus){
      const menusList = JSON.parse(fastMenus);
      setListMenu(menusList);
    }
  },[])

  return(
    <div className='aside-menu flex-column-fluid'>
      <div 
        className="hover-scroll-overlay-y px-2 my-5 my-lg-5" id="kt_aside_menu_wrapper" 
        data-kt-scroll-offset="5px" 
        data-kt-scroll-wrappers="#kt_aside_menu" 
        data-kt-scroll-dependencies="{default: '#kt_aside_toolbar, #kt_aside_footer', lg: '#kt_header, #kt_aside_toolbar, #kt_aside_footer'}"
        data-kt-scroll-height="auto" 
        data-kt-scroll="true"
      >
        <div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500" id="#kt_aside_menu" data-kt-menu="true">

          <MenuStandartSVGIcon props={{ title:'Dashboard', state:'active', link:publicRuntimeConfig.BASE_PATH.replace('/','')+'/home' }}>
            <SVGDashboard/>
          </MenuStandartSVGIcon>
          {
          listMenu.map((section, index)=>{
            return(<div key={'section_'+index}>
              <MenuSection >
                {section.title}
              </MenuSection>
              {
                section?.sub.length > 0 &&
                section.sub.map((itemMenu,itemIndex)=>{
                  return(
                    itemMenu.sub.length > 0 ?
                    <MenuAccording 
                      key={'itemMenu_'+itemIndex} 
                      props={{ title:itemMenu.title, icon:itemMenu.icon, sub:itemMenu.sub }}
                    />
                    :
                    <MenuStandart 
                      key={'itemMenu_'+itemIndex} 
                      props={{ title:itemMenu.title, icon:itemMenu.icon, link:itemMenu.link }}
                    />
                  )
                })
              }
            </div>)
          })
          }
        </div>
      </div>
    </div>
  )
}
export default LeftMenu;