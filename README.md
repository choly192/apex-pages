### 项目启动

- 安装依赖

```bash
yarn
```

- 项目启动

```bash
yarn start:h5 # h5页面启动

yarn start:pc # pc页面启动
```

_注意:启动需要选择你启动的项目_

- 项目打包

```bash
yarn build:h5 # 打包 h5 页面
yarn build:pc # 打包 pc 页面

yarn build:latest # 打包最新的项目 （h5&pc）
```

### 项目开发

#### 项目入口文件放置及命名

1. 入口文件全部放置于 _pages/\*_ 目录下，h5 页面 放于 _h5/\*_ 文件夹下；同理，pc 放置于 _pc/\*_ 文件夹下;
2. 入口文件夹命名：_当年年份 + 名称_ ；如：2023-demo;
3. 入口文件命名：_必须命名为 index.tsx_;

#### 项目内容文件

1. 项目内容文件 放置于 _containers_ 目录下面；
2. 静态资源文件放置于 自身项目文件夹下面
