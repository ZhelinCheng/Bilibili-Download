/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-01-04 17:54:10
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-01-07 12:46:57
 * @FilePath     : /Bilibili-Download/renderer/request/bilibili.ts
 * @Description  : 未添加文件描述
 */
import { rq } from './http'

// 获取页面信息
// https://api.bilibili.com/x/player/playurl?cid=99820598&bvid=BV1ax41197SG&otype=json&qn=120
export const getPageInfo = <T>(bvid: string) => {
  return rq<T>({
    url: 'https://www.bilibili.com/video/' + bvid
  })
}


interface DownloadParamsType {
  cid: number
  bvid: string
  qn?: number
  high_quality: number
  type?: string
}

// 获取下载链接
export const getDownloadUrl = <T>(params: DownloadParamsType) => {
  return rq<T>({
    url: 'https://api.bilibili.com/x/player/playurl',
    params: {
      platform: 'html5',
      type: 'mp4',
      ...params
    }
  })
}