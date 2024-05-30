import Apps from "../Template/Apps";
import { useState } from "react";
import RequestMonitoring from "./RequestMonitoring";
import WaitingReport from "./CardInfo/WaitingReport";

const HomeContainer = ({appsData}) => {
  return (
    <>
      {/* <div className="row g-5 g-xl-8">
        <WaitingReport appsData={appsData}/>
      </div>
      <div className="row g-5 g-xl-8">
        <RequestMonitoring appsData={appsData}/>
      </div> */}
    </>
  ) 
}
export default Apps(HomeContainer);