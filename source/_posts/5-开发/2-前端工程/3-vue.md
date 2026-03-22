---
title: 3-Vue
categories:
  - 开发
  - 前端工程
tags:
  - 开发
  - 前端工程
mathjax: true
abbrlink: 1968834766
date: 2026-02-15 18:15:38
---

Vue.js是用于构建用户界面的JS框架

Vue核心库只关注图层，同时易于与其他库或已有项目整合，另一方面，Vue能驱动Vue生态系统下的单文件组件或复杂的单页应用。

此外，还可以集成mpvue、uni-app、vue-mini等框架，开发者可以利用Vue的语法与组件化思想来开发小程序。

<!--more-->

## Vue Cli的安装与配置

### 使用全局构建版本

所有顶层API都以属性的形式暴露在全局Vue对象上

```vue
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<div id="app">{{ message }}</div>
<script>
  const { createApp } = Vue
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

- 开发版本：https://cn.vuejs.org/js/vue.js
- 生产版本：https://cn.vuejs.org/js/vue.min.js

直接下载并用 `<script>` 引用，Vue会被注册为一个全局变量

**通过CDN使用Vue**

借助 `<script>` 标签，可以使用任何提供 npm 包服务的 CDN，例如 jsdelivr 或 cdnjs。

- 不涉及“构建步骤”
- 但无法使用单文件组件语法

```vue
对于制作原型或学习，可以这样使用最新版本：
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
对于生产环境，推荐链接到一个明确的版本号和构建文件，以避免新版本造成的不可预期的破坏：
<script src="https://cdn.jsdelivr.net/npm/vue@4.5.12"></script>
```

#### 启用import maps

可以使用导入映射表 (Import Maps) 来告诉浏览器如何定位到导入的 vue

```vue
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>
 
<div id="app">{{ message }}</div>
 
<script type="module">
  import { createApp } from 'vue'
 
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

### 使用npm安装

#### 安装webpack模块

Webpack是一个打包工具，将前端所有资源文件（js/json/css/img/less/...）当做模块处理，根据模块的依赖关系进行静态分析，生成对应的静态资源

```shell
npm webpack -v
```

webpack 4x以上，webpack将命令相关的内容都放到了webpack-cli，所以还需要安装webpack-cli

```shell
npm install  webpack-cli -g
```

#### 安装VueCli

> Vue CLI 是一个基于 Vue.js 进行前端快速开发的脚手架

```shell
打开终端

npm install -g @vue/cli

C:\Windows\System32>npm list vue -g
D:\nvm\node_global
`-- @vue/cli@5.0.9
  `-- vue@2.7.16
  
vue --version
vue -V

# vue项目管理的ui界面
vue ui

要升级全局 Vue CLI 包
npm update -g @vue/cli
```

#### 安装vue-router V4

> Vue.js的官方路由管理器，负责管理 **页面跳转** ，用户在不同视图间切换时，无需刷新整个页面

```shell
npm install vue-router@4 -g
```

使用create-vue这个脚手架，能创建一个基于Vite的项目，并包含加入Vue Router的选项

```shell
npm create vue@latest
```

使用包管理器的项目通常会使用 ES 模块来访问 Vue Router，例如 `import { createRouter } from 'vue-router'`。

### 卸载

vue 或 vue-cli 的卸载

```shell
npm uninstall vue-cli -g（3.0以下版本卸载）
npm uninstall -g @vue/cli（3.0以上版本卸载）
```

卸载本地的webpack-cli

```shell
npm uninstall -g webpack-cli

npm uninstall -g webpack
```

## 创建Vue项目

### 基于webpack创建vue项目

> 前提条件：
>
> - npm install --save-dev webpack
> - npm install vue
> - npm install @vue/cli –g

在工作路径下，打开终端，否则，项目默认会创建到 *C:\Users\Administrator*

