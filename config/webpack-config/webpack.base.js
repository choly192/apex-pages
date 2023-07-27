/*
 * @Author: bamboo
 * @Description:
 * @Date: 2023-03-29 15:43:23
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-04-12 15:39:35
 */
const fs = require('fs');
const paths = require('../paths.js');
const { getEntryTemplate } = require('../utils/helper');
const { separator } = require('../utils/constant.js');

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);
const isEnvDevelopment = process.env.NODE_ENV === 'development';

// 将pages拆分成数组 ['home', 'second']
const pages = process.env.pages.split(separator);

// 调用 getEntryTemplate 获得对应的 htmlWebpackPlugins 和 entry
const htmlWebpackPluginOptions = Object.assign(
  {},
  {
    inject: true,
    template: paths.appHtml,
  },
  !isEnvDevelopment
    ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }
    : undefined,
);

const { entry, htmlPlugins } = getEntryTemplate(pages, htmlWebpackPluginOptions);
const baseConfig = {
  entry,
  output: {
    publicPath: paths.publicUrlOrPath,
    // clean: true,
    path: paths.appBuild,
    filename: isEnvDevelopment ? 'static/js/[name].bundle.js' : 'static/js/[name].[contenthash:8].js',
    chunkFilename: isEnvDevelopment ? 'static/js/[name].chunk.js' : 'static/js/[name].[contenthash:8].chunk.js',
    // assetModuleFilename: 'static/media/[name].[hash][ext]',
    sourceMapFilename: 'static/js/[name].[contenthash:8].map',
  },
  // infrastructureLogging: {
  //   level: 'none', // 禁用日志
  // },
  plugins: htmlPlugins,
  resolve: {
    extensions: paths.moduleFileExtensions.map(ext => `.${ext}`).filter(ext => useTypeScript || !ext.includes('ts')),
    alias: {
      '@': paths.resolveApp('src'),
      pages: paths.resolveApp('src/pages'),
      containers: paths.resolveApp('src/containers'),
    },
    mainFiles: ['index', 'main'],
  },
};

module.exports = baseConfig;
