const path = require('path')

const config = {
  projectName: 'taro-app-template',
  date: '2020-11-5',
  designWidth: 375,
  deviceRatio: {
    375: 1 / 1,
    640: 2.34 / 2,
    750: 1 / 2,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@/apis': path.resolve(__dirname, '..', 'src/apis'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants'),
    '@/context': path.resolve(__dirname, '..', 'src/context'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/styles': path.resolve(__dirname, '..', 'src/styles'),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['NoConvert2RPX'],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    staticDirectory: 'static',
    output: {
      filename: 'js/[name].[hash:5].js',
      chunkFilename: 'js/[name].[chunkhash].js',
    },
    imageUrlLoaderOption: {
      limit: 5000,
      name: 'static/images/[name].[hash].[ext]',
    },
    miniCssExtractPluginOption: {
      filename: 'css/[name].[hash:5].css',
      chunkFilename: 'css/[name].[chunkhash].css',
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    devServer: {
      host: '0.0.0.0',
      port: 3000,
      https: false,
      proxy: {
        '/api/v1': {
          target: 'http://vipres.top',
          changeOrigin: true,
        },
      },
    },
    router: {
      mode: 'hash',
      customRoutes: {
        '/pages/home/index': '/index',
        '/pages/institution/index': '/institution',
        '/pages/center/index': '/center',
        '/pages/activity/index': '/activity',
        '/pages/detail/index': '/detail',
        '/pages/detail/courseDetail': '/courseDetail',
      },
    },
  },
}

export default function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
