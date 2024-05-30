import Apps from "../../Template/Apps";
import ItemsRequested from "./Components/ItemsRequested";
import RequestInformation from "./Components/RequestInformation";
import SupportingDocument from "./Components/SupportingDocument";
import SignaturedBy from "./Components/SignaturedBy";
import Failed from "./Components/Failed";
import { useEffect, useState } from "react";
import Currency from "../../../helper/Currency"

const ContainerDetail = ({appsData})=>{
  const currency = new Currency();
  const [triggerResubmit,setTriggerResubmit]=useState(false);
  const [newStatePR,setNewStatePR]=useState(appsData?.detail?.pr_state);
  const [newTotalPR, setNewTotalPR]=useState(appsData?.detail?.total_pr_price);
  appsData.triggerResubmit=triggerResubmit;
  appsData.newStatePR=newStatePR;
  appsData.totalPR = newTotalPR;
  const callResubmit = (e)=>{
    setTriggerResubmit(e)
  }
  const updateStatePR = (e)=>{
    setNewStatePR(e)
  }

  const refreshBudgetInformation = (newTotalPrice) => {
    setNewTotalPR(currency.rupiah(newTotalPrice))
  }
  return(
    <>
    <div className="row g-5 g-xl-8 ">
      {
        appsData.detail ?
        <>
          <RequestInformation appsData={appsData}/>
          <SupportingDocument appsData={appsData}/>
          <SignaturedBy appsData={appsData} updateStatePR={(e)=>{updateStatePR(e)}}/>
          <ItemsRequested 
            appsData={appsData} 
            callBack={(e)=>{callResubmit(e)}} 
            updateBudgetInformation = {(newTotalPrice)=>{refreshBudgetInformation(newTotalPrice)}}
          />
        </>
        :
        <Failed appsData={appsData}/>
      }
      
    </div>
    </>
  )
}
export default Apps(ContainerDetail);