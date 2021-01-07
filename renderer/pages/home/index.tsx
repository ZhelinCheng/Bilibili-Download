import React, { useEffect, useState } from 'react'
import cx from 'classnames'

import styles from './index.module.scss'
import { UrlInput, VideoDataType } from '@components'
import { Button } from 'antd';

import { setCookie } from 'utils'

import { getDownloadUrl } from 'request'

const Home = () => {
  const [{ support_formats, cid, bvid }, setVideo] = useState<VideoDataType>({
    cid: 0,
    bvid: '',
    accept_description: [],
    accept_quality: [],
    support_formats: [],
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

      <div className={styles.lists}>
        {support_formats.map(({ new_description, quality }) => {
          return (
            <div key={quality} className={styles['list-item']}>
              <span className={styles.text}>{new_description}</span>
              <div className={styles.btns}></div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Home
