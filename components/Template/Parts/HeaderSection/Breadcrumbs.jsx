import Calender from "../../../../helper/Calender";
import Link from "next/link";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const Breadcrumbs = ({breadcrumbs})=>{
  const calender = new Calender();
  return<>
    <div className="toolbar">
      <div className="container-fluid py-6 py-lg-0 d-flex flex-column flex-lg-row align-items-lg-stretch justify-content-lg-between">
        <div className="page-title d-flex flex-column me-5">
          <h1 className="d-flex text-dark fw-bolder fs-3 mb-0 opacity-50">
            {breadcrumbs.title}
          </h1>
          <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 pt-1">
            <li className="breadcrumb-item text-muted">
              <Link href={'home'}>
                <a className="text-muted text-hover-primary">Dashboard</a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <span className="bullet bg-gray-200 w-5px h-2px"></span>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center  text-nowrap  pt-3 pt-lg-0">
          <div className="d-flex align-items-center">
            <div className="bullet bg-secondary h-35px w-1px mx-5"></div>
            <div className="d-flex">
              <i className="lni lni-calendar fs-2x text-muted"></i>
            </div>
            <div className="d-flex flex-column mx-3">
              <h5 className='p-0 text-muted my-0'>{calender.dateFormat(new Date(),"dddd")}</h5>
              <small className='opacity-50'>{calender.dateFormat(new Date(),"dd mmm yyyy h:MM:ss")}</small>
            </div>
            <div className="d-flex offset-2 me-12">
              <a href={publicRuntimeConfig.BASE_URL+'Login/logout'} className="btn btn-light-danger btn-sm btn-icon  btn-icon-danger fw-bold" title="Logout">
                <i className="fa fa-power-off fs-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
export default Breadcrumbs;