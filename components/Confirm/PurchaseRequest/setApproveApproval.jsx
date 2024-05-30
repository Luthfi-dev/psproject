import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { post, get, put } from "../../../utility/Service"
import nprogress from "nprogress";
import Link from 'next/link';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const SetApproveApproval = ({detail}) =>{
  const router = useRouter()
  const [result, setResult]=useState(false);
  const [alertMessage, setAlertMessage]=useState('Approve PR Successfully, thanks you !')
  const [alertTitle,setAlertTitle]=useState("Validating url...")
  useEffect(async() => {
    nprogress.start();
    const endpointUrl = publicRuntimeConfig.HOST_API+'purchaserequest/setresultapproval';
    await put({
      url:endpointUrl,
      params:{
        number:detail.value,
        result:'1'
      },
      token:detail.token_access
    }).then((res)=>{
      nprogress.done();
      if(res.data && res.data.code === 200 ){
        setResult(true)
        setAlertTitle("Successfully !")
        swal.fire({
          icon:'success',
          title:'Successfully !',
          text:"Approve PR Successfully",
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
        setResult(true)
        setAlertMessage(res.data.message)
        setAlertTitle("Failed !")
      }
    })
  }, []);

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
            'Set approve, Please wait ...'
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
            result === false && 
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
export default SetApproveApproval;