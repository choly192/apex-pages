/*
 * @Author: bamboo
 * @Description:
 * @Date: 2023-03-29 15:16:32
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-04-01 10:45:45
 */
const portfinder = require('portfinder'); // 支持端口被占用启动
const paths = require('./paths');
const { BASE_PORT } = require('./utils/constant');

portfinder.basePort = BASE_PORT;

const baseServerConfig = {
  allowedHosts: 'all',
  compress: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
  historyApiFallback: {
    disableDotRule: true,
    index: paths.publicUrlOrPath,
  },
  // open: [],
  port: 8081,
  hot: true, // Reload our page when the code changes
};

module.exports = async function getServerConfig(pageNames) {
  try {
    // 端口被占用时候 portfinder.getPortPromise 返回一个新的端口(往上叠加)
    const port = await portfinder.getPortPromise();
    baseServerConfig.port = port;
    baseServerConfig.open = pageNames.map(page => page + '.html');
    return baseServerConfig;
  } catch (error) {
    throw new Error(error);
  }
};

// module.exports = baseServerConfig;
