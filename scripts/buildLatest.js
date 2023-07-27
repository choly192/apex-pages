/*
 * @Author: bamboo
 * @Description:
 * @Date: 2023-04-01 14:47:03
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-04-12 15:27:27
 */
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production';

// const webpack = require('webpack');
const figlet = require('figlet');
const paths = require('../config/paths');
const execa = require('execa');

const { log, separator } = require('../config/utils/constant');
const { entryPages, isEmptyArray } = require('../config/utils/helper');

// 获取pages下面的所有文件
const pageList = [...Object.keys(entryPages)];

const currentDate = new Date();
const currentYear = currentDate.getFullYear().toString();

const latestPageList = pageList.filter(page => {
  const names = page.split('-');
  return currentYear === names[0];
});

// 至少保证一个入口
if (isEmptyArray(latestPageList)) {
  log('无匹配目录, 请检查src/pages/*/index.tsx', 'warning');
  return;
}

// 打包函数
async function build(buildList) {
  // 将选中的包通过 separator 分割
  const strLists = buildList.join(separator);

  // process.env.pages = strLists;
  try {
    await execa('webpack', ['--config', './config/webpack-config/webpack.prod.js'], {
      stdio: 'inherit',
      env: {
        pages: strLists,
        NODE_ENV: 'production',
      },
    });

    log(
      figlet.textSync('success', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      }),
      'success',
    );
  } catch (error) {
    log(
      figlet.textSync('error', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      }),
      'error',
    );
  }

  // const config = require('../config/webpack-config/webpack.prod');
  // const compiler = webpack(config);

  // return new Promise((resolve, reject) => {
  //   compiler.run((err, stats) => {
  //     if (err) {
  //       if (!err.message) {
  //         log('打包构建失败!', 'error');
  //         return reject(err);
  //       }
  //     } else {
  //       log(
  //         figlet.textSync('success', {
  //           font: 'Ghost',
  //           horizontalLayout: 'default',
  //           verticalLayout: 'default',
  //           width: 80,
  //           whitespaceBreak: true,
  //         }),
  //         'success'
  //       );
  //     }

  //     return resolve({ stats });
  //   });
  // });
}

// 调用打包命令
function runParallel(pages) {
  // 当前所有入口文件
  const message = `开始打包: ${pages.join('-')}`;
  log(message, 'success');
  log('\nplease waiting some times...', 'success');
  return build(pages);
}

runParallel(latestPageList).then(res => {
  const appPackage = require(paths.appPackageJson);
  log(`当前版本：${appPackage.version}`, 'success');
});
