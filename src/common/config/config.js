'use strict';
/**
 * config
 */
export default {
  //key: value
  resource_on: true, //是否开启静态资源解析功能
  resource_reg: /^(static\/|[^\/]+\.(?!js|html)\w+$)/, //判断为静态资源请求的正则
  encoding: "utf-8"
};
