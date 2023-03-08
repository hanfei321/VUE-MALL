module.exports = {
  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV === 'production', (config) => {
      /* 设置打包入口 */
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js');

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        /* 'vue-quill-editor': 'VueQuillEditor' */
      });

      config.plugin('html').tap((args) => {
        //添加参数isProd
        args[0].isProd = true;
        return args;
      });
    });
    config.when(process.env.NODE_ENV === 'development', (config) => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js');
      config.plugin('html').tap((args) => {
        //添加参数isProd
        args[0].isProd = false;
        return args;
      });
    });
  },
  devServer: {
    overlay: {
      warnings: false, //不显示警告
      errors: false, //不显示错误
    },
  },
  lintOnSave: false, //关闭eslint检查
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `@import "@/assets/scss/element-variables.scss"`,
  //     },
  //   },
  // },

  //   css: {
  // loaderOptions: {
  //     postcss: {
  //         plugins: [require('tailwindcss') require('autoprefixer')]
  //     }
  // }
  // }
};
