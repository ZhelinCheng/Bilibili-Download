/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-01-04 17:51:19
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-01-07 21:52:20
 * @FilePath     : \Bilibili-Download\renderer\utils\index.ts
 * @Description  : 未添加文件描述
 */
import { ipcRenderer } from 'electron'

export const isBrowser = process.browser

export const setCookie = (name: string, value: string): Promise<void> => {
  return new Promise((resolve) => {
    const Days = 30
    const exp = new Date()
    const date = Math.round(exp.getTime() / 1000) + Days * 24 * 60 * 60
    const cookie = {
      url: 'http://www.bilibili.com',
      name: name,
      value: value,
      expirationDate: date,
    }
    ipcRenderer.once('cookie-reply', () => {
      resolve()
    })
    ipcRenderer.send('cookie-message', cookie)
  })
}
