import UserInfoHorizontal from "../../02-molecules/Users/UserInfoHorizontal";
import LeftMenu from "./LeftMenu";
import CopyrightContent from "../../02-molecules/Apps/CopyrightContent";
import WrapperContent from "../../02-molecules/Apps/WrapperContent";
import HeaderContent from "../../02-molecules/Apps/HeaderContent";
import LogoApps from "../../02-molecules/Apps/LogoApps";
import HeaderToolbar from "../../02-molecules/Apps/HeaderToolbar";
import HeaderToolbarLeft from "../../02-molecules/Apps/HeaderToolbarLeft";
import HeaderToolbarRight from "../../02-molecules/Apps/HeaderToolbarRight";
import getConfig from 'next/config'

const Content = ({children,props}) =>{
  const fullName = props.session?.fullName ? props.session.fullName : '';
  const subtitle = props.session?.username ? props.session.username : '';
  const firstName = fullName.split(" ")[0];
  const avatar = props.session?.avatar ? props?.session.avatar+'?subfolder=avatars&':'';
  return(
    <div className='d-flex flex-column flex-root'>
      <div className='page d-flex flex-row flex-column-fluid'>
        <div 
          id="kt_aside" 
          className="aside" 
          data-kt-drawer="true" 
          data-kt-drawer-name="aside" 
          data-kt-drawer-activate="{default: true, lg: false}" 
          data-kt-drawer-overlay="true" 
          data-kt-drawer-width="{default:'200px', '300px': '250px'}" 
          data-kt-drawer-direction="start" 
          data-kt-drawer-toggle="#kt_aside_mobile_toggle">
            <div className="aside-toolbar flex-column-auto" id="kt_aside_toolbar">
              <UserInfoHorizontal props={{ title:firstName, subtitle:subtitle, state:'online', avatar:avatar, addClass:' aside-user align-items-sm-center justify-content-center py-5' }}/>
            </div>
            <LeftMenu/>
        </div>
        <WrapperContent>
          <HeaderContent>
            <LogoApps/>
            <HeaderToolbar>
              <HeaderToolbarLeft props={props}/>
              <HeaderToolbarRight props={props}/>
            </HeaderToolbar>
          </HeaderContent>
          <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="post d-flex flex-column-fluid" id="kt_post">
              <div className="container-xxl" id="kt_content_container" >
                {children}
              </div>
            </div>
          </div>
          <div className="footer py-4 d-flex flex-lg-column" id="kt_footer">
            <CopyrightContent/>
          </div>
        </WrapperContent>
      </div>
    </div>
  )
}
export default Content;