import React, { useCallback, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import styles from './index.module.scss'
import { getVideoResolution } from '@request'

export const UrlInput = React.memo(
  (): JSX.Element => {
    const [url, setUrl] = useState('')

    const getMore = useCallback(async () => {
      try {
        const data = await getVideoResolution('')
        console.log(data)
      } catch (e) {
        console.error(e)
      }
    }, [])

    return (
      <div className={styles.input}>
        <TextField
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          label="请输入视频地址"
        />
        <Button onClick={getMore} variant="contained" color="primary">
          GO!
        </Button>
      </div>
    )
  }
)

UrlInput.displayName = 'UrlInput'
