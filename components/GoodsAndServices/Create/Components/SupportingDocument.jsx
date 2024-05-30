import Image from "next/image";
import { imgLoader, serverAssets } from "../../../../utility/Image";
import {post, uploadFiles, deleting} from '../../../../utility/Service';
import cookie from "js-cookie"
import { useEffect, useState } from "react";
import nprogress from "nprogress";
import Link from "next/link";

const SupportingDocument = ({appsData}) =>{
  const [supportingDocument, setSupportingDocument] = useState([]);

  useEffect(()=>{
    if(appsData.detail && appsData.detail.status === true){
      const data = appsData.detail.data;
      setSupportingDocument(data.document)
    }
  },[]);
  
  const openModalUploadDocument = (e) =>{
    e.preventDefault();
    const btnUpload = document.getElementById('btn_upload_supporting_document');
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) =>{
      btnUpload.setAttribute('data-kt-indicator','on')
      btnUpload.setAttribute('disabled',true)
      const files = e.target.files[0];
      const formData = new FormData();
      formData.append('file',files);
      uploadFiles({
        path: 'supporting_document',
        data: formData
      }).then((res)=>{
        btnUpload.setAttribute('data-kt-indicator','off')
        btnUpload.removeAttribute('disabled')
        if(res.data.status === false){
          swal.fire({
            title: "Upload Failed !",
            html: res.data.message,
            icon: 'error'
          })
          return;
        }
        addSupportingDocument(res.data.data);
      }).catch((error)=>{
        btnUpload.setAttribute('data-kt-indicator','off')
        btnUpload.removeAttribute('disabled')
        toastr.error("Failed Upload, Try Again !","Error Upload.")
      })
    }
    input.click();
  }

  const addSupportingDocument = (params) =>{
    const btnUpload = document.getElementById('btn_upload_supporting_document');
    btnUpload.setAttribute('data-kt-indicator','on')
    btnUpload.setAttribute('disabled',true)
    post({
      url:'goodsandservices/document',
      params:{
        "pr_number": appsData.PRNumber,
        "file_name": params.originalname,
        "file_extention": params.mimetype,
        "file_URL": params.filename
      },
      token: cookie.get("fast_token")
    }).then((res)=>{
      btnUpload.setAttribute('data-kt-indicator','off')
      btnUpload.removeAttribute('disabled')
      if(! res.data.status=== true){
        toastr.error(res.data.message,"Error Upload.")
        return;
      }
      toastr.success(res.data.message,"Successfully !")
      const newDataDocument = [...supportingDocument,{
          "id_doc": res.data.data.id_doc,
          "file_name": params.originalname,
          "file_extention": params.file_extention,
          "file_URL": params.filename
      }]
      setSupportingDocument(newDataDocument)
    }).catch((error)=>{
      btnUpload.setAttribute('data-kt-indicator','off')
      btnUpload.removeAttribute('disabled')
      toastr.error("Failed Add Supporting Document, Try Again !","Error Upload.")
    })
  }

  const deleteDocument = (params,index) =>{
    swal.fire({
      title: "Delete Document ?",
      html: "If Supporting Document <span class='text-danger'>"+params.file_name+"</span> Has Been Deleted Cannot Recovery.",
      icon: "question",
      showCancelButton:!0,
      buttonsStyling:!1,
      confirmButtonText:"Delete",
      cancelButtonText:"No",
      customClass:{
        confirmButton:"btn btn-primary",
        cancelButton:"btn btn-danger"
      }
    }).then((result)=>{
      if(result.value){
        doDeleteDocument(params.id_doc,index)
      }
    })
  }

  const doDeleteDocument = (idDocument,index)=>{
    nprogress.start();
    deleting({
      url:'goodsandservices/document/'+idDocument,
      token: cookie.get("fast_token")
    }).then((result)=>{
      nprogress.done();
      if(! result.data.status === true){
        Swal.fire({
          title: "Failed",
          html: result.data.message,
          icon: "error",
          customClass:{
            confirmButton:"btn btn-primary",
          }
        })
        return;
      }
      var newDataDocument = [...supportingDocument];
      newDataDocument.splice(index, 1);
      setSupportingDocument(newDataDocument)
      toastr.success("Supporting Document Has Been Deleted.","Successfully !")
    })
  }
  return(
    <>
    <div className="row">
      <div className="col-6">
        <div className="card card-xl-stretch">
          <div className="card-body py-0 px-0">
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
                      const linkDocument = process.env.ASSETS_HOST;
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
                                  <span  
                                    className="fw-bold d-block fs-7 text-danger opacity-70 cursor-pointer"
                                    onClick={()=>{deleteDocument(document,index)}}
                                  >
                                    <i className="lni lni-trash-can"></i> Delete
                                  </span>
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
      <div className="col-6 text-center">
        <div className="container-img mw-250px d-inline-block">
          <Image 
            src={'media/logos/supporting_document.png'} 
            layout='fill' className="img "
            loader={imgLoader}/>
        </div>
        <div className="mx-5">
          <h1 className="mt-0 text-success opacity-80">Supporting Document</h1>
          <button 
            type="submit" 
            id="btn_upload_supporting_document" 
            className="btn btn-success btn-sm" 
            onClick={(e)=>{openModalUploadDocument(e)}}
          >
            <span className="indicator-label"><i className="lni lni-cloud-upload fs-2"></i> Upload Document </span>
            <span className="indicator-progress">Please wait...
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
export default SupportingDocument;