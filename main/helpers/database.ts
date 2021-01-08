/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-01-08 17:38:21
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-01-08 17:49:01
 * @FilePath     : /Bilibili-Download/main/helpers/database.ts
 * @Description  : 未添加文件描述
 */

import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { resolve } from 'path'
const adapter = new FileSync(resolve(__dirname, '../../db.json'))
const db = low(adapter)

db.defaults({
  SESSDATA: '',
}).write()

export { db }
