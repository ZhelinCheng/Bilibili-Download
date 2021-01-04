import React from 'react'
import { TextField, Button } from '@material-ui/core'
import styles from './index.module.scss'

export const UrlInput = React.memo(
  (): JSX.Element => {
    return <div className={styles.input}>
    <TextField label="请输入视频地址" />
    <Button variant="contained" color="primary">
      GO!
    </Button>
  </div>
  }
)

UrlInput.displayName = 'UrlInput'
