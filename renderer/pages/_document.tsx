import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh" dir="ltr">
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
