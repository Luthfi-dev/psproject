import Head from "next/head";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const Header = ({children,props}) =>{
  return(<>
    <Head>
		  <title>Faster | {props?.title}</title>
      <link rel="shortcut icon" href={publicRuntimeConfig.BASE_PATH+'/assets/media/logos/favicon.ico'}  />
    </Head>
  </>)
}
export default Header;