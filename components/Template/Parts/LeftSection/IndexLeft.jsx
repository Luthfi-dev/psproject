import UserInfo from "./UserInfo";
import ListMenu from "./ListMenu";
const IndexLeft = ({appsData})=>{
  return (
    <>
      <div id="kt_aside" className="aside" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle">
        <UserInfo appsData={appsData}/>
        <ListMenu appsData={appsData}/>
      </div>
    </>
  )
}
export default IndexLeft;