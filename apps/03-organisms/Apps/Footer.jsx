import Script from "next/script"
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const Footer = ({children,props}) =>{
  return (
    <>
      <script src={publicRuntimeConfig.BASE_PATH+'/assets/plugins/global/plugins.bundle.js'}></script>
		  <script src={publicRuntimeConfig.BASE_PATH+'/assets/js/scripts.bundle.js'}></script>
      <script src={publicRuntimeConfig.BASE_PATH+'/assets/js/custom.js?v=1.0.0.1'}></script>
      <script src={publicRuntimeConfig.BASE_PATH+'/assets/plugins/custom/jstree/jstree.bundle.js'}></script>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          KTScroll.init();
          KTDialer.init();
          KTDrawer.init();
          KTScrolltop.init();
          KTImageInput.init();
          KTSticky.init();
          KTSwapper.init();
          KTToggle.init();
          KTUtil.init();
          KTLayoutToolbar.init();
          KTMenu.init();
          KTApp.init();
          $(document).ready(function(){
            $(".tooltip").hide();
          });
          `
        }}
      />
      <script src={publicRuntimeConfig.BASE_PATH+'/assets/js/init.scripts.js'}></script>
      {props?.scripts.map((path,index)=>{return(<script key={index} src={path}></script>)})}
    </>
  )
}
export default Footer;