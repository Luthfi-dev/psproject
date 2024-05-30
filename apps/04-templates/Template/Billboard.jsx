import Image from "next/image"
import { imgLoader } from "../../../utility/Image"
import Head from "next/head"

const Billboard=({children,props})=>{
  return (<>
    <Head>
      <title>{props?.title}</title>
      <link rel="shortcut icon" href={process.env.BASE_PATH+'/assets/media/logos/favicon.ico'}  />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
		<div className="d-flex flex-column flex-root bg-dark">
			<div className="d-flex flex-column flex-column-fluid">
				<div className="d-flex flex-column flex-column-fluid text-center p-5">
					<a href="/dasboard" className="mb-0 pt-lg-0">
            <div className="container-img">
              <Image alt="Faster" 
              layout="fill"
              src="media/logos/faster.png" className="h-40px mb-5 img" 
              loader={imgLoader}
              />
            </div>
					</a>
          <div className="pt-lg-10 mb-10">
            <h1 className="fw-boldest fs-2qx text-light opacity-75 mb-0">
              {props?.title}
            </h1>
            <div className="fw-normal fs-4 text-light opacity-75 mb-15">
              {props?.subtitle}
            </div>
            {children}
          </div>
				</div>
			</div>
		</div>
    
    <script src={process.env.BASE_PATH+'/assets/plugins/global/plugins.bundle.js'}></script>
    <script src={process.env.BASE_PATH+'/assets/js/scripts.bundle.js'}></script>
    <script src={process.env.BASE_PATH+'/assets/js/custom.js'}></script>
  </>)
}
export default Billboard;