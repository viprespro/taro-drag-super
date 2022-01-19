export default {
  pages: ['pages/home/index', 'pages/institution/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro-templae',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    list: [
      {
        iconPath: 'assets/images/tabbar/01.png',
        selectedIconPath: 'assets/images/tabbar/01-ac.png',
        pagePath: 'pages/home/index',
        text: 'Home',
      },
      {
        iconPath: 'assets/images/tabbar/02.png',
        selectedIconPath: 'assets/images/tabbar/02-ac.png',
        pagePath: 'pages/institution/index',
        text: 'tab2',
      },
    ],
    color: '#929292',
    selectedColor: '#333',
    backgroundColor: '#fff',
    borderStyle: 'black',
  },
}