```shell
#vue 2.0
vue init webpack 项目名

#vue 3.0
vue create 项目名

# 创建
E:\web\test>vue create vue3webpack

Vue CLI v5.0.9
? Please pick a preset: Manually select features
> Default ([Vue 3] babel, eslint)
  Default ([Vue 2] babel, eslint)
  Manually select features

选择自定义本项目需要的特性，
>(*) Babel
 (*) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router
 (*) Vuex
 ( ) CSS Pre-processors
 (*) Linter / Formatter
 (*) Unit Testing
 ( ) E2E Testing

? Check the features needed for your project: Babel, TS, Router, Vuex, Linter, Unit

? Choose a version of Vue.js that you want to start the project with 3.x
? Use class-style component syntax? No
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling
JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production)
Yes
? Pick a linter / formatter config: Basic
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Jest
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No


Vue CLI v5.0.9
✨  Creating project in E:\web\test\vue3webpack.
🗃  Initializing git repository...
⚙️  Installing CLI plugins. This might take a while...


added 1146 packages in 29s

137 packages are looking for funding
  run `npm fund` for details
🚀  Invoking generators...
📦  Installing additional dependencies...


added 121 packages in 7s

158 packages are looking for funding
  run `npm fund` for details
⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project vue3webpack.
👉  Get started with the following commands:

 $ cd vue3webpack
 $ npm run serve
```

>当 Typescript与Router同时选中，会出现问题
>
>```shell
>TS7016: Could not find a declaration file for module 'vue-router'. 'E:/web/test/vue3webpack/node_modules/vue-router/index.js' implicitly has an 'any' type.
>  Try `npm i --save-dev @types/vue-router` if it exists or add a new declaration (.d.ts) file containing `declare module 'vue-router';`
>```
>
>解决方案：
>
>在 */path/to/project/src/shims-vue.d.ts* 中，添加
>
>```shell
>declare module 'vue-router';
>```
>
>在 */path/to/project/src/router/index.ts* 中添加
>
>```shell
>type RouteRecordRaw = typeof RouteRecordRaw
>```

运行项目

```shell
npm run server

App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.0.214:8080/
```

在本地浏览器，http://localhost:8080/

#### 项目结构

```
│
├──	.git	:git本地库
│　　　└──	...
├──	.gitignore
├── node_modules	:当前项目的依赖保存目录
│　　　├──　package.json中定义的第三方包都会被自动下载，并保存在该目录。
│　　　└──　...
│
├── public	:存放项目公共资源，如项目的主入口文件index.html
│	  │	通常我们不需要对public文件夹内的资源做任何修改。
│     │	后续在构建打包时，public内容会直接放到dist文件夹内plugins；
│　　　└──　...
│
├── src		:存放 vue 项目的源代码。其下的各个文件（文件夹）分别为：
│　　　├──	assets	:资源目录，存放 css，图片等资源。
│　　　├──	component	:组件文件夹，存放 vue 的公共组件（核心）
│     │     （注册于全局，在整个项目中通过关键词便可直接输出）。
│　　　├──	router	:index.js，用来配置路由，定义各个页面对应的URL。
│　　　├──	store	:	组件文件夹，存放 vue 的公共组件
│　　　├──	views	:	放主体页面，vue 文件是可以用来充当路由 view 的。
│　　　├──	tool	:	用来存放工具类 js，
│           │  将 js 代码封装好放入这个文件夹可以全局调用
│           │  （如api.js，http.js 是对 http 方法和 api 方法的封装）。
│　　　├──	main.js	:	项目的入口文件，初始化 vue 实例，并引入所需要的插件。
│　　　├──	app.vue	:	项目的主组件，所有页面都是在该组件下进行切换的。
│　　　└──　...
│
├── tests	:	单元测试
│　　　└──　...
│
├── package.json	:	存放项目的依赖配置（比如 vuex，element-UI）
├── babel.config.js babel	:	转码器的配置文件。
├── vue.config.js vue 的配置文件。
├── yarn.lock 用来构建依赖关系树。
└──
```

- index.html：如果是一级页面模板的话，App.vue就是二级页面模板。所有的其他Vue.js页面都作为该模板的一部分被渲染出来。
- main.js：没有实际的业务逻辑，而是为了支撑整个Vue.js框架，作为程序的入口存在。
- dist：项目构建打包后的默认输出目录

### 通过create-vue创建vue项目

进入工作路径

```shell
# 安装并执行 create-vue
npm init vue@latest

npm create vue@latese
```

初始化完成后，执行

```shell
npm install
```

启动服务

```shell
npm run dev

快捷方式
按	h+enter	帮助
按	r+enter	重新启动服务器
按	u+enter	显示服务器url
按	o+enter	在浏览器中打开
按	c+enter	清除控制台
按	q+enter	退出
```

http://localhost:5173/

请注意，生成项目中的示例组件，使用的是组合式 API 和 `<script setup>`，而非选项式 API。

