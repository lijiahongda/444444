<template>
	<div class="login-container" v-loading="loading">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
			<div class="title-container">
				<h3 class="title">{{ $t('login.title') }}</h3>
				<!-- <lang-select class="set-language"/> -->
			</div>
			<el-form-item prop="adminUserName">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input v-model="loginForm.adminUserName" :placeholder="$t('login.adminUserName')" name="adminUserName" type="text"
				 auto-complete="on" />
			</el-form-item>

			<el-form-item prop="pwd">
				<span class="svg-container">
					<svg-icon icon-class="password" />
				</span>
				<el-input :type="passwordType" v-model="loginForm.pwd" :placeholder="$t('login.pwd')" name="pwd"
				 auto-complete="on" @keyup.enter.native="handleLogin" />
				<span class="show-pwd" @click="showPwd">
					<svg-icon icon-class="eye" />
				</span>
			</el-form-item>

			<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
		</el-form>

		<el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
			{{ $t('login.thirdpartyTips') }}
			<br>
			<br>
			<br>
			<social-sign />
		</el-dialog>
	</div>
</template>

<script>
	import {
		isvalidUsername
	} from '@/utils/validate'
	import store from '@/store'
	import LangSelect from '@/components/LangSelect'
	import SocialSign from './socialsignin'
	import md5 from 'js-md5'
	import _ from 'lodash'
	export default {
		name: 'Login',
		components: {
			LangSelect,
			SocialSign
		},
		data() {
			const validateUsername = (rule, value, callback) => {
				// if (value.length == 11) {
					callback()
				// } else {
				// 	callback(new Error('请输入正确的用户名'))
				// }
			}
			const validatePassword = (rule, value, callback) => {
				if (value.length < 6) {
					callback(new Error('密码不能少于6位'))
				} else {
					callback()
				}
			}
			return {
				loginForm: {
					adminUserName: '',
					pwd: ''
				},
				loginRules: {
					adminUserName: [{
						required: true,
						trigger: 'blur',
						validator: validateUsername
					}],
					pwd: [{
						required: true,
						trigger: 'blur',
						validator: validatePassword
					}]
				},
				passwordType: 'password',
				loading: false,
				showDialog: false,
				redirect: undefined,
			}
		},
		watch: {
			$route: {
				handler: function(route) {
					this.redirect = route.query && route.query.redirect
				},
				immediate: true
			}
		},
		computed: {
			name() {
				return store.getters.name
			}
		},
		mounted () {
			console.log(1111)
			// this.loading = true
			// this.loading=true
			// let userInfo = decodeURIComponent(this.GetUrlParam('userInfo'));
			// console.log(userInfo,"====")
			// localStorage.setItem('userInfo',userInfo.userInfo)
			// localStorage.setItem('token',this.GetUrlParam('token'))
			// console.log(userInfo,"===userInfo=")
			// if(typeof(userInfo) == "string" && userInfo !== undefined){
			// 	this.loginForm.adminUserName = JSON.parse(userInfo).username
			// 	this.loginForm.pwd = JSON.parse(userInfo).password
			// 	this.handleLogin();
			// 	this.loading=false
			// }

			// localStorage.setItem('mobile',this.GetUrlParam('mobile'))
			// localStorage.setItem('username',this.GetUrlParam('username'))

			// console.log( this.GetUrlParam('token'))
			// console.log( this.GetUrlParam('mobile'))
			// console.log( this.GetUrlParam('username'))
		},
		methods: {
			// 获取网址
			 GetUrlParam(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = encodeURI(window.location.search).substr(1).match(reg);
				if (r != null) return decodeURI(unescape(r[2]));
				return null;
			},
			showPwd() {
				if (this.passwordType === 'password') {
					this.passwordType = ''
				} else {
					this.passwordType = 'password'
				}
			},
			handleLogin() {

				// var obj = _.clone(this.loginForm)
				// 	obj.pwd = md5(obj.pwd)
				// 	this.$store.dispatch('LoginByUsername', obj).then((res) => {
				// 		this.loading = false
				// 		this.$router.push({
				// 			path: this.redirect || '/'
				// 		})
				// 		location.reload();
				// 	}).catch((err) => {
				// 		this.loading = false;
				// 		this.$message({
				// 			type:"error",
				// 			message:err.data.msg || '用户信息有误'
				// 		})
				// 	})

				// console.log(this.loginForm)
				this.$refs.loginForm.validate(valid => {
					console.log(valid)
					// return
					if (valid) {
						var obj = _.clone(this.loginForm)
						obj.pwd = md5(obj.pwd)
						this.$store.dispatch('LoginByUsername', obj).then((res) => {
							this.loading = false
							this.$router.push({
								path: this.redirect || '/'
							})
							location.reload();
						}).catch((err) => {
							this.loading = false;
							this.$message({
								type:"error",
								message:err.data.msg || '用户信息有误'
							})
						})
					} else {
						return false
					}
				})
			},
			afterQRScan() {
				// const hash = window.location.hash.slice(1)
				// const hashObj = getQueryObject(hash)
				// const originUrl = window.location.origin
				// history.replaceState({}, '', originUrl)
				// const codeMap = {
				//   wechat: 'code',
				//   tencent: 'code'
				// }
				// const codeName = hashObj[codeMap[this.auth_type]]
				// if (!codeName) {
				//   alert('第三方登录失败')
				// } else {
				//   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
				//     this.$router.push({ path: '/' })
				//   })
				// }
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	/* 修复input 背景不协调 和光标变色 */
	/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

	$bg:#283443;
	$light_gray:#eee;
	$cursor: #fff;

	@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
		.login-container .el-input input {
			color: $cursor;

			&::first-line {
				color: $light_gray;
			}
		}
	}

	/* reset element-ui css */
	.login-container {
		.el-input {
			display: inline-block;
			height: 47px;
			width: 85%;

			input {
				background: transparent;
				border: 0px;
				-webkit-appearance: none;
				border-radius: 0px;
				padding: 12px 5px 12px 15px;
				color: $light_gray;
				height: 47px;
				caret-color: $cursor;

				&:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
					-webkit-text-fill-color: $cursor !important;
				}
			}
		}

		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
		}
	}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
	$bg:#2d3a4b;
	$dark_gray:#889aa4;
	$light_gray:#eee;

	.login-container {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: $bg;

		.login-form {
			position: absolute;
			left: 0;
			right: 0;
			width: 520px;
			max-width: 100%;
			padding: 35px 35px 15px 35px;
			margin: 120px auto;
		}

		.tips {
			font-size: 14px;
			color: #fff;
			margin-bottom: 10px;

			span {
				&:first-of-type {
					margin-right: 16px;
				}
			}
		}

		.svg-container {
			padding: 6px 5px 6px 15px;
			color: $dark_gray;
			vertical-align: middle;
			width: 30px;
			display: inline-block;
		}

		.title-container {
			position: relative;

			.title {
				font-size: 26px;
				color: $light_gray;
				margin: 0px auto 40px auto;
				text-align: center;
				font-weight: bold;
			}

			.set-language {
				color: #fff;
				position: absolute;
				top: 5px;
				right: 0px;
			}
		}

		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
			user-select: none;
		}

		.thirdparty-button {
			position: absolute;
			right: 35px;
			bottom: 28px;
		}
	}
</style>
