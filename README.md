## 安装环境
- 首先安装node，配置环境
- 安装webpack ` npm install webpack webpack-cli -g`
- 安装vue-cli `npm install --global vue-cli`
- 输入`vue -V` 有显示vue版本
- vue init webpack yourProjectName
## 目录说明
    build               构建脚本目录
    config              构建配置目录
    node_module         依赖工具包
    src                 源码目录
        assets              资源目录
        compoments          资源目录
        router              路由目录
        App.vue             页面级VUE页面
        main.js             页面入口
    static              静态文件目录
    test                测试文件目录
    .eslintrs.js        es语法检查
    index.html          入口首页
    package.json        文件描述
- npm run dev 启动项目
## 引入`ant design vue`
- npm install ant-design-vue
    ```
    import Button from "ant-design-vue/lib/button";
    import "ant-design-vue/dist/antd.css";
    import App from "./App";

    Vue.component(Button.name, Button);
- 使用 babel-plugin-import
    ```
    1. npm install babel-plugin-import --dev
    2. 修改.babelrc文件，配置 babel-plugin-import（加了之后项目出bug了，运行不起来了）
          {
            "presets": [
            ["env", {
                "modules": false,
                "targets": {
                "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                }
            }],
            "stage-2"
            ],
            "plugins": ["transform-vue-jsx", "transform-runtime"]
            "plugins": [
                "transform-vue-jsx",
                "transform-runtime",
                ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }]
            ]
        }

    ```
## 引入`Less`
- 安装 `npm install less less-loader --save-dev`
- 在build下找到`webpack.base.conf.js`，添加代码：
    ```
    module.exports = {
    ...
    ...
    module: {
        rules: [
            {...},
            {...},
            {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
            }
        ]
    }
- 使用`less`, 在.vue文件的 style 标签中添加 lang="less"后，即可采用less的语法编写CSS代码
引入变量(varibles)和混合(mixins)的写法如下：
在 src/assets/目录下新建 styles 目录，并在此目录下编写 varibles.less 和 mixins.less
编写CSS代码时通过 import 引入：
    ```
    <style scoped lang="less">
        @import '../assets/styles/varibles.less';
        @import '../assets/styles/mixins.less';
        /* 样式代码 */
    </style>