当你准备将应用发布到生产环境时，请运行：`npm run build`

- 此命令会在 *./dist* 文件夹中为你的应用创建一个生产环境的构建版本。

### 搭建一个Vite+vue项目

```shell
# npm  6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

#yarn
yarn create vite my-vue-app --template vue

#pnpm 
pnpm create vite my-vue-app --template vue
```

```shell
E:\web\test>npm create vite@latest vuevite -- --vue
Need to install the following packages:
create-vite@8.3.0
Ok to proceed? (y) y


> npx
> create-vite vuevite --vue

|
o  Select a framework:
|  Vue
|
o  Select a variant:
|  TypeScript
|
o  Use Vite 8 beta (Experimental)?:
|  No
|
o  Install with npm and start now?
|  Yes
|
o  Scaffolding project in E:\web\test\vuevite...
|
o  Installing dependencies with npm...
/
```

#### vite+vue项目结构

```
├── .vscode 
│　　　└──　...
│
├──	node_modules	:	vue 项目的文件依赖存放在这个文件夹
│　　　├──　package.json中定义的第三方包都会被自动下载，保存在该文件夹下。
│　　　└──　...
│
├──	public	:	存放项目公共资源。如网站LOGO等。
│           │     通常我们不需要对public文件夹内的资源做任何修改。
│           │     在构建打包时，public内容会直接放到dist目录的plugins；
│　　　└──	...
│
├──	src	:	存放 vue 项目的源代码。其下的各个文件（文件夹）分别为：
│　　　├──	assets	:	资源文件，存放 css，图片等资源。
│　　　├──	component	:	组件文件夹，存放 vue 的公共组件（核心）
│           │         注册于全局，在整个项目中通过关键词便可直接输出
│　　　├──	router	:	用来存放index.js，用来配置路由，定义各个页面对应的URL
│　　　├──	store	:	组件文件夹，存放 vue 的公共组件
│　　　├──	views	:	放主体页面，vue 文件是可以用来充当路由 view 的。
│　　　├──	tool	:	用来存放工具类 js，
│           │	将 js 代码封装好放入这个文件夹可以全局调用
│           │	如api.js，http.js 是对 http 方法和 api 方法的封装。
│　　　├──	main.js	:	项目的入口文件，初始化 vue 实例，并引入所需要的插件。
│　　　├──	app.vue	:	项目的主组件，所有页面都是在该组件下进行切换的。
│　　　└──　...
├── package.json  存放项目的依赖配置
├── .gitignore。
├── tsconfig.json
├── tsconfig.node.json
├──index.html
└──vite.config.ts
```

- dist：项目构建打包后的默认输出目录。

- index.html 与项目根目录，在一个 Vite 项目中，index.html 在项目最外层而不是在 public 文件夹内。这是有意而为之的：在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件。

  Vite 将 index.html 视为源码和模块图的一部分。Vite 解析 `<script type="module" src="...">` （指向 JS 源码）。此外，内联引入 JS 的 `<script type="module">` 和引用 CSS 的 `<link href>` 也能利用 Vite 解析。另外，index.html 中的 URL 将被自动转换，不再需要 `%PUBLIC_URL%` 占位符。

与静态 HTTP 服务器类似，Vite 也有 “根目录” 的概念，即服务文件的位置，以 `<root>` 代称。源码中的绝对 URL 路径将以项目的 “根” 作为基础来解析，因此可以像在普通的静态文件服务器上一样编写代码

Vite 也支持多个 .html 作入口点的 多页面应用模式。

#### Vite.config.ts配置

1. 配置和pinia，router，axios，ref,reactive引入等等
2. 配置代理
3. 配置.ts，.vue，.tsx等等文件别名
4. 配置antdV按需加载
5. 配置antdV主题色+全局引入less+全局颜色变量
6. 配置vue使用tsx写法
7. 配置测试环境保留打印

