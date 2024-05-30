import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import Link from "next/link"
import Head from "next/head"
import SVGBack from "../apps/01-atoms/Icons/SVG/SVGBack"
import Footer from "../apps/03-organisms/Apps/Footer"

export default function Custom500() {
  return (<>
    <Head>
      <title>Faster V2.0</title>
      <link rel="shortcut icon" href={publicRuntimeConfig.BASE_PATH+'/assets/media/logos/favicon.ico'}  />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
		<div className="d-flex flex-column flex-root bg-dark">
			<div className="d-flex flex-column flex-column-fluid">
				<div className="d-flex flex-column flex-column-fluid text-center p-10 py-lg-15">
					<a href={publicRuntimeConfig.BASE_URL+publicRuntimeConfig.BASE_PATH+'/home'} className="mb-0 pt-lg-10" style={{ fontSize: '80px', color:'#FFFFFF' }}>
            500
					</a>
					<div className=" mb-0 pt-10">
						<div className="fw-normal opacity-50 fs-12 text-light mb-5">Sorry, internal server error<br/> We will solved the proble, visit again later.</div>
						<div className="text-center">
              <Link href={publicRuntimeConfig.BASE_URL+publicRuntimeConfig.BASE_PATH+'/home'}>
                <a className="btn btn-lg text-light fw-bolder btn-outline-light btn-outline text-hover-dark">
                  <SVGBack/>
                  Back to Dashboard
                </a>
              </Link>
						</div>
					</div>
					<div className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px" ></div>
				</div>
			</div>
		</div>
    <Footer/>
  </>)
}