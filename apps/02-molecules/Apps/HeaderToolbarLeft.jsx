import TitleHeaderContent from "../../01-atoms/Title/TitleHeaderContent";
import Breadcrumbs from "./Breadcrumbs";

const HeaderToolbarLeft = ({children,props}) =>{
  const title = props?.title ? props.title : 'Faster V2.0'
  return(
    <div className="page-title d-flex flex-column me-5">
      <TitleHeaderContent>{title}</TitleHeaderContent>
      <Breadcrumbs props={{ list:props?.breadcrumbs }}/>
    </div>
  )
}
export default HeaderToolbarLeft;