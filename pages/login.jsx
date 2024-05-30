import getConfig from 'next/config'
import Head from 'next/head'
import Image from 'next/image'
import Script from "next/script"
import Select2 from '../apps/01-atoms/Forms/Select2'
import InputText from '../apps/01-atoms/Forms/Inputtext'
import nprogress from 'nprogress'
import { useState, useEffect } from 'react'
import { imgLoader } from '../utility/Image'
import { get } from '../utility/Service'
const { publicRuntimeConfig } = getConfig()

export default function Login(){
  const [loadingVerify, setLoadingVerify] = useState(false)
  const [resultData, setResultData] = useState()
  const [selectedAccount, setSelectedAccount] = useState()
  const [keyAccess, setKeyAccess] = useState()



  return(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Please login to using faster</title>
        <link rel="shortcut icon" type="images/logos/inventory.ico" href="/assets/media/logos/favicon.ico" />
      </Head>
      <div className='d-flex flex-column flex-root bg- column-fluid' id='body_form_login'>
        <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed content_page">
          <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-10'>
            <div className='w-lg-500px bg-body rounded-1 shadow-sm p-10 p-lg-15 mx-auto'>
              <form className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework' >
                <div className='text-center mb-20'>
                  <div className="container-img mw-300px d-inline-block">
                    <Image 
                    src={'/media/logos/logo_faster_full.png?v=1.0.0.0'} 
                    layout='fill' className="img mb-0"
                    loader={imgLoader}
                    />
                  </div>
                </div>
                <div className='text-center mb-0'>
                  <div className="container-img mw-350px d-inline-block">
                    <Image 
                    src={'/media/logos/program_assistance.jpg'} 
                    layout='fill' className="img mb-5"
                    loader={imgLoader}
                    />
                  </div>
                </div>
                <div className='text-center mb-10'>
                  
                  <InputText
                    props={{
                      addClass: 'border rounded-1 mb-2',
                      placeholder: 'Username...',
                      defaultValue: keyAccess
                    }}
                    onChanged={(e) => {
                      setKeyAccess(String(e).toUpperCase())
                    }}
                  />
                  <InputText
                    props={{
                      addClass: 'border rounded-1 mb-2',
                      placeholder: 'Password...',
                      defaultValue: keyAccess
                    }}
                    onChanged={(e) => {
                      setKeyAccess(String(e).toUpperCase())
                    }}
                  />
                  <button
                    disabled={loadingVerify}
                    data-kt-indicator={loadingVerify === true ? 'on':''}
                    className="btn btn-primary rounded-1 fw-bolder cursor-pointer w-100" 
                    onClick={()=>{
                      getAccessAccount()
                    }} 
                    type='button'>
                    <span className="indicator-label me-2">
                      Login
                      {/* <i className='ms-3 fa fa-key'></i> */}
                    </span>
                    <span className="indicator-progress">Verify user, Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='d-flex flex-center flex-column-auto p-10 cursor-pointer '>
            <div className='d-flex align-items-center fw-bold fs-6 '>
              <div className='text-muted text-hover-primary px-2 me-10'>Copyright &copy; Faster v2.0</div>
              <a href="https://www.fhi360.org/privacy" className="text-muted text-hover-primary px-2 fw-normal fs-12px text-decoration-underline" target="_blank">Privacy</a>
              <a href="https://www.fhi360.org/privacy" className="text-muted text-hover-primary px-2 fw-normal fs-12px text-decoration-underline" target="_blank">Terms</a>
            </div>
          </div>
        </div>
      </div>
      <script src={publicRuntimeConfig.BASE_PATH+'/assets/plugins/global/plugins.bundle.js'}></script>
		  <script src={publicRuntimeConfig.BASE_PATH+'/assets/js/scripts.bundle.js'}></script>
      <script src={publicRuntimeConfig.BASE_PATH+'/assets/js/custom.js?v=1.0.0.1'}></script>
      <script src={publicRuntimeConfig.BASE_PATH+'/assets/plugins/custom/jstree/jstree.bundle.js'}></script>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          KTScroll.init();
          KTDialer.init();
          KTDrawer.init();
          KTScrolltop.init();
          KTImageInput.init();
          KTSticky.init();
          KTSwapper.init();
          KTToggle.init();
          KTUtil.init();
          KTLayoutToolbar.init();
          KTMenu.init();
          KTApp.init();
          $(document).ready(function(){
            $(".tooltip").hide();
          });
          `
        }}
      />
      <script src={publicRuntimeConfig.BASE_PATH+'/assets/js/init.scripts.js'}></script>
    </>
  )
}