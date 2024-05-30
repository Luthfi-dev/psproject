import { useEffect, useState } from "react";
import nprogress from "nprogress";
import { post, get } from "../../../../utility/Service"
import cookie from "js-cookie"
import Image from "next/image";
import {imgLoader} from "../../../../utility/Image"

const FormFilter = ({appsData,changeProject})=>{
  const [recordsProjects,setRecordsProjects] = useState([]);
  const [projectId,setProjectId] = useState('');
  useEffect(()=>{
    loadProject();
  },[])

  const loadProject = async () =>{
    var filter= [];
    nprogress.start();
    const endpointUrl = process.env.HOST_API+'projects/data';
    await post({
      url:endpointUrl,
      params:{
        page:1,
        limit:50,
        filter:filter
      },
      token:cookie.get("fast_token")
    }).then((res)=>{
      nprogress.done();
      if(res.data){
        if(res.data.code === 200){
          if(res.data.data != null){
            setRecordsProjects(res.data.data.records)
          }
        }
      }
    })
  }

  useEffect(()=>{
    if(projectId){
      changeProject(projectId)
    }
  },[projectId])

  const resetForm = (e) => {
    setProjectId('')
    $(".btnCloseFormFilter").trigger('click')
  }
  return(
    <>
    <div
      id="formFilterInboxPending"
      className="bg-white"
      data-kt-drawer="true"
      data-kt-drawer-activate="true"
      data-kt-drawer-toggle={'#'+appsData.table.options.idFormFilter}
      data-kt-drawer-close=".btnCloseFormFilter"
      data-kt-drawer-width="500px"
      >
      <div className="card shadow-none rounded-0 w-100">
				<div className="card-header">
					<h3 className="card-title fw-bolder text-gray-700">Filter Data</h3>
					<div className="card-toolbar">
						<button type="button" className="btn btn-sm btn-icon btn-active-light-primary me-n5 btnCloseFormFilter" >
							<span className="svg-icon svg-icon-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
									<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
								</svg>
							</span>
						</button>
					</div>
				</div>
        <div className="card-body">
          <div className="mb-0 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
            <label className="d-flex align-items-center form-label mb-5 fs-6 text-dark fw-bolder">
              Project
              <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="" data-bs-original-title="Data displayed based on the selected project" ></i>
            </label>
            <div className="mb-10">
              {
                recordsProjects.map((row, index) => {
                  return(
                    <label key={index+'_'+row.project_id+'_'} className="d-flex flex-stack mb-5 cursor-pointer">
                      <span className="d-flex align-items-center me-2">
                        <span className="symbol symbol-50px me-6">
                          <span className="symbol-label">
                          {
                            row.project_logos != '' ?
                            <Image src={'media/logos/'+row.project_logos} 
                            className="img symbol align-self-center p-2" 
                            layout="fill" 
                            loader={imgLoader}/>
                            :
                            <span className="svg-icon svg-icon-1 svg-icon-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z" fill="black"></path>
                                <path opacity="0.3" d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z" fill="black"></path>
                              </svg>
                            </span>
                          }
                          </span>
                        </span>
                        <span className="d-flex flex-column">
                          <span className="fw-bolder text-gray-800 text-hover-primary fs-5">{row.project_name}</span>
                          <span className="fs-7 fw-bold text-success">{row.gfas}</span>
                        </span>
                      </span>
                      <span className="form-check form-check-custom form-check-solid is-valid">
                        <input 
                        onChange={(e)=>{setProjectId(e.target.value)}}
                        checked={projectId.toString() === row.project_id.toString() ? true:false}  
                        className="form-check-input" type="radio" name="account_plan" value={row.project_id}/>
                      </span>
                    </label>
                  )
                })
              }
            </div>
            <div className="d-flex align-items-center justify-content-start">
              <button 
              onClick={(e)=>{resetForm(e)}}
              className="btn btn-danger btn-color-light me-3"><i className="fa fa-undo"></i> Discard Filter</button>
              <button className="btn btn-dark btn-color-light me-3 btnCloseFormFilter">
                <span className="svg-icon svg-icon-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                    <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
                  </svg>
                </span>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default FormFilter;