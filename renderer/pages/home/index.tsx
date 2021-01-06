import React, { useEffect, useState } from 'react'
import cx from 'classnames'

import styles from './index.module.scss'
import AddIcon from '@material-ui/icons/Add'
import { Fab, Button } from '@material-ui/core'
import { UrlInput, VideoDataType } from '@components'
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
              <div className={styles.btns}>
                <Button
                  onClick={() => {
                    setCookie('SESSDATA', '56208bdf%2C1618824139%2C4abb3*a1')
                  }}
                  size="small"
                  variant="contained"
                  color="inherit"
                  className={styles.button}
                  // endIcon={<Icon>send</Icon>}
                >
                  复制地址
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  className={styles.button}
                  // endIcon={<Icon>send</Icon>}
                >
                  下载视频
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <Fab
        title="添加 SESSDATA"
        size="small"
        color="secondary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </section>
  )
}

export default Home
