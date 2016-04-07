<template>
	<div>
		<div class="center">
			<div class="input-wrap">
				<input class="input" type="tel" v-model="account" placeholder="请输入账号">
			</div>
			<div class="input-wrap">
				<input class="input" type="password" v-model="password"
               placeholder="请输入登录密码" maxlength="16">
			</div>
			<button class="login" @click="login">登录</button>
		</div>
	</div>
</template>
<script>
export default {
	el: '#app',
	data: {
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
				if (data.data.errcode == 0) {
					location.href = '../index.html';
				} else {
					alert(data.data.msg);
				}
      });
		}
	}
}
</script>

<style lang="less">

</style>
