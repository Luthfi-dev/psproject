import { imgLoader,serverAssets } from "../../../../utility/Image";
import Image from "next/image";
import cookie from "js-cookie"
import StringHelper from "../../../../helper/Stringhelper";
import Calender from "../../../../helper/Calender";
import { useEffect, useState } from "react";
import nprogress from "nprogress";
import { post, get, put } from "../../../../utility/Service"
import Script from "next/script";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const SignaturedBy = ({appsData,updateStatePR}) =>{
  const [detail, setDetail] = useState(appsData?.detail);
  const token = cookie.get("fast_token")
  const stringHelper = new StringHelper();
  const calender = new Calender();
  const [prCheckingBy,setPrCheckingBy]=useState(detail?.pr_checking_by);
  const [prCheckingByName,setPrCheckingByName]=useState(detail?.pr_checking_by_name);
  const [prCheckingByPurpose,setPrCheckingByPurpose]=useState(detail?.pr_checking_by_purpose);
  const [prCheckingAt,setPrCheckingAt]=useState(detail?.pr_checking_at)
  const [checkingResult,setCheckingResult]=useState(detail?.acknowledge_status);
  const [stateSubmitChecking, setStateSubmitChecking]=useState(false);
  const [stateSubmitCheckingResult, setStateSubmitCheckingResult]=useState(false);
  const [reasonEmpty,setReasonEmpty]=useState(false);
  const [placeholderReason,setPlaceholderReason]=useState();
  const [stateSubmitResultReview, setStateSubmitResultReview] = useState(false)
  const [stateSubmitResultApproval, setStateSubmitResultApproval] = useState(false)
  const [prState , setPrState] = useState(detail.pr_state);
  const [userModalFor, setUseModalFor]=useState('false_checking');
  const [resubmitState, setResubmitState]=useState(false);
  const [statePushReason, setStatePushReason]=useState(false);

  const submitToCheckingResult = async () =>{
    setStateSubmitChecking(true)
    nprogress.start();
    const endpointUrl = publicRuntimeConfig.HOST_API+'purchaserequest/submittochecking';
    await post({
      url:endpointUrl,
      params:{
        number:detail?.request_number
      },
      token:cookie.get("fast_token")
    })
    .then(async(res)=>{
      nprogress.done();
      setStateSubmitChecking(false)
      if(res.data && res.data.code === 200 ){
        toastr.success(res?.data?.message ? res.data.message:res.message,"Successfully")
        setPrState('8');
      }else{
        toastr.error(res?.data?.message ? res.data.message:res.message,"Failed")
      }
    })
  }
  
  const setResultAsTrue=async ()=>{
    setStateSubmitCheckingResult(true)
    nprogress.start();
    const endpointUrl = publicRuntimeConfig.HOST_API+'purchaserequest/setcheckingresult';
    await put({
      url:endpointUrl,
      params:{
        number:detail?.request_number,
        result:'1'
      },
      token:cookie.get("fast_token")
    })
    .then(async(res)=>{
      nprogress.done();
      setStateSubmitCheckingResult(false)
      setCheckingResult('1');
      if(res.data && res.data.code === 200 ){
        toastr.success(res?.data?.message ? res.data.message:res.message,"Successfully")
        const fetchNewDetail = await get({
          url:publicRuntimeConfig.HOST_API+'purchaserequest/detail',
          params:{
            number:detail?.request_number,
          },
          token:cookie.get("fast_token")
        })
        .then((newDetail)=>{
          setPrState('2');
          setDetail(newDetail.data.data)
        })
      }else{
        toastr.error(res?.data?.message ? res.data.message:res.message,"Failed")
      }
    })
  }

  const setResultAsFalse=async ()=>{
    setUseModalFor('false_checking')
    $("#modalWriteReason").modal('show')
    setPlaceholderReason("Write reason here ...")
  }

  const pushReason=async ()=>{
    setStatePushReason(true)
    var reasonLength = quill.getLength()
    if(reasonLength <= 3){
      setReasonEmpty(true)
      quill.focus();
    }else{
      var reason = quill.root.innerHTML;
      nprogress.start();
      const endpointUrl = '';
      if(userModalFor === 'false_checking'){
        endpointUrl=publicRuntimeConfig.HOST_API+'purchaserequest/setcheckingresult';
      }
      if(userModalFor === 'reject_reviewer'){
        endpointUrl=publicRuntimeConfig.HOST_API+'purchaserequest/setresultreviewer';
      }
      if(userModalFor === 'reject_approval'){
        endpointUrl=publicRuntimeConfig.HOST_API+'purchaserequest/setresultapproval';
      }
      await put({
        url:endpointUrl,
        params:{
          number:detail?.request_number,
          result:"2",
          reason:reason
        },
        token:cookie.get("fast_token")
      }).then((res)=>{
        nprogress.done();
        setStatePushReason(false)
        if(res.data && res.data.code === 200 ){
          if(res.data.status === true){
            toastr.error("Reason pushed to requestor.","Successfully")
            if(userModalFor === 'false_checking'){
              setPrState('6')
            }
            if(userModalFor === 'reject_reviewer'){
              setPrState('3')
            }
            if(userModalFor === 'reject_approval'){
              setPrState('1')
            }
            $("#modalWriteReason").modal("hide")
          }else{
            toastr.error(res.data.message,'Failed');
          }
        }else{
          toastr.error(res.data.message,'Failed');
        }
      })
    }
  }

  const setResultReviewAsTrue = async () =>{
    setStateSubmitResultReview(true)
    nprogress.start();
    const endpointUrl = publicRuntimeConfig.HOST_API+'purchaserequest/setresultreviewer';
    await put({
      url:endpointUrl,
      params:{
        number:detail?.request_number,
        result:'1'
      },
      token:cookie.get("fast_token")
    })
    .then(async (res)=>{
      nprogress.done();
      setStateSubmitCheckingResult(false)
      if(res.data && res.data.code === 200 ){
        toastr.success(res?.data?.message ? res.data.message:res.message,"Successfully")
        const fetchNewDetail = await get({
          url:publicRuntimeConfig.HOST_API+'purchaserequest/detail',
          params:{
            number:detail?.request_number,
          },
          token:cookie.get("fast_token")
        })
        .then((newDetail)=>{
          setPrState(newDetail.data.data.pr_state);
          setDetail(newDetail.data.data)
        })
      }else{
        toastr.error(res?.data?.message ? res.data.message:res.message,"Failed")
      }
    })
  }

  const setResultApprovalTrue = async () =>{
    setStateSubmitResultApproval(true)
    nprogress.start();
    const endpointUrl = publicRuntimeConfig.HOST_API+'purchaserequest/setresultapproval';
    await put({
      url:endpointUrl,
      params:{
        number:detail?.request_number,
        result:'1'
      },
      token:cookie.get("fast_token")
    })
    .then(async (res)=>{
      nprogress.done();
      setStateSubmitCheckingResult(false)
      if(res.data && res.data.code === 200 ){
        toastr.success(res?.data?.message ? res.data.message:res.message,"Successfully")
        const fetchNewDetail = await get({
          url:publicRuntimeConfig.HOST_API+'purchaserequest/detail',
          params:{
            number:detail?.request_number,
          },
          token:cookie.get("fast_token")
        })
        .then((newDetail)=>{
          setPrState(newDetail.data.data.pr_state);
          setDetail(newDetail.data.data)
        })
      }else{
        toastr.error(res?.data?.message ? res.data.message:res.message,"Failed")
      }
    })
  }

  const setResultReviewAsFalse = async () =>{
    setUseModalFor('reject_reviewer')
    $("#modalWriteReason").modal('show')
    setPlaceholderReason("Write reason here ...")
  }

  const setResultApprovalReject = async () =>{
    setUseModalFor('reject_approval')
    $("#modalWriteReason").modal('show')
    setPlaceholderReason("Write reason here ...")
  }

  const pushResubmit = async () =>{
    setResubmitState(true)
    nprogress.start();
    const endpointUrl = publicRuntimeConfig.HOST_API+'purchaserequest/resubmit';
    await post({
      url:endpointUrl,
      params:{
        number:detail.request_number,
      },
      token:cookie.get("fast_token")
    })
    .then(async (res)=>{
      nprogress.done();
      setResubmitState(false)
      if(res.data && res.data.code === 200 ){
        toastr.success(res?.data?.message ? res.data.message:res.message,"Successfully")
        if(prState === '6'){
          setPrState('8');
        }
        if(prState === '3'){
          setPrState('2');
        }
        if(prState === '1'){
          setPrState('9');
        }
      }else{
        toastr.error(res?.data?.message ? res.data.message:res.message,"Failed")
      }
    })
  }

  useEffect(() => {
    if(appsData.triggerResubmit === true){
      if(appsData.detail.pr_state === '0'){
        submitToCheckingResult();
      }else{
        pushResubmit();
      }
    }
  },[appsData.triggerResubmit])

  useEffect(() => {
    updateStatePR(prState)
  },[prState])

  return(
    <>
    <div className="col-xl-6 mt-3">
      <div className="card mb-5 mb-xl-3 ">
        <div className="card-header">
          <h3 className="card-title align-items-start flex-column">
            <span className="fw-bolder m-0">Signature</span>
            <span className="text-muted mt-1 fw-bold fs-7">Checking, Reviewer , Approval & FCO Monitor</span>
          </h3>
          <div className="card-toolbar">
            
          </div>
        </div>
        <div className="card-body scroll h-350px">
          {
            //PR berasal dari activity, PR baru & TOR sudah approve finance.
            prState === '0'  && 
            detail?.status_finance === '1' && 
            detail?.kegiatan?.jenis_data === 1 &&
            <>
            <div className="alert alert-primary d-flex align-items-center">
              <span className="me-4">
                <i className="bi bi-shield-fill-exclamation text-primary  fs-2x"></i>
              </span>
              <div className="d-flex flex-column">
                <h4 className="mb-1 text-primary">Start Process !</h4>
                <span>
                  {
                    (detail.requestor.id_user.toString() === appsData.session.userId.toString()) ||
                    (appsData.session.isProgramAssistance.toString() === '1') ?
                    <>
                      Waiting submit request to procurement teams for checking result.
                    </>
                    :
                    <>
                      Faster detected this is new PR To start process your PR request, submit to procurement now.
                    </>
                  }
                </span>
                {
                  (
                    (detail.requestor.id_user.toString() === appsData.session.userId.toString()) ||
                    (appsData.session.isProgramAssistance.toString() === '1')
                  )&&
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-light-primary btn-sm me-2"
                      onClick={()=>{submitToCheckingResult()}}
                      disabled={stateSubmitChecking}
                      data-kt-indicator={stateSubmitChecking===true ? 'on':''}
                    >
                      {
                        stateSubmitChecking === false ?
                        <>
                          <span className="indicator-label">
                            <i className='bi bi-send-check'></i> Submit To Procurement Teams
                          </span>
                        </>
                        :
                        <>
                          <span className="indicator-progress">
                            Submiting... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        </>
                      }
                    </button>
                  </div>
                }
              </div>
            </div>
            </>
          }
          {
            prState === '0'  && 
            detail?.status_finance === '0' && 
            detail?.finance_request === '0' && 
            detail?.kegiatan?.jenis_data === 1 &&
            <>
            <div className="card-px text-center py-0 my-10">
              <h2 className="fs-2x fw-bolder mb-10">Submit Budget !</h2>
              <p className="text-gray-400 fs-6 fw-bold mb-10">
                Faster detected this activity pending budget request to finance, Please open activity budget and submit to finance before process this PR. </p>
              <a href={publicRuntimeConfig.BASE_URL_OLD+'plan/activity-budget'} className="btn btn-info btn-sm">
                <i className='fa fa-paper-plane'></i> Submit Budget
              </a>
            </div>
            </>
          }
          {
            (prState === '0' || prState === '4')  && 
            detail?.status_finance === '0' && 
            detail?.finance_request === '1' && 
            detail?.kegiatan?.jenis_data === 1 &&
            <>
            <div className="alert alert-warning d-flex align-items-center">
              <span className="me-4">
                <i className="bi bi-shield-fill-exclamation text-warning  fs-2x"></i>
              </span>
              <div className="d-flex flex-column">
                <h4 className="mb-1 text-warning">Waiting</h4>
                <span>
                  {
                    detail.requestor.id_user.toString() === appsData.session.userId ||
                    appsData.session.isProgramAssistance.toString() === '1' &&
                    <>
                      The budget activity has been submitted to finance, Please wait for the finance manager to respond 
                    </>
                  }
                  {
                    appsData.session.isBudgetRiviewer.toString() === '1' &&
                    <>
                      Please review this request and make respon
                      <div className="d-flex mt-3">
                        <button className="btn btn-light-primary btn-sm me-2">
                          <i className='bi bi-send-check'></i> Approve
                        </button>
                        <button className="btn btn-light-danger btn-sm">
                          <i className='bi bi-send-slash'></i> Reject
                        </button>
                      </div>
                    </>
                  }
                </span>
              </div>
            </div>
            </>
          }
          {
            (prState === '0' || prState === '5')  && 
            detail?.status_finance === '2' && 
            detail?.finance_request === '1' && 
            detail?.kegiatan?.jenis_data === 1 &&
            <>
            <div className="alert alert-danger d-flex align-items-center">
              <span className="me-4">
                <i className="bi bi-shield-fill-exclamation text-danger  fs-2x"></i>
              </span>
              <div className="d-flex flex-column">
                <h4 className="mb-1 text-danger">Finance Rejected</h4>
                <span>{detail?.pr_finance_approve_reason}</span>
                {
                  appsData.session.isBudgetRiviewer.toString() === '0'&&
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-light-primary btn-sm me-2"
                      onClick={()=>{pushResubmit()}}
                      disabled={resubmitState}
                      data-kt-indicator={resubmitState===true ? 'on':''}
                    >
                      {
                        resubmitState === false ?
                        <>
                          <span className="indicator-label">
                            <i className='bi bi-arrow-clockwise'></i> Resubmit
                          </span>
                        </>
                        :
                        <>
                          <span className="indicator-progress">
                            Submiting... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        </>
                      }
                    </button>
                  </div>
                }
              </div>
            </div>
            </>
          }
          {
            prState === '8' &&
            <>
            <div className="alert alert-warning d-flex align-items-center">
              <span className="me-4">
                <i className="bi bi-shield-fill-exclamation text-warning  fs-2x"></i>
              </span>
              <div className="d-flex flex-column">
                <h4 className="mb-1 text-warning">Procurement Check !</h4>
                <span>
                  {
                  appsData.session.isProcurementOfficer.toString() === '1' ?
                  <>
                    Please review this PR request, and set result of checking
                  </>
                  :
                  <>
                    This PR waiting review by procurement teams.
                  </>
                }
                </span>
                {
                  appsData.session.isProcurementOfficer.toString() === '1'&&
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-light-primary btn-sm me-2"
                      onClick={()=>{setResultAsTrue()}}
                      disabled={stateSubmitCheckingResult}
                      data-kt-indicator={stateSubmitCheckingResult===true ? 'on':''}
                    >
                      {
                        stateSubmitCheckingResult === false ?
                        <>
                          <span className="indicator-label">
                            <i className='bi bi-shield-check'></i> SET AS TRUE
                          </span>
                        </>
                        :
                        <>
                          <span className="indicator-progress">
                            Submiting... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        </>
                      }
                    </button>
                    <button 
                      className="btn btn-light-danger btn-sm me-2"
                      onClick={()=>{setResultAsFalse()}}
                      disabled={stateSubmitCheckingResult}
                    >
                      <>
                        <span className="indicator-label">
                          <i className='bi bi-shield-slash'></i> SET AS FALSE
                        </span>
                      </>
                    </button>
                  </div>
                }
              </div>
            </div>
            </>
          }
          {
            prState === '6' &&
            <>
            <div className="alert alert-danger d-flex align-items-center">
              <span className="me-4">
                <i className="bi bi-shield-fill-exclamation text-danger  fs-2x"></i>
              </span>
              <div className="d-flex flex-column">
                <h4 className="mb-1 text-danger">Result Checking FALSE</h4>
                <span>
                  {
                    appsData.session.isProcurementOfficer.toString() === '1' ?
                    <>
                      FALSE, Wait requestor resubmit again.
                    </>
                    :
                    <div
                      dangerouslySetInnerHTML={{ __html:detail.acknowledge_rejected_reason }}
                    >
                    </div>
                  }
                </span>
                {
                  appsData.session.isProcurementOfficer.toString() === '0'&&
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-light-primary btn-sm me-2"
                      onClick={()=>{pushResubmit()}}
                      disabled={resubmitState}
                      data-kt-indicator={resubmitState===true ? 'on':''}
                    >
                      {
                        resubmitState === false ?
                        <>
                          <span className="indicator-label">
                            <i className='bi bi-arrow-clockwise'></i> Resubmit
                          </span>
                        </>
                        :
                        <>
                          <span className="indicator-progress">
                            Submiting... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        </>
                      }
                    </button>
                  </div>
                }
              </div>
            </div>
            </>
          }
          {
            prState === '2' &&
            <>
            <div className="alert alert-warning d-flex align-items-center">
              <span className="me-4">
                <i className="bi bi-shield-fill-exclamation text-warning  fs-2x"></i>
              </span>
              <div className="d-flex flex-column">
                <h4 className="mb-1 text-warning">Waiting Reviewer !</h4>
                <span>
                  {
                  appsData.session.userId.toString() === detail?.pr_reviewer_by?.toString() ?
                  <>
                    Please review this PR request, and make a respon
                  </>
                  :
                  <>
                    This PR waiting review by reviewer.
                  </>
                }
                </span>
                {
                  appsData.session.userId.toString() === detail?.pr_reviewer_by?.toString() &&
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-light-primary btn-sm me-2"
                      onClick={()=>{setResultReviewAsTrue()}}
                      disabled={stateSubmitResultReview}
                      data-kt-indicator={stateSubmitResultReview===true ? 'on':''}
                    >
                      {
                        stateSubmitResultReview === false ?
                        <>
                          <span className="indicator-label">
                            <i className='bi bi-shield-check'></i> Approve
                          </span>
                        </>
                        :
                        <>
                          <span className="indicator-progress">
                            Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        </>
                      }
                    </button>
                    <button 
                      className="btn btn-light-danger btn-sm me-2"
                      onClick={()=>{setResultReviewAsFalse()}}
                      disabled={stateSubmitResultReview}
                    >
                      <>
                        <span className="indicator-label">
                          <i className='bi bi-shield-slash'></i> Reject
                        </span>
                      </>
                    </button>
                  </div>
                }
              </div>
            </div>
            </>
          }
          {
            prState === '3' &&
            <>
            <div className="alert alert-danger d-flex align-items-center">
              <span className="me-4">
                <i className="bi bi-shield-fill-exclamation text-danger  fs-2x"></i>
              </span>
              <div className="d-flex flex-column">
                <h4 className="mb-1 text-danger">Rejected By Reviewer</h4>
                <span>
                  {
                    appsData.session.isProgramAssistance.toString() === '1' ||
                    (appsData.session.userId.toString() === detail?.requestor.id_user.toString()) ?
                    <div
                      dangerouslySetInnerHTML={{ __html:detail.pr_reviewer_reason }}
                    >
                    </div>
                    :
                    <>
                      Waiting requestor resubmit again.
                    </>
                  }
                </span>
                {
                  appsData.session.isProgramAssistance.toString() === '1' ||
                  (appsData.session.userId.toString() === detail?.requestor.id_user.toString()) ?
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-light-primary btn-sm me-2"
                      onClick={()=>{pushResubmit()}}
                      disabled={resubmitState}
                      data-kt-indicator={resubmitState===true ? 'on':''}
                    >
                      {
                        resubmitState === false ?
                        <>
                          <span className="indicator-label">
                            <i className='bi bi-arrow-clockwise'></i> Resubmit
                          </span>
                        </>
                        :
                        <>
                          <span className="indicator-progress">
                            Submiting... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        </>
                      }
                    </button>
                  </div>
                  :<></>
                }
              </div>
            </div>
            </>
          }
          {
            prState === '1' &&
            <>
            <div className="alert alert-danger d-flex align-items-center">
              <span className="me-4">
                <i className="bi bi-shield-fill-exclamation text-danger  fs-2x"></i>
              </span>
              <div className="d-flex flex-column">
                <h4 className="mb-1 text-danger">Rejected By Approval</h4>
                <span>
                  {
                    appsData.session.isProgramAssistance.toString() === '1' ||
                    (appsData.session.userId.toString() === detail?.requestor.id_user.toString()) ?
                    <div
                      dangerouslySetInnerHTML={{ __html:detail.pr_reviewer_reason }}
                    >
                    </div>
                    :
                    <>
                      Waiting requestor resubmit again.
                    </>
                  }
                </span>
                {
                  appsData.session.isProgramAssistance.toString() === '1' ||
                  (appsData.session.userId.toString() === detail?.requestor.id_user.toString()) ?
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-light-primary btn-sm me-2"
                      onClick={()=>{pushResubmit()}}
                      disabled={resubmitState}
                      data-kt-indicator={resubmitState===true ? 'on':''}
                    >
                      {
                        resubmitState === false ?
                        <>
                          <span className="indicator-label">
                            <i className='bi bi-arrow-clockwise'></i> Resubmit
                          </span>
                        </>
                        :
                        <>
                          <span className="indicator-progress">
                            Submiting... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        </>
                      }
                    </button>
                  </div>
                  :<></>
                }
              </div>
            </div>
            </>
          }
          {
            prState === '9' &&
            <>
            <div className="alert alert-warning d-flex align-items-center">
              <span className="me-4">
                <i className="bi bi-shield-fill-exclamation text-warning  fs-2x"></i>
              </span>
              <div className="d-flex flex-column">
                <h4 className="mb-1 text-warning">Waiting Approval !</h4>
                <span>
                  {
                  appsData.session.userId.toString() === detail?.pr_approve_by?.toString() || appsData.session.isDOA === 1 ?
                  <>
                    Please review this PR request, and make a respon
                  </>
                  :
                  <>
                    This PR waiting review by approval.
                  </>
                }
                </span>
                {
                  appsData.session.userId.toString() === detail?.pr_approve_by?.toString() || appsData.session.isDOA === 1 &&
                  <div className="d-flex mt-3">
                    <button 
                      className="btn btn-light-primary btn-sm me-2"
                      onClick={()=>{setResultApprovalTrue()}}
                      disabled={stateSubmitResultApproval}
                      data-kt-indicator={stateSubmitResultApproval===true ? 'on':''}
                    >
                      {
                        stateSubmitResultApproval === false ?
                        <>
                          <span className="indicator-label">
                            <i className='bi bi-shield-check'></i> Approve
                          </span>
                        </>
                        :
                        <>
                          <span className="indicator-progress">
                            Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        </>
                      }
                    </button>
                    <button 
                      className="btn btn-light-danger btn-sm me-2"
                      onClick={()=>{setResultApprovalReject()}}
                      disabled={stateSubmitResultApproval}
                    >
                      <>
                        <span className="indicator-label">
                          <i className='bi bi-shield-slash'></i> Reject
                        </span>
                      </>
                    </button>
                  </div>
                }
              </div>
            </div>
            </>
          }


          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <tbody>
              {
              prCheckingBy &&
              <tr>
                <td>
                  <div className="d-flex align-items-center flex-grow-1">
                    {
                    detail?.procurement_current_profile?.avatar  ?
                    <div className="symbol symbol-45px me-5">
                      <div className="container-img mw-45px">
                        <Image 
                          src={detail?.procurement_current_profile?.avatar+'?subfolder=avatars&'} 
                          loader={serverAssets}
                          layout="fill" 
                          className="img symbol"
                        />
                      </div>
                    </div>
                    :
                    <div className="symbol symbol-45px me-5">
                      <div className="container-img ">
                        <span className={'symbol-label text-light fs-1 fw-bold text-uppercase bg-warning '}>{stringHelper.initialProfile(prCheckingByName,2)}</span>
                      </div>
                    </div>
                    }
                    <div className="d-flex flex-column">
                      <a href="#" className="text-gray-900 text-hover-primary fs-6 fw-bolder">{prCheckingByName}</a>
                      <span className="text-gray-400 fw-bold fs-9">{prCheckingByPurpose}</span>
                      <span className="text-gray-400 fw-bold fs-9">{calender.dateFormat(prCheckingAt,"dd-mmmm-yyyy H:MM:ss")}</span>
                    </div>
                  </div>
                </td>
                <td>
                    <span className="badge badge-primary">Checking</span>
                </td>
                <td>
                  {
                    (!checkingResult || checkingResult === '0' ) &&
                    <span className="badge badge-warning">Pending</span>
                  }
                  {
                    checkingResult === '1' &&
                    <span className="badge badge-success">TRUE</span>
                  }
                  {
                    checkingResult === '2' &&
                    <span className="badge badge-danger">FALSE</span>
                  }
                </td>
              </tr>
              }
              {
              detail?.pr_finance_approve_status != null &&
              detail?.status_finance != '0' &&
              <tr>
                <td>
                  <div className="d-flex align-items-center flex-grow-1">
                    {
                    detail?.finance_current_profile.avatar  ?
                    <div className="symbol symbol-45px me-5">
                      <div className="container-img mw-45px">
                        <Image 
                          src={detail?.finance_current_profile?.avatar+'?subfolder=avatars&'} 
                          loader={serverAssets}
                          layout="fill" 
                          className="img symbol"
                        />
                      </div>
                    </div>
                    :
                    <div className="symbol symbol-45px me-5">
                      <div className="container-img ">
                        <span className={'symbol-label text-light fs-1 fw-bold text-uppercase bg-primary '}>{stringHelper.initialProfile(detail?.pr_finance_approve_by_name,2)}</span>
                      </div>
                    </div>
                    }
                    <div className="d-flex flex-column">
                      <a href="#" className="text-gray-900 text-hover-primary fs-6 fw-bolder">{detail?.pr_finance_approve_by_name}</a>
                      <span className="text-gray-400 fw-bold fs-9">{detail?.pr_finance_approve_by_purpose}</span>
                      <span className="text-gray-400 fw-bold fs-9">{calender.dateFormat(detail?.pr_finance_approve_date,"dd-mmmm-yyyy HH:MM:ss")}</span>
                    </div>
                  </div>
                </td>
                <td>
                    <span className="badge badge-primary">FCO Monitor</span>
                </td>
                <td>
                  {
                    (!detail.pr_finance_approve_status || detail.pr_finance_approve_status === '0' ) &&
                    <span className="badge badge-warning">Pending</span>
                  }
                  {
                    detail.pr_finance_approve_status === '1' &&
                    <span className="badge badge-success">Approved</span>
                  }
                  {
                    detail.pr_finance_approve_status === '2' &&
                    <span className="badge badge-danger">Rejected</span>
                  }
                </td>
              </tr>
              }
              {
              (detail?.pr_reviewer_status === 0 || detail?.pr_reviewer_status === 1  || detail?.pr_reviewer_status === 2 || detail?.pr_reviewer_status === 3)&&
              <tr>
                <td>
                  <div className="d-flex align-items-center flex-grow-1">
                    {
                    detail?.reviewer_current_profile?.avatar  ?
                    <div className="symbol symbol-45px me-5">
                      <div className="container-img mw-45px">
                        <Image 
                          src={detail?.reviewer_current_profile?.avatar +'?subfolder=avatars&'} 
                          loader={serverAssets}
                          layout="fill" 
                          className="img symbol"
                        />
                      </div>
                    </div>
                    :
                    <div className="symbol symbol-45px me-5">
                      <div className="container-img ">
                        <span className={'symbol-label text-light fs-1 fw-bold text-uppercase bg-dark '}>{stringHelper.initialProfile(detail?.pr_reviewer_by_name,2)}</span>
                      </div>
                    </div>
                    }
                    <div className="d-flex flex-column">
                      <a href="#" className="text-gray-900 text-hover-primary fs-6 fw-bolder">{detail?.pr_reviewer_by_name}</a>
                      <span className="text-gray-400 fw-bold fs-9">{detail?.pr_reviewer_by_purpose}</span>
                      <span className="text-gray-400 fw-bold fs-9">{calender.dateFormat(detail?.pr_reviewer_date,"dd-mmmm-yyyy H:MM:ss")}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-primary">Reviewer</span>
                </td>
                <td>
                  {
                    (! detail.pr_reviewer_status  || detail.pr_reviewer_status === 0 ) &&
                    <span className="badge badge-warning">Pending</span>
                  }
                  {
                    detail.pr_reviewer_status === 1 &&
                    <span className="badge badge-success">Approved</span>
                  }
                  {
                    detail.pr_reviewer_status === 2 &&
                    <span className="badge badge-danger">Rejected</span>
                  }
                </td>
              </tr>
              }
              {
              detail?.pr_approve_by != 0  &&
              detail?.pr_reviewer_status === 1  &&
              detail?.pr_approve_by != null  &&
              <tr>
                <td>
                  <div className="d-flex align-items-center flex-grow-1">
                    {
                    detail?.approval_current_profile?.avatar  ?
                    <div className="symbol symbol-45px me-5">
                      <div className="container-img mw-45px">
                        <Image 
                          src={detail?.approval_current_profile?.avatar+'?subfolder=avatars&'} 
                          loader={serverAssets}
                          layout="fill" 
                          className="img symbol"
                        />
                      </div>
                    </div>
                    :
                    <div className="symbol symbol-45px me-5">
                        <div className="container-img ">
                          <span className={'symbol-label text-light fs-1 fw-bold text-uppercase bg-success '}>{stringHelper.initialProfile(detail?.pr_approve_by_name,2)}</span>
                        </div>
                      </div>
                    }
                    <div className="d-flex flex-column">
                      <a href="#" className="text-gray-900 text-hover-primary fs-6 fw-bolder">{detail?.pr_approve_by_name}</a>
                      <span className="text-gray-400 fw-bold fs-9">{detail?.pr_approve_by_purpose}</span>
                      <span className="text-gray-400 fw-bold fs-9">{calender.dateFormat(detail?.pr_approve_date,"dd-mmmm-yyyy H:MM:ss")}</span>
                    </div>
                  </div>
                </td>
                <td>
                    <span className="badge badge-primary">Approval</span>
                </td>
                <td>
                  {
                    (!detail.pr_approve_status || detail.pr_approve_status === '0' ) &&
                    <span className="badge badge-warning">Pending</span>
                  }
                  {
                    detail.pr_approve_status === '1' &&
                    <span className="badge badge-success">Approved</span>
                  }
                  {
                    detail.pr_approve_status === '2' &&
                    <span className="badge badge-danger">Rejected</span>
                  }
                </td>
              </tr>
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div className="modal fade"  id="modalWriteReason">
        <div className="modal-dialog  mw-650px ">
          <div className="modal-content">
              <div className="modal-body pb-0">
                <div className="d-flex align-items-center mb-5">
                  <div className="d-flex align-items-center flex-grow-1">
                    <div className="symbol symbol-45px me-5">
                      <div className="container-img w-45px">
                        {
                          appsData.session.avatar ?
                          <Image 
                            src={appsData.session.avatar+'?subfolder=avatars&'} 
                            layout="fill" className="img symbol "
                            loader={serverAssets}
                          />
                          :
                          <span className={'symbol-label mw-45px fs-2 fw-bold text-uppercase bg-primary text-light'}>{stringHelper.initialProfile(appsData.session.fullName,2)}</span>
                        }
                        
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <a href="#" className="text-gray-900 text-hover-primary fs-6 fw-bolder">{appsData.session.fullName}</a>
                      <span className="text-gray-400 fw-bold">{appsData.session.username}</span>
                    </div>
                  </div>
                </div>
                <form className="ql-quil ql-quil-plain pb-3" id="form_reason">
                  <div id="editor_reason" className="py-6 opacity-75 p-1 fs-6"></div>
                  <div className="separator"></div>
                  {
                    reasonEmpty === true?
                    <div className="text-danger fs-9 opacity-75">Please fill in the reason</div>
                    :''
                  }
                  <div id="editor_reason_toolbar" className="ql-toolbar d-flex flex-stack py-2">
                    <div className="me-2">
                      <span className="ql-formats">
                        <button className="ql-bold"></button>
                        <button className="ql-italic"></button>
                        <button className="ql-underline"></button>
                        <button className="ql-strike"></button>
                        <button className="ql-clean"></button>
                      </span>
                    </div>
                    <div className="me-n3 mr-3">
                      <span 
                        className={statePushReason === true ? 'btn btn-icon btn-color-danger btn-danger btn-circle disabled':'btn btn-icon btn-color-danger btn-light-danger btn-circle'}
                        onClick={pushReason}
                        data-kt-indicator={statePushReason===true ? 'on':''}
                      >
                        {
                          statePushReason === true ?
                          <span className="indicator-progress">
                            <span className="spinner-border spinner-border-sm align-middle "></span>
                          </span>
                          :
                          <i className="fa fa-paper-plane"></i>
                        }
                      </span>
                    </div>
                  </div>
                </form>
              </div>
          </div>
        </div>
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            var quill = new Quill("#editor_reason", { 
              modules: { 
                toolbar: { container: "#editor_reason_toolbar" } 
              }, 
              placeholder: "`+placeholderReason+`", 
              theme: "snow" 
            })
          `,
          }}
        />
    </div>
    </>
  )
}
export default SignaturedBy;