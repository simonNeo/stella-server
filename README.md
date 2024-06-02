# stella-server

利用html模板和nodejs快速搭建网站，类似`thinkphp`

## stella-server是什么？
可以简单的理解为`thinkphp`的nodejs版本，用js替代php。

## stella-server适合什么
- 快消型网页，如活动页，广告页等
- 需要服务端渲染的网站
- 交互比较简单的网页
- 只希望使用html+js+css+jquery，不想关心组件，框架，生命周期，应用状态
- 不想使用`php`，`java`等后端语言，只想js一把梭


## stella-server不适合什么
- 复杂的交互网站。`vue`，`react`，`angular`等框架更适合
- 需要复杂的状态管理，组件化，路由等。
- 前端组件库
- 对性能要求较高的网站



## 如何使用

### 1. 创建项目

```
mkdir myapp
cd myapp
npm init -y
```

### 2. 安装stella-server

```
yarn add stella-server
# or
npm install stella-server
```

### 3. 创建目录结构

```
- myapp
  - pages
    - index
      - controller.js
      - view.html
  - stella.config.js
```

创建了三个文件，内容分别如下

```js
// pages/index/controller.js
class Index {

  async main() {
    return {
      title: `欢迎使用stella-server`,
      user: {
        name: 'Simon',
      }
    }
  }
}

module.exports = Index;
```

```html
<!-- pages/index/view.html -->
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>stella-server</title>
  </head>
  <body>
    <h1>hello, {{user.name}}</h1>
    <h1>{{title}}</h1>
  </body>
</html>
```


```js
// stella.config.js
const config = {
  server: {
    port: 8080,
  }
}

module.exports = config
```
`stella.config.js`是应用的配置文件,默认配置如下，你可以任意覆盖
```js
const config = {
  server: {
    port: process.env.port || process.env.PORT,
    path: {
      page: '/pages',
      static: '/static'
    },
    db: {
      enable: false,
      modelPath: '/models',
      host: 'localhost',
      port: 3306,
      username: '',
      password: '',
      database: ''
    },
  }
}

module.exports = config
```

### 4. 启动服务

package.json中添加启动命令
```json
{
  "scripts": {
    "start": "stella run"
  }
}
```

启动服务
```
npm start
```
现在，访问`http://localhost:8080`

## 文档

### 1. 配置文件说明

| 字段 | 默认值 | 说明 |
|---|---|---|
| server.port | 8080 | 端口 |
|server.path.page|`/pages`|页面文件存放的位置，页面结构和路由自动映射，例如路由`/landing/setting`会查找`/pages/landing/setting`下的`controller.js`和`view.html`文件|
|server.path.static|`/static`|静态资源文件存放的位置，例如`/static/css/style.css`可以通过`http://localhost:8080/css/style.css`访问|
|server.db.enable|false|是否启用数据库|
|server.db.modelPath|`/models`|数据库模型文件存放的位置，详情查看数据库配置说明章节|
|server.db.host|`localhost`|数据库地址|
|server.db.port|`3306`|数据库端口|
|server.db.username||数据库用户名|
|server.db.password||数据库密码|
|server.db.database||数据库名|

### 2. 页面文件说明
页面文件和路由一一对应，例如路由`/landing/setting`会查找`/pages/landing/setting`下的`controller.js`和`view.html`文件
每个页面下需要两个文件，`controller.js`和`view.html`，分别用于处理业务逻辑和渲染页面

`controller.js`文件需要导出一个类，类中需要有一个`main`方法，`main`方法是页面的入口，返回的对象会传递给`view.html`文件

`view.html`文件是页面的模板文件，支持`mustache`语法，例如`{{title}}`，`{{user.name}}`等

### 3. 如何使用数据库

首先需要在`stella.config.js`中配置，`server.db.enable`设置为`true`，并配置数据库连接信息。

stella采用了`sequelize`作为orm，所以你无需编写原始的sql语句。当然，代价就是需要告诉stella你的数据库表结构。然而，这并不是一件麻烦的事情，stella提供了一个命令行工具，可以帮助你生成模型文件。

在`package.json`中添加命令
```json
{
  "scripts": {
    "db:scan": "stella db:scan"
  }
}
```
运行 `npm run db:scan`。
该命令会扫描你的数据库，生成模型文件，生成的模型文件会放在`/models`目录下。同时，你可以在`stella.config.js`中配置`server.db.modelPath`来指定模型文件的存放位置。

现在，你可以在任何页面的`controller.js`中使用数据库了
```js
// pages/index/controller.js
const { models } = require('stella-server/src/db')
class Index {

  async main() {
    // 假设你有一个user表
    const user = await models.User.findOne({ where: { id: 1 }});
    return {
      user: user.toJSON()
    }
  }
}

module.exports = Index;
```



## 功能规划:

- [x] 支持html模板
- [x] 支持静态资源
- [ ] 更好的目录结构
- [ ] 支持ts
- [x] 支持数据库
- [ ] 支持tailwind css
- [ ] 支持参数路由，例如`/user/:id` （进行中）
- [ ] 支持vue模板，例如v-for，v-if等
- [ ] 支持开发模式热更新
- [ ] 支持插件
- [ ] 更好的开发体验

## 最后
最后，如果你有任何问题，欢迎提issue。

```
