import React, { useCallback, useState } from 'react'
import styles from './index.module.scss'
import { getVideos } from '@request'
import { Input, message } from 'antd'
// import cheerio from 'cheerio'

const Message = message

const { Search } = Input

export interface VideosType {
  bvid: string
  videos: Array<{
    cid: number
    part: string
  }>
}

interface UrlInputProps {
  onOk?: (data: VideosType) => void
}

export const UrlInput = React.memo(
  ({ onOk }: UrlInputProps): JSX.Element => {
    const getMore = useCallback(async (inputVal: string) => {
      try {
        const bvidExec = /BV\w+/.exec(inputVal)

        if (!bvidExec) {
          return Message.info('输入不正确！')
        }
        const bvid = bvidExec[0]

        const { data, code, message } = await getVideos<{
          code: number
          data: Array<{
            cid: number
            part: string
          }>
          message: string
        }>(bvid)

        if (code !== 0) {
          return Message.info(message)
        }

        if (typeof onOk === 'function') {
          onOk({
            bvid,
            videos: data,
          })
        }
      } catch (e) {
        console.error(e)
        Message.error('发生错误了')
      }
    }, [])

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
  }
)

UrlInput.displayName = 'UrlInput'
