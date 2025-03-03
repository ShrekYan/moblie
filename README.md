### esbuild
https://esbuild.bootcss.com/

### 升级
* ~~* vite->v6~~
* ~~* react->v19~~
* pnpm 需要升级到9.15
![img_1.png](img_1.png)
~~* 打包编译速度~~

ReactUtils：表示 React 的实用工具。
ReactToolkit：强调这是一个工具集。
ReactHelpers：突出工具库提供辅助功能的特性。
ReactBase：表示基础功能的集合。
ReactCoreTools：强调核心工具的集合。

### ts类型定义
// 请求参数
interface LoginRequest {
username: string;
password: string;
}

// 响应数据
interface LoginResponse {
token: string;
userId: string;
}

### todo
* ~~四个Tabs、缓存Tabs、缓存页面(4个Tab和一个Tab)~~、~~拦截功能~~、文件设计、路由设计、~~框架主题色~~、~~scss文件设计~~
* ~~路由404重定向~~、~~缓存路由清除缓存key（tab，非tab）~~、~~todo 使用React-router-domv6 404 重定向~~
* react19版本的学习 
~~* httpPlug自定义第三方组件，如loading等；优先级低~~
* ~~parameter：获取用户信息~~
* 第三方组件改造？这一点我自己都不知道是什么？
~~* scss与处理器~~
  ~~* 设计全局公用的变量和方法~~
  * ~~预处理的基础和方法需要重新学习~~
* ~~GoldStart 冷启动：未登录拦截器、全局接口初始化~~
* 设计biz hooks
* 学习package.json文件中的库
* 引入zustand.js?
* 与app交互（WebViewJavascriptBridge）
  * https://github.com/marcuswestin/WebViewJavascriptBridge
  * https://github.com/Lision/WKWebViewJavascriptBridge
* 微服务？？
* 别名设计

### 具体功能
* 完成登录页面开发
  * 登录后返回上一级页面
* 图表


### 重要事项
* 标准的css命名规则：kebab-case
* react19 + mobile v5 toast, moblie v5不兼容
  * https://github.com/ant-design/ant-design-mobile/issues/6817
* 图片还是按模块存放比较合理


