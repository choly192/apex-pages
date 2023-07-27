/*
 * @Author: bamboo
 * @Description:
 * @Date: 2023-03-29 15:43:43
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-03-31 21:38:05
 */
const { merge } = require('webpack-merge');
const rules = require('./common/rules.js');
const optimization = require('./common/optimization.js');
const plugins = require('./common/plugins');
const baseConfig = require('./webpack.base');
const baseServerConfig = require('../webpackDevServer.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    strictExportPresence: true,
    rules: rules('development'),
  },
  optimization: optimization('development'),
  plugins: plugins('development'),
  devServer: {
    ...baseServerConfig,
  },
});
