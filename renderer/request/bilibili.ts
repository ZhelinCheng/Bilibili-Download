/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-01-04 17:54:10
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-01-06 21:09:23
 * @FilePath     : \Bilibili-Download\renderer\request\bilibili.ts
 * @Description  : 未添加文件描述
 */
import { rq } from './http'

// 获取页面信息
export const getPageInfo = <T>(bvid: string) => {
  return rq<T>({
    url: 'https://www.bilibili.com/video/' + bvid,
    headers: {
      cookie: `_uuid=0DC27137-5455-EC4D-CB6F-F9C3041761C726549infoc; buvid3=F0CE95BD-91D2-41C9-AEF2-BFC36263843C143096infoc; sid=6x6j0b5c; DedeUserID=77671551; DedeUserID__ckMd5=00bedf5c44395245; SESSDATA=56208bdf%2C1618824139%2C4abb3*a1; bili_jct=418ab16ab6d5d1bb26583b825c4c8324; CURRENT_FNVAL=80; blackside_state=1; rpdid=|(JYYJk|kkmY0J'uY|Jk~ku~Y; LIVE_BUVID=AUTO3316036350212297; Hm_lvt_8a6e55dbd2870f0f5bc9194cddf32a02=1606225881; bp_t_offset_77671551=476398034468312112; finger=1571944565; bp_video_offset_77671551=477141334391879011; CURRENT_QUALITY=120; PVID=2`
    }
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