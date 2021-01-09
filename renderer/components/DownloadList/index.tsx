import React, { useCallback, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import styles from './index.module.scss'
import Async from 'async'
import { VideoItem } from '../UrlInput'
import { getDownloadUrlAll, getDownloadUrl } from 'request'
import { Button, message } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'

interface IProps {
  bvid: string
  avid: string
  items: VideoItem[]
  onPreview?: (url: string) => void
  onDownload?: (ops: { video: string; audio: string }) => void
}

const resolution = {
  120: '4K',
  116: '1080P60',
  112: '1080P+',
  80: '1080P',
  74: '720P60',
  64: '720P',
  32: '480P',
  16: '360P',
}

export interface DashVideoType {
  id: number
  baseUrl: string
}

interface ItemType {
  cid: number
  part: string
  audio: DashVideoType[]
  video: DashVideoType[]
}

const getAllData = (items: VideoItem[], avid: string) => {
  return new Promise((resolve, reject) => {
    Async.mapLimit(
      items,
      3,
      async ({ cid, part }, callback) => {
        try {
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
            callback(null, null)
          }

          const videoIds = new Set()

          callback(null, {
            cid,
            part,
            video: data.dash.video.filter(({ id }) => {
              if (videoIds.has(id)) {
                return false
              }

              videoIds.add(id)
              return true
            }),
            audio: data.dash.audio,
          })
        } catch (e) {
          callback(e)
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
  ({ avid, items, onPreview, bvid, onDownload }: IProps): JSX.Element => {
    const [downLits, setDownList] = useState<ItemType[]>([])
    useEffect(() => {
      if (avid) {
        getAllData(items, avid)
          .then((data: ItemType[]) => {
            setDownList(data)
          })
          .catch((e) => {
            console.error(e)
            message.error('发生错误')
          })
      }
    }, [avid, items])

    const getPreviewUrl = useCallback(
      async (cid: number) => {
        try {
          const { data, code } = await getDownloadUrl<{
            code: number
            data: {
              durl: Array<{
                url: string
              }>
            }
          }>({
            cid,
            bvid,
          })

          if (code !== 0) {
            return message.error('请求错误')
          }

          onPreview(data.durl[0].url)
        } catch (e) {
          console.error(e)
        }
      },
      [bvid, onPreview]
    )

    return (
      <div className={styles.list}>
        {downLits.map(({ cid, part, video, audio }) => {
          return (
            <div key={cid} className={styles.item}>
              <div className={styles.name}>{part}</div>
              <div className={styles.dwon}>
                {video.map(({ id, baseUrl }) => {
                  return (
                    <Button
                      key={id}
                      onClick={() => {
                        onDownload({
                          audio: audio[0].baseUrl,
                          video: baseUrl,
                        })
                      }}
                      shape="round"
                      type="primary"
                      size="small"
                    >
                      {resolution[id]}
                    </Button>
                  )
                })}
                <Button
                  shape="round"
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  size="small"
                  onClick={() => {
                    getPreviewUrl(cid)
                  }}
                >
                  预览
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    )
  },
  isEqual
)
