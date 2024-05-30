import Image from "next/image";
import Calender from "../../../../helper/Calender";
import Encryption from "../../../../utility/Encryption";
import Link from "next/link";
import DatatableSearch from "../../../Datatable/DatatableSearch";
import DatatableToolbars from "../../../Datatable/DatatableToolbars";
import StringHelper from "../../../../helper/Stringhelper";
import Pagination from "../../../Datatable/Pagination";
import { useState, useEffect } from "react";
import { get, deleting } from "../../../../utility/Service"
import cookie from "js-cookie"
import nprogress from "nprogress";
import FormFilter from "./FormFilter";
import {imgLoader,serverAssets} from "../../../../utility/Image"
import Script from "next/script";
import { Tooltip } from '@nextui-org/react';


const CardBody = ({appsData}) =>{
  const encryption = new Encryption();
  const calender = new Calender();
  const stringHelper = new StringHelper();
  const columns = [...appsData.table.columns] 
  const options = appsData.table.options;
  const bgList = ['success','warning','danger','dark','info'];
  const [recordData,setRecordData]= useState([]);
  const [pagination,setPagination]=useState({});
  const [limit,setLimit]=useState(10);
  const [page,setPage]=useState(1);
  const [keySearch,setKeySearch]=useState();
  const [projectId,setProjectId]=useState();
  const [filteStateId, setFilterStateId]=useState(0);

  appsData.table.filterState = true;
  appsData.table.filterStateData = [
    {
      "id":0,
      "value":"New Request"
    },{
      "id":1,
      "value":"Request On Progress"
    },{
      "id":2,
      "value":"Request Rejected"
    },{
      "id":3,
      "value":"Request Approved"
    },{
      "id":4,
      "value":"All Request"
    }
  ]
  useEffect(() => {
    loadData();
  },[appsData.table.stateData,page,limit,keySearch,projectId,filteStateId])
  const searchData = (query)=>{
    setKeySearch(query);
    setPage(1)
    setLimit(10)
  }
  const filterStateChange = (id) =>{
    setFilterStateId(id)
  }
  const loadData = () =>{
    var filter= [];
    const stateURL = {
      0:'goodsandservices/incoming/new',
      1:'goodsandservices/incoming/pending',
      2:'goodsandservices/incoming/rejected',
      3:'goodsandservices/incoming/approved',
      4:'goodsandservices',
    }
    nprogress.start();
    const endpointURL = process.env.HOST_API+stateURL[filteStateId];
    get({
      url:endpointURL,
      params:{
        page:page,
        limit:limit
      },
      token:cookie.get("fast_token")
    }).then((res)=>{
      nprogress.done();
      if(res.status === 200 && res.data.status === true && res.data.data){
        setRecordData(res.data.data.records);
        if(res.data.data.pagination.page === 1){
          setPagination({
            totalPage:res.data.data.pagination.totalPage
          });
        }
      }
      if(res.status != 200 || res.data.status != true){
        setRecordData([])
      }
    }).catch((err)=>{
      toastr.error("Coba Beberapa Saat Lagi.","Error")
    })
  }
  const changeLimit = (int)=>{
    setLimit(parseInt(int));
    if(page != 1){
      setPage(1)
    }
  }
  const deleteDraft = (torNumber, index)=>{
    nprogress.start();
    deleting({
      url:'goodsandservices/draft/'+torNumber,
      token:cookie.get('fast_token')
    }).then((res)=>{
      nprogress.done();
      if(res.status === 200 && res?.data?.status === true){
        loadData();
        return
      }
      swal.fire({
        title:"FAILED",
        text:res.data.message,
        icon:'error'
      })
    }).catch((error)=>{
      nprogress.done();
      swal.fire({
        title:'FAILED',
        text:error,
        icon:'error'
      })
    })
  }


  return (
    <>
      <div className="card-body py-3 ">
        <div className='row'>
          <div className='d-flex flex-stack mb-5 mt-5'>
            {
              options.search === true ? 
              <DatatableSearch 
                props={appsData.table} 
                searchData={(query)=>{searchData(query)}}
                filterStateId={(id)=>{filterStateChange(id)}}
              />:'' 
            }
            {
              options.toolbar === true ? 
              <DatatableToolbars 
                props={appsData.table}
              />
              :'' 
            }
          </div>
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
                recordData.length === 0 ? 
                <tr>
                  <td colSpan={5} className={'text-center'}>
                    <div className="container-img mw-150px d-inline-block" >
                      <Image 
                      src={'media/other/notfound.png'} 
                      layout='fill' className="img "
                      loader={imgLoader}
                      />
                    </div>
                  </td>
                </tr>
                :
                recordData.map((row, index) => {
                const logoProject = row.kegiatan.project.project_id === 8 ? 'epic.png':'lingkages.png';
                return (
                  <tr key={index+'_rowsData'}>
                    <td>
                      <Tooltip
                        color="invert"
                        content="See more detail request"
                        trigger="hover"
                        placement="right">
                        <Link href={{
                          pathname: '/goodsandservices/detail',
                          query: { 
                            id: encryption.encrypt(row.pr_number),
                          },
                        }} >
                          <div className="symbol symbol-45px me-2 cursor-pointer" >
                            <span className="symbol-label">
                              <Image src={'media/logos/'+logoProject}
                              className="img symbol align-self-center p-2" layout="fill"
                              loader={imgLoader}/>
                            </span>
                          </div>
                        </Link>
                      </Tooltip>
                    </td>

                    <td className="align-top">
                      <Tooltip
                      color="invert"
                      content="See more detail request"
                      trigger="hover"
                      placement="right">
                        <Link href={{
                          pathname: '/goodsandservices/detail',
                          query: { 
                            id: encryption.encrypt(row.pr_number),
                          },
                        }} >
                          <a className="text-muted fw-bolder text-hover-primary mb-1 fs-6">
                            { row.pr_number }
                            <small className=" text-danger opacity-90 fw-bold d-block fs-9">
                              <i className="fs-9 text-danger opacity-90  las la-angle-double-right"></i> 
                              {row.kegiatan.funding?.source_fund} - {row.kegiatan.funding?.charge_code}
                            </small>
                            <small className=" text-primary fw-bold flex d-block min-w-200px">Rp {row.budget_estimation}</small>
                          </a>
                        </Link>
                      </Tooltip>
                    </td>
                    <td className="align-top">
                      <small>{row.kegiatan.activity}</small> 
                      <small className={row.kegiatan.jenis_data === 1 ? 'fw-bold flex d-block min-w-200px fs-10 text-primary':'fw-bold flex d-block min-w-200px fs-10 text-danger'} >
                        <i className={row.kegiatan.jenis_data === 1 ? 'fs-10 text-primary lar la-dot-circle':'fs-10 text-danger lar la-dot-circle'} ></i> 
                        {row.kegiatan.jenis_data === 1 ? ' Monthly Activiy':' Goods & Services'}
                      </small>
                      <small className="text-gray-400 fw-bold flex d-block min-w-200px fs-10" > 
                        <i className="text-gray-400 fs-10 las la-pencil-alt"></i> 
                        {calender.dateFormat(row.create_date, "yyyy-mm-dd h:MM:ss")}
                      </small>
                    </td>

                    <td className="align-top">
                      <small>{row.kegiatan.groups.name}</small> 
                      <small className="text-gray-500 fw-bold flex d-block min-w-200px fs-10" > 
                        {row.kegiatan.deliverable.deliverable}
                      </small>
                    </td>
                    <td>
                      <div className="d-flex align-items-center flex-grow-1">
                        <div className="symbol symbol-45px me-5 ">
                          <div className="container-img w-45px">
                            {
                              row.requestor?.avatar  ?
                              <Image 
                              src={row.requestor?.avatar+'?subfolder=avatars&'}
                              loader={serverAssets}
                              alt="" layout="fill" className="img symbol  "/>
                              :
                              <span className={'symbol-label fs-2 fw-bold text-uppercase bg-'+bgList[Math.floor(Math.random()*bgList.length)]+' text-light'}>{stringHelper.initialProfile(row.requestor.name,2)}</span>
                              
                            }
                          </div>
                        </div>
                        <div className="d-flex flex-column">
                          <a href="#" className="text-gray-900 text-hover-primary fs-6 fw-bolder">
                            {row.requestor.name}
                          </a>
                          <span className="text-gray-400 fw-bold fs-9">
                            {row.requestor.purpose}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="row mb-8 mt-5">
            <Pagination
            changeLength={
              (int)=>changeLimit(int)
            }
            pagination={pagination}
            changePage={
              (selectedPage)=>setPage(selectedPage+1)
            }
            />
          </div>
        </div>
      </div>
      <FormFilter appsData={appsData} changeProject={(idProject)=>{setProjectId(idProject)}}/>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          KTApp.init();
          `
        }}
      />
    </>
  )
}
export default CardBody;