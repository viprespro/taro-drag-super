import {
  getMenuButtonBoundingClientRect,
  getSystemInfoSync,
} from '@tarojs/taro'

export const systemInfo = (() => {
  const IOS_NAV_HEIGHT = 44
  const ANDROID_NAV_HEIGHT = 48
  const {
    screenWidth,
    screenHeight,
    windowHeight,
    windowWidth,
    statusBarHeight,
    system,
    version,
    SDKVersion,
    pixelRatio,
  } = getSystemInfoSync()
  let menuButton = { left: 260, top: 24 }
  if (getMenuButtonBoundingClientRect) {
    menuButton = getMenuButtonBoundingClientRect()
  }
  const isiOS = system.indexOf('iOS') > -1
  const navHeight = isiOS ? IOS_NAV_HEIGHT : ANDROID_NAV_HEIGHT

  return {
    isiOS,
    statusBarHeight,
    navHeight,
    menuButton,
    version,
    SDKVersion,
    pixelRatio,
    screenWidth,
    screenHeight,
    windowHeight,
    windowWidth,
    headerHeight: navHeight + statusBarHeight,
  }
})()
