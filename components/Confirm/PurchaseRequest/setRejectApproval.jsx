import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { post, get, put } from "../../../utility/Service"
import nprogress from "nprogress";
import Link from 'next/link';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const SetRejectApproval = ({detail}) =>{
  const router = useRouter()
  const [result, setResult]=useState(false);
  const [alertMessage, setAlertMessage]=useState('Rejected PR successfully, thanks you !')
  const [alertTitle,setAlertTitle]=useState("REJECT PR")
  const [loading,setLoading]=useState(false)
  const [reason, setReason]=useState();

  const submitResult = async ()=> {
    nprogress.start();
    setLoading(true)
    const endpointUrl = publicRuntimeConfig.HOST_API+'purchaserequest/setresultapproval';
    await put({
      url:endpointUrl,
      params:{
        number:detail.value,
        result:'2',
        reason:reason
      },
      token:detail.token_access
    }).then((res)=>{
      setLoading(false)
      nprogress.done();
      if(res.data && res.data.code === 200 ){
        setResult(true)
        setAlertTitle("Successfully !")
        swal.fire({
          icon:'success',
          title:'Successfully !',
          text:"Rejected PR successfully, thanks you !",
          buttonsStyling: !1,
          confirmButtonText: "Ok",
          customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" },
        })
        .then((value)=>{
          if(value){
            window.close();
          }
        })
      }else{
        swal.fire({
          icon:'error',
          title:'Failed !',
          text:res.data.message,
          buttonsStyling: !1,
          confirmButtonText: "Ok",
          customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" },
        })
        .then((value)=>{
          if(value){
            window.close();
          }
        })
      }
    })
  }
  return(
    <>
      <div className="pt-lg-10 mb-10">
        <h1 className="fw-bolder fs-2qx text-light opacity-75 mb-10">
          {
            result === false && 
            alertTitle
          }
          {
            result === true && 
            alertTitle
          }
          
        </h1>
        <div className="fw-bold fs-3 text-muted mb-15">
          {
            result === false && 
            <center>
              <div className='mw-500px'>
                <textarea 
                  onChange={e => { setReason(e.currentTarget.value); }}
                  className='form-control' 
                  rows={10} 
                  placeholder={'Please write reason, why you set this request FALSE'}
                ></textarea>
                
                {
                  loading === true ?
                  <button className='btn btn-primary mt-5 w-100' data-kt-indicator="on" disabled={true}>
                    <span class="indicator-progress">
                        Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                  :
                  <button className='btn btn-primary mt-5 w-100' onClick={()=>{submitResult()}}>
                    <i className='bi bi-send-slash fs-3'></i>
                    Submit Result
                  </button>
                }
                
              </div>
            </center>
          }
          {
            result === true && 
            <>
            <div className='alert'>
              {alertMessage}
            </div>
            </>
          }
        </div>
        <div className="text-center">
          {
            loading === true && 
            <center>
              <div className='col-5'>
                <div className="progress">
                  <div className="progress-bar  progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" ></div>
                </div>
              </div>
            </center>
          }
          {
            result === true && 
            <Link href={publicRuntimeConfig.BASE_URL_OLD+'dashboard'}>
              <a className="btn btn-lg btn-primary fw-bolder">Go to dashboard</a>
            </Link>
          }
        </div> 
      </div>
    </>
  )
}
export default SetRejectApproval;