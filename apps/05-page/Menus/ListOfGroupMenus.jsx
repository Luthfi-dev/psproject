import BasicCard from "../../01-atoms/Cards/BasicCard";
import CardHeader from "../../01-atoms/Cards/CardHeader";
import CardTitle from "../../01-atoms/Cards/CardTitle"
import CardBody from "../../01-atoms/Cards/CardBody";
import { useEffect, useState } from "react";
import nprogress from "nprogress";
import { get, post,put } from "../../../utility/Service"
import CardToolbar from "../../01-atoms/Cards/CardToolbar";
import ModalCostumize from "../../04-templates/Modal/ModalCostimize";
import { deleting } from "../../../utility/Service";
import SVGOptions from "../../01-atoms/Icons/SVG/SVGOptions";
import TableDashed from "../../01-atoms/Table/TableDashed";
import InputText from "../../03-organisms/Form/Vertical/InputText";
import Row from "../../01-atoms/Grids/Row";
import Col6 from "../../01-atoms/Grids/Col6";
import Col12 from "../../01-atoms/Grids/Col12";
import Pagination from "../../01-atoms/Table/Pagination";
import LengthChange from "../../01-atoms/Table/LengthChange";
import Search from "../../01-atoms/Table/Seach";
import Button from "../../01-atoms/Forms/Button";
import SVGTrash from "../../01-atoms/Icons/SVG/SVGTrash";

