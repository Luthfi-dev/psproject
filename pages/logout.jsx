import { useEffect } from 'react'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export default function Logout () {
  useEffect(async() => {
    const axios = require('axios');
    var http = require('http')
    var https = require('https');
    const logout = await axios.request({
      method:'post',
      url:'/api/auth/logout',
      baseURL: publicRuntimeConfig.HOST_COOKIES,
      httpAgent: new http.Agent({ rejectUnauthorized: false }),
      httpsAgent: new https.Agent({ rejectUnauthorized: false}),
      withCredentials: true
    }) 
    window.location.href = publicRuntimeConfig.BASE_URL + publicRuntimeConfig.BASE_PATH + '/login'
  }, []);

  return(
    <span>Logout, Please wait...</span>
  )
}