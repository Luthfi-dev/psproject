import Apps from "../../Template/Apps";
import CardHeader from "./Components/CardHeader";
import CardBody from "./Components/CardBody";
import { useState } from "react";

const ContainerData = ({appsData}) => {
  const [stateData,setStateData]=useState(0);
  appsData.table.stateData=stateData;
  return (
    <>
      <div className="row g-5 g-xl-8">
        <div className="col-xl-12">
          <div className="card card-xl-stretch mb-5 mb-xl-8">
            <CardHeader appsData={appsData} stateData={(state)=>{setStateData(state)}}/>
            <CardBody appsData={appsData}/>
          </div>
        </div>
      </div>
    </>
  ) 
}
export default Apps(ContainerData);