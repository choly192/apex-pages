const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const optimization = env => {
  const IS_PROD = env === 'production';
  return {
    minimize: IS_PROD,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // 打开是因为默认时表情符号和正则表达式没有被适当缩小
            ascii_only: true,
          },
        },
        parallel: 4, // 启用多进程并发运行并设置并发运行次数
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000, // 生成chunk的最小体积 20kb
      cacheGroups: {
        commons: {
          chunks: 'all',
          // 将两个以上的chunk所共享的模块打包至commons组。
          minChunks: 2,
          name: 'commons',
          priority: 80,
        },
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: 40,
          enforce: true,
        },
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/](antd|@ant-design|rc-.*|dom-align|@ctrl\/tinycolor|async-validator)[\\/]/,
          priority: 30,
          enforce: true,
        },
      },
    },
  };
};

module.exports = optimization;