```typescript
import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' //tsx插件引入
import AutoImport from 'unplugin-auto-import/vite' //自动引入ref,reactive等等等
// 配置antd-v按需加载
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// import path from 'path';
import { resolve, join } from 'path'
import { wrapperEnv } from './build/utils'
 
// defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  console.log(command, mode, '===')
  const root = process.cwd()
  const env = loadEnv(mode, root) // 环境变量对象
  console.log('环境变量------', env)
  console.log('文件路径（ process.cwd()）------', root)
  console.log('文件路径（dirname）------', __dirname + '/src')
  const { VITE_DROP_CONSOLE } = wrapperEnv(env)
 
  // // dev 独有配置
  return {
    root, //项目根目录（index.html 文件所在的位置） 默认： process.cwd()
    base: '/', //  开发或生产环境服务的公共基础路径：默认'/'   1、绝对 URL 路径名： /foo/；  2、完整的 URL： https://foo.com/； 3、空字符串或 ./（用于开发环境）
    publicDir: resolve(__dirname, './dist'), //默认'public'  作为静态资源服务的文件夹  (打包public文件夹会没有，里面得东西会直接编译在dist文件下)
    assetsInclude: resolve(__dirname, './src/assets'), // 静态资源处理
 
    // ******插件配置******
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            axios: [
              ['default', 'axios'] // import { default as axios } from 'axios',
            ]
          }
        ],
        dts: 'types/auto-import.d.ts' //生成全局引入的文件
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less' //修改antdv主题色
          })
        ]
      })
    ], //配置插件
    // ******开发服务器配置******
    server: {
      https: true, //(使用https)启用 TLS + HTTP/2。注意：当 server.proxy 选项 也被使用时，将会仅使用 TLS
      host: true, // 监听所有地址
      port: 8080, //指定开发服务器端口：默认3000
      open: true, //启动时自动在浏览器中打开
      cors: false, //为开发服务器配置 CORS
      proxy: {
        //配置自定义代理规则
        // 字符串简写写法
        '/jpi': 'http://192.168.1.97:4567',
        '/api': {
          target: 'http://192.168.1.97:108',
          changeOrigin: true, //是否跨域
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
      // hmr: {
      //   overlay: false
      // }
    },
    // ******项目构建配置******
    build: {
      target: 'modules', //设置最终构建的浏览器兼容目标  //es2015(编译成es5) | modules
      outDir: 'dist', // 构建得包名  默认：dist
      assetsDir: 'assets', // 静态资源得存放路径文件名  assets
      sourcemap: false, //构建后是否生成 source map 文件
      brotliSize: false, // 启用/禁用 brotli 压缩大小报告。 禁用该功能可能会提高大型项目的构建性能
      minify: 'esbuild', // 项目压缩 :boolean | 'terser' | 'esbuild'
      chunkSizeWarningLimit: 1000, //chunk 大小警告的限制（以 kbs 为单位）默认：500
      cssTarget: 'chrome61' //防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式  (要兼容的场景是安卓微信中的 webview 时,它不支持 CSS 中的 #RGBA 十六进制颜色符号)
    },
    // ******resolver配置******
    resolve: {
      alias: {
        // 别名配置
        // 键必须以斜线开始和结束
        '@': resolve(__dirname, 'src'),
        components: resolve(__dirname, './src/components'),
        assets: resolve(__dirname, './src/assets'),
        '#': resolve(__dirname, 'types'),
        build: resolve(__dirname, 'build')
      }
    },
    // ******打印+debugger清除配置******
    // 测试环境保留打印
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
 
    css: {
      // 全局变量+全局引入less+配置antdv主题色
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // 全局变量使用：@primary-color
          modifyVars: {
            'primary-color': '#1890ff', // 全局主色
            'link-color': ' #1890ff', // 链接色
            'success-color': ' #52c41a', // 成功色
            'warning-color': ' #faad14', // 警告色
            'error-color': ' #f5222d', // 错误色
            'font-size-base': ' 14px', // 主字号
            'heading-color': ' rgba(0, 0, 0, 0.85)', // 标题色
            'text-color': ' rgba(0, 0, 0, 0.65)', // 主文本色
            'text-color-secondary': ' rgba(0, 0, 0, 0.45)', // 次文本色
            'disabled-color': ' rgba(0, 0, 0, 0.25)', // 失效色
            'border-radius-base': ' 2px', // 组件/浮层圆角
            'border-color-base': ' #d9d9d9', // 边框色
            'box-shadow-base': ' 0 2px 8px rgba(0, 0, 0, 0.15)' // 浮层阴影
          }
        }
      }
    }
  }
})
 
```

### vite与webpack创建项目的区别

| 工具    | 底层机制                    |
| ------- | --------------------------- |
| Webpack | 基于webpack 5的完整配置     |
| Vite    | 基于原生ESM的极速开发服务器 |

#### 核心架构差异

