import Image from "next/image"
import { imgLoader } from "../../utility/Image"
import Head from "next/head"
import { get } from "../../utility/Service"
import AppConfig from "../../utility/AppConfig"

import NotFound from "../../components/Confirm/PurchaseRequest/NotFound";
import DirectToDetail from "../../components/Confirm/PurchaseRequest/DirectToDetail"
import SetTrue from "../../components/Confirm/PurchaseRequest/SetTrue";
import SetFalse from "../../components/Confirm/PurchaseRequest/SetFalse";

import SetRejectReviewer from "../../components/Confirm/PurchaseRequest/setRejectReviewer";
import SetApproveReviewer from "../../components/Confirm/PurchaseRequest/setApproveReviewer";

import SetRejectApproval from "../../components/Confirm/PurchaseRequest/setRejectApproval";
import SetApproveApproval from "../../components/Confirm/PurchaseRequest/setApproveApproval";


const Index=({appsData})=>{
  const detail = appsData.detail;
  return (<>
    <Head>
      <title>Confirm</title>
      <link rel="shortcut icon" href={process.env.BASE_PATH+'/assets/media/logos/favicon.ico'}  />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
		<div className="d-flex flex-column flex-root bg-dark">
			<div className="d-flex flex-column flex-column-fluid">
				<div className="d-flex flex-column flex-column-fluid text-center p-10 py-lg-15">
					<a href="/dasboard" className="mb-10 pt-lg-10">
            <div className="container-img">
              <Image alt="Faster" 
              layout="fill"
              src="media/logos/faster.png" className="h-40px mb-5 img" 
              loader={imgLoader}
              />
            </div>
					</a>
          {
            ! appsData.detail &&
            <NotFound props={appsData.error}/>
          }
					{
            appsData.do === 'direct' &&
            <DirectToDetail detail={detail}/>
          }
          {
            detail?.flag === 'request_checking_pr' && appsData.do === 'settrue' &&
            <SetTrue detail={detail}/>
          }
          {
            detail?.flag === 'request_checking_pr' && appsData.do === 'setfalse' &&
            <SetFalse detail={detail}/>
          }
          {
            detail?.flag === 'request_review_pr' && appsData.do === 'approve' &&
            <SetApproveReviewer detail={detail}/>
          }
          {
            detail?.flag === 'request_review_pr' && appsData.do === 'reject' &&
            <SetRejectReviewer detail={detail}/>
          }
          {
            detail?.flag === 'request_approval_pr' && appsData.do === 'approve' &&
            <SetApproveApproval detail={detail}/>
          }
          {
            detail?.flag === 'request_approval_pr' && appsData.do === 'reject' &&
            <SetRejectApproval detail={detail}/>
          }
				</div>
			</div>
		</div>
    
    <script src={process.env.BASE_PATH+'/assets/plugins/global/plugins.bundle.js'}></script>
    <script src={process.env.BASE_PATH+'/assets/js/scripts.bundle.js'}></script>
    <script src={process.env.BASE_PATH+'/assets/js/custom.js'}></script>
  </>)
}


export async function getServerSideProps(context) {
  const paramsQuery = context.query;
  const id = paramsQuery.id;
  const token = paramsQuery.token;
  const endpointUrl = process.env.HOST_API+'purchaserequest/confirm/detail';
  AppConfig.do = paramsQuery.do;
  await get({ url:endpointUrl, params:{ id:id, token:token }, token:token}).then((res)=>{
    if(res.status){
      AppConfig.detail = res.data;
    }else{
      var error = {
        message:res.message,
        code:res.code?res.code:''
      }
      AppConfig.error = error;
    }
  }).catch((error)=>{
    var error = {
      message:error.message,
      code:error.code?error.code:''
    }
    AppConfig.error = error;
  })

  const appsData=AppConfig
  return {
    props: {appsData}, // will be passed to the page component as props
  }
}
export default Index;