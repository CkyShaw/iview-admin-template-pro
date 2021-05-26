<style lang="stylus">
@import './login.styl';
</style>

<template>
	<div class="login">
		<div class="login-con">
			<Card icon="log-in" title="欢迎登录" :bordered="false">
				<div class="form-con">
					<login-form @on-success-valid="handleSubmit"></login-form>
					<p class="login-tip">输入任意用户名和密码即可</p>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
import LoginForm from '@c/login-form'
import { mapActions } from 'vuex'
// eslint-disable-next-line vue/require-name-property
export default {
	components: {
		LoginForm
	},
	methods: {
		...mapActions(['handleLogin', 'getUserInfo']),
		handleSubmit({ userName, password }) {
			this.handleLogin({ userName, password }).then(res => {
				this.getUserInfo().then(res => {
					this.$router.push({
						name: this.$_config.homeName
					})
				})
			})
		}
	}
}
</script>

<style></style>
