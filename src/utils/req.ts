import axios, { AxiosResponse } from 'axios'
import { goToLogin } from '.'
// token, env

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
function guid() {
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

function getToken(params: { otherParams: { token: string } }) {
  return localStorage.getItem('token') || params.otherParams.token
}

function createParams(params: { apiUrl?: any; dataVal?: any; otherParams?: any; version?: any; restData?: any }) {
  let requestParams = {
    api: params.apiUrl,
    version: params.version || '1.0',
    timestamp: new Date().getTime(),
    token: getToken(params as any),
    nonce: guid(),
    params: {
      ...params.dataVal,
    },
    ...params.restData,
  }
  return requestParams
}
function getBaseUrl(env = 'sit') {
  let baseURL = 'https://apigw.ypshengxian.com/request'
  if (env && env !== 'prod') {
    baseURL = `https://apigw-${env}.ypshengxian.com/request`
  }
  return baseURL
}

axios.interceptors.request.use(
  (options) => {
    const { data = {} } = options
    const { api: apiName, params, otherParams } = data
    const paramsObj = createParams({
      apiUrl: apiName,
      dataVal: params,
      otherParams,
    })
    const env = 'sit'

    const config = {
      method: 'POST',
      url: getBaseUrl(env),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'app-id': 'ypsj',
        'app-platform': 'wxApp',
      },
      dataType: 'json',
      // data: paramsObj,
      data: JSON.stringify(paramsObj),
      timeout: 30000,
      withCredentials: false,
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    const data = JSON.parse(res.data)
    const { result, error, success } = data
    if (res.status === 200) {
      if (success) {
        return result
      } else {
        if (error.code === -32001 || error.code === -32002) {
          goToLogin()
        }
        return error
      }
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios

interface IReqResponse extends AxiosResponse<any, any> {
  success?: boolean
  result?: any
}

export const req = (reqUrl: string, params?: any, otherParams = {}): Promise< IReqResponse > => {

  const options = {} as any
  options.data = {
    api: reqUrl,
    params,
    otherParams,
  }
  return new Promise((resolve, reject) => {
    return axios(options)
      .then((res) => {
        const { success, error, errorCode, errorMessage } = res as any
        if (success) {
          console.log()
          resolve(res)
        } else {
          // AppUtil.notificationFail(error.code || errorCode || result.resultCode, error.message || errorMessage || result.message || '操作失败，请稍后重试～')
          reject(error || res || { code: errorCode, message: errorMessage })
        }
      })
      .catch((_error) => {
        // AppUtil.notificationFail('服务器开小差啦T_T', '请稍后再试～')
        reject(_error)
      })
  })
}
