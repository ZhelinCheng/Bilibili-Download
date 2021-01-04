/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-01-04 17:49:53
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-01-04 17:57:39
 * @FilePath     : /Bilibili-Download/renderer/request/http.ts
 * @Description  : 未添加文件描述
 */

import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from 'axios'

type Rq = (ops: AxiosRequestConfig) => Promise<Pick<AxiosResponse, 'data'>>

export const rq = ((): Rq => {
  const ins: AxiosInstance = axios.create({
    timeout: 5000,
  })

  // 请求拦截器
  ins.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  ins.interceptors.response.use(
    (response: AxiosResponse) => {
      const { status } = response
      if (status >= 200 || status < 250) {
        const data = response.data || {}
        return Promise.resolve(data)
      } else {
        return Promise.reject(response)
      }
    },
    (error: AxiosError) => {
      // console.error(error)
      if (error?.response?.status) {
        const msg = error.response.data?.message
        // isBrowser && message.error(msg || '网络错误，请稍后重试！')
        return Promise.reject(error.response)
      } else {
        return Promise.reject('未知错误')
      }
    }
  )

  return ins
})()
