import Head from "next/head";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export default function HeadSection({headers}) {
  return(
    <Head>
		  <title>Faster | {headers.title}</title>
      <link rel="shortcut icon" href={publicRuntimeConfig.BASE_PATH+'/assets/media/logos/favicon.ico'}  />
    </Head>
  )

}