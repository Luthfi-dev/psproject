import Image from "next/image";
import { useEffect, useState } from "react";
import { imgLoader, serverAssets } from "../../../../utility/Image";
import { get, post, deleting } from '../../../../utility/Service';
import cookie from "js-cookie"
import nprogress from "nprogress";

const ProgramAssistance = ({appsData}) =>{
  console.log(appsData)
  const session = appsData.session;
  const [dataProgramAssistance, setDataProgramAssistance] = useState(appsData.detail.paa);
  return(
    <>
    <div className="row">
      <div className="col-12">
        <div className="card card-flush shadow-sm px-5">
          <div class="card-header border-0 pt-0 px-0">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bolder fs-3">Program Assistance</span>
            </h3>
          </div>
          <div className="card-body py-0 px-0 scroll h-300px">
            <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <tbody>
                  {
                    dataProgramAssistance.map((paa, i)=>{
                      return(<>
                      <tr key={'paa_'+i}>
                        <td className="text-gray-700">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-45px me-5">
                              <div className="container-img mw-45px">
                                {
                                  paa.avatar ?
                                  <Image 
                                    src={paa.avatar+'?subfolder=avatars&'} 
                                    layout="fill" className="img symbol "
                                    loader={serverAssets}
                                  />
                                  :
                                  <Image 
                                    src={'media/avatars/blank.png'} 
                                    layout="fill" className="img symbol "
                                    loader={imgLoader}
                                  />
                                }
                              </div>
                            </div>
                            <div className="d-flex justify-content-start flex-column">
                              <a href="#" className="text-dark fw-bolder text-hover-primary fs-6">{paa.name}</a>
                                <span className="text-primary opacity-50 d-block fs-8">
                                  {paa.purpose}
                                </span>
                                <span  
                                  className="fw-bold d-block fs-7 text-danger opacity-70 cursor-pointer me-3">
                                  {paa.email}
                                </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      </>)
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default ProgramAssistance;