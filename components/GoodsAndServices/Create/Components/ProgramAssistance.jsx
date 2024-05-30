import Image from "next/image";
import { useEffect, useState } from "react";
import { imgLoader, serverAssets } from "../../../../utility/Image";
import { get, post, deleting } from '../../../../utility/Service';
import cookie from "js-cookie"
import nprogress from "nprogress";

const ProgramAssistance = ({appsData}) =>{
  const session = appsData.session;
  const [dataProgramAssistance, setDataProgramAssistance] = useState([]);
  const [masterDataProgramAssistance, setMasterDataProgramAssistance] = useState([])
  useEffect(()=>{
    if(appsData.detail && appsData.detail.status === true){
      setDataProgramAssistance(appsData.detail.data.paa)
    }
    loadProgramAssistance()
  },[])

  const removeProgramAssistance = (paa,index)=>{
    swal.fire({
      title: "Remove ?",
      html: "<span class='text-danger'>"+paa.name+"</span> will be removed from supported this request.",
      icon: "question",
      showCancelButton:!0,
      buttonsStyling:!1,
      confirmButtonText:"Yes",
      cancelButtonText:"No",
      customClass:{
        confirmButton:"btn btn-primary",
        cancelButton:"btn btn-danger"
      }
    }).then((result)=>{
      if(result.value){
        doRemoveProgramAssistance(paa.id_user,index)
      }
    })
  }
  const doRemoveProgramAssistance = (idUser,index)=>{
    nprogress.start();
    deleting({
      url:'goodsandservices/paa/'+appsData.PRNumber+'/'+idUser,
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
      var newDataProgramAssistance = [...dataProgramAssistance];
      newDataProgramAssistance.splice(index, 1);
      setDataProgramAssistance(newDataProgramAssistance)
      toastr.success("Program Assistance Removed.","Successfully !")
    }).catch((error)=>{
      Swal.fire({
        title: "Error",
        html: error,
        icon: "error",
        customClass:{
          confirmButton:"btn btn-primary",
        }
      })
    })
  }

  const loadProgramAssistance = async ()=>{
    nprogress.start()
    const endpointUrl = process.env.HOST_API+'lineapproval/programassistance';
    get({
      url:endpointUrl,
      token:cookie.get("fast_token")
    }).then((res)=>{
      nprogress.done();
      if(! (res.status===true && res.data.status===true) ){
        setMasterDataProgramAssistance([]);
      }
      setMasterDataProgramAssistance(res.data.data)
      if(appsData.PRNumber &&  appsData.detail.data.paa.length === 0){
        detectDefaultProgramAssistance(res.data.data);
      }
    })
  }
  const detectDefaultProgramAssistance = async (masterData) =>{
    const newData = [];
    masterData.forEach(async(item, i) => {
      item.units.forEach(async(unit, j) => {
        if(unit.id_unit === session.unitsId){
          await post({
            url:'goodsandservices/paa',
            params:{pr_number: appsData.PRNumber, id_paa: item.id_user},
            token: cookie.get('fast_token')
          }).then((res)=>{
            if(! res.data.status === true){
              return
            }
            newData.push({
              id_user: item.id_user,
              name: item.name,
              email: item.email,
              purpose: item.purpose,
              signature: item.signature,
              avatar: item.avatar,
            })
          })
        }
      })
    })
    setDataProgramAssistance(newData);
  }
  const addProgramAssistance = (params) =>{
    nprogress.start();
    post({
      url:'goodsandservices/paa',
      params:{pr_number: appsData.PRNumber, id_paa: params.id_user},
      token: cookie.get('fast_token')
    }).then((res)=>{
      nprogress.done()
      if(! res.data.status === true){
        toastr.error(res.data.message,"Failed.")
        return
      }
      const newDataProgramAssistance = [...dataProgramAssistance,params]
      setDataProgramAssistance(newDataProgramAssistance)
    }).catch((error)=>{
      nprogress.done()
      toastr.error(error,"Failed.")
    })
  }
  const openModalMasterDataProgramAssistance = (e)=> {
    e.preventDefault();
    $("#modalMasterDataProgramAssistance").modal('show')
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
                                <span className="text-primary opacity-50 d-block fs-8"><i className="lni lni-envelope"></i> {paa.email}</span>
                                <span  
                                  className="fw-bold d-block fs-7 text-danger opacity-70 cursor-pointer me-3"
                                  onClick={()=>{removeProgramAssistance(paa,i)}}
                                >
                                  <i className="lni lni-trash-can"></i> Remove
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
      <div className="col-6 text-center">
      <div className="container-img mw-300px d-inline-block">
        <Image 
          src={'media/logos/program_assistance.jpg'} 
          layout='fill' className="img "
          loader={imgLoader}/>
        </div>
        <div className="mx-15">
          <h1 className="mt-0 text-primary opacity-50">Program Assistance</h1>
          <button className="btn btn-primary btn-sm" onClick={(e)=>{openModalMasterDataProgramAssistance(e)}}><i className="lni lni-keyword-research fs-2"></i> Select Program Assistance </button>
        </div>
      </div>
    </div>
    <div className="modal fade"  id="modalMasterDataProgramAssistance">
      <div className="modal-dialog  mw-650px ">
        <div className="modal-content">
          <div className="modal-body px-10 px-lg-15 pt-10 pb-15">
            <div className="mb-13 text-center">
              <h1 className="mb-3">Program Assistance</h1>
              <div className="text-muted fw-bold fs-5">Choice a person to help you.</div>
            </div>
            <div className="row col-12 mb-10">
              {
                masterDataProgramAssistance.map((paa,index)=>{
                  const firstName = paa.name.split(" ")[0];
                  return(<>
                  <div class="col-md-4 cursor-pointer mb-5" data-bs-dismiss='modal' title="Klik to choice" key={'list_paa'+index} onClick={()=>{addProgramAssistance(paa)}}>
                    <div class="card card-flush shadow-sm">
                      <div class="card-body d-flex flex-center flex-column px-3 py-5">
                        <div class="mb-0">
                          <div class="symbol symbol-75px symbol-circle">
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
                        </div>
                        <span class="fs-4 text-gray-800 text-hover-primary fw-bolder mb-0">{firstName}</span>
                        <div class="fw-bold  mb-5 fs-9 text-muted">{paa.email}</div>
                      </div>
                    </div>
                  </div>
                  </>)
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default ProgramAssistance;