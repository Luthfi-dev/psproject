import BreadcrumbsItemLast from "../../01-atoms/Breadcrumbs/BreadcrumbsItemLast";
import BreadcrumbsItem from "../../01-atoms/Breadcrumbs/BreadcrumbsItem";
import BreadcrumbsItemSeparator from "../../01-atoms/Breadcrumbs/BreadcrumbsItemSeparator";
import BreadcrumbsItemGroup from "./BreadcrumbsItemGroup";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const Breadcrumbs = ({children, props}) =>{
  const list = props?.list ? props?.list : [];
  const linkToDashboard = publicRuntimeConfig.BASE_URL+'panel/home'
  return(
    <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 pt-1">
      <BreadcrumbsItem props={{ text:'Beranda', link:linkToDashboard }}/>
      <BreadcrumbsItemSeparator/>
      {
        list.map((item,index)=>{
          return(
            <BreadcrumbsItemGroup key={'group_'+index}>
              {
                index < list.length-1 && 
                <>
                  <BreadcrumbsItem props={{ text:item.text, link:item.link }}/>
                  <BreadcrumbsItemSeparator/>
                </>
              }
              {
                index === list.length-1 && 
                <>
                  <BreadcrumbsItemLast props={{ text:item.text }}/>
                </>
              }
            </BreadcrumbsItemGroup>
          )
        })
      }
    </ul>
  )
}
export default Breadcrumbs;