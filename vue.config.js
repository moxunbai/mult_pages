let path = require('path')
let glob = require('glob') // 用于筛选文件
var projectname = process.argv[3]||'';

// 工厂函数 - 配置pages实现多页面获取某文件夹下的html与js
function handleEntry(entry) {
  let entries = {}
  let entryBaseName = ''
  let entryPathName = ''
  let entryTemplate = ''
  let applicationName = ''

  glob.sync(entry).forEach(item => {
    console.log('!!!', item)
    entryBaseName = path.basename(item, path.extname(item))
    console.log('entryBaseName:', entryBaseName)
    entryTemplate = item.split('/').splice(-3)
    console.log('entryTemplate:', entryTemplate)
    entryPathName = entryBaseName // 正确输出js和html的路径
    console.log('entryPathName', entryPathName)
    if(projectname){
      if(projectname==entryPathName){
        console.log(entryPathName+"========")
        entries[entryPathName] = {
          entry: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/' + entryTemplate[1] + '.js',
          template: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/' + entryTemplate[2],
          title: entryTemplate[2],
          filename: entryTemplate[2]
        }
      }
    }else{
      entries[entryPathName] = {
        entry: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/' + entryTemplate[1] + '.js',
        template: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/' + entryTemplate[2],
        title: entryTemplate[2],
        filename: entryTemplate[2]
      }
    }

  })

  return entries
}

let pages = handleEntry('./src/applications/**?/*.html')
console.log(pages)

// 以下开始配置
module.exports = {
  lintOnSave: false, // 关掉eslint
  outputDir: 'dist/'+projectname,
  /**
   * baseUrl 从 3.3起废用，使用pubilcPath代替
   * 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
   * 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。
   */
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  productionSourceMap: false,
  // 入口设置
  pages,
/*
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: true,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      scss: {

        // 所以这里假设你有 `src/variables.scss` 这个文件
        prependData: `@import "@/applications/application1/app1_theme.scss"; @import "@nutui/nutui/dist/styles/index.scss"; `,
      }
    },

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },*/
  devServer: {
    index: '/', // 运行时，默认打开application1页面
    // 告诉dev-server在服务器启动后打开浏览器，将其设置true为打开默认浏览器
    open: true,
    host: 'localhost',
    port: 8090,
    https: false,
    hotOnly: false,
    // 配置首页 入口链接
    before: app => {
      app.get('/', (req, res, next) => {
        for (let i in pages) {
          res.write(`<a target="_self" href="/${i}">/${i}</a></br>`);
        }
        res.end()
      });
    }
  }
}