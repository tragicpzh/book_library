import { defineConfig } from 'umi';
// import path from 'path';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva:{
    immer:true
  },
  antd:{

  },
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
