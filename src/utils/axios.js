import axios from 'axios'
import { Loading } from 'element-ui'
import { confirm } from '@/base/confirm'

const BASE_URL = '/api'
// http://127.0.0.1:8080
export const requestWithoutInterceptors = createBaseInstance()

export const request = createBaseInstance()
mixinLoading(request.interceptors)
// 通用的axios实例
function createBaseInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
  })

  instance.interceptors.response.use(handleResponse, handleError)
  return instance
}

function handleError(e) {
  confirm(e.message, '出错啦~')
  throw e
}

function handleResponse(response) {
  return response.data                 //成功则返回data
}

let loading
let loadingCount = 0
function mixinLoading(interceptors) {
  interceptors.request.use(loadingRequestInterceptor)
  interceptors.response.use(loadingResponseInterceptor, loadingResponseErrorInterceptor)

  function loadingRequestInterceptor(config) {
    if (!loading) {
      loading = Loading.service({
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
    }
    loadingCount++
    return config
  }

  function handleResponseLoading() {
    loadingCount--
    if (loadingCount == 0) {
      loading.close()
      loading = null
    }
    // console.log('loadingCount', loadingCount);
  }

  function loadingResponseInterceptor(response) {
    handleResponseLoading()
    return response
  }

  function loadingResponseErrorInterceptor(e) {
    handleResponseLoading()
    throw e
  }
}

