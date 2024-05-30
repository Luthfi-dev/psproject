import Image from "next/image";
import { imgLoader, serverAssets } from "../../../../utility/Image";
import {post, uploadFiles, deleting} from '../../../../utility/Service';
import cookie from "js-cookie"
import { useEffect, useState } from "react";
import nprogress from "nprogress";
import Link from "next/link";

const SupportingDocument = ({appsData}) =>{
  const [supportingDocument, setSupportingDocument] = useState(appsData.detail.document);

  return(
    <>
    <div className="row">
      <div className="col-12">
        <div className="card card-flush shadow-sm px-5">
          <div class="card-header border-0 pt-0 px-0">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bolder fs-3">Supporting Document</span>
            </h3>
          </div>
          <div className="card-body py-0 px-0 scroll h-300px">
            <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <tbody>
                  <tr>
                    <td className="text-gray-700">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-45px me-5">
                          <div className="container-img mw-45px">
                            <Image 
                              src={'media/svg/files/pdf.svg'} 
                              layout="fill" className="img symbol "
                              loader={imgLoader}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-start flex-column">
                          <span className="text-dark fw-bolder text-hover-primary fs-6">Mini Proposal</span>
                          <a href="#" target='_blank' className="fw-bold d-block fs-7 text-primary opacity-70"><i className="lni lni-download"></i> Download Mini Proposal</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-700">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-45px me-5">
                          <div className="container-img mw-45px">
                          <Image 
                              src={'media/svg/files/pdf.svg'} 
                              layout="fill" className="img symbol "
                              loader={imgLoader}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-start flex-column">
                          <span className="text-dark fw-bolder text-hover-primary fs-6">Purchases Requestion</span>
                          <a href="#" target='_blank' className="fw-bold d-block fs-7 text-primary opacity-70"><i className="lni lni-download"></i> Download Mini Proposal</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {
                    supportingDocument.map((document, index)=>{
                      var linkDocument = process.env.ASSETS_HOST;
                      linkDocument += document.file_URL
                      linkDocument += '?token='+process.env.TOKEN_ASSETS_HOST
                      linkDocument += '&subfolder=supporting_document'
                      return(
                        <tr key={'doc_'+index}>
                          <td className="text-gray-700">
                            <div className="d-flex align-items-center">
                              <div className="symbol symbol-45px me-5">
                                <div className="container-img mw-45px">
                                <Image 
                                    src={'media/svg/files/doc.svg'} 
                                    layout="fill" className="img symbol "
                                    loader={imgLoader}
                                  />
                                </div>
                              </div>
                              <div className="d-flex justify-content-start flex-column">
                                <a href={linkDocument} target='_blank' className="text-dark fw-bolder text-hover-primary fs-6">{document.file_name}</a>
                                <div className="d-flex">
                                  <a href={linkDocument}  target='_blank' className="fw-bold d-block fs-7 text-primary opacity-70 me-5">
                                    <i className="lni lni-download"></i> Download
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
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
export default SupportingDocument;