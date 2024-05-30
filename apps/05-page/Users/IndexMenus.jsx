import GroupMenus from "./GroupMenus";
import ListOfGroupMenus from "./ListOfGroupMenus";
import Row from "../../01-atoms/Grids/Row";
import Col5 from "../../01-atoms/Grids/Col5";
import Col7 from "../../01-atoms/Grids/Col7";
import { useState } from "react";

const IndexMenus = () =>{
  const [idGroupsMenus, setIdGroupsMenus] = useState(false)
  const [groupNames, setGroupNames] = useState('')
  const [deletedId, setDeletedId] = useState('')

  const changeIdGroups = (menus)=>{
    setIdGroupsMenus(menus.id_group)
    setGroupNames(menus.group_name)
  }

  const removeFromList = (idGroup)=>{
    setIdGroupsMenus();
    setDeletedId(idGroup)
  }
  
  return (
    <Row>
      <Col5>
        <GroupMenus selectedGroup={(menus)=>{changeIdGroups(menus)}} props={{ deletedId : deletedId }}/>
      </Col5>
      <Col7> 
      {
        idGroupsMenus &&
        <ListOfGroupMenus props={{ idGroup: idGroupsMenus, groupNames:groupNames }} onDeleted={(idGroup)=>{removeFromList(idGroup)}}/>
      }
      </Col7>
    </Row>
  )
}
export default IndexMenus;