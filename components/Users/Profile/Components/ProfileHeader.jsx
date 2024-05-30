
import { useEffect, useState } from "react"
import { put } from '../../../../utility/Service'

const ProfileHeader = ({userData, seTab, tab}) =>{
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formattedTimeDifference, setFormattedTimeDifference] = useState('N/A');
  const [imgAvatar, setImgAvatar] = useState();

  useEffect(()=>{
    setImgAvatar(userData?.data?.avatar)
  },[userData])

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
          url: '/user/upimage/avatar',
          params: formData
        })

        if(uploadReciept?.data?.status === true){
          setImgAvatar(uploadReciept?.data?.data?.data?.filename)
          swal.fire({
            text: 'Image Berhasil Di Update',
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);// Update setiap detik

    return () => {
      clearInterval(interval); // Membersihkan interval saat komponen di-unmount
    };
  }, []);

  // Mendapatkan nama hari ini
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const dayName = days[currentDate.getDay()];

  // Mendapatkan waktu saat ini
  const currentTime = currentDate.toLocaleTimeString('id-ID');

  // Mendapatkan tanggal saat ini
  const currentDateString = currentDate.toLocaleDateString('id-ID');

  // set date time

useEffect(() => {
    // Mendapatkan nilai last_activity_at dari userData
    const lastActivityTimestamp = userData?.data?.last_activity_at;

    // Mendapatkan waktu saat ini
    const currentTimeN = new Date().getTime();

    if (lastActivityTimestamp) {
        // Menghitung selisih waktu dalam milidetik antara waktu saat ini dan lastActivityTimestamp
        const timeDifferenceMillis = currentTimeN - lastActivityTimestamp;

        if (timeDifferenceMillis < (60 * 60 * 1000)) { // Kurang dari satu jam
            const timeDifferenceMinutes = Math.floor(timeDifferenceMillis / (1000 * 60));
            if (timeDifferenceMinutes < 1) { // Kurang dari satu menit
                const timeDifferenceSeconds = Math.floor(timeDifferenceMillis / 1000);
                setFormattedTimeDifference(`${timeDifferenceSeconds} S ago`);
            } else {
                setFormattedTimeDifference(`${timeDifferenceMinutes} M ago`);
            }
        } else {
            // Menghitung selisih waktu dalam jam
            const timeDifferenceHours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
            setFormattedTimeDifference(`${timeDifferenceHours} H ago`);
        }
    }
}, [currentDate]);

  
  return(
    <>
      <div className="card mb-5">
      <div className="card-body pt-9 pb-0">
          {/* Details */}
          <div className="d-flex flex-wrap flex-sm-nowrap">
            {/* Pic */}
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <img src={ imgAvatar ? "https://assets.bantuanteknis.org/"+imgAvatar+"?subfolder=avatars&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcENsaWVudCI6IjEwMy41Mi4xNDQuMTQ4IiwiZm9sZGVyTmFtZSI6ImZhc3Rlci5iYW50dWFudGVrbmlzLmlkIiwiaWF0IjoxNjY0MjY1MjAxfQ.WUjzCs-ljE2Q5A-c75wVKrYttBCuWo8qeV1XiC-D9BU&w=640&q=75" : '/v2/assets/media/avatars/blank.png'} alt="image" />
                <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
              </div>
            </div>
            {/* Info */}
            <div className="flex-grow-1 mt-9">
              {/* Stats */}
              <div className="d-flex flex-wrap flex-stack">
                {/* Wrapper */}
                <div className="d-flex flex-column flex-grow-1">
                  {/* Stats */}
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                      <div className="border border-gray-300 border-dashed rounded card h-100 d-flex justify-content-center align-items-center">
                        <div className="card-body text-center">
                          <div className="fw-semibold fs-6 text-success text-gray-500"><span className="text-success">Today</span></div>
                          <div className="d-flex align-items-center justify-content-center">
                            <i className="ki-duotone ki-arrow-up fs-3 text-success me-2"><span className="path1"></span><span className="path2"></span></i>
                            <div className="fs-1 fw-bold counted" data-kt-countup="true" data-kt-countup-value="4500" data-kt-initialized="1">
                              {dayName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                      <div className="border border-gray-300 border-dashed rounded card h-100 d-flex justify-content-center align-items-center">
                        <div className="card-body text-center">
                          <div className="fw-semibold fs-6 text-primary text-gray-500"><span className="text-primary">Date</span></div>
                          <div className="d-flex align-items-center justify-content-center">
                            <i className="ki-duotone ki-arrow-up fs-3 text-success me-2"><span className="path1"></span><span className="path2"></span></i>
                            <div className="fs-1 fw-bold counted" data-kt-countup="true" data-kt-countup-value="4500" data-kt-initialized="1">
                              {currentDateString}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                      <div className="border border-gray-300 border-dashed rounded card h-100 d-flex justify-content-center align-items-center">
                        <div className="card-body text-center">
                          <div className="fw-semibold fs-6 text-danger text-gray-500"><span className="text-warning">Time</span></div>
                          <div className="d-flex align-items-center justify-content-center">
                            <i className="ki-duotone ki-arrow-up fs-3 text-success me-2"><span className="path1"></span><span className="path2"></span></i>
                            <div className="fs-1 fw-bold counted" data-kt-countup="true" data-kt-countup-value="4500" data-kt-initialized="1">
                              {currentTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                      <div className="border border-gray-300 border-dashed rounded card h-100 d-flex justify-content-center align-items-center">
                        <div className="card-body text-center">
                          <div className="fw-semibold fs-6 text-danger text-gray-500"><span className="text-danger">Last Login</span></div>
                          <div className="d-flex align-items-center justify-content-center">
                            <i className="ki-duotone ki-arrow-up fs-3 text-success me-2"><span className="path1"></span><span className="path2"></span></i>
                            <div className="fs-1 fw-bold counted" data-kt-countup="true" data-kt-countup-value="4500" data-kt-initialized="1">
                              {formattedTimeDifference}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>

            {/* Tombol yang menampilkan jendela pemilih file */}
            <button 
            type="submit" 
            id="btn_upload_supporting_document"
            className="btn btn-primary btn-sm"  
            onClick={(e)=>{openDialogUploadDocument(e)}}>
              <span className="indicator-label">Change photo profile</span>
              <span className="indicator-progress"> Please wait...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
            </button>

          </div>
          {/* Navs */}
          <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
            <li className="nav-item mt-2 cursor-pointer" style={{ marginRight: '28px !important', marginLeft: '8px !important' }}>
              <span className={"nav-link text-active-primary py-3 " + (tab === 0 ? 'active' : '')} onClick={() => seTab(0)}>Profile</span>
            </li>
            <li className="nav-item mt-2 cursor-pointer">
              <span className={"nav-link text-active-primary py-3 " + (tab === 1 ? 'active' : '')} onClick={() => seTab(1)}>Signature</span>
            </li>
          </ul>
          {/* End Navs */}
        </div>
      </div>
    </>
  )
}
export default ProfileHeader;