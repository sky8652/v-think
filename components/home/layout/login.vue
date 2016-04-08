<template>
  <div>
    <div class="login-wrapper">
      <div class="item-wrapper">
        <span class="desc">账号：</span>
        <input type="text" v-model="account">
      </div>
      <div class="item-wrapper">
        <span class="desc">密码：</span>
        <input type="password" v-model="password">
      </div>
      <button type="button" class="btn btn-primary btn-center" @click="login">登陆</button>
    </div>
    <alert :show.sync="showTip" :duration="2000" :type="type" width="400px" placement="top">
      {{ tipMsg }}
    </alert>
  </div>
</template>
<script>
import { modal } from 'vue-strap';
import { alert } from 'vue-strap';

export default {
	el: '#app',
	data: {
		showModal: true,
		showTip: false,
		type: '',
		tipMsg: '',
		account: '',
		password: ''
	},
	methods: {
		login () {
			let param = {
				account: this.account,
        password: this.password
			};
			this.$http.post('/home/login/login', param, {
        emulateJSON: true
      }).then((data) => {
				this.showTip = true;
				if (data.data.errcode == 0) {
					this.type = 'success';
					this.tipMsg = '登陆成功';
					location.href = '../index.html';
				} else {
					this.type = 'danger';
					this.tipMsg = data.data.msg;
					// alert(data.data.msg);
				}
      });
		}
	},
	components: {
		modal, alert
	}
}
</script>

<style lang="less">
.login-wrapper {
	position: absolute;
	left: 50%;
	top: 30%;
	transform: translate(-50%, 0);
	min-width: 30%;
	padding: 10px;
	border: 1px solid #ccc;
	.item-wrapper {
		margin: 10px auto;
	}
}
</style>
