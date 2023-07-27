/*
 * @Author: bamboo
 * @Description:
 * @Date: 2023-03-29 18:52:48
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-04-07 18:59:47
 */
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const inquirer = require('inquirer');
const figlet = require('figlet');

const { log, separator } = require('../config/utils/constant');
const { entryPages, isEmptyArray } = require('../config/utils/helper');
// const config = require("../config/webpack-config/webpack.base");
const getServerConfig = require('../config/webpackDevServer.config');

// 获取pages下面的所有文件
const pageList = [...Object.keys(entryPages)];

// 至少保证一个入口
if (isEmptyArray(pageList)) {
  log('不合法目录, 请检查src/pages/*/index.tsx', 'warning');
  return;
}

// 同时添加一个全选
const allPagesList = [...pageList, 'all'];

// 调用 inquirer 和用户交互
inquirer
  .prompt([
    {
      type: 'checkbox',
      message: '请选择需要启动的项目:',
      name: 'devLists',
      choices: allPagesList, // 选项
      // 校验最少选中一个
      validate(value) {
        return !value.length ? new Error('至少选择一个项目进行启动') : true;
      },
      // 当选中 all 的时候 返回所有 pageList 这个数组
      filter(value) {
        if (value.includes('all')) {
          return pageList;
        }
        return value;
      },
    },
  ])
  .then(res => {
    const message = `当前选中page: ${res.devLists.join(' , ')}`;

    // 控制台提示用户当前所选中的包
    log(message, 'success');
    runParallel(res.devLists);
  });

// 调用打包命令
async function runParallel(pages) {
  // 当前所有入口文件
  const message = `开始启动: ${pages.join('-')}`;
  log(message, 'success');
  log('\nplease waiting some times...', 'success');
  await build(pages);
}

// 打包函数
async function build(buildList) {
  // 将选中的包通过 separator 分割
  const strLists = buildList.join(separator);

  process.env.pages = strLists;

  const config = require('../config/webpack-config/webpack.dev');

  const compiler = webpack(config);

  const devServerConfig = await getServerConfig(buildList);

  const devServer = new WebpackDevServer(devServerConfig, compiler);
  devServer.startCallback(err => {
    err && log(`start error: ${err}`, 'error');
    if (!err) {
      log(
        figlet.textSync('starting', {
          font: 'Ghost',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 120,
          whitespaceBreak: true,
        }),
        'success',
      );
    }
  });

  // await execa("webpack", ["server", "--config", "./config/webpack-config/webpack.dev.js"],{
  //   stdio: "inherit",
  //   env: {
  //     pages: strLists,
  //     NODE_ENV: "development"
  //   }
  // });
}

// const config = require("../config/webpack-config/webpack.dev");
// const compiler = webpack(config);

// const devServer = new WebpackDevServer(serverConfig, compiler);
// devServer.startCallback(err => {
//   console.log("start error:", err);
// });
