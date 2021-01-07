import React, { useCallback, useState } from 'react'
import styles from './index.module.scss'
import { getPageInfo } from '@request'
import * as URL from 'url'
// import cheerio from 'cheerio'

interface SupportFormats {
  display_desc: string
  format: string
  new_description: string
  quality: number
  superscript: string
}

export interface VideoDataType {
  cid: number
  bvid: string
  accept_description: string[]
  accept_quality: number[]
  support_formats: SupportFormats[]
}

interface UrlInputProps {
  onOk?: (data: VideoDataType) => void
}

export const UrlInput = React.memo(
  ({ onOk }: UrlInputProps): JSX.Element => {
    const [inputVal, setInputVal] = useState('')

    const getMore = useCallback(async () => {
      try {
        const url = URL.parse(inputVal)
        const bvid = url.pathname ? url.pathname.split('/').pop() : inputVal
        const html = await getPageInfo<string>(bvid)
        const videoExec = /__playinfo__=({.*})<\/script>/.exec(html)
        const cidExec = /"cid":(\d+),/.exec(html)

        if (!videoExec || !cidExec) {
        }

        const cid = parseInt(cidExec[1])
        const videoInfo = JSON.parse(videoExec[1])

        // https://www.bilibili.com/video/BV1ax41197SG
        console.log(videoInfo)

        if (typeof onOk === 'function') {
          onOk({
            cid,
            bvid,
            ...videoInfo.data,
          })
        }
      } catch (e) {}
    }, [inputVal])

    const handleClose = useCallback(
      (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return
        }
      },
      []
    )

    return <div className={styles.input}>111</div>
  }
)

UrlInput.displayName = 'UrlInput'
