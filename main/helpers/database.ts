/*
 * @Author       : Zhelin Cheng
 * @Date         : 2021-01-08 17:38:21
 * @LastEditors  : Zhelin Cheng
 * @LastEditTime : 2021-01-08 17:58:51
 * @FilePath     : /Bilibili-Download/main/helpers/database.ts
 * @Description  : 未添加文件描述
 */

import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { remote, app } from 'electron'

const APP = process.type === 'renderer' ? remote.app : app

const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH)
  }
}

const adapter = new FileSync(path.join(STORE_PATH, '/101helper.json'))
const db = Datastore(adapter)

db.defaults({
  SESSDATA: '',
}).write()

export { db }
