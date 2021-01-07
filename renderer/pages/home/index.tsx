import React, { useState } from 'react'
import cx from 'classnames'

import styles from './index.module.scss'
import { UrlInput, VideosType, DownloadList } from '@components'
// import { setCookie } from 'utils'

// import { getDownloadUrl } from 'request'

const Home = React.memo(
  (): JSX.Element => {
    // https://www.bilibili.com/video/BV1Hh411o7xu

    // const [cidList, setCidList] = useState<number[]>([])

    const [{ bvid, videos, avid }, setVideo] = useState<VideosType>({
      avid: '',
      bvid: '',
      videos: [],
    })

    return (
      <section className={cx(styles.main)}>
        <UrlInput onOk={setVideo} />
        {/* <Videos items={videos} onChange={setCidList} /> */}
        <DownloadList items={videos} bvid={bvid} avid={avid} />
      </section>
    )
  }
)

export default Home
