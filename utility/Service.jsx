const axios = require('axios');
var http = require('http')
var https = require('https');
import Cookies from 'js-cookie';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const post = (props)=>{
  return new Promise((resolve, reject) => {
    const token = props?.token ? props.token : Cookies.get('fast_token');
    axios.request({
      method:'post',
      url:props.url,
      baseURL: publicRuntimeConfig.HOST_API,
      headers: {'token': token},
      data:props.params,
      httpAgent: new http.Agent({ rejectUnauthorized: false }),
      httpsAgent: new https.Agent({ rejectUnauthorized: false})
    }).then(res=>{
      resolve(res)
    }).catch(function (error) {
      reject({status:false,message:error,code:500})
    });  
  })
  
}

export const put = (props)=>{
  return new Promise((resolve, reject) => {
    const token = props?.token ? props.token : Cookies.get('fast_token');
    axios.request({
      method:'put',
      url:props.url,
      baseURL: publicRuntimeConfig.HOST_API,
      headers: {'token': token},
      data:props.params,
      httpAgent: new http.Agent({ rejectUnauthorized: false }),
      httpsAgent: new https.Agent({ rejectUnauthorized: false})
    })
    .then(res=>{
      resolve(res)
    })
    .catch(function (error) {
      reject({status:false,message:error.message,code:error.response?.status})
    });  
  })
}

export const get =  (props)=>{
  return new Promise((resolve, reject) => {
    const token = props?.token ? props.token : Cookies.get('fast_token');
    axios.request({
      method:'get',
      url:props.url,
      baseURL: publicRuntimeConfig.HOST_API,
      headers: {'token': token},
      params:props.params,
      httpAgent: new http.Agent({ rejectUnauthorized: false }),
      httpsAgent: new https.Agent({rejectUnauthorized: false })
    })
    .then(res=>{
      resolve(res);
    })
    .catch(function (error) {
      reject({status:false,message:error.message,code:error.code});
    });  
  })
}

export const deleting = (props)=>{
  return new Promise((resolve, reject) => {
    const token = props?.token ? props.token : Cookies.get('fast_token');
    axios.request({
      method:'delete',
      url:props.url,
      baseURL: publicRuntimeConfig.HOST_API,
      headers: {'token': token},
      params:props.params,
      httpAgent: new http.Agent({ rejectUnauthorized: false }),
      httpsAgent: new https.Agent({rejectUnauthorized: false })
    })
    .then(res=>{
      resolve(res);
    })
    .catch(function (error) {
      reject({status:false,message:error.message,code:error.code})
    });  
  })
}

export const uploadFiles = (params)=>{
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'post',
      url: params.path,
      baseURL: publicRuntimeConfig.ASSETS_HOST,
      headers: {'token': publicRuntimeConfig.TOKEN_ASSETS_HOST},
      data: params.data,
      httpAgent: new http.Agent({ rejectUnauthorized: false }),
      httpsAgent: new https.Agent({rejectUnauthorized: false })
    }).then(res=>{
      resolve(res)
    }).catch(function (error) {
      reject({status:false,message:error.message,code:error.code})
    });  
  })
}
