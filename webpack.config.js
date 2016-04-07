var webpack = require('webpack');
var path = require('path');
var glob = require('glob');

// var htmlWebpackPlugin = require('html-webpack-plugin');
// var cleanWebpackPlugin = require('clean-webpack-plugin');

var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
module.exports = {
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, "www"),
    publicPath: 'www',
    filename: '[name].js'
  },
  module: {
    // 各种加载器，即让各种文件格式可用require引用
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!autoprefixer!less'
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  // debug: true,
  plugins: [
    // new CommonsChunkPlugin('static/js/common.js', getCommonArray())
  ],
  vue: {
    loaders: {
      css: 'style!css!autoprefixer!less',
    }
  },
  babel: {
    presets: ['es2015', 'stage-1'],
    plugins: ['transform-runtime']
  },
  resolve: {
    //配置别名，在项目中可缩减引用路径
    extensions: ['', '.js', '.vue'],
    alias: {
      lessPath: path.join(__dirname,"/app/less"),
      components: path.join(__dirname,"/app/components"),
      appjs: path.join(__dirname,"/app/js"),
      img: path.join(__dirname,"/app/img"),
    }
  }
};
function getEntry() {
    var entry = {};
    glob.sync('./components/**/*.js').forEach(function (name) {
      console.log(name)
      var n = 'static/js/' + name.slice(name.lastIndexOf('components/') + 11, name.length - 3);
      if (n !== 'js/util') {
        entry[n] = [path.resolve(__dirname, name.split('.js')[0])]
      }
      console.log('key: ' + n + ' val: ' + entry[n])
    });
    return entry;
};
function getCommonArray() {
    var commonArr = [];
    for (var props in getEntry()) {
      commonArr.push(props);
    }
    return commonArr;
};
