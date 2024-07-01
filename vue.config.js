const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
    /*
      Vue-cli3:
      Crashed when using Webpack `import()` #2463
      https://github.com/vuejs/vue-cli/issues/2463
     */
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // publicPath: './',//打包后的位置(如果不设置这个静态资源会报404)
    outputDir: 'dist', // 打包后的目录名称
    assetsDir: 'static', // 静态资源目录名称
    // 打包app时放开该配置
    // publicPath: './',
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    configureWebpack: config => {
        // 生产环境取消 console.log
        // if (isProduction || devNeedCdn) config.externals = cdn.externals
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@comp', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@layout', resolve('src/layout'))
            .set('@static', resolve('src/static'))
            .set('@mobile', resolve('src/modules/mobile'))

        // 生产环境，开启js\css压缩
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin').use(new CompressionPlugin({
                test: /\.js$|.\css|.\less/, // 匹配文件名
                threshold: 10240, // 对超过10k的数据压缩
                deleteOriginalAssets: false // 不删除源文
            }))
        }

        // 配置 webpack 识别 markdown 为普通的文件
        config.module
            .rule('markdown')
            .test(/\.md$/)
            .use()
            .loader('file-loader')
            .end()
        // ============注入cdn start============
        config.plugin('html').tap(args => {
            // 生产环境或本地需要cdn时，才注入cdn
            // if (isProduction || devNeedCdn) args[0].cdn = cdn
            return args
        })
        // ============注入cdn start============
    },

    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    /* less 变量覆盖，用于自定义 ant design 主题 */
                    'primary-color': '#1890FF',
                    'link-color': '#1890FF',
                    'border-radius-base': '4px',
                    'layout-color': '#9867f7'
                },
                javascriptEnabled: true
            }
        }
    },

    devServer: {
        port: 3000,
        proxy: {
            /* '/api': {
              target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro', //mock API接口系统
              ws: false,
              changeOrigin: true,
              pathRewrite: {
                '/dtwave-boot': ''
              }
            }, */
            '/dtwave-om': {
                //  target: "http://172.16.101.203:8088/", //罗江
                // target: "http://192.168.90.43:8099/", //vpn
                // target:"http://59.208.164.228:60033/dtwave-om/", //现场测试环境
                target:"http://59.208.164.242:60033/dtwave-om/",//正式环境
                // target: "http://192.168.10.226:8088/",
                // target: "http://172.16.101.207:8088/", //刘雄
                // target: "http://localhost:9099/", //孙文龙
                // target: "http://172.16.101.201:8088/", //玄鹤
                pathRewrite: {
                    '^/dtwave-om': '/'
                },
                ws: false,
                changeOrigin: true
            },
            //EMR
            "/emr": {
                target: "http://192.168.0.123:60010/",
                logLevel: 'debug',
                changeOrigin: true,
                //这样重写会把,路径中 /dsj 消去
                pathRewrite: {
                "^/emr": "/"
                }
            },
            //数栖
            "/api": {
                target: "http://192.168.0.123:60001/api/",
                changeOrigin: true,
                //这样重写会把,路径中 /api 消去
                pathRewrite: {
                "^/api": "/"
                }
            }
        }
    },
}
