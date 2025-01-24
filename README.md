# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

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
* 四个Tabs、缓存Tabs、缓存页面(4个Tab和一个Tab)、拦截功能、文件设计、路由设计、框架主题色、scss文件设计
* 路由404重定向、缓存路由清除缓存key、todo 使用React-router-domv6 404 重定向
* react19版本的学习


### 重要事项
* 标准的css命名规则：kebab-case
* react19 + mobile v5 toast, moblie v5不兼容
  * https://github.com/ant-design/ant-design-mobile/issues/6817
* 图片还是按模块存放比较合理