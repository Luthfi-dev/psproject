import getConfig from 'next/config'
import Image from "next/image";
import { serverAssets } from "../../../utility/Image";
import { useEffect } from "react";
const { publicRuntimeConfig } = getConfig()

const HeaderToolbarRight = ({children,props}) =>{
  const avatar = props.session?.avatar ? props?.session.avatar+'?subfolder=avatars&':'';
  useEffect(()=>{ 
    setTimeout(() => {
      KTMenu.init()
    }, 1000);
  },[])
  return(
    <div className="d-flex align-items-center text-nowrap pt-3 pt-lg-0">
      <div className="header-search py-3 py-lg-0">
        <div className="d-flex align-items-center" >
          <form data-kt-search-element="form" className="w-100 position-relative me-3">
            <input type="hidden"/>
            <span className="svg-icon svg-icon-2 search-icon position-absolute top-50 translate-middle-y ms-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21.7 18.9L18.6 15.8C17.9 16.9 16.9 17.9 15.8 18.6L18.9 21.7C19.3 22.1 19.9 22.1 20.3 21.7L21.7 20.3C22.1 19.9 22.1 19.3 21.7 18.9Z" fill="black"></path>
                <path opacity="0.3" d="M11 20C6 20 2 16 2 11C2 6 6 2 11 2C16 2 20 6 20 11C20 16 16 20 11 20ZM11 4C7.1 4 4 7.1 4 11C4 14.9 7.1 18 11 18C14.9 18 18 14.9 18 11C18 7.1 14.9 4 11 4ZM8 11C8 9.3 9.3 8 11 8C11.6 8 12 7.6 12 7C12 6.4 11.6 6 11 6C8.2 6 6 8.2 6 11C6 11.6 6.4 12 7 12C7.6 12 8 11.6 8 11Z" fill="black"></path>
              </svg>
            </span>
            <input type="text" className="form-control custom-form-control ps-13" name="search" placeholder="Search..."/>
            <span className="position-absolute top-50 end-0 translate-middle-y lh-0 me-5 d-none">
              <span className="spinner-border h-15px w-15px align-middle text-gray-400"></span>
            </span>
            <span className="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 me-4 d-none" data-kt-search-element="clear">
              <span className="svg-icon svg-icon-2 svg-icon-lg-1 me-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
                  <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
                </svg>
              </span>
            </span>
          </form>
        </div>
      </div>
      <div className="bullet bg-secondary h-35px w-1px mx-5"></div>

      <div className="me-5">
        <a href="#" className="btn btn-icon btn-active-lightx btn-active-color-primary position-relative border border-1 position-relative" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
          <span className="svg-icon svg-icon-1 svg-icon-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path opacity="0.3" d="M12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22Z" fill="black"></path>
              <path d="M19 15V18C19 18.6 18.6 19 18 19H6C5.4 19 5 18.6 5 18V15C6.1 15 7 14.1 7 13V10C7 7.6 8.7 5.6 11 5.1V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V5.1C15.3 5.6 17 7.6 17 10V13C17 14.1 17.9 15 19 15ZM11 10C11 9.4 11.4 9 12 9C12.6 9 13 8.6 13 8C13 7.4 12.6 7 12 7C10.3 7 9 8.3 9 10C9 10.6 9.4 11 10 11C10.6 11 11 10.6 11 10Z" fill="black"></path>
            </svg>
          </span>
          <span className="position-absolute top-0 start-100 translate-middle  badge badge-square badge-danger">0</span>
        </a>
      </div>

      <div className="me-3">
        <a href="#" className="btn btn-icon btn-active-x btn-active-color-primary position-relative border border-1" id="icon_profile_on_right_top"
          data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
          <span className="svg-icon svg-icon-3 svg-icon-dark">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
            <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"/></svg>
          </span>
          <span className="bullet bullet-dot bg-danger h-6px w-6px position-absolute translate-middle top-0 start-100 animation-blink"></span>
        </a>
        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px" data-kt-menu="true">
        <div className="menu-item px-3">
          <div className="menu-content d-flex align-items-center px-3">
            <div className="symbol symbol-50px me-5">
              <div className="container-img w-50px symbol">
                <Image
                  src={ avatar }
                  layout="fill"
                  className={'img symbol'}
                  priority={true}
                  loader={ serverAssets }
                  />
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="fw-bolder d-flex align-items-center fs-5">{props?.session.fullName.split(" ")[0]}
              <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Online</span></div>
              <a href="#" className="fw-bold text-muted text-hover-primary fs-7">{props?.session.email}</a>
            </div>
          </div>
          <div className="separator my-2"></div>
          <a href={publicRuntimeConfig.BASE_URL+'Users/profile'} className="menu-link px-5">Profile</a>
          <a href={publicRuntimeConfig.BASE_URL+'Users/profile'} className="menu-link px-5">Signature</a>
          <a href={publicRuntimeConfig.BASE_URL+'Users/profile'} className="menu-link px-5">Change Password</a>
          <div className="separator my-2"></div>
          <a href={publicRuntimeConfig.BASE_PATH + '/logout'} className="menu-link px-5">Sign Out</a>
        </div>
        </div>
      </div>
    </div>
  )
}
export default HeaderToolbarRight;