const RequestMonitoring = ({appsData}) =>{
  return(
    <>
    <div className="col-xl-4">
      <div class="card card-xl-stretch mb-5 mb-xl-8">			
        <div class="card-body p-0 px-0 py-0" >
          <div className="card-rounded-bottom card-rounded-top bg-warning pb-10 py-8">
            <h3 class="card-title fw-bolder text-white text-center">Budget Information</h3>
            <h2 class="card-title fw-bolder text-white text-center opacity-70 text-uppercase">Fiscal Year 2022</h2>
          </div>
          <div class="card-rounded bg-body mt-n3 position-relative card-px py-15">
            <div class="row g-0 mb-7">
              <div class="col mx-5">
                <div class="fs-6 text-gray-400">Rp 210.000.000</div>
                <div class="fs-2 fw-bolder text-warning">Quarter 1</div>
              </div>
              <div class="col mx-5">
                <div class="fs-6 text-gray-400">Rp 210.000.000</div>
                <div class="fs-2 fw-bolder text-warning">Quarter 2</div>
              </div>
            </div>
            <div class="row g-0 mb-7">
              <div class="col mx-5">
                <div class="fs-6 text-gray-400">Rp 210.000.000</div>
                <div class="fs-2 fw-bolder text-warning">Quarter 3</div>
              </div>
              <div class="col mx-5">
                <div class="fs-6 text-gray-400">Rp 210.000.000</div>
                <div class="fs-2 fw-bolder text-warning">Quarter 4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-4">
      <div className="card card-xxl-stretch mb-5 mb-xl-8 bg-white">
        <div class="card-body d-flex flex-column">
          <div class="d-flex flex-column mb-7">
            <span class="text-primary fw-bolder fs-3">Incoming Request</span>
          </div>
          <div class="row g-0">
            <div class="col-12">
              <div class="d-flex align-items-center mb-9 me-2">
                <div class="symbol symbol-40px me-3">
                  <div class="symbol-label bg-primary">
                    <span className="badge badge-default fs-4">4</span>
                  </div>
                </div>
                <div>
                  <div class="fs-5 text-dark fw-bolder lh-1">Monthly Activity</div>
                  <a href='' class="fs-7 fw-bold text-primary opacity-80">See more detail <i class="lni lni-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex align-items-center mb-9 me-2">
                <div class="symbol symbol-40px me-3">
                  <div class="symbol-label bg-primary">
                    <span class="svg-icon svg-icon-1 svg-icon-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M22 8H8L12 4H19C19.6 4 20.2 4.39999 20.5 4.89999L22 8ZM3.5 19.1C3.8 19.7 4.4 20 5 20H12L16 16H2L3.5 19.1ZM19.1 20.5C19.7 20.2 20 19.6 20 19V12L16 8V22L19.1 20.5ZM4.9 3.5C4.3 3.8 4 4.4 4 5V12L8 16V2L4.9 3.5Z" fill="black"></path>
                        <path d="M22 8L20 12L16 8H22ZM8 16L4 12L2 16H8ZM16 16L12 20L16 22V16ZM8 8L12 4L8 2V8Z" fill="black"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <div class="fs-5 text-dark fw-bolder lh-1">Goods & Services</div>
                  <a href='' class="fs-7 fw-bold text-primary opacity-80">See more detail <i class="lni lni-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex align-items-center mb-9 me-2">
                <div class="symbol symbol-40px me-3">
                  <div class="symbol-label bg-primary">
                    <span class="svg-icon svg-icon-1 svg-icon-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M22 8H8L12 4H19C19.6 4 20.2 4.39999 20.5 4.89999L22 8ZM3.5 19.1C3.8 19.7 4.4 20 5 20H12L16 16H2L3.5 19.1ZM19.1 20.5C19.7 20.2 20 19.6 20 19V12L16 8V22L19.1 20.5ZM4.9 3.5C4.3 3.8 4 4.4 4 5V12L8 16V2L4.9 3.5Z" fill="black"></path>
                        <path d="M22 8L20 12L16 8H22ZM8 16L4 12L2 16H8ZM16 16L12 20L16 22V16ZM8 8L12 4L8 2V8Z" fill="black"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <div class="fs-5 text-dark fw-bolder lh-1">Monthly Reimbursement</div>
                  <a href='' class="fs-7 fw-bold text-primary opacity-80">See more detail <i class="lni lni-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex align-items-center mb-9 me-2">
                <div class="symbol symbol-40px me-3">
                  <div class="symbol-label bg-primary">
                    <span class="svg-icon svg-icon-1 svg-icon-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M22 8H8L12 4H19C19.6 4 20.2 4.39999 20.5 4.89999L22 8ZM3.5 19.1C3.8 19.7 4.4 20 5 20H12L16 16H2L3.5 19.1ZM19.1 20.5C19.7 20.2 20 19.6 20 19V12L16 8V22L19.1 20.5ZM4.9 3.5C4.3 3.8 4 4.4 4 5V12L8 16V2L4.9 3.5Z" fill="black"></path>
                        <path d="M22 8L20 12L16 8H22ZM8 16L4 12L2 16H8ZM16 16L12 20L16 22V16ZM8 8L12 4L8 2V8Z" fill="black"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <div class="fs-5 text-dark fw-bolder lh-1">Purchase Request</div>
                  <a href='' class="fs-7 fw-bold text-primary opacity-80">See more detail <i class="lni lni-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-4">
      <div className="card card-xxl-stretch mb-5 mb-xl-8 bg-white">
        <div class="card-body d-flex flex-column">
          <div class="d-flex flex-column mb-7">
            <span class="text-info fw-bolder fs-3">Create New Request</span>
          </div>
          <div class="row g-0">
            <div class="col-12">
              <div class="d-flex align-items-center mb-9 me-2">
                <div class="symbol symbol-40px me-3">
                  <div class="symbol-label bg-info">
                    <i class="lni lni-gallery text-white fs-2"></i>
                  </div>
                </div>
                <div>
                  <div class="fs-5 text-dark fw-bolder lh-1">Monthly Activity</div>
                  <a href='' class="fs-7 fw-bold text-info opacity-80"><i class="lni lni-pencil-alt"></i> Create new monthly activity </a>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex align-items-center mb-9 me-2">
                <div class="symbol symbol-40px me-3">
                  <div class="symbol-label bg-info">
                    <i class="lni lni-fresh-juice text-white fs-2"></i>
                  </div>
                </div>
                <div>
                  <div class="fs-5 text-dark fw-bolder lh-1">Goods & Services</div>
                  <a href='' class="fs-7 fw-bold text-info opacity-80">See more detail <i class="lni lni-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex align-items-center mb-9 me-2">
                <div class="symbol symbol-40px me-3">
                  <div class="symbol-label bg-info">
                    <i class="lni lni-calendar text-white fs-3"></i>
                  </div>
                </div>
                <div>
                  <div class="fs-5 text-dark fw-bolder lh-1">Monthly Reimbursement</div>
                  <a href='' class="fs-7 fw-bold text-info opacity-80">See more detail <i class="lni lni-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex align-items-center mb-9 me-2">
                <div class="symbol symbol-40px me-3">
                  <div class="symbol-label bg-info">
                    <i class="lni lni-handshake text-white fs-2"></i>
                  </div>
                </div>
                <div>
                  <div class="fs-5 text-dark fw-bolder lh-1">Purchase Request</div>
                  <a href='' class="fs-7 fw-bold text-info opacity-80">See more detail <i class="lni lni-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default RequestMonitoring;