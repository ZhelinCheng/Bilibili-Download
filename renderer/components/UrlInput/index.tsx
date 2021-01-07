import React, { useCallback } from 'react'
import styles from './index.module.scss'
import { getVideos, getPageInfo } from '@request'
import { Input, message } from 'antd'
import isEqual from 'react-fast-compare'
// import cheerio from 'cheerio'

const Message = message

const { Search } = Input

export interface VideoItem {
  cid: number
  part: string
}

export interface VideosType {
  avid: string
  bvid: string
  videos: Array<VideoItem>
}

interface UrlInputProps {
  onOk?: (data: VideosType) => void
}

export const UrlInput = React.memo(({ onOk }: UrlInputProps): JSX.Element => {
  const getMore = useCallback(
    async (inputVal: string) => {
      try {
        const bvidExec = /BV\w+/.exec(inputVal)

        if (!bvidExec) {
          return Message.info('输入不正确！')
        }
        const bvid = bvidExec[0]

        const [{ data, code, message }, html = ''] = await Promise.all([
          getVideos<{
            code: number
            data: Array<VideoItem>
            message: string
          }>(bvid),
          getPageInfo<string>(bvid),
        ])

        const avidExec = /av(\d+)/.exec(html)

        if (code !== 0 || !avidExec) {
          return Message.info(message)
        }

        if (typeof onOk === 'function') {
          onOk({
            avid: avidExec[1],
            bvid,
            videos: data,
          })
        }
      } catch (e) {
        console.error(e)
        Message.error('发生错误了')
      }
    },
    [onOk]
  )

  return (
    <div className={styles.input}>
      <Search
        placeholder="请输入视频地址"
        allowClear
        enterButton="查看"
        onSearch={getMore}
      />
    </div>
  )
}, isEqual)

UrlInput.displayName = 'UrlInput'
