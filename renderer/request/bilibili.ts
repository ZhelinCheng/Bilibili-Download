/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-01-04 17:54:10
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-01-07 21:33:30
 * @FilePath     : \Bilibili-Download\renderer\request\bilibili.ts
 * @Description  : 未添加文件描述
 */
import { rq } from './http'

// 获取页面信息
// https://api.bilibili.com/x/player/playurl?cid=99820598&bvid=BV1ax41197SG&otype=json&qn=120
export const getPageInfo = <T>(bvid: string): Promise<T> => {
  return rq<T>({
    url: 'https://m.bilibili.com/video/' + bvid,
  })
}

interface DownloadParamsType {
  cid: number
  bvid: string
  qn?: number
  high_quality: number
  type?: string
}

// 获取下载链接mp4
export const getDownloadUrl = <T>(params: DownloadParamsType): Promise<T> => {
  return rq<T>({
    url: 'https://api.bilibili.com/x/player/playurl',
    params: {
      platform: 'html5',
      type: 'mp4',
      ...params,
    },
  })
}

// 获取列表
export const getVideos = <T>(bvid: string): Promise<T> => {
  return rq<T>({
    url: 'https://api.bilibili.com/x/player/pagelist',
    params: {
      bvid,
      jsonp: 'jsonp',
    },
  })
}

// 获取全部下载地址
export const getDownloadUrlAll = <T>(params: {
  cid: number
  avid: string
}): Promise<T> => {
  return rq<T>({
    url: 'https://api.bilibili.com/x/player/playurl',
    params: {
      qn: 80,
      otype: 'json',
      fnver: 0,
      fnval: 16,
      fourk: 1,
      ...params,
    },
  })
}
