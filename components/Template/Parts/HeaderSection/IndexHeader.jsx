import Image from "next/image";
import Breadcrumbs from "./Breadcrumbs";
import Brand from "./Brand";
const IndexHeader = ({appsData}) => {
  return(
    <>
      <div id="kt_header" className="header align-items-stretch">
        <Brand/>
        <Breadcrumbs breadcrumbs={appsData.breadcrumbs}/>
      </div>
    </>
  )
}

export default IndexHeader;