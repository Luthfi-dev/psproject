import nprogress from "nprogress";
import getConfig from 'next/config'
import StringHelper from "../../../helper/Stringhelper";
import Image from "next/image";
import { useEffect, useState } from "react"
import { get } from "../../../utility/Service";
import { serverAssets } from "../../../utility/Image"
const { publicRuntimeConfig } = getConfig()

const PanelMasterPAA = ({props, setState, selectedPAA}) => {
  const [listOfMasterData, setListOfMasterData] = useState([]);
  const [onLoad, setOnLoad] = useState(false);
  const [limit] = useState(50);
  const [page, setPage] = useState(1);
  const stringHelper = new StringHelper()
  const bgList = ['danger','success','primary','warning']
  
  useEffect(() => {
    if(props?.state === 'show'){
      setPage(1)
      KTDrawer.createInstances();
      var drawerElement = document.querySelector("#panel_master_data_paa");
      var drawer = KTDrawer.getInstance(drawerElement);
      drawer.show();
      drawer.on("kt.drawer.hide", function() {
        setState('hide')
      });
      getMasterDataPAA()
    }
    if(props?.state === 'hide'){
      KTDrawer.createInstances();
      var drawerElement = document.querySelector("#panel_master_data_paa");
      var drawer = KTDrawer.getInstance(drawerElement);
      drawer.hide();
    }
  }, [props?.state]);

  const getMasterDataPAA = ()=> {
    if(onLoad === true){
      blockUI.release()
      blockUI.destroy()
      nprogress.done();
    }
    setOnLoad(true)
    nprogress.start();
    const tbody = document.querySelector("#contentOfListMasterPAA");
    var blockUI = new KTBlockUI(tbody,{
      message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
    });
    blockUI.block()
    let endpointUrl = '';
    endpointUrl = publicRuntimeConfig.HOST_API + '/lineapproval/programassistance'
    get({url:endpointUrl, params: {page, limit}}).then((res)=>{
      nprogress.done();
      setOnLoad(false)
      blockUI.release()
      blockUI.destroy()
      nprogress.done();
      if(res.status != 200 || res?.data?.status != true || res?.data?.data === null || res?.data?.data.length < 1){
        setListOfMasterData([]);
        return;
      }
      const remapData = res.data.data.reduce((data, row) => {
        delete row.units
        data.push(row)
        return data
      },[])
      setListOfMasterData(remapData)
    }).catch((error)=>{
      blockUI.release()
      blockUI.destroy()
      nprogress.done();
      setOnLoad(false)
      toastr.error(error.message,"FAILED");
    })
  }

  return(
    <div 
      id="panel_master_data_paa" 
      className="bg-dark" 
      data-kt-drawer="true" 
      data-kt-drawer-name="source_fund" 
      data-kt-drawer-activate="true" 
      data-kt-drawer-overlay="true" 
      data-kt-drawer-width="{default:'500px'}" 
      data-kt-drawer-direction="end">
      <div className="card shadow-none rounded-0 w-100">
        <div className="card-header">
          <h3 className="card-title fw-bolder text-gray-700">Program Assistance</h3>
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
        <div className="card-body bg-white" id="contentOfListMasterPAA">
          <div className="table-responsive my-5 scroll h-700px " >
            <table className="table gs-0 gx-1 table-row-dashed table-row-gray-200 gs-0 gy-1">
              <thead>
                <tr className="border-0">
                  <th className="p-0"></th>
                  <th className="p-0 w-10px"></th>
                </tr>
              </thead>
              <tbody>
                {
                  listOfMasterData.length === 0 &&
                  <tr>
                    <td colSpan={2}>
                      <span className="fw-boldest text-danger">
                        Program Assistance Not Found
                      </span>
                    </td>
                  </tr>
                }
                {
                  listOfMasterData?.map((paa, index) => {
                    return(
                      <tr key={'master_item_i' + index}>
                        <td>
                          <div className="d-flex align-items-center flex-grow-1 mb-2 bg-white px-0 rounded-1 cursor-pointer py-2"
                            onClick={()=>{
                              selectedPAA(paa)
                            }}
                          >
                            <div className="symbol symbol-35px cursor-pointer">
                              <div className="container-img w-35px me-3">
                                {
                                  paa?.avatar ?
                                  <Image 
                                  src={paa?.avatar+'?subfolder=avatars&'}
                                  loader={serverAssets}
                                  alt="" layout="fill" className="img symbol  "/>
                                  :
                                  <span className={'symbol-label fw-bold text-uppercase bg-'+bgList[Math.floor(Math.random()*bgList.length)]+' text-light'}>{stringHelper.initialProfile(paa?.name,2)}</span>
                                }
                              </div>
                            </div>
                            <div className="d-flex-column">
                              <span className="d-flex fw-bolder text-gray-700">{paa?.name}</span>
                              <span className="text-muted fs-8">{paa?.purpose}</span>
                            </div>
                          </div>
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
    </div>
  )
}
export default PanelMasterPAA