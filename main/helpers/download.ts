/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-01-08 23:44:50
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-01-08 23:54:08
 * @FilePath     : \Bilibili-Download\main\helpers\download.ts
 * @Description  : 未添加文件描述
 */

import { BrowserWindow } from 'electron'

/**
 * 下载
 * @param win - 窗口
 * @param url - 下载地址
 */
export const download = (url: string, win: BrowserWindow | null): void => {
  if (!win) return
  win.webContents.downloadURL(url)
}
