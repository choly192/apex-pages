module.exports = {
  plugins: [
    // require('autoprefixer'),
    'postcss-preset-env',
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
