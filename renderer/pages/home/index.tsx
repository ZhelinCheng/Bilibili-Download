import React, { useCallback, useState } from 'react'
import cx from 'classnames'
import { CloseOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { UrlInput, VideosType, DownloadList } from '@components'
import { ipcRenderer } from 'electron'
// import { setCookie } from 'utils'

// import { getDownloadUrl } from 'request'

const Home = React.memo(
  (): JSX.Element => {
    // https://www.bilibili.com/video/BV1Hh411o7xu

    const [preview, setPreview] = useState<string>('')

    const [{ bvid, videos, avid }, setVideo] = useState<VideosType>({
      avid: '',
      bvid: '',
      videos: [],
    })

    const startDownload = useCallback(async ({ video }) => {
      await ipcRenderer.invoke('openFileDialog')
      await ipcRenderer.invoke('download', video)
    }, [])

    return (
      <section className={cx(styles.main)}>
        <UrlInput onOk={setVideo} />
        <DownloadList
          onDownload={startDownload}
          onPreview={setPreview}
          items={videos}
          bvid={bvid}
          avid={avid}
        />

        {preview ? (
          <div className={styles.preview}>
            <CloseOutlined
              className={styles.close}
              onClick={() => {
                setPreview('')
              }}
            />
            <video
              autoPlay
              className={styles.video}
              controls
              src={preview}
            ></video>
          </div>
        ) : null}
      </section>
    )
  }
)

export default Home
