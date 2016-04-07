
Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```
##前端开发环境构建(开发时不进行压缩混淆)
前端相关路径说明：/components  该目录下为所有vue组件； /less  该目录下为less文件； /img  该目录下为所有图片文件

编译生成的静态资源文件均在/www/static/ 对应目录下

### 1.依赖gulp编译公共的less和图片压缩
```
npm run build
```
### 2.依赖webpack+vue-loader来编译*.vue文件
```
npm run dev
```
##前端正式环境构建(开发时对js进行压缩混淆及css压缩)

```
npm run buildPro
```
##PS：相关配置请自行修改。菜鸟一枚欢迎交流。