const ListOfGroupMenus = ({children, props, onDeleted}) => {
  const [modalState, setModalState] = useState('hide')
  const [stateModalCreateMenu, setStateModalCreateMenu] = useState('hide')
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('');
  const [icon, setIcon] = useState('');
  const [loadingStateSaveMenu, setLoadingStateSaveMenu] = useState(false);
  const [errorMessage, setErrorMessage] = useState({})
  const [menus, setMenus] = useState([]);
  const [filter, setFilter] = useState({limit:10,page:1,search:''})
  const [lastIndexMenuList, setLastIndexMenuList] = useState(0)

  useEffect(()=>{
    intializeJSTree();
    KTMenu.init();
    getMasteMenu();
  },[])

  useEffect(()=>{
    getMasteMenu();
  },[filter])

  useEffect(()=>{
   if(props.idGroup){
    nprogress.start();
    get({ url: 'menu/group/detail/'+props.idGroup }).then((res)=>{
      nprogress.done();
      updateDateJSTree([])
      if(res.status != 200){
        toastr.error(res.message,"FAILED");
        return;
      }
      if(res.data.status === false){
        toastr.error(res.data.message,'FAILED');
        return;
      }
      updateDateJSTree(res.data.data)
    }).catch((error)=>{
      nprogress.done()
      swal.fire({
        title:'FAILED',
        text:error,
        icon:'error'
      })
    })
  }
  },[props.idGroup])

  const intializeJSTree = () => {
    $("#jstreelistmenu").jstree({
      core: {
        themes: {
          responsive: false
        },
        // so that create works
        check_callback: true,
        data: []
      },
      types: {
        section: {
            icon: "lni lni-grid-alt fs-8 text-muted "
        },
        submenu: {
          icon: "lni lni-grid-alt fs-8 text-muted "
        },
        supersubmenu: {
          icon: "lni lni-grid-alt fs-8 text-muted "
        },
      },
      state: {
        key: "demo2"
      },
      contextmenu:{
        items: function(node){
          return {
            "Create":{
                "separator_before": false,
                "separator_after": true,
                "label": "Delete this menu list",
                "action": false,
                "icon":"flaticon-trash-1",
                "action": function(obj){
                  swal.fire({
                    text:'Are you sure to delete this list menu ?',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    cancelButtonColor:'#fd397a',
                    icon:'question'
                  }).then(function(confirm){
                    if(confirm.value){
                      nprogress.start();
                      deleting({url:'menu/group/items/'+node.id}).then((res)=>{
                        nprogress.done();
                        if(res.status != 200){
                          toastr.error(res.message,'FAILED');
                          return;
                        }

                        if(res.data.status === false){
                          toastr.error(res.message,'FAILED');
                          return;
                        }

                        $('#jstreelistmenu').jstree("delete_node", node);
                      }).catch((error)=>{
                        nprogress.done();
                        swal.fire({text:error?.message,icon:'error'})
                      })
                    }
                  })
               },
            },
          }
        }
      },
      plugins : [ "dnd", "state", "types" ,"contextmenu"]
    }).bind("move_node.jstree", function(e, data) {
      const level = data.node.parents.length 
      const index = data.position;
      const parent = data.parent;
      const id = data.node.id;
      put({url:'menu/group/items/'+id,params:{parent:parent, index:index, level:level}}).then((res)=>{
        console.log(res)
      }).catch((error)=>{
        swal.fire({text:error.message,icon:'error'})
      })
   })
  }

  const updateDateJSTree = (data) => {
    const newData = [];
    setLastIndexMenuList(data.length+1)
    data.forEach((item,i)=>{
      const children = [];
      if(item.sub.length>0){
        item.sub.forEach((sub,j)=>{
          const subchildren = [];
          if(sub.sub.length > 0){
            sub.sub.forEach((sub2,k)=>{
              subchildren.push({
                text:sub2.title,
                id:sub2.id,
                icon:sub2?.icon?.replace('fs-2',''),
                type: 'supersubmenu'
              })
            })
          }
          children.push({
            text: sub.title,
            id:sub.id,
            icon: sub?.icon?.replace('fs-2',''),
            children: subchildren,
            type: 'submenu'
          })
        })
      }
      newData.push({
        text: item.title,
        id:item.id,
        children: children,
        type: 'section'
      })
    })
    $('#jstreelistmenu').jstree(true).settings.core.data = newData;
    $('#jstreelistmenu').jstree(true).refresh();
  }

  const deleteGrupMenus =() =>{
    swal.fire({
      text:"Are you sure to delete this group menus ?",
      icon:'question',
      showCancelButton:true,
      cancelButtonText:'No',
      confirmButtonText:'Yes',
    }).then((confirm)=>{
      if(confirm.value){
        nprogress.start();
        deleting({url:'menu/group/'+props?.idGroup}).then((res)=>{
          nprogress.done();
          if(res.status != 200){
            toastr.error(res.message,"FAILED");
            return;
          }
          if(res.data.status === false){
            toastr.error(res.data.message,"FAILED");
            return;
          }
          onDeleted(props?.idGroup);
        })
      }
    })
  }

  const saveMenu = () =>{
    if(title === ''){
      setErrorMessage({title:'Please type title menu'})
      return
    }
    if(link === ''){
      setErrorMessage({link:'Please type link menu'})
      return
    }
    if(icon === ''){
      setErrorMessage({icon:'Please type icon menu'})
      return
    }
    setLoadingStateSaveMenu(true)
    nprogress.start();
    post({url:'menu',params:{ menu_title:title, menu_link: link, menu_icon: icon}}).then((res)=>{
      nprogress.done();
      setLoadingStateSaveMenu(false);

      if(res.status != 200 ){
        swal.fire({
          text:res.message,
          icon:'error'
        })
        return;
      }

      if(res.data.status === false ){
        swal.fire({
          text:res.data.message,
          icon:'error'
        })
        return;
      }

      setErrorMessage({})
      setTitle('');
      setLink('');
      setIcon('')
      toastr.success("Menus has been saved.","SUCCESS")
    }).catch((error)=>{
      nprogress.done();
      setLoadingStateSaveMenu(false)
      swal.fire({
        text:error.message,
        icon:'error'
      })
    })
  }

  const getMasteMenu = () =>{
    nprogress.start();
    get({url:'menu',params : { limit: filter?.limit, page: filter?.page,title:filter?.search}}).then((res)=>{
      nprogress.done();
      setMenus([])
      if(res.status != 200){
        toastr.error(res.message, "FAILED");
        return;
      }

      if(res.data.status === false){
        toastr.error(res.data.message, "FAILED");
        return;
      }

      setMenus(res.data.data)
    })
  }

  const deleteItemMenu = (idMenu,index)=>{
    swal.fire({
      text:"Are you sure want to delete this menu ?",
      icon:'question',
      showCancelButton:true,
      cancelButtonText:'No',
      confirmButtonText:'Yes'
    }).then((confirm)=>{
      if(confirm.value){
        nprogress.start();
        deleting({url:'menu/'+idMenu}).then((res)=>{

          if(res.status != 200){
            swal.fire({text:res.message,icon:'error'})
            return;
          }

          if(res.data.status === false){
            swal.fire({text:res.data.message,icon:'error'})
            return;
          }

          const currentMenus = [...menus.records];
          currentMenus.splice(index,1);
          setMenus({pagination:menus.pagination,records:currentMenus});
          toastr.success(res.data.message,'SUCCESS');
        })
      }
    }).then((error)=>{
      nprogress.done();
      swal.fire({text:error.message,icon:'error'})
    })
  }

  const addMenuToGroup = (idMenu,titleMenu) =>{
    nprogress.start();
    post({url:'menu/group/items',params:{id_group:props?.idGroup, id_menu:idMenu,level:'0',index:lastIndexMenuList,parent:''}}).then((res)=>{
      nprogress.done();
      if(res.status != 200){
        toastr.error(res.message,'FAILED');
        return
      }

      if(res.data.status === false){
        toastr.error(res.data.message,"FAILED");
        return;
      }
      toastr.success(res.data.message,'SUCCESS')
      setLastIndexMenuList(lastIndexMenuList+1);
      $('#jstreelistmenu').jstree("create_node", "#",{text:titleMenu,type:"section",id:res.data.data.id}, 'last', false, false);
    }).catch((error)=>{
      nprogress.done();
      swal.fire({text:error?.message,icon:'error'})
    })
  }

  return(
    <BasicCard props={{ addClass:'mb-5 mb-xl-8' }}>
        <CardHeader>
          <CardTitle props={{ title:'Structure Menu', subtitle:props?.groupNames }}/>
          <CardToolbar>
            <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
              <SVGOptions/>
            </button>
            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3" data-kt-menu="true">
              <div className="menu-item px-3">
                <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">Options</div>
              </div>
              <div className="menu-item px-3">
                <span className="menu-link px-3" onClick={()=>{setStateModalCreateMenu('show')}}>Create New Menu</span>
              </div>
              <div className="menu-item px-3">
                <span className="menu-link px-3" onClick={()=>{setModalState('show')}}>Add Menu List</span>
              </div>
              <div className="menu-item px-3">
                <span className="menu-link px-3" onClick={()=>{deleteGrupMenus()}}>Delete Group Menu</span>
              </div>
            </div>
          </CardToolbar>
        </CardHeader>

        <CardBody>
          <div id="jstreelistmenu"></div>
        </CardBody>

        <ModalCostumize props={{ title:'Menus', subtitle:'List all of menus',state:modalState, hideAction:true }} onHide={()=>{setModalState('hide')}}>
          <Row>
            <Col12>
              <Search onKeyUp={(value)=>{ setFilter({ limit:filter?.limit, page:filter?.page, search:value})}}  props={{ addClass:'mb-10'}}/>
            </Col12>
          </Row>
          <TableDashed>
            <tbody>
              {
                menus?.records?.map((menu, index)=>{
                  const icon = menu.menu_icon;
                  icon = icon ? icon.replace('fs-2','fs-10px'):'';
                  icon = icon+' fs-10px'
                  return(
                    <tr key={'listMenu_'+index}>
                      <td>
                        <span className="text-hover-primary"><i className={icon}/> {menu.menu_text}</span>
                        <div className="mb-2">
                          <div className="fw-bold text-muted fs-10px fst-italic mb-2 spesification" >{menu.menu_link ? menu.menu_link : '----'}</div>
                        </div>
                      </td>
                      <td className="text-end">
                        <Button props={{ addClass:'w-30px h-30px btn-light-danger btn-icon me-1' }} onClicked={(e)=>{deleteItemMenu(menu.id_menu,index)}}>
                          <SVGTrash props={{ size:'3' }}/>
                        </Button>
                        <Button props={{ addClass:'w-30px h-30px btn-light-primary btn-icon me-1' }}>
                        <i className="bi bi-pencil "></i>
                        </Button>
                        <Button props={{ addClass:'w-30px h-30px btn-light-success btn-icon' }} onClicked={(e)=>{addMenuToGroup(menu.id_menu,menu.menu_text)}}>
                          <i className="bi bi-check fs-2x"></i>
                        </Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </TableDashed>
          <Row>
            <Col6>
              <LengthChange onChange={(length)=>{ setFilter({ limit:length, page:filter?.page, search:filter?.search})}} />
            </Col6>
            <Col6> 
              <Pagination props={{ pagination:menus.pagination }} onChange={(page)=>{setFilter({limit:filter?.limit,page:page,search:filter?.search})}}/>
            </Col6>
          </Row>
        </ModalCostumize>

        <ModalCostumize 
          props={{ 
            title:'Menus', 
            subtitle:'Create new menu item',
            state:stateModalCreateMenu,
            id:'modalAddMenu',
            loadingState:loadingStateSaveMenu 
          }} 
          onHide={()=>{setStateModalCreateMenu('hide')}} 
          onConfirm={()=>{saveMenu()}}>
          <InputText props={{ label:"Menu Title", defaultValue:title, message:errorMessage?.title}} onChanged={(value)=>{setTitle(value)}}/>
          <InputText props={{ label:"Menu Link", defaultValue:link, message:errorMessage?.link, placeholder:"Without Base URL..." }} onChanged={(value)=>{setLink(value)}}/>
          <InputText props={{ label:"Menu Icon", defaultValue:icon, message:errorMessage?.icon, placeholder:'Class icon of lineicon, fontawesome' }} onChanged={(value)=>{setIcon(value)}}/>
        </ModalCostumize>

    </BasicCard>
  )
}
export default ListOfGroupMenus;