Webpack（Vue Cli）

- 开发时：打包所有模块（Node.js）->生成bundle->浏览器加载
- 热更新：重新编译修改的模块->替换bundle即可
- 启动时间：随着项目增大而显著增加
- 冷启动：需要打包整个应用

Vite

- 开发时：基于原生 ES Module，无需打包，浏览器直接按需加载模块
- 热更新：毫秒级响应
- 启动时间：几乎恒定，与项目大小无关
- 立即启动，按需变异，

#### 特性对比

| 特性             | Webpack (Vue CLI)             | Vite                       |
| ---------------- | ----------------------------- | -------------------------- |
| **启动速度**     | 慢（需打包整个应用）          | ⚡ 极快（原生 ESM，毫秒级） |
| **热更新 (HMR)** | 较慢（重新编译 bundle）       | ⚡ 极快（模块级别精准更新） |
| **生产构建**     | 成熟优化，代码分割完善        | 基于 Rollup，输出更高效    |
| **配置复杂度**   | 复杂，需要理解 loader/plugin  | 极简，约定优于配置         |
| **生态兼容性**   | 极其丰富，10年积累            | 快速增长，现代库优先支持   |
| **浏览器支持**   | 支持 IE11（需配置）           | 仅支持现代浏览器（ESM）    |
| **TypeScript**   | 需配置 ts-loader              | 原生支持，开箱即用         |
| **CSS 处理**     | 需配置 css-loader 等          | 内置 PostCSS、CSS Modules  |
| **静态资源**     | 需配置 file-loader/url-loader | 内置支持，直接引用         |
| **SSR 支持**     | 较复杂                        | 原生支持，配置简单         |
| **库模式**       | 可配置                        | 内置 `build.lib` 配置      |

### 创建基于TypeScript的Vue3项目

要使用TypeScript开发Vue3的代码，所以不能直接使用Vue2、Vue3默认模版创建，所以选择初始化项目时，需要选择第三项 ` [Manually select features]`

```shell
vue create [项目名]

Vue CLI v5.0.8
? Please pick a preset: Manually select features   
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection, and
<enter> to proceed)   
 (*) Babel
>(*) TypeScript
 ( ) Progressive Web App (PWA) Support
 ( ) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```

选择TypeScript特性后，回车进入下一层选择

```shell
Vue CLI v5.0.8
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, TS, Linter
? Choose a version of Vue.js that you want to start the project with (Use arrow keys)
> 3.x
  2.x
  
Use class-style component syntax? (y/N)
，选择n

Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? (Y/n)
是否使用TypeScript和Babel的形式编译 JSX.这里我们也选择n

? Pick a linter / formatter config: (Use arrow keys)
> ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
  ESLint + Prettier
然后会出现ESLint的一些配置,这里我们选择第一项，默认就好，

? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to
proceed)
>(*) Lint on save
 ( ) Lint and fix on commit
选择增加lint的特性功能
选择默认Lint on save，回车，出现下面问题：

? Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
> In dedicated config files(每项配置有单独的文件)
  In package.json(在package.json 文件中)
选择这些配置文件时单独存放，还是直接存放在package.json文件里

Save this as a preset for future projects? (y/N)
是否为保存配置习惯文件，存了后下次新建新项目选择配置时就会有此选项了
```

增加typescript

```shell
vue add typescript
```

## Vue目录结构

