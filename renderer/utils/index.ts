/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-01-04 17:51:19
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-01-06 22:16:09
 * @FilePath     : \Bilibili-Download\renderer\utils\index.ts
 * @Description  : 未添加文件描述
 */
import { ipcRenderer } from 'electron'

export const isBrowser = process.browser

export const setCookie = (name: string, value: string): Promise<void> => {
  return new Promise((resolve) => {
    let Days = 30
    let exp = new Date()
    let date = Math.round(exp.getTime() / 1000) + Days * 24 * 60 * 60
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
