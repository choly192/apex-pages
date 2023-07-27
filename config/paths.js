/*
 * @Author: bamboo
 * @Description:
 * @Date: 2023-03-29 15:12:41
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-04-12 15:39:12
 */
'use strict';

const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// build 输出的包名
const buildPath = 'dist';

// 文件扩展名
const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// 与webpack相同的顺序解析文件路径
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

function buildPublicPath() {
  const isDev = process.env.NODE_ENV === 'development';
  return isDev ? '/' : 'https://cdn-file.ludashi.com/web/technical_conference/';
}

module.exports = {
  appPath: resolveApp('.'),
  appSrc: resolveApp('src'),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/main'),
  appTsConfig: resolveApp('tsconfig.json'),
  appPackageJson: resolveApp('package.json'),
  publicUrlOrPath: buildPublicPath(),
  resolveApp,
};

module.exports.moduleFileExtensions = moduleFileExtensions;
