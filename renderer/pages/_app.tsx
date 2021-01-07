import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'antd/dist/antd.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bilibili视频下载小助手</title>
      </Head>
      <ConfigProvider locale={zhCN} componentSize="middle">
        <Component {...pageProps} />
      </ConfigProvider>
    </React.Fragment>
  )
}
