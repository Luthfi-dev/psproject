import nprogress from "nprogress";
import getConfig from 'next/config'
import StringHelper from "../../../helper/Stringhelper";
import Image from "next/image";
import { useEffect, useState } from "react"
import { get } from "../../../utility/Service";
import { serverAssets } from "../../../utility/Image"
const { publicRuntimeConfig } = getConfig()

const PanelMasterUsers = ({props, setState, selectedRequestor}) => {
  const [listOfMasterData, setListOfMasterData] = useState([]);
  const [onLoad, setOnLoad] = useState(false);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [employeeName, setEmployeeName] = useState();
  const [refreshStateSearching, setRefreshStateSearching] = useState();
  const stringHelper = new StringHelper()
  const bgList = ['danger','success','primary','warning']
  
  useEffect(() => {
    if(props?.state === 'show'){
      setPage(1)
      KTDrawer.createInstances();
      var drawerElement = document.querySelector("#panel_master_data_users");
      var drawer = KTDrawer.getInstance(drawerElement);
      drawer.show();
      drawer.on("kt.drawer.hide", function() {
        setState('hide')
      });
      getMasterDataUsers()
    }
    if(props?.state === 'hide'){
      KTDrawer.createInstances();
      var drawerElement = document.querySelector("#panel_master_data_users");
      var drawer = KTDrawer.getInstance(drawerElement);
      drawer.hide();
    }
  }, [props?.state]);

  useEffect(() => {
    if(refreshStateSearching){
      getMasterDataUsers()
    }
  }, [refreshStateSearching]);

  const getMasterDataUsers = ()=> {
    if(onLoad === true){
      blockUI.release()
      blockUI.destroy()
      nprogress.done();
    }
    setOnLoad(true)
    nprogress.start();
    const tbody = document.querySelector("#contentOfListMasterUsers");
    var blockUI = new KTBlockUI(tbody,{
      message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
    });
    blockUI.block()
    let endpointUrl = '';
    endpointUrl = publicRuntimeConfig.HOST_API + '/users'
    get({
      url:endpointUrl, 
      params: {
        page:1, 
        limit, 
        user_level: 1,
        account_status: 1,
        name: employeeName
    }}).then((res)=>{
      nprogress.done();
      setOnLoad(false)
      blockUI.release()
      blockUI.destroy()
      nprogress.done();
      if(res.status != 200 || res?.data?.status != true || res?.data?.records === null || res?.data?.data?.records.length < 1){
        setListOfMasterData([]);
        return;
      }
      setListOfMasterData(res.data.data.records)
    }).catch((error)=>{
      blockUI.release()
      blockUI.destroy()
      nprogress.done();
      setOnLoad(false)
      toastr.error(error.message,"FAILED");
    })
  }

  const loadMoreDataItemRequest = () => {
    if(onLoad === true){
      blockUI.release()
      blockUI.destroy()
      nprogress.done();
    }
    setOnLoad(true)
    nprogress.start();
    const tbody = document.querySelector("#contentOfListMasterUsers");
    var blockUI = new KTBlockUI(tbody,{
      message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
    });
    blockUI.block()
    let endpointUrl = '';
    endpointUrl = publicRuntimeConfig.HOST_API + '/users'
    get({
      url:endpointUrl, 
      params: {
        page, 
        limit, 
        user_level: 1,
        account_status: 1,
        name: employeeName
    }}).then((res)=>{
      nprogress.done();
      setOnLoad(false)
      blockUI.release()
      blockUI.destroy()
      nprogress.done();
      const currentData = [...listOfMasterData]
      if(res.status != 200 || res?.data?.status != true || res?.data?.records === null || res?.data?.data?.records.length < 1){
        setListOfMasterData(currentData);
        throw Object({ message: 'No more data to load.'})
      }
      if (res.data.data.records.length > 0)  setPage(page + 1)
      currentData.push(...res.data.data.records)
      setListOfMasterData(currentData)
    }).catch((error)=>{
      blockUI.release()
      blockUI.destroy()
      nprogress.done();
      setOnLoad(false)
      toastr.error(error.message,"FAILED");
    })
  }

  const updateEmployeeName = async (name) => {
    const localInterval = 3
    const refreshSearching = false
    setInterval(() => {
      const currentSearchName = document.getElementById('search_employee')?.value
      if (--localInterval < 0 && name === currentSearchName && refreshSearching === false && props?.state === 'show') {
        refreshSearching = true
        setRefreshStateSearching(Date.now())
      }
    }, 150);
  }

  return(
    <div 
      id="panel_master_data_users" 
      className="bg-dark" 
      data-kt-drawer="true" 
      data-kt-drawer-name="source_fund" 
      data-kt-drawer-activate="true" 
      data-kt-drawer-overlay="true" 
      data-kt-drawer-width="{default:'500px'}" 
      data-kt-drawer-direction="end">
      <div className="card shadow-none rounded-0 w-100">
        <div className="card-header">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder text-dark">Requestor</span>
            <span className="text-muted mt-1 fw-bold fs-7">Select a users to show spesific request</span>
          </h3>
          <div className="card-toolbar">
            <button type="button" className="btn btn-sm btn-icon btn-active-light-primary me-n5"
              onClick={()=>{setState('hide')}}
              >
              <span className="svg-icon svg-icon-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                  <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="card-body bg-white">
          <div className="d-flex align-items-center position-relative my-0 rounded  border border-secondary" >
            <span className="svg-icon svg-icon-1 position-absolute ms-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="black"></rect>
                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="black"></path>
              </svg>
            </span>
            <input
              type="text" 
              className="form-control form-control-solid ps-15" 
              id="search_employee"
              placeholder="Search here..." 
              onChange={(e)=>{
                updateEmployeeName(e.target.value)
                setEmployeeName(e.target.value)
              }}
              />
          </div>
          <div className="table-responsive my-5 scroll h-700px " >
            <table className="table gs-0 gx-1 table-row-dashed table-row-gray-200 gs-0 gy-1" id="contentOfListMasterUsers">
              <thead>
                <tr className="border-0">
                  <th className="p-0"></th>
                  <th className="p-0 w-10px"></th>
                </tr>
              </thead>
              <tbody>
                {
                  listOfMasterData.length === 0 && employeeName === '' &&
                  <tr>
                    <td colSpan={2}>
                      <span className="fw-boldest text-danger">
                        No Data Requestor Found
                      </span>
                    </td>
                  </tr>
                }
                {
                  listOfMasterData.length === 0 && employeeName !== '' &&
                  <tr>
                    <td colSpan={2} className="d-flex flex-column flex-row-auto text-center">
                      <span className="fst-italic fw-bold">
                        {employeeName}
                      </span>
                      <span className="fw-normal pb-0">
                        Requestor Not Found
                      </span>
                    </td>
                  </tr>
                }
                {
                  listOfMasterData?.map((user, index) => {
                    return(
                      <tr key={'master_item_i' + index}>
                        <td>
                          <div className="d-flex align-items-center flex-grow-1 mb-2 bg-white px-0 rounded-1 cursor-pointer py-2"
                            onClick={()=>{
                              selectedRequestor(user)
                            }}
                          >
                            <div className="symbol symbol-35px cursor-pointer">
                              <div className="container-img w-35px me-3">
                                {
                                  user?.avatar  ?
                                  <Image 
                                  src={user?.avatar+'?subfolder=avatars&'}
                                  loader={serverAssets}
                                  alt="" layout="fill" className="img symbol  "/>
                                  :
                                  <span className={'symbol-label fw-bold text-uppercase bg-'+bgList[Math.floor(Math.random()*bgList.length)]+' text-light'}>{stringHelper.initialProfile(user?.name,2)}</span>
                                }
                              </div>
                            </div>
                            <div className="d-flex-column">
                              <span className="d-flex fw-bolder text-gray-700">{user?.name}</span>
                              <span className="text-muted fs-8">{user?.purpose}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
              {
                listOfMasterData.length > 0 &&
                <tfoot>
                  <tr>
                    <th colSpan={2}>
                      <button type="button" className="btn btn-sm btn-primary rounded-1 w-100" data-kt-indicator={onLoad ? 'on':'off'} disabled={onload} onClick={()=>{loadMoreDataItemRequest()}}>
                        <span className="indicator-label">
                            Load More
                        </span>
                        <span className="indicator-progress">
                            Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                      </button>
                    </th>
                  </tr>
                </tfoot>
              }
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PanelMasterUsers