```shell
Vue开发实践之目录结构

约定的目录结构如下：

├── public/                             # 静态资源目录
├── src/
│   ├── assets/                         # 全局资源目录
│   │   ├── fonts/
│   │   └── images/
│   │
│   ├── components/                     # 全局组件
│   │   └── UserSelectTable/
│   │       ├── style/
│   │       │   ├── _var.scss
│   │       │   └── index.scss
│   │       ├── UserSelectTable.vue
│   │       └── index.js
│   │
│   ├── layouts/                         # 自定义布局目录，可以写一个 ProLayout 代替自定义布局
│   │   ├── Basic.vue
│   │   └── User.vue
│   │
│   ├── mocks/                           # 本地模拟数据
│   │   ├── data/
│   │   ├── setup.mock.js
│   │   └── users.mock.js
│   │
│   ├── store/                           # 状态管理
│   │   ├── plugins/
│   │   │   ├── persist.js
│   │   │   └── qiankun.js
│   │   ├── modules/                     # 除非业务过于复杂，否者不推荐
│   │   │   ├── cart.js
│   │   │   └── products.js
│   │   ├── getters.js                   # 根级别的 getters
│   │   ├── actions.js                   # 根级别的 action
│   │   ├── mutations.js                 # 根级别的 mutation
│   │   └── index.js
│   │
│   ├── router/
│   │   ├── routes.js                   # 路由配置
│   │   └── index.js
│   │
│   ├── services/                       # 全局数据请求
│   │
│   ├── views/                          # 页面级组件
│   │   ├── Home/
│   │   │   ├── components/             # 页面级组件
│   │   │   ├── services/               # 页面级组数据请求
│   │   │   │   └── repo.js
│   │   │   └── Home.vue
│   │   │
│   │   └── About/
│   │       ├── components/
│   │       └──  About.vue
│   │
│   ├── login.js                        # 登录页入口
│   └── main.js                         # 应用入口
│
├── .browserslistrc
├── .env
├── .editorconfig
├── .eslintrc.js
├── .prettierrc
├── babel.config.js
├── vue.config.js
├── LICENSE.md
├── jsconfig.json
└── package.json
```

*public* ：静态资源目录，不会被编译，直接复制到编译输出目录

*assets*：全局资源目录，存放源码中用到的静态资源，会和源码一起被编译

components：项目通用组件目录

```
components/
    └── UserSelectTable/
        ├── style/                 # 组件样式
        │   ├── _var.scss
        │   └── index.scss
        ├── UserSelectTable.vue
        └── index.js              # 组件出口
```

- 一个组件一个目录，方便后期迁移，独立成一套业务UI组件库

layouts：布局组件目录

```
layouts/
    ├── Basic.vue     # 经典布局
    └── User.vue      # 用户布局，只有顶部菜单，没有侧边栏菜单
```

mocks：本地模拟数据的目录

```'
mocks/
    ├── setup.mock.js    # Mock 配置
    ├── search.mock.js   # Mock API
    └── data/            # 模拟数据目录，存储 json 等形式的文件
```

store：vues目录，推荐的目录形式

```
store/
    ├── index.js
    ├── actions.js        # 根级别的 action
    ├── getters.js        # 根级别的 getters
    ├── mutations.js      # 根级别的 mutation
    ├── plugins/          # 插件目录
    │    ├── persist.js
    │    └── qiankun.js
    └── modules/           # 除非业务过于复杂，否者不推荐
        ├── cart.js
        └── products.js
```

services：项目的数据请求目录，api从项目中移除，如果后端提供了swagger文档，将使用pont自动生成JS代码

```
├── services/                   # 全局数据请求
│   └── repo.js
│
├── views/
│   ├── services/               # 页面级组数据请求
│   │   │   └── repo.js
│   │   └── Home.vue
```

router：vue-router 目录，推荐的目录形式如下

```
router/
    ├── routes.js   # 路由配置，如果路由过多，建议拆成多个配置文件
    └── index.js
```

main.js：项目的入口文件，用于对应用进行全局配置

.env：环境变量文件，详见 模式和环境变量

.browserslistrc：在不同前端工具之间共享目标浏览器和 Node.js 版本的配置。

.editorconfig：统一编辑器的缩进等配置

.prettierrc：代码美化工具

.eslintrc.js：代码检查工具

babel.config.js：语法转换工具，将最新的 JS API 降级为低版本浏览器兼容的代码

vue.config.js：CLI 配置文件

jsconfig.json：VSCode 支持的配置文件，和 tsconfig.json 互斥

tsconfig.json：VSCode 支持的配置文件，和 jsconfig.json 互斥

package.json：Node 项目的清单文件

## Vue组件的创建与使用

在Vue项目中，通过.vue文件来定义组件

一个组件通常包含模块(template)、脚本(script)和样式(style)三部分。

```vue
<!--脚本-->
<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ msg: string }>()
const count = ref(0)
</script>

<!--模块-->
<template>
	<h1>{{ msg }}</h1>
	<div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
        <p>Edit<code>components/HelloWorld.vue</code> to test HMR</p>
    </div>
	<p>	Check out 
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite starter
    </p>
	<p>
    	Learn more about IDE Support for Vue in the
    	<a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up Guide</a>.
    </p>
	<p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<!--样式-->
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
```

通过 `<template>` 标签中的 `<component-name>` 来引用该组件

```vue
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>
```







