import { useState } from "react";
import Apps from "../../Template/Apps";
import GroupMenus from "./Components/GroupMenus";
import ListMenusOnGroup from "./Components/ListMenuOnGroup";

const ContainerMenus = ({appsData}) => {
  const [selectedGroupID, setSelectedGroupID] = useState('');
  const [selectedGroupName, setSelectedGroupName] = useState('');

  appsData.selectedGroupID = selectedGroupID;
  appsData.selectedGroupName = selectedGroupName;

  const changeIdGroup = (groupMenu)=>{
    setSelectedGroupID(groupMenu.id_group);
    setSelectedGroupName(groupMenu.group_name);
  }
  return (
    <>
      <div className="row">
        <div className="col-5">
          <GroupMenus appsData={appsData} changeGroup={(groupMenu)=>{changeIdGroup(groupMenu)}}/>
        </div>
        <div className="col-7">
          <ListMenusOnGroup appsData={appsData}/>
        </div>
      </div>
    </>
  ) 
}
export default Apps(ContainerMenus);