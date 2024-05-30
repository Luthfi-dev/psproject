import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { get } from '../../utility/Service'
import getConfig from 'next/config'
const jwt = require('jsonwebtoken');

export default function Login(){
  const router = useRouter()
  const { publicRuntimeConfig } = getConfig()

  useEffect(async () => {
    const query = router?.query
    const response = query?.account_name
    if(response){
      try {
        const payload = {unique_name: response}
        const accessToken = jwt.sign(payload, publicRuntimeConfig.SECRET_KEY_ENCRYPTION, { expiresIn: '1d' })

        const axios = require('axios');
        var http = require('http')
        var https = require('https');
        const verifyUser = await axios.request({
          method:'post',
          url:'/api/auth/verify/microsoft',
          baseURL: publicRuntimeConfig.HOST_COOKIES,
          data: { token_access: accessToken  },
          httpAgent: new http.Agent({ rejectUnauthorized: false }),
          httpsAgent: new https.Agent({ rejectUnauthorized: false}),
          withCredentials: true
        }) 

        if(verifyUser.status !== 200){
          throw Object({ message: verifyUser.statusText})
        }
        if(verifyUser.data?.status !== true){
          throw Object({ message: verifyUser.data?.message})
        }
        if(!verifyUser.data?.data?.rules_access?.id_group_menu){
          throw Object({ message: 'Rules Access not Found.'})
        }
        const getMenuAcess = await get({url: 'menu/group/detail/' + verifyUser.data?.data?.rules_access?.id_group_menu, token: verifyUser?.data?.data?.token})
        if(getMenuAcess.status !== 200){
          throw Object({ message: 'Cannot Get Data Rules Access.'})
        }
        if(getMenuAcess.data?.status !== true){
          throw Object({ message: getMenuAcess?.data?.message})
        }
        localStorage.removeItem("fast_menu");
        localStorage.setItem('fast_menu', JSON.stringify(getMenuAcess?.data?.data));

        window.location.href = publicRuntimeConfig.BASE_URL + publicRuntimeConfig.BASE_PATH + '/home'
      } catch (error) {
        console.log(error?.message)
        // setLoadingVerify(false)
        // setErrorMessage(error?.message)
      }
    }
  }, [router?.query]);

  return('Rekam session')
}