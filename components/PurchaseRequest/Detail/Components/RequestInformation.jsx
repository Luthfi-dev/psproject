import Image from "next/image";
import ItemsRequested from "./ItemsRequested";
import { useEffect, useState } from "react";
import { imgLoader , serverAssets} from "../../../../utility/Image";
import Calender from "../../../../helper/Calender";
import StringHelper from "../../../../helper/Stringhelper";
import Script from "next/script";
import {put} from "../../../../utility/Service";
import nprogress from "nprogress";
import cookie from "js-cookie"
import Link from "next/link";
import path from "path"
import Currency from "../../../../helper/Currency";

const RequestInformation = ({appsData}) =>{
  const calender = new Calender();
  const stringHelper = new StringHelper();
  const detail = appsData?.detail;
  const bgList = ['success','warning','danger','dark','info'];
  const [totalAllowed, setTotalAllowed]=useState();
  const [upAllowed, setUpAllowed]=useState();
  const [totalPR, setTotalPR]=useState();
  const [totalRemaining, setTotalRemaining]=useState();
  const [percentUsed, setPercentUsed]=useState();
  const [remainingLabel,setRemainingLabel]=useState('success');
  const currency = new Currency();

  const setupBudgetInformation = () =>{
    const totalEstimation = detail?.kegiatan?.budget_estimaton ? detail?.kegiatan?.budget_estimaton.replaceAll(".",""):0;
    const upAllowed = (20/100)*totalEstimation;
    const totalAllowing = parseInt(totalEstimation)+parseInt(upAllowed);
    const totalCashAdvance = detail?.total_expanse_price ? parseFloat(detail?.total_expanse_price.replaceAll(".",'')):0;
    const totalPircePR =  parseFloat(appsData.totalPR.replaceAll(".",""))
    const totalRemaining = parseFloat(totalAllowing)-parseFloat(totalPircePR)-parseFloat(totalCashAdvance);
    const percentaceRemaining = Math.ceil( ( ( totalCashAdvance + totalPircePR ) / totalAllowing ) * 100 );

    setUpAllowed(currency.rupiah(upAllowed))
    setTotalAllowed(currency.rupiah(totalAllowing))
    setTotalPR(currency.rupiah(totalPircePR))
    setTotalRemaining(currency.rupiah(totalRemaining))
    setPercentUsed( percentaceRemaining )
  }

  useEffect(()=>{
    setupBudgetInformation();
  },[appsData.totalPR])

  useEffect(()=>{
    if( parseInt(percentUsed) <= 50 ){
      setRemainingLabel('success')
    }
    if ( parseInt(percentUsed)>50 && parseInt(percentUsed)<=80 ){
      setRemainingLabel('warning')
    }
    if( parseInt(percentUsed) > 80 ){
      setRemainingLabel('danger')
    }
  },[percentUsed])
  return(
    <>
      <div className="col-xl-12">
        <div className="card mb-5 mb-xl-3">
          <div className="card-header">
            <h3 className="card-title align-items-start flex-column">
              <span className="fw-bolder m-0">PR NUMBER</span>
              <span className="text-muted mt-1 fw-bold fs-7">{detail?.pr_number}</span>
            </h3>
          </div>
          <div className="card-body">
            <div className="row mb-0">
              <label className="col-lg-3 col-form-label fw-bold fs-6 ">Current State</label>
              <div className="col-lg-9">
                {
                  ['1','3','5','6'].includes(detail?.pr_state) &&
                  <span className="badge badge-danger mt-3">*){detail?.pr_state_string}</span>
                }
                {
                  ['2','4','8','9'].includes(detail?.pr_state) &&
                  <span className="badge badge-warning mt-3">{detail?.pr_state_string}</span>
                }
                {
                  ['0','7'].includes(detail?.pr_state) &&
                  <span className="badge badge-success mt-3">{detail?.pr_state_string}</span>
                }
              </div>
            </div>
            <div className="row mb-0">
              <label className="col-lg-3 col-form-label fw-bold fs-6 ">Request Best On</label>
              <div className="col-lg-9">
                <span className="badge badge-primary mt-3">{detail?.kegiatan.jenis_data_string}</span>
              </div>
            </div>
            <div className="row mb-5">
              <label className="col-lg-3 col-form-label fw-bold fs-6 ">Thershold</label>
              <div className="col-lg-9">
                <span className="badge badge-danger mt-3">{detail?.selected_threshold?.threshold ? detail?.selected_threshold?.threshold:"Not Threshold"}</span>
              </div>
            </div>
            <div className="row mb-5">
              <label className="col-lg-3 col-form-label fw-bold fs-6 ">Request By</label>
              <div className="col-lg-9">
                <div className="d-flex align-items-center flex-grow-1">
                  <div className="symbol symbol-45px me-5 mw-45px">
                    <div className="container-img w-45px">
                      {
                        detail?.requestor.avatar ? 
                        <Image 
                          src={detail?.requestor.avatar+'?subfolder=avatars&'} 
                          loader={serverAssets}
                          layout="fill" 
                          className="img symbol"
                        />
                        :
                        <span className={'symbol-label mw-45px fs-2 fw-bold text-uppercase bg-primary text-light'}>{stringHelper.initialProfile(detail?.requestor.name,2)}</span>
                      }                  
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <a href="#" className="text-gray-900 text-hover-primary fs-6 fw-bolder">{detail?.requestor.name}</a>
                    <span className="text-gray-400 fw-bold fs-9">{detail?.requestor.purpose} - {detail?.requestor.unit}</span>
                    <span className="text-primary fw-bold fs-9"><i className="las la-cloud-upload-alt text-primary fs-7"></i> {calender.dateFormat(detail?.create_date, "dd-mmmm-yyyy h:MM:ss")}</span>
                  </div>
                </div>
              </div>
            </div>
            { detail?.assistance_selected &&
            <div className="row mb-5">
              <label className="col-lg-3 col-form-label fw-bold fs-6 ">Program Assistance Selected</label>
              <div className="col-lg-9">
                <div className="symbol-group symbol-hover mb-3">
                  {
                    detail.assistance_selected.map((pa,index)=>{
                      return(
                        <div className="symbol symbol-45px w-45px me-3" data-bs-toggle="tooltip" title="" data-bs-original-title={pa.name} key={pa+'_'+index+'_el'}>
                          {
                            pa.avatar ?
                            <div className="container-img">
                              <Image 
                              loader={serverAssets}
                              src={pa.avatar+'?subfolder=avatars&'} 
                              className='img symbol' 
                              layout="fill"
                              />
                            </div>
                            :
                            <span className={'symbol-label mw-35px fs-6 fw-bold text-uppercase bg-'+bgList[Math.floor(Math.random()*bgList.length)]+' text-light'}>{stringHelper.initialProfile(pa?.name,2)}</span>
                          }
                        </div>  
                      )
                    })
                  }
                </div>
              </div>
            </div>
            }
            <div  id="sectionBudgetInformation"></div>
            <div className="row mb-5">
              <label className="col-lg-3 col-form-label fw-bold fs-6 ">Description / Activity</label>
              <div className="col-lg-9">
                <textarea className="form-control form-control-solid" rows="4" readOnly={true} defaultValue={detail?.kegiatan.activity}></textarea>
              </div>
            </div>
            <div className="row mb-5">
              <label className="col-lg-3 col-form-label fw-bold fs-6 ">TOR Number & Activity Code</label>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-6 fv-row fv-plugins-icon-container">
                    <input type="text" className="form-control form-control-lg form-control-solid " placeholder="TOR Number" defaultValue={detail?.tor_number} readOnly={true} />
                  </div>
                  <div className="col-lg-6 fv-row fv-plugins-icon-container">
                    <input type="text" className="form-control form-control-lg form-control-solid" placeholder="Acitivity Code" defaultValue={detail?.kegiatan.kode_kegiatan} readOnly={true}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-5" >
              <label className="col-lg-3 col-form-label fw-bold fs-6 ">Budget Information</label>
              <div className="col-lg-9">
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between w-100 fs-8 text-primary fw-bolder mb-3">
                    <span>Total Allowed = Rp {totalAllowed}</span>
                    <span className={'text-'+remainingLabel}>Remaining = Rp {totalRemaining}</span>
                  </div>
                  <div className="h-8px bg-light rounded mb-3">
                    <div 
                      className={'bg-'+remainingLabel+' rounded h-8px percentace'}
                      role="progressbar" 
                      aria-valuenow="50" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                      ></div>
                      <style jsx>{`
                        .percentace{
                          width:${percentUsed}%
                        }
                      `}</style>
                  </div>
                  <div className="fst-italic text-gray-600 fs-9">Total Allowed Budget = Budget Estimation (Rp {detail?.kegiatan?.budget_estimaton}) + 20% (Rp {upAllowed})</div>
                  <div className="fst-italic text-gray-600 fs-9">Total Cash Advance = Rp {detail?.total_expanse_price ? detail?.total_expanse_price:'0'}</div>
                  <div className="fst-italic text-gray-600 fs-9">Total Purchase Requistion = Rp {totalPR}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default RequestInformation;