import nprogress from "nprogress";
import { useEffect, useState } from "react";
import { get } from "../../../../utility/Service";
import Cookies from "js-cookie";
const ListMenusOnGroup = ({appsData}) =>{
  useEffect(()=>{
    intializeJSTree()
  },[])

  useEffect(()=>{
    if(appsData.selectedGroupID != ''){
      nprogress.start();
      get({
        url: 'menu/group/detail/'+appsData.selectedGroupID,
        token: Cookies.get('fast_token')
      }).then((res)=>{
        nprogress.done();
        if(res.status === 200 && res.data.status === true){
          updateDateJSTree(res.data.data)
          return;
        }
        swal.fire({
          title:'FAILED',
          text:res.data.message,
          icon:'error'
        })
        $('#jstreeperiode').jstree(true).settings.core.data = [];
        $('#jstreeperiode').jstree(true).refresh();
      }).catch((error)=>{
        nprogress.done()
        swal.fire({
          title:'FAILED',
          text:error,
          icon:'error'
        })
      })
    }
  },[appsData.selectedGroupID]);

  const intializeJSTree = () => {
    $("#jstreeperiode").jstree({
      core: {
        themes: {
          responsive: false
        },
        // so that create works
        check_callback: true,
        data: []
      },
      types: {
        default: {
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
      // contextmenu:{
      //   items: function(node){
      //     if(node.type === 'root'){
      //         return false;
      //     } else if(node.type === 'submenu'){
      //       return {
      //         "Create":{
      //             "separator_before": false,
      //             "separator_after": true,
      //             "label": "Create Report Period",
      //             "action": false,
      //             "icon":"flaticon-edit-1"
      //         },
      //       }
      //     }
      //   }
      // },
      plugins : [ "dnd", "state", "types" ,"contextmenu"]
    });
  }
  const updateDateJSTree = (data) => {
    const newData = [];
    data.forEach((item,i)=>{
      const children = [];
      if(item.sub.length>0){
        item.sub.forEach((sub,j)=>{
          const subchildren = [];
          if(sub.sub.length > 0){
            sub.sub.forEach((sub2,k)=>{
              subchildren.push({
                text:sub2.title+' ['+sub2.id+']',
                icon:sub2.icon.replace('fs-2',''),
                type: 'supersubmenu'
              })
            })
          }
          children.push({
            text: sub.title+' ['+sub.id+']',
            icon: sub.icon.replace('fs-2',''),
            children: subchildren,
            type: 'submenu'
          })
        })
      }
      newData.push({
        text: item.title+' ['+item.id+']',
        children: children,
        type: 'section'
      })
    })
    $('#jstreeperiode').jstree(true).settings.core.data = newData;
    $('#jstreeperiode').jstree(true).refresh();
  }
  return(
    <>
      <div className="card card-xl-stretch mb-5 mb-xl-8">
        <div className="card-header">
          <h3 className="card-title align-items-start flex-column">
            <span className="fw-bolder m-0">Struktur Menus</span>
            <span className="text-muted mt-1 fw-bold fs-7">{appsData.selectedGroupName}</span>
          </h3>
        </div>
        <div className="card-body">
          <div id="jstreeperiode"></div>
        </div>
      </div>
    </>
  )
}
export default ListMenusOnGroup;