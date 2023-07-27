/*
 * @Author: bamboo
 * @Description: 获取 entry 和 htmlWebpackPlugin数组
 * @Date: 2023-03-31 10:48:30
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-04-04 11:25:37
 */
const path = require('path');
const fs = require('fs');
const { resolveApp } = require('../paths');
const { MAIN_FILE, log, getCurrentRunType } = require('./constant');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 检查数组是否为空
const isEmptyArray = arr => Array.isArray(arr) & (arr.length === 0);

// 获取多页面入口文件夹中的路径
const dirPath = resolveApp(`src/pages/${getCurrentRunType()}`);

// 用于保存入口文件的Map对象
const entryPages = Object.create(null);

// 读取 dirPath中的文件夹个数，同时保存到 entry中，key ---> 文件夹名称  value ----> 文件夹路径
fs.readdirSync(dirPath).forEach(file => {
  // 获取pc， h5 入口文件
  // const cDirPath = resolveApp(`src/pages/${file}`);

  // fs.readdirSync(cDirPath).forEach(cFile => {
  //   const entryPath = path.join(cDirPath, cFile);
  //   if (fs.statSync(entryPath)) {
  //     entryPages[`${cFile}_${file}`] = path.join(entryPath, MAIN_FILE);
  //   }
  // });

  const entryPath = path.join(dirPath, file);
  if (fs.statSync(entryPath)) {
    entryPages[file] = path.join(entryPath, MAIN_FILE);
  }
});

/**
 * 根据入口文件list生成对应的htmlWebpackPlugin，同时返回对应webpack需要的入口和htmlWebpackPlugin
 * @param {*} pages 入口文件 list
 * @param {*} baseOptions htmlWebpackPlugin 基本参数
 * @returns
 */
const getEntryTemplate = (pages, baseOptions = {}) => {
  const entry = Object.create(null);
  const htmlPlugins = [];
  const runType = getCurrentRunType();

  pages.forEach(pageName => {
    entry[pageName] = path.join(dirPath, pageName, MAIN_FILE);
    // const names = pageName.split("_");
    // entry[pageName] = path.join(`${dirPath}/${names[1]}`, names[0], MAIN_FILE);
    // if (!fs.readdirSync(dirPath).includes(names[1])) {
    //   log("html模板与 pages下的目录对应错误!", "error");
    //   return;
    // }
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        ...baseOptions,
        template: resolveApp(`public/${runType}.html`),
        filename: `${pageName}.html`,
        chunks: ['manifest', 'vendors', pageName],
      }),
    );
  });
  return { entry, htmlPlugins };
};

module.exports = {
  entryPages,
  getEntryTemplate,
  isEmptyArray,
};
