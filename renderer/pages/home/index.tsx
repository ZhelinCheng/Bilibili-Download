import React, { useEffect, useState } from 'react'
import cx from 'classnames'

import styles from './index.module.scss'
import { UrlInput, VideosType } from '@components'
import { setCookie } from 'utils'

import { getDownloadUrl } from 'request'

const Home = () => {
  const [{ bvid, videos }, setVideo] = useState<VideosType>({
    bvid: '',
    videos: []
  })

  useEffect(() => {
    // setCookie('SESSDATA', '56208bdf%2C1618824139%2C4abb3*a1')
  }, [])

  return (
    <section className={cx(styles.main)}>
      <UrlInput
        onOk={(data) => {
          setVideo(data)
        }}
      />

      <div className={styles.videos}>
        1111
      </div>
    </section>
  )
}

export default Home
