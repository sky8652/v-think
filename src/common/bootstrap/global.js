/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 *
 * global.fn1 = function(){
 *
 * }
 */
import log4js from 'log4js';

log4js.configure({
  appenders: [
    {
      type: 'console'
    },
    {
      type: 'dateFile',
      filename: think.ROOT_PATH+'/logs/',
      pattern: "yyyy-MM-dd.log",
      maxLogSize: 1024,
      alwaysIncludePattern: true,
      backups: 4
      //category: 'normal'
    }
  ],
  replaceConsole: true
});
