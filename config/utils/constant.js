/*
 * @Author: bamboo
 * @Description: 存放 关于调用脚本声明的一些常量
 * @Date: 2023-03-31 10:09:57
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-04-12 14:39:21
 */

// 规定固定的入口文件名 pages/**/index.tsx
const MAIN_FILE = 'index.tsx';
const chalk = require('chalk');

// 固定端口
const BASE_PORT = 8081; // 固定端口

// 打印信息时的颜色
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500');
const success = chalk.green;

const maps = {
  error,
  warning,
  success,
};

// 因为环境变量的注入是通过字符串方式进行注入的
// 所以当 打包多个文件时 我们通过*进行连接 比如 home和editor 注入的环境变量为home*editor
// 注入多个包环境变量时的分隔符
const separator = '*';

const log = (message, types) => {
  console.log(maps[types](message));
};

// 获取当前的运行 类型 参数
const getCurrentRunType = () => {
  return process.env.RUN_TYPE;
};

module.exports = {
  MAIN_FILE,
  BASE_PORT,
  separator,
  log,
  getCurrentRunType,
};
