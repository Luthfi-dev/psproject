import cookie from "js-cookie"
import nprogress from "nprogress"
import { useEffect, useState } from "react"
import { get } from '../../../../utility/Service'

const GroupMenus = ({appsData,changeGroup}) =>{
  const columns = [...appsData.table.columns] 
  const [dataGroupMenus, setDataGroupMenus] = useState([])

  useEffect(()=>{
    loadGroupMenus();
  },[])
  
  const loadGroupMenus = () =>{
    nprogress.start();
    get({
      url:'menu/group',
      params:{
        limit:10,
      },
      token: cookie.get('fast_token')
    }).then((res)=>{
      nprogress.done();
      if(res.status === 200 && res.data.status === true){
        setDataGroupMenus(res.data.data.records)
      }
    }).catch((error)=>{
      nprogress.done()
      swal.fire({
        title:'FAILED',
        text:error,
        icon:'error'
      })
    })
  }

  const loadItemsMenu = (groupMenu) =>{
    changeGroup(groupMenu)
  }
  
  return(
    <>
      <div className="card card-xl-stretch mb-5 mb-xl-8">
        <div className="card-body py-3 ">
          <div className='row'>
            <table className="table align-middle table-row-dashed fs-6 gy-5 gx-3">
              <thead>
                <tr className="text-start text-gray-700 fw-bolder fs-7 text-uppercase  bg-lighten">
                  {columns.map((field,index)=>{
                    const classField = field.className === '' || typeof(field.className) === 'undefined' ? '':field.className;
                    return (<th className={classField} key={'th_datatable_'+index}>{field.field}</th>)
                  })}
                </tr>
              </thead>
              <tbody className="text-gray-600 fw-bold">
                {
                  dataGroupMenus.map((menus,index)=>{
                    return(
                      <tr key={'group_menus_'+index}>
                        <td>
                          <span className="fs-6 text-primary text-hover-light-primary cursor-pointer"
                            onClick={()=>{loadItemsMenu(menus)}}
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
          </div>
        </div>
      </div>
    </>
  )
}
export default GroupMenus;