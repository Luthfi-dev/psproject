import { useEffect, useState } from 'react';
import InputText from '../../../../apps/03-organisms/Form/Horizontal/InputText';
import Label from '../../../../apps/01-atoms/Forms/Label';
import HorizontalInput from '../../../../apps/02-molecules/Form/HorizontalInput';
import Select2 from '../../../../apps/03-organisms/Form/Vertical/Select2';
import Row from '../../../../apps/01-atoms/Grids/Row';
import Col12 from '../../../../apps/01-atoms/Grids/Col12';
import { get, put, post} from "../../../../utility/Service";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const ProfileDetailsCard = ({setUserData, userData, tab}) => {
  const [programManagerMessage, setProgramManagerMessage] = useState();
  const [dataUser, setdataUser] = useState()
  const [dataUnit, setdataUnit] = useState()
  const [dataProject, setdataProject] = useState()
  const [username, setusername] = useState()
  const [position, setposition] = useState()
  const [supervisor, setsupervisor] = useState()
  const [role, setrole] = useState()
  const [email, setemail] = useState()
  const [employee, setemployee] = useState()
  const [imgSignature, setImgSignature] = useState(userData?.data?.signature);

  useEffect(()=>{
    setImgSignature(userData?.data?.signature)
  },[userData])

  useEffect(() => {
    getDataUser()
    getSupervisor()
  },[])

const getDataUser = async () => {
    try {
      const getDataUserResponse = await get({ url: 'user' });

      if (getDataUserResponse?.data?.status === false) {
        throw new Error(getDataUserResponse?.data?.message);
      }

      if (getDataUserResponse?.status !== 200) {
        throw new Error(getDataUserResponse?.statusText);
      }

      const listData = getDataUserResponse.data; 
      setdataUser(listData);
      setUserData(listData);
      setusername(getDataUserResponse.data.data.account_name)
      setposition(getDataUserResponse.data.data.purpose)
      setrole(getDataUserResponse.data.data.role)
      setemail(getDataUserResponse.data.data.email)
      setemployee(getDataUserResponse.data.data.employee_id)
      setdataUnit(getDataUserResponse.data.data.tb_units_model.unit_name)
      setdataProject(getDataUserResponse.data.data.tb_project_model.project_name)
    } catch (error) {
      swal.fire({
        text: error.message,
        icon: 'error'
      });
    }
};

const getSupervisor = async () => {
    try {
      const getDataUserResponse = await get({ url: 'lineapproval/supervisor' });

      if (getDataUserResponse?.data?.status === false) {
        throw new Error(getDataUserResponse?.data?.message);
      }

      if (getDataUserResponse?.status !== 200) {
        throw new Error(getDataUserResponse?.statusText);
      }

      const supervisorName = getDataUserResponse?.data?.data[0]?.name;
      setsupervisor(supervisorName)
    } catch (error) {
      swal.fire({
        text: error.message,
        icon: 'error'
      });
    }
};

const openDialogUploadDocument = (e) =>{
    e.preventDefault();
    const btnUpload = e.target.closest('button');
    const input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('name', 'receipt')
    input.onchange = async (e) =>{
      btnUpload.setAttribute('data-kt-indicator','on')
      const form = document.createElement("form");
      form.appendChild(input)
      const formData = new FormData(form)
      try {
        const uploadReciept = await put({
          url: '/user/upimage/signature',
          params: formData
        })

        if(uploadReciept?.data?.status === true){
          setImgSignature(uploadReciept?.data?.data?.data?.filename)
          swal.fire({
            text: 'Signature Berhasil Di Update',
            icon: 'success'
          })
          btnUpload.setAttribute('data-kt-indicator','off')
        }
        if(uploadReciept?.data?.status === false){
          throw Object({ message: uploadReciept?.data?.message})
        }
        if(uploadReciept?.status !== 200){
          throw Object({ message: uploadReciept?.statusText})
        }
        
      } catch (error) {
        swal.fire({
          text: 'Failed to Upload Image ' + error?.message,
          icon: 'error'
        })
        btnUpload.setAttribute('data-kt-indicator','off')
      }
    }
    input.click();
  }

  return (
    <div className="card mb-5">
      {/* Card header */}
      <div className="card-header border-0">
        {/* Card title */}
        <div className="card-title m-0">
          <h3 className="fw-bold m-0">Personal information</h3>
        </div>
        {/* End Card title */}
      </div>
      {/* End Card header */}

      {/* Content */}
      {(tab === 0) ? (
      <div id="kt_account_settings_profile_details" className="collapse show">
        {/* Form */}
        <form id="kt_account_profile_details_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" noValidate>
          {/* Card body */}
          <div className="card-body border-top p-9">
            {/* Input group */}
            <Row>
              <Col12>
                <InputText
                  props={{
                    mb: '2',
                    addClass: 'rounded-1 border',
                    readOnly:true,
                    label: "Full Name",
                    defaultValue: username,
                  }}
                  onChanged={(value) => setusername(value)}
                />
              </Col12>
            </Row>
            <Row>
              <Col12>
                <InputText
                  props={{
                    mb: '2',
                    addClass: 'rounded-1 border',
                    readOnly:true,
                    label: "Position",
                    defaultValue: position,
                  }}
                  onChanged={(value) => setposition(value)}
                />
              </Col12>
            </Row>
            <Row>
              <Col12>
                <InputText
                  props={{
                    mb: '2',
                    addClass: 'rounded-1 border',
                    readOnly:true,
                    label: "Unit",
                    defaultValue: dataUnit,
                  }}
                  onChanged={(value) => setdataProject(value)}
                />
              </Col12>
            </Row>
            <Row>
              <Col12>
                <InputText
                  props={{
                    mb: '2',
                    addClass: 'rounded-1 border',
                    readOnly:true,
                    label: "Supervisor",
                    defaultValue: supervisor,
                  }}
                  onChanged={(value) => setsupervisor(value)}
                />
              </Col12>
            </Row>
            <Row>
              <Col12>
                <InputText
                  props={{
                    mb: '2',
                    addClass: 'rounded-1 border',
                    readOnly:true,
                    label: "Rules as",
                    defaultValue: role,
                  }}
                  onChanged={(value) => setrole(value)}
                />
              </Col12>
            </Row>
            <Row>
              <Col12>
                <InputText
                  props={{
                    mb: '2',
                    addClass: 'rounded-1 border',
                    readOnly:true,
                    label: "project",
                    defaultValue: dataProject,
                  }}
                  onChanged={(value) => setdataProject(value)}
                />
              </Col12>
            </Row>
            <Row>
              <Col12>
                <InputText
                  props={{
                    mb: '2',
                    addClass: 'rounded-1 border',
                    readOnly:true,
                    label: "Username",
                    defaultValue: username,
                  }}
                  onChanged={(value) => setusername(value)}
                />
              </Col12>
            </Row>
            <Row>
              <Col12>
                <InputText
                  props={{
                    mb: '2',
                    addClass: 'rounded-1 border',
                    readOnly:true,
                    label: "Email",
                    defaultValue: email,
                  }}
                  onChanged={(value) => setemail(value)}
                />
              </Col12>
            </Row>
            <Row>
              <Col12>
                <InputText
                  props={{
                    mb: '2',
                    addClass: 'rounded-1 border',
                    readOnly:true,
                    label: "Employee ID",
                    defaultValue: employee,
                  }}
                  onChanged={(value) => setemployee(value)}
                />
              </Col12>
            </Row>
            {/* End Input group */}
          </div>
          {/* End Card body */}

        </form>
        {/* End Form */}
      </div>
      ) : (
        <div className="card-body p-100 d-flex flex-column align-items-center">
          {/* Pic */}
          <div className="align-item-center mb-5">
            <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
              <img 
                src={"https://assets.bantuanteknis.org/" + imgSignature + "?subfolder=signatures&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcENsaWVudCI6IjEwMy41Mi4xNDQuMTQ4IiwiZm9sZGVyTmFtZSI6ImZhc3Rlci5iYW50dWFudGVrbmlzLmlkIiwiaWF0IjoxNjY0MjY1MjAxfQ.WUjzCs-ljE2Q5A-c75wVKrYttBCuWo8qeV1XiC-D9BU&w=640&q=75"} 
                alt="image" 
                style={{ objectFit: 'cover', width: '250px', height: '250px' }} 
              />
            </div>
          </div>
          {/* Info */}
          <button
          type="submit" 
          id="btn_upload_supporting_document"
          className="btn btn-primary"  
          onClick={(e)=>{openDialogUploadDocument(e)}}>
              <span className="indicator-label">Change my Signature</span>
              <span className="indicator-progress"> Please wait...&nbsp;&nbsp;
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
          </button>

          <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6 mt-5">
            {/* Wrapper */}
            <div className="d-flex flex-stack flex-grow-1">
              {/* Content */}
              <div className="fw-semibold">
                <div className="fs-6 text-gray-700">
                  Each document produce by faster will insert you signature, Please upload best image with format .png, .jpeg from you device before start using system.
                </div>
              </div>
              {/* End Content */}
            </div>
            {/* End Wrapper */}
          </div>

        </div>

      )}
          
      {/* End Content */}
    </div>
  );
};

export default ProfileDetailsCard;
