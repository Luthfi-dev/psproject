import Cookies from "js-cookie";
import Link from "next/link";
import nprogress from "nprogress";
import { useState } from "react";
import Encryption from "../../../../utility/Encryption";
import { post } from "../../../../utility/Service";
import ProgramAssistance from "./ProgramAssistance";
import SupportingDocument from "./SupportingDocument";

const CardBody = ({appsData}) =>{
  const session = appsData.session;
  const data = appsData.detail.data;
  const encryption = new Encryption();
  const [rejectState, setRejectState] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const selectReject = () =>{
    const el = $('.rejectReason')
    el.focus();
    setRejectState(true);
  }

  const submitRejected = ()=>{
    const btnRejecting = document.getElementById('btn-submit-reject');
  
    if(rejectReason === ''){
      swal.fire({
        text:'Please fill reason to reject request',
        icon:'error'
      })
      return;
    }

    nprogress.start();
    btnRejecting.setAttribute('data-kt-indicator', 'on');
    btnRejecting.setAttribute('disabled',true)

    post({
      url:'goodsandservices/supervisor/reject/'+data.pr_number,
      token: Cookies.get('fast_token'),
      params:{'reason': rejectReason}
    }).then((res)=>{

      nprogress.done();
      btnRejecting.setAttribute('data-kt-indicator', 'off');
      btnRejecting.removeAttribute('disabled')

      if(res?.data?.status === false){
        swal.fire({
          title:"FAILED",
          text:res?.data?.message,
          icon:'error'
        })
        return;
      }

      swal.fire({
        title:"SUCCESS",
        text:res?.data?.message,
        icon:'success'
      })
      window.location.href= process.env.BASE_URL+process.env.BASE_PATH+'/goodsandservices/incoming'

    }).catch((error)=>{
      nprogress.done();
      btnRejecting.setAttribute('data-kt-indicator', 'off');
      btnRejecting.removeAttribute('disabled')
      swal.fire({
        text:error,
        icon:'error'
      }).then((confirm)=>{
        if(confirm.value){
          window.location.href= process.env.BASE_URL+process.env.BASE_PATH+'/goodsandservices/incoming'
        }
      })
    })

  }

  const submitApprove = ()=>{
    const btnApprove = document.getElementById('btn-submit-approve');
    nprogress.start();
    btnApprove.setAttribute('data-kt-indicator', 'on');
    btnApprove.setAttribute('disabled',true)

    post({
      url:'goodsandservices/supervisor/approve/'+data.pr_number,
      token: Cookies.get('fast_token'),
    }).then((res)=>{

      nprogress.done();
      btnApprove.setAttribute('data-kt-indicator', 'off');
      btnApprove.removeAttribute('disabled')

      if(res?.data?.status === false){
        swal.fire({
          title:"FAILED",
          text:res?.data?.message,
          icon:'error'
        })
        return;
      }

      swal.fire({
        title:"SUCCESS",
        text:res?.data?.message,
        icon:'success'
      }).then((confirm)=>{
        if(confirm.value){
          window.location.href= process.env.BASE_URL+process.env.BASE_PATH+'/goodsandservices/incoming'
        }
      })

    }).catch((error)=>{
      nprogress.done();
      btnApprove.setAttribute('data-kt-indicator', 'off');
      btnApprove.removeAttribute('disabled')
      swal.fire({
        text:error,
        icon:'error'
      })
    })

  }

  return(
    <div className="card-body py-3 ">
      {
        data.status === '2' &&
        <div className="alert alert-danger d-flex align-items-center p-5 mb-10">
          <span className="svg-icon svg-icon-2hx svg-icon-danger me-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="black"></path>
              <path d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z" fill="black"></path>
            </svg>
          </span>
          <div className="d-flex flex-column">
            <h4 className="mb-1 text-danger">Request Has Been Rejected</h4>
            <span>{data.rejected_reason}</span>
            {
              data.requestor.user_id.toString() === session.userId &&
              <Link 
              href={{
                pathname: '/goodsandservices/correction',
                query: { 
                  id: encryption.encrypt(data.pr_number),
                },
              }} 
              >
                <a href="" className="text-decoration-underline"> Resubmit Again</a>
              </Link>
            }
          </div>
        </div>
      }
      <div className="fv-row mb-7 mt-5">
        <label className="form-label">
          <span className="">Goods & Services Request For</span>
        </label>
        <textarea 
          className="form-control form-control-solid" 
          rows={3} 
          value={ data.description }
          readOnly={true}
        ></textarea>
      </div>
      <div className="row mb-7">
        <div className="col-md-4 fv-row fv-plugins-icon-container">
          <label className="form-label">
            <span className="">Project</span>
          </label>
          <input readOnly={true} type="text" className="form-control-solid form-control" value={data.project.project_name}/>
        </div>
        <div className="col-md-4 fv-row fv-plugins-icon-container">
          <label className="form-label">
            <span className="">Source Fund</span>
          </label>
          <input readOnly={true} type="text" className="form-control-solid form-control" value={data.funding.source_fund}/>
        </div>
        <div className="col-md-4 fv-row fv-plugins-icon-container">
          <label className="form-label">Location of Activity</label>
          <input readOnly={true} type="text" className="form-control-solid form-control" value={data.location.location_name}/>
        </div>
      </div>
      <div className="fv-row mb-7">
        <label className="form-label">
          <span className="">Group & Teams</span>
        </label>
        <input readOnly={true} type="text" className="form-control-solid form-control" value={data.groups.name}/>
      </div>
      <div className="fv-row mb-7">
        <label className="form-label">
          <span className="">Deliverable</span>
        </label>
        <textarea 
          className="form-control form-control-solid" 
          rows={2} 
          value={ data.deliverable.deliverable }
          readOnly={true}
        ></textarea>
      </div>
      <div className="row mb-7">
        <div className="col-md-4 fv-row fv-plugins-icon-container">
          <label className="form-label">
            <span className="">Budget Estimation</span>
          </label>
          <input readOnly={true} type="text" className="form-control-solid form-control text-primary" value={'Rp 13.000.000'}/>
        </div>
        <div className="col-md-4 fv-row fv-plugins-icon-container">
          <label className="form-label">
            <span className="">Estimation Before Approve</span>
          </label>
          <input readOnly={true} type="text" className="form-control-solid form-control text-danger" value={'Rp 23.000.000'}/>
          <div className="fv-plugins-message-container invalid-feedback fs-11px text-danger">
            * Estimation budget remaining now (Realtime)
          </div>
        </div>
        <div className="col-md-4 fv-row fv-plugins-icon-container">
          <label className="form-label">Estimation After Approve</label>
          <input readOnly={true} type="text" className="form-control-solid form-control text-danger text-light" value={'Rp 23.000.000'}/>
          <div className="fv-plugins-message-container invalid-feedback fs-11px">
            * Estimation budget if this request approve
          </div>
        </div>
      </div>
      <div className="row mt-10 mb-10">
        <div className="col-6">
          <ProgramAssistance appsData={appsData}/>
        </div>
        <div className="col-6">
          <SupportingDocument appsData={appsData}/>
        </div>
      </div>
      {
        rejectState && 
        <>
          <div className="fv-row mb-7 mt-10">
            <label className="form-label">
              <span className="required">Rejected Reason</span>
            </label>
            <textarea 
              className="form-control form-control-solid rejectReason" 
              rows={3} 
              value={ rejectReason }
              onChange={(e)=>{setRejectReason(e.target.value)}}
            ></textarea>
            <div className="fv-plugins-message-container invalid-feedback fs-11px">
              * Please fill reason to reject request
            </div>
          </div>
        </>
      }    
      {
        ['3','2'].includes(data.status) && session.userId === data.supervisor.user_id.toString() &&
        <div className="fv-row mb-7">
          {
            rejectState === false &&
            <>
            <button className="btn btn-success me-3" id='btn-submit-approve' onClick={()=>{submitApprove()}}>
              <span className="indicator-label">
                <i className="lni lni-checkmark fs-2"></i> Approve
              </span>
              <span className="indicator-progress">
                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
            <button className="btn btn-danger" onClick={()=>{selectReject()}}><i className="lni lni-close"></i> Reject</button>
            </> 
          }
          {
            rejectState === true &&
            <>
            <button className="btn btn-danger me-3" id='btn-submit-reject' onClick={()=>{submitRejected()}}>
              <span className="indicator-label">
                <i className="fa fa-paper-plane"></i> Send Reject Response
              </span>
              <span className="indicator-progress">
                Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
            <button className="btn btn-light" onClick={()=>{setRejectState(false)}}><i className="lni lni-close"></i> Cancel</button>
            </> 
          }
        </div>
      }
    </div>
  )
}
export default CardBody;