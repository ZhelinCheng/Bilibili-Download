import React from 'react'
import cx from 'classnames'

import styles from './index.module.scss'
import AddIcon from '@material-ui/icons/Add'
import { Fab } from '@material-ui/core'
import { UrlInput } from '@components'

const Home = () => {
  return (
    <section className={cx(styles.main)}>
      <UrlInput />
      <Fab
        title="添加 SESSDATA"
        size="small"
        color="secondary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </section>
  )
}

export default Home
