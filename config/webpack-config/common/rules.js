const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('../../paths.js');
const { getCurrentRunType } = require('../../utils/constant');

const imageInlineSizeLimit = 1024;

// Check if Tailwind config exists
const useTailwind = fs.existsSync(path.join(paths.appPath, 'tailwind.config.js'));

const type = getCurrentRunType();

const rules = env => {
  const IS_DEV = env === 'development';
  const IS_PROD = env === 'production';

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      IS_DEV && require.resolve('style-loader'),
      IS_PROD && {
        loader: MiniCssExtractPlugin.loader,
        // css is located in `static/css`, use '../../' to locate index.html folder
        // in production `paths.publicUrlOrPath` can be a relative path
        options: paths.publicUrlOrPath.startsWith('.') ? { publicPath: '../../' } : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            // Necessary for external CSS imports to work
            // https://github.com/facebook/create-react-app/issues/2677
            ident: 'postcss',
            config: false,
            plugins: !useTailwind
              ? [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],

                  type === 'h5' &&
                    require('postcss-px-to-viewport')({
                      unitToConvert: 'px', // 需要转换的单位，默认为"px"
                      viewportWidth: 750, //  设计稿的视口宽度
                      unitPrecision: 5, // 单位转换后保留的精度
                      propList: ['*'], // 能转化为vw的属性列表
                      viewportUnit: 'vw', //  希望使用的视口单位
                      fontViewportUnit: 'vw', // 字体使用的视口单位
                      selectorBlackList: [], // 需要忽略的CSS选择器
                      minPixelValue: 1, // 最小的转换数值，如果为1的话，只有大于1的值会被转换
                      mediaQuery: true, // 媒体查询里的单位是否需要转换单位
                      replace: true, // 是否直接更换属性值，而不添加备用属性
                      exclude: [], // 忽略某些文件夹下的文件或特定文件
                      include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件 (include: /\/src\/mobile\//)
                      landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
                      landscapeUnit: 'vw', // 横屏时使用的单位
                    }),
                  // Adds PostCSS Normalize as the reset css with default options,
                  // so that it honors browserslist config in package.json
                  // which in turn let's users customize the target behavior as per their needs.
                  'postcss-normalize',
                ]
              : [
                  'tailwindcss',
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                ],
          },
          sourceMap: false,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: false,
            root: paths.appSrc,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        },
      );
    }
    return loaders;
  };

  const rulesArr = [
    {
      // 当规则匹配时，只使用第一个匹配规则
      oneOf: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          include: [paths.appSrc],
          exclude: /node_modules/,
        },
        {
          test: [/\.avif$/],
          type: 'asset',
          mimetype: 'image/avif',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
          generator: {
            // publicPath: 'static/font/',
            // outputPath: 'static/font/',
            filename: 'static/images/[name].[contenthash:8][ext]',
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit,
            },
          },
          generator: {
            // publicPath: 'static/font/',
            // outputPath: 'static/font/',
            filename: 'static/images/[name].[contenthash:8][ext]',
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: require.resolve('@svgr/webpack'),
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/images/[name].[contenthash:8].[ext]',
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
        {
          test: /\.(woff2|eot|ttf|otf)(\?.*)?$/,
          type: 'asset/resource',
          include: [path.resolve(__dirname, 'src', 'static/font')],
          exclude: /(node_modules)/,
          generator: {
            // publicPath: 'static/font/',
            // outputPath: 'static/font/',
            filename: 'static/font/[name].[contenthash:8][ext]',
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: 'asset/resource',
          // include: [path.resolve(__dirname, 'src', 'static/media')],
          exclude: /(node_modules)/,
          generator: {
            filename: 'static/media/[name].[contenthash:8][ext]',
          },
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: getStyleLoaders({
            importLoaders: 1,
            sourceMap: false,
            modules: {
              mode: 'icss',
            },
          }),
          sideEffects: true,
        },
        {
          test: /\.module\.css$/,
          use: getStyleLoaders({
            importLoaders: 1,
            sourceMap: false,
            modules: {
              mode: 'local',
            },
          }),
          sideEffects: true,
        },
        {
          test: /\.(scss|sass)$/,
          exclude: /\.module\.(scss|sass)$/,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              sourceMap: false,
              modules: {
                mode: 'icss',
              },
            },
            'sass-loader',
          ),
          sideEffects: true,
        },
        {
          test: /\.module\.(scss|sass)$/,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              sourceMap: false,
              modules: {
                mode: 'icss',
              },
            },
            'sass-loader',
          ),
          sideEffects: true,
        },
      ],
    },
  ];
  return rulesArr;
};

module.exports = rules;
