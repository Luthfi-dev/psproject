import { imgLoader } from "../../../../utility/Image";
import Image from "next/image";
import cookie from "js-cookie"
import path from 'path'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const SupportingDocument = ({appsData})=>{
  const detail = appsData?.detail;
  const token = String(cookie.get('fast_token'));
  const previewPR = (e) =>{
    const linkPrivewPR = publicRuntimeConfig.HOST_API+'purchaserequest/pdf?number='+detail?.direct_fund_code+'&token='+token
    e.preventDefault();
    window.open(linkPrivewPR,'_blank')
  }
  return(
    <>
    <div className="col-xl-6 mt-3">
          <div className="card mb-5 mb-xl-3 ">
            <div className="card-header">
              <h3 className="card-title align-items-start flex-column">
                <span className="fw-bolder m-0">Document</span>
                <span className="text-muted mt-1 fw-bold fs-7">Supporting Document</span>
              </h3>
              <div className="card-toolbar">
   
              </div>
            </div>
            <div className="card-body scroll h-350px">
            <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center mb-0">
                      <div className="symbol symbol-45px me-5">
                        <div className="container-img w-35px">
                          <Image 
                            src={'media/svg/files/pdf.svg'} 
                            layout="fill" className="img symbol "
                            loader={imgLoader}
                          />
                        </div>
                      </div>
                      <div className="fw-bold">
                        <a className="fs-6 fw-bolder text-dark text-hover-primary" href="#">Cover Pages</a>
                        <div className="text-gray-400 fs-8">
                          <a href="#" > <i className="las la-cloud-download-alt text-primary fs-8"></i> Download</a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center mb-0">
                      <div className="symbol symbol-45px me-5">
                        <div className="container-img w-35px">
                          <Image 
                          src={'media/svg/files/pdf.svg'} 
                          layout="fill" 
                          className="img symbol "
                          loader={imgLoader}
                          />
                        </div>
                      </div>
                      <div className="fw-bold">
                        <a className="fs-6 fw-bolder text-dark text-hover-primary" href="#">Mini Proposal</a>
                        <div className="text-gray-400 fs-8">
                          <a href="https://faster.bantuanteknis.id/Report/Manajemen_implementing_status/purchase_request/REYtMDAwMDEvMjgvMDEvMjAyMi8xMDA%3D" target={'_blank'}><i className="las la-cloud-download-alt text-primary fs-8"></i> Download</a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center mb-0">
                      <div className="symbol symbol-45px me-5">
                        <div className="container-img w-35px">
                          <Image 
                            src={'media/svg/files/pdf.svg'} 
                            layout="fill" 
                            className="img symbol "
                            loader={imgLoader}
                          />
                        </div>
                      </div>
                      <div className="fw-bold">
                        <a className="fs-6 fw-bolder text-dark text-hover-primary" href="#">Purchase Requestion Form</a>
                        <div className="text-gray-400 fs-8">
                          <a
                            href='#'
                            onClick={(e)=>{previewPR(e)}}
                            >
                              <i className="las la-cloud-download-alt text-primary fs-8"></i> Download
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            </div>
          </div>
        </div>
    </>
  )
}
export default SupportingDocument;