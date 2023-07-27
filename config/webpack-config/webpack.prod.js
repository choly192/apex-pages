/*
 * @Author: bamboo
 * @Description:
 * @Date: 2023-03-29 15:43:55
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-03-31 21:17:54
 */
const { merge } = require('webpack-merge');
const rules = require('./common/rules.js');
const optimization = require('./common/optimization.js');
const plugins = require('./common/plugins');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: optimization('production'),
  plugins: plugins('production'),
  module: {
    strictExportPresence: true,
    rules: rules('production'),
  },
});
