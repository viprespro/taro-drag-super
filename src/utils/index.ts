import Taro from '@tarojs/taro'

export const throttle = (fn: Function, delay: number = 1000) => {
  let flag = true
  return function (...args: any) {
    if (!flag) return
    flag = false
    try {
      fn.apply(this, ...args)
    } catch (error) {
      console.log(error.message)
    }
    setTimeout(() => {
      flag = true
    }, delay)
  }
}

export const deepClone: any = (obj: Record<string, unknown>) => {
  const ret = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      ret[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
  return ret
}

export const handleMakePhone = (phone: string): void => {
  Taro.makePhoneCall({
    phoneNumber: phone, //仅为示例，并非真实的电话号码
  })
}

export const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`
