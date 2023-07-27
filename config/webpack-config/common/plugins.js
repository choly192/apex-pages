/*
 * @Author: bamboo
 * @Description:
 * @Date: 2023-03-29 15:44:26
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-04-04 17:15:29
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const plugins = env => {
  const IS_DEV = env === 'development';

  const basePlugin = [];

  if (!IS_DEV) {
    let prdPlugin = [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    ];

    return basePlugin.concat(prdPlugin);
  } else {
    let devPlugin = [new CleanWebpackPlugin()];
    return basePlugin.concat(devPlugin);
  }
};

module.exports = plugins;
