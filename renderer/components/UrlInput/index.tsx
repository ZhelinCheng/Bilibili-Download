import React, { useCallback, useState } from 'react'
import { TextField, Button, Snackbar } from '@material-ui/core'
import styles from './index.module.scss'
import { getPageInfo } from '@request'
import * as URL from 'url'
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import { Console } from 'console'
// import cheerio from 'cheerio'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

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
    const [alert, setAlert] = useState<{
      visble: boolean
      severity: Color
      content: string
    }>({
      visble: false,
      severity: 'success',
      content: '',
    })

    const getMore = useCallback(async () => {
      try {
        const url = URL.parse(inputVal)
        const bvid = url.pathname ? url.pathname.split('/').pop()  : inputVal
        const html = await getPageInfo<string>(bvid)
        const videoExec = /__playinfo__=({.*})<\/script>/.exec(html)
        const cidExec = /"cid":(\d+),/.exec(html)

        if (!videoExec || !cidExec) {
          return setAlert({
            visble: true,
            severity: 'error',
            content: '无法找到相关视频！',
          })
        }

        const cid = parseInt(cidExec[1])
        const videoInfo = JSON.parse(videoExec[1])

        if (typeof onOk === 'function') {
          onOk({
            cid,
            bvid,
            ...videoInfo.data,
          })
        }
      } catch (e) {
        setAlert({
          visble: true,
          severity: 'error',
          content: '无法找到相关视频！',
        })
      }
    }, [inputVal])

    const handleClose = useCallback(
      (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return
        }
        setAlert((ct) => {
          return {
            ...ct,
            visble: false,
          }
        })
      },
      []
    )

    return (
      <div className={styles.input}>
        <TextField
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          label="请输入视频地址"
        />
        <Button onClick={getMore} variant="contained" color="primary">
          GO!
        </Button>

        <Snackbar
          open={alert.visble}
          autoHideDuration={3500}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alert.severity}>
            {alert.content}
          </Alert>
        </Snackbar>
      </div>
    )
  }
)

UrlInput.displayName = 'UrlInput'
