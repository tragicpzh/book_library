import { defineConfig } from 'umi';
// import path from 'path';
export default defineConfig({
  nodeModulesTransform: {
    type: 'all',
  },
  dva:{
    immer:false
  },
  antd:{

  },
  targets: {
    ie: 9,
  }
  /*chainWebpack(config){
    config.module
      .rule('js-test')
      .test(/\.js$/)
      .use('js-test-loader')
      .loader(path.join(__dirname, 'loaders/test'));
  },*/
  /*plugins:[
    path.join(__dirname, 'plugins/demo1.tsx')
  ]*/
});
