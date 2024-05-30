import BasicCard from "../../01-atoms/Cards/BasicCard";
import CardBody from "../../01-atoms/Cards/CardBody";
import { useState,useEffect } from "react";
import nprogress from "nprogress";
import { get } from"../../../utility/Service"
import CardHeader from "../../01-atoms/Cards/CardHeader";
import CardTitle from "../../01-atoms/Cards/CardTitle";
import CardToolbar from "../../01-atoms/Cards/CardToolbar";
import Button from "../../01-atoms/Forms/Button";
import Modal from "../../04-templates/Modal/Modal";
import InputText from "../../03-organisms/Form/Vertical/InputText";
import {post} from "../../../utility/Service"

const GroupMenus = ({ selectedGroup, props }) => {
  const [dataGroupsMenus, setDataGroupsMenus] = useState([]);
  const [menus, setMenus] = useState()
  const [modalState, setModalState] = useState('')
  const [loadingState, setLoadingState] = useState(false);
  const [groupName, setGroupName] = useState('')
  const [erroMessage, setErrorMessage] = useState('')

  useEffect(()=>{
    loadGroupMenus();
  },[])
  
  const loadGroupMenus = () =>{
    nprogress.start();
    get({ url:'menu/group',params:{ limit:100 } }).then((res)=>{
      nprogress.done()
      if(res.status === 200 && res.data.status === true){
        setDataGroupsMenus(res.data.data.records)
      }
    }).catch((error)=>{
      nprogress.done()
      swal.fire({
        title:'FAILED',
        text:error.message,
        icon:'error'
      })
    })
  }

  const saveGroupMenu = () =>{ 
    if(!groupName){
      setErrorMessage('Please type group names')
      return;
    }
    setLoadingState(true)
    nprogress.start();
    post({url:'menu/group',params:{ group_name: groupName }}).then((res)=>{
      nprogress.done();
      setLoadingState(false)

      if(res.status != 200 ){
        toastr.error(res.message,"FAILED")
        return;
      }

      if(res.data.status === false){
        toastr.error(res.data.message, "FAILED");
        return;
      }

      toastr.success("Group menus added","SUCCESS")
      const currentGroupData = [...dataGroupsMenus,res.data.data];
      setDataGroupsMenus(currentGroupData)
      setGroupName('')
    })
  }

  useEffect(()=>{
    if(props?.deletedId){
      const findIndexOnMasterData = dataGroupsMenus.findIndex(x => x.id_group === props?.deletedId);
      const currentMasterDataGroup = [...dataGroupsMenus];
      currentMasterDataGroup.splice(findIndexOnMasterData, 1);
      setDataGroupsMenus(currentMasterDataGroup)
    }
  },[props?.deletedId])

  return(
    <BasicCard props={{ addClass:'mb-5 mb-xl-8' }}>
      <CardHeader>
        <CardTitle props={{ title:'Group Menus', subtitle:'List all of group menus' }}/>
        <CardToolbar>
          <Button props={{ addClass:'btn-primary' }} onClicked={(e)=>{setModalState('show')}}>Create Group Menu</Button>
        </CardToolbar>
      </CardHeader>
      <CardBody props={{  }}>
        <table className="table align-middle table-row-dashed fs-6 gy-5 gx-3">
          <tbody className="text-gray-600 fw-bold">
            {
              dataGroupsMenus.map((menus,index)=>{
                return(
                  <tr key={'group_menus_'+index}>
                    <td>
                      <span className="fs-6 text-primary text-hover-light-primary cursor-pointer"
                        onClick={()=>{selectedGroup(menus)}}
                      >
                        {menus.group_name} <i className="lni lni-arrow-right "></i>
                      </span>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <Modal 
          props={{ 
            title: 'Add Group Menu', 
            state:modalState, 
            id:'AddGroupMenu',
            btnConfirmText:"Save Group Menu",
            loadingState:loadingState
          }} 
          onConfirm={()=>{saveGroupMenu()}}
          onHide={()=>{setModalState('hide')}}>
            <InputText props={{ label:"Group Name", defaultValue:groupName, message:erroMessage }} onChanged={(name)=>{setGroupName(name)}}/>
        </Modal>
      </CardBody>
    </BasicCard>
  )
}
export default GroupMenus;