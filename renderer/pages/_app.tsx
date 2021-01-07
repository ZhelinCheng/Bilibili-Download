import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'antd/dist/antd.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Bilibili视频下载小助手</title>
      </Head>
      <ConfigProvider locale={zhCN} componentSize="small">
        <Component {...pageProps} />
      </ConfigProvider>
    </React.Fragment>
  )
}
