import { View, MovableArea, MovableView } from '@tarojs/components'
import React, { Component } from 'react'

class Index extends Component {
  render() {
    return (
      <View>
        <MovableArea style='height: 200px; width: 200px; background: pink;'>
          <MovableView
            style='height: 50px; width: 50px; background: blue;'
            direction='all'
          >
            1
          </MovableView>

          <MovableView
            style='height: 50px; width: 50px; background: blue;'
            direction='all'
          >
            2
          </MovableView>
        </MovableArea>
      </View>
    )
  }
}

export default Index
