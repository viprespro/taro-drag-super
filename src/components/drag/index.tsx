import React, { Component } from 'react'
import { MovableArea, MovableView, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import cls from 'classnames'
import { randomHex } from '@/utils'

import styles from './index.module.less'

class Drag extends Component {
  state = {
    itemWidth: 0,
    itemList: [
      {
        id: 1,
        descText: '1',
        x: 0,
        y: 0,
        disabled: true,
        background: '',
      },
      {
        id: 2,
        descText: '2',
        x: 0,
        y: 0,
        disabled: true,
        background: '',
      },
      {
        id: 3,
        descText: '3',
        x: 0,
        y: 0,
        disabled: true,
        background: '',
      },
      {
        id: 4,
        descText: '4',
        x: 0,
        y: 0,
        disabled: true,
        background: '',
      },
      {
        id: 5,
        descText: '5',
        x: 0,
        y: 0,
        disabled: true,
        background: '',
      },
      {
        id: 6,
        descText: '6',
        x: 0,
        y: 0,
        disabled: true,
        background: '',
      },
      {
        id: 7,
        descText: '7',
        x: 0,
        y: 0,
        disabled: true,
        background: '',
      },
      {
        id: 8,
        descText: '8',
        x: 0,
        y: 0,
        disabled: true,
        background: '',
      },
    ],
    columns: 3, // 可拖拽区域每一行几个item  可以手动设置 会自动变化
    gap: 10, // item之间的间距
    totalRow: 0, // 总行数
    movableAreaHeight: 0,
    movableX: 0,
    movableY: 0,
    isDragging: false,
    dragId: 0, // 当前被拖拽元素id
  }

  componentDidMount() {
    this.init()
  }

  init() {
    const { columns, gap } = this.state
    const { screenWidth } = Taro.getSystemInfoSync()

    const rowItemsWidth = screenWidth - (columns - 1) * gap
    const itemWidth = rowItemsWidth / columns
    const itemHegith = itemWidth

    // * 计算每个item的坐标  (重点)
    const imgs = [...this.state.itemList]
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].background = randomHex()
      const curRow = Math.floor(i / columns)
      imgs[i]['x'] = (i % columns) * (itemWidth + gap)
      imgs[i]['y'] = curRow * (itemHegith + gap)
    }

    console.log('imgs:', imgs)

    const totalRow = Math.ceil(imgs.length / columns)

    this.setState({
      itemWidth,
      itemList: imgs,
      movableAreaHeight: totalRow * itemWidth + (totalRow - 1) * gap,
      totalRow,
    })
  }

  handleLongPress = (id: number) => () => {
    Taro.vibrateLong()
    const items = this.state.itemList
    for (const item of items) {
      if (item.id === id) {
        item.disabled = false
        break
      }
    }
    this.setState({
      isDragging: true,
      itemList: items,
      dragId: id,
    })
  }

  /**
   *
   * @param arr 原数组
   * @param dragId 交换item的id
   * @param dragEndId 被交换item的id
   */
  swapItem = (arr: any[], dragId: number, dragEndId: number) => {
    let prev = 0
    let next = arr.length - 1
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === dragId) {
        prev = i
      }
      if (arr[i].id === dragEndId) {
        next = i
      }
      arr[i].disabled = true
    }
    // * Note: 保持在那个索引的的x与y值不能改变
    const { x: x1, y: y1 } = arr[prev]
    const { x: x2, y: y2 } = arr[next]

    const temp = arr[prev]
    arr[prev] = arr[next]
    arr[prev].x = x1
    arr[prev].y = y1
    arr[next] = temp
    arr[next].x = x2
    arr[next].y = y2
  }

  /**
   * @description onChange事件
   */
  handleChange = (e) => {
    const { x, y } = e.detail
    this.setState({ movableX: x, movableY: y })
  }

  /**
   *
   * @param dis 移动距离
   * @returns  所属第几行或第几列 （重点）
   */
  calcRowOrColumnBelons = (dis: number, deps = 3) => {
    const { itemWidth, gap } = this.state
    let crossCount = 1
    for (
      let i = gap;
      i < deps * gap + (deps - 1) * itemWidth;
      i = i + gap + itemWidth
    ) {
      if ((dis > i && dis < i + gap + itemWidth) || dis < gap) {
        break
      } else {
        crossCount += 1
      }
    }
    dis = dis - crossCount * gap
    // * 这个算法可能有点绕 需要慢慢体会
    let count = 1
    for (
      let i = -itemWidth / 2;
      i < ((2 * deps - 3) * itemWidth) / 2;
      i += itemWidth
    ) {
      if ((dis > i && dis < i + itemWidth) || dis <= 0) {
        break
      } else {
        count += 1
      }
    }
    return count
  }

  /**
   * @description 拖动结束事件 （重点）
   */
  handleTouchEnd = () => {
    if (!this.state.isDragging) return
    const copy = [...this.state.itemList]
    const { movableX, movableY, dragId, columns, totalRow } = this.state
    // 分析：根据movableX与movableY的移动值来计算copy数组中对应的item值
    // 1.movableX判断所属列columnCount
    // 2.movableY判断所属行rowCount
    // 3.根据columnCount与rowCount计算对应的索引(rowCount - 1) * columns + columnCount - 1

    // 计算所属列
    const columnCount = this.calcRowOrColumnBelons(movableX, columns)
    // 计算所属行
    const rowCount = this.calcRowOrColumnBelons(movableY, totalRow)
    const dragEndIndex = (rowCount - 1) * columns + columnCount - 1
    const dragEndId = copy[dragEndIndex]?.id

    // console.log('dragId:', dragId)
    // console.log('dragEndId:', dragEndId)

    if (dragId !== dragEndId && dragEndId !== undefined) {
      this.swapItem(copy, dragId, dragEndId)
    } else {
      // * Note: 解决item在附近移动或者在某个没有交换的时候能够移动回到原来位置
      for (const item of copy) {
        if (item.id === dragId) {
          item.disabled = true
          item.x += 0.01
          item.y += 0.01
          break
        }
      }
    }
    this.setState({ itemList: copy, isDragging: false })
  }

  render() {
    const { movableAreaHeight, itemList, itemWidth } = this.state

    return (
      <View className={styles.container}>
        <View className={styles.long}>*下方区域可长按拖动排序</View>
        <MovableArea
          className={styles.movableArea}
          style={{
            minHeight: `${itemWidth}px`,
            height: `${movableAreaHeight}px`,
            width: `100%`,
            boxSizing: 'border-box',
          }}
        >
          {itemList.map((item) => {
            return (
              <MovableView
                className={cls(
                  styles.movableView,
                  !item.disabled ? styles.setZIndex : '',
                )}
                style={{
                  height: `${this.state.itemWidth}px`,
                  width: `${this.state.itemWidth}px`,
                }}
                x={item.x}
                y={item.y}
                inertia={false}
                damping={9999}
                direction='all'
                friction={999}
                animation
                onChange={this.handleChange}
                onLongPress={this.handleLongPress(item.id)}
                onTouchEnd={this.handleTouchEnd}
                key={item.id}
                disabled={item.disabled}
              >
                <View
                  className={styles.movableContent}
                  style={{ background: item.background }}
                >
                  <Text>{item.descText}</Text>
                </View>
              </MovableView>
            )
          })}
        </MovableArea>
      </View>
    )
  }
}

export default Drag
