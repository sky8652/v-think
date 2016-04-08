var gulp = require('gulp');
var path = require('path');
var util = require('util');

var less = require('gulp-less');
var plumber = require('gulp-plumber');  //plumber可以阻止 gulp 插件发生错误导致进程退出并输出错误日志
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
// var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var webpack = require('webpack');
// var cleanWebpackPlugin = require('clean-webpack-plugin');
// var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

// 生产环境编译less和压缩图片
// gulp.task('htmlMinPro', function () {
//   return gulp.src('./view/**/*.html')
//       .pipe(htmlmin({collapseWhitespace: true}))
//       .pipe(gulp.dest('./www/static/'));
// });
gulp.task('imgMin', () => {
  return gulp.src('./img/**/*.png')
        .pipe(imagemin({
          progressive: true,
          use: [pngquant({quality: '65-80'})]
        }))
        .pipe(gulp.dest('./www/static/img'));
});
gulp.task('lessPro', ['cpBS', 'cpFont', 'imgMin'], function () {
  return gulp.src('./less/**/*.less')
      .pipe(less({
        path: [path.join(__dirname, 'less', 'includes')]
      }))
      .pipe(sourcemaps.init())
      .pipe(cssnano())
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./www/static/css'));
});
gulp.task('cpBS', function () {
  return gulp.src(['./lib/css/bootstrap.min.css'])
      .pipe(gulp.dest('./www/static/css'));
});
gulp.task('cpFont', function () {
  return gulp.src(['./lib/fonts/*'])
      .pipe(gulp.dest('./www/static/fonts/'))
});
// 开发环境编译less，并监听less改变
// gulp.task('htmlDev', ['clean'], function () {
//   return gulp.src(['./view/**/*.html'])
//       .pipe(gulp.dest('./www/static'));
// });
gulp.task('lessDev', ['cpBS', 'cpFont', 'imgMin'], function () {
  return gulp.src('./less/**/*.less')
      .pipe(plumber())
      .pipe(less({
        path: [path.join(__dirname, 'less', 'includes')]
      }))
      .pipe(autoprefixer())
      .pipe(gulp.dest('./www/static/css'));
});

gulp.task('watchLess', function () {
  gulp.watch('app/less/**/*.less', ['lessDev']);
});

//生产环境webpack打包构建,代码压缩
gulp.task('webpack:build', function (callback) {
  var myConfig = Object.create(webpackConfig);
  // myConfig.devtool = '#source-map';
  myConfig.debug = false;
  myConfig.plugins = myConfig.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]);

  webpack(myConfig, function (err, status) {
    if (err) throw new util.PluginError("webpack:build", err);
    util.log("[webpack:build]", status.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('devServer', ['lessDev']);
gulp.task('devBuild', ['lessDev', 'watchLess']);
gulp.task('proBuild', ['webpack:build', 'lessPro']);
