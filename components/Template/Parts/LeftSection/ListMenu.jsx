import { useState, useEffect } from "react";
import Link from "next/link";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const ListMenu = ({appsData})=>{
  const [listMenu,setListMenu] = useState([]);
  const loadData = async () =>{
    const menu = JSON.parse(localStorage.getItem("fast_menu"));
    setListMenu(menu);
  }

  useEffect(() => {
    loadData();
  },[])

  return(
    <>
      <div className='aside-menu flex-column-fluid'>
        <div 
          className="hover-scroll-overlay-y px-2 my-5 my-lg-5" id="kt_aside_menu_wrapper" 
          data-kt-scroll-offset="5px" 
          data-kt-scroll-wrappers="#kt_aside_menu" 
          data-kt-scroll-dependencies="{default: '#kt_aside_toolbar, #kt_aside_footer', lg: '#kt_header, #kt_aside_toolbar, #kt_aside_footer'}"
          data-kt-scroll-height="auto" 
          data-kt-scroll="true"
        >
				  <div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500" id="#kt_aside_menu" data-kt-menu="true">
            <div className="menu-item">
              <Link href={'home'}>
                <a className="menu-link active">
                  <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="2" width="9" height="9" rx="2" fill="black" />
                        <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="black" />
                        <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="black" />
                        <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="black" />
                      </svg>
                    </span>
                  </span>
                  <span className="menu-title">Dashboard</span>
                </a>
              </Link>
            </div>
            {listMenu?.map((field, i)=>{
              return(
                <div key={'sitems'+i}>
                  <div key={'panelsection'+i} className="menu-item">
                    <div className="menu-content pt-8 pb-2">
                      <span className="menu-section text-muted text-uppercase fs-8 ls-1">{field.title}</span>
                    </div>
                  </div>
                  {field.sub.map((sub ,j)=>{
                    const url = sub.link ? publicRuntimeConfig.BASE_URL+sub.link:'#';
                    return(
                      sub.sub.length > 0 ?
                      <div key={"sub_menu"+j} data-kt-menu-trigger="click" className={'menu-item menu-accordion '}>
                        <span className={'menu-link '}>
                          <span className="menu-icon">
                            <i className={sub.icon}></i>
                          </span>
                          <span className="menu-title ">{sub.title}</span>
                          <span className="menu-arrow"></span>
                        </span>
                        <div className="menu-sub menu-sub-accordion ">
                          {
                            sub.sub.map((sub2, k)=>{
                              const subURL = sub2.link ? publicRuntimeConfig.BASE_URL+sub2.link:'#';
                              return(
                              <div key={'sub_sub'+k} className={'menu-item '}>
                                <span className={'menu-link '}>
                                  <span className="menu-bullet">
                                    <span className="bullet bullet-dot"></span>
                                  </span>
                                  <Link href={subURL} >
                                    <a className="menu-title">{sub2.title}</a>
                                  </Link>
                                </span>
                              </div>
                              )
                            })
                          }
                        </div>
                      </div>
                      :
                      <div  className="menu-item" key={j+"sub_menu"}>
                        <span className="menu-link">
                          <span className="menu-icon">
                            <i className={sub.icon}></i>
                          </span>
                          <Link href={url}>
                           <a className="menu-title ">{sub.title}</a>
                          </Link>
                        </span>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListMenu;