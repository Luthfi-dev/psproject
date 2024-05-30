import IndexLeft from "./Parts/LeftSection/IndexLeft";
import IndexHeader from "./Parts/HeaderSection/IndexHeader";
import Footer from "./Parts/FooterSection/Footer";
import HeadSection from"./Parts/HeaderSection/HeadSection";
import Copyright from "./Parts/FooterSection/Copyright";

const Apps = (WrappedComponent)=>{
  return (props)=>{
    if (typeof window !== "undefined") {
      
    }
    return <>
      <HeadSection headers={props.appsData.headers}/>
      <div >
        <div className='d-flex flex-column flex-root'>
          <div className='page d-flex flex-row flex-column-fluid'>
            <IndexLeft appsData={props.appsData}/>
            <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
              <IndexHeader appsData={props.appsData}/>
              <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                <div className="post d-flex flex-column-fluid" id='kt_post'>
                  <div className="container-xxl" id='kt_content_container'>
                    <WrappedComponent {...props}/>
                  </div>
                </div>
              </div>
              <Copyright />
            </div>
          </div>
        </div>
      </div>
      <Footer appsData={props.appsData}/>
    </>;
  }
}
export default Apps;