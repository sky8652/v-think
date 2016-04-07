'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let session = await this.session('userInfo');
    if (!session) {
      this.redirect('login/login.html');
    }
    return this.display();
  }
}
