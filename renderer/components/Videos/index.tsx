import React, { useMemo } from 'react'
import { Checkbox } from 'antd'
import styles from './index.module.scss'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import isEqual from 'react-fast-compare'
import { VideoItem } from '../UrlInput'

const CheckboxGroup = Checkbox.Group

interface IProps {
  items: VideoItem[]
  onChange?: (items: number[]) => void
}

export const Videos = React.memo(
  ({ items = [], onChange }: IProps): JSX.Element => {
    const [checkedList, setCheckedList] = React.useState([])
    const [indeterminate, setIndeterminate] = React.useState(true)
    const [checkAll, setCheckAll] = React.useState(false)

    const options = useMemo(() => {
      return items.map(({ cid, part }) => {
        return {
          label: part,
          value: cid,
        }
      })
    }, [items])

    const onCheckboxChange = (list: number[]) => {
      setCheckedList(list)
      setIndeterminate(!!list.length && list.length < options.length)
      setCheckAll(list.length === options.length)

      if (typeof onChange === 'function') {
        onChange(list)
      }
    }

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
      const ops = e.target.checked ? options : []

      const list = ops.map(({ value }) => {
        return value
      })

      setCheckedList(list)
      setIndeterminate(false)
      setCheckAll(e.target.checked)

      if (typeof onChange === 'function') {
        onChange(list)
      }
    }

    return options.length ? (
      <div className={styles.main}>
        <Checkbox
          style={{
            marginRight: 8,
          }}
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          全选
        </Checkbox>
        <CheckboxGroup
          options={options}
          value={checkedList}
          onChange={onCheckboxChange}
        />
      </div>
    ) : null
  },
  isEqual
)
