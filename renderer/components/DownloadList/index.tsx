import React, { useEffect } from 'react'
import isEqual from 'react-fast-compare'
import styles from './index.module.scss'
import Async from 'async'
import { VideoItem } from '../UrlInput'
import { getDownloadUrlAll } from 'request'
import { message } from 'antd'

interface IProps {
  bvid: string
  avid: string
  items: VideoItem[]
}

/* const resolution = {
  120: '超清 4K',
  116: '高清 1080P60',
  112: '高清 1080P60',
  80: '高清 1080P',
  64: '高清 720P',
  32: '清晰 480P',
  16: '流畅 360P',
} */

export interface DashVideoType {
  id: number
  baseUrl: string
}

const getAllData = (items: VideoItem[], avid: string) => {
  return new Promise((resolve, reject) => {
    Async.mapLimit(
      items,
      3,
      async ({ cid, part }) => {
        const { data, code } = await getDownloadUrlAll<{
          code: number
          data: {
            dash: {
              audio: DashVideoType[]
              video: DashVideoType[]
            }
          }
        }>({
          cid,
          avid,
        })

        if (code !== 0 || !data?.dash) {
          return null
        }

        return {
          cid,
          part,
          video: data.dash.video,
          audio: data.dash.audio,
        }
      },
      (err, results) => {
        if (err) reject(err)
        resolve(results.filter((item) => item))
      }
    )
  })
}

export const DownloadList = React.memo(
  ({ avid, items }: IProps): JSX.Element => {
    useEffect(() => {
      if (avid) {
        getAllData(items, avid)
          .then(() => {
            // console.log(data)
          })
          .catch((e) => {
            console.error(e)
            message.error('发生错误')
          })
      }
    }, [avid, items])

    return <div className={styles.list}></div>
  },
  isEqual
)
