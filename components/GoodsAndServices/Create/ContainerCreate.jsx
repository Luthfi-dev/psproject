import Apps from "../../Template/Apps";
import CardBody from "./Components/CardBody";
import ContinuousFormError from "./Components/ContinuousFormError";
const ContainerCreate = ({appsData}) => {
  return (
    <>
      <div className="row g-5 g-xl-8">
        <div className="col-xl-12">
          <div className="card card-xl-stretch mb-5 mb-xl-8">
            {
              appsData?.detail && appsData?.detail?.status === false ?
              <ContinuousFormError appsData={appsData}/>:<CardBody appsData={appsData}/>
            }
          </div>
        </div>
      </div>
    </>
  ) 
}
export default Apps(ContainerCreate);