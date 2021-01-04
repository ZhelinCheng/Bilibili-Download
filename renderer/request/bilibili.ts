/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-01-04 17:54:10
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-01-04 17:59:44
 * @FilePath     : /Bilibili-Download/renderer/request/bilibili.ts
 * @Description  : 未添加文件描述
 */
import { rq } from './http'

// 获取视频分辨率
export const getVideoResolution = (aid: string) => {
  return rq({
    url: 'http://api.bilibili.com/view',
    params: {
      type: 'jsonp',
      appkey: '8e9fc618fbd41e28',
      id: aid,
      page: 2,
    },
  })
}
