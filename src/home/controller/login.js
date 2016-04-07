'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async loginAction(self){
    //auto render template file index_index.html
    if (this.isGet()) {
      return this.display();
    }
    let data = this.post();
    let result = await this.model('users').where({account: data.account, password: data.password}).find();
    if (think.isEmpty(result)) {
      return this.fail(1000, '用户名或密码错误');
    }
    await this.session('userInfo', result);
    return this.json({errcode: 0, msg: '登陆成功'});
  }
}
