<template>
	<div class="app-container" v-loading="loading">
		<el-form label-width="100px" :model="form" :rules="rules" ref="form">

			<el-form-item label="类型" prop="version_type">
				<el-radio v-model="form.version_type" :label="1">ios</el-radio>
				<el-radio v-model="form.version_type" :label="2">Android</el-radio>
			</el-form-item>
			<el-form-item label="版本号" prop="version">
				<el-input size="mini" v-model="form.version" placeholder="请输入版本号" maxlength="20" show-word-limit>
				</el-input>
			</el-form-item>
			<el-form-item label="模块" prop="modular">
				<el-radio v-model="form.modular" @change="changeRadio" :label="1">商城</el-radio>
				<el-radio v-model="form.modular" @change="changeRadio" :label="2">酒店</el-radio>
				<el-radio v-model="form.modular" @change="changeRadio" :label="3">三方</el-radio>
				<el-radio v-model="form.modular" @change="changeRadio" :label="4">个人中心</el-radio>
				<el-radio v-model="form.modular" @change="changeRadio" :label="5">主页</el-radio>
			</el-form-item>
			<div class="warp_cont">
				<div class="cont" v-for="(item,index) in form.modular_info" :key="index">
					<el-form-item label="子版本" prop="version_log">
						<el-input size="mini" v-model="item.version_log" placeholder="请输入版本号" maxlength="20"
							show-word-limit>
						</el-input>
					</el-form-item>
					<el-form-item label="上传文件" prop="url">
						<!-- <el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/uploadFile"
							list-type="picture-card" :on-success="(res) => handleAvatarSuccess(res,index)"
							:on-remove="handleRemoveImg" :before-upload="beforeAvatarUpload" :on-exceed="handleExceed"
							:limit="1">
							<img v-if="item.fileList" height="150" :src="item.fileList" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip" class="el-upload__tip">建议尺寸750*560px或4:3,JPG、PNG格式图片小于5M</div>
						</el-upload> -->
						<el-upload class="upload-demo" action="https://api2.yuelvhui.com/app/third/uploadFile"
							:on-remove="handleRemoveImg" :before-upload="beforeAvatarUpload" :on-success="(res) =>
							handleAvatarSuccess(res,index)" :limit="1">
							<a v-if="item.url" :href="item.url">查看已上传文件</a>
							<el-button v-else size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传rar/zip文件，且不超过500kb</div>
						</el-upload>
						<el-button type="danger" plain @click='delItem(item,form.modular_info,index)'>删除</el-button>
					</el-form-item>
				</div>
				<div class="add_item">
					<el-button type="success" plain @click='addItem(form.modular_info)'>添加</el-button>
				</div>
			</div>

			<el-button type="primary" @click="onSubmit('form')">保存数据</el-button>
			<router-link :to="{path:'/tools/version'}">
				<el-button type='primary'>返回列表</el-button>
			</router-link>
		</el-form>
	</div>
</template>

<script>
	import {
		getversionetail,
		addversion,
		updateversion
	} from '@/api/shops' // 接口


	const isInArray = (single, arr) => {
		return (arr.findIndex(res => {
			return res === single
		})) >= 0
	}
	export default {
		name: 'liveVideoAdd',
		data() {
			return {
				form: {
					modular: 1,
					version_type: 1,
					modular_info: [{
						version_log: '',
						url: ''
					}],
				},
				loading: false,
				total: 0,
				currentPage: 1,
				list: [],
				disableds: false,
				fileList: '',
				rules: {

					version_type: [{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}],
					version: [{
						required: true,
						message: '请输入版本号',
						trigger: 'blur'
					}],
					modular: [{
						required: true,
						message: '请选择模块',
						trigger: 'change'
					}],
					// version_log: [{
					// 	required: true,
					// 	message: '请输入子版本号',
					// 	trigger: 'blur'
					// }],
					// url: [{
					// 	required: true,
					// 	message: '请上传文件',
					// 	trigger: 'blur'
					// }],

				}
			}
		},
		mounted() {
			console.log(this.form, this.modular_info)
			if (this.$route.query.id) {
				this.getversionetail()
				this.disableds = true
			} else {
				this.loading = false
			}

		},
		methods: {
			addItem(dataList) {
				console.log(dataList, '000')
				let opt = {
					version_log: '',
					url: '',
				}
				dataList.push(opt)
				this.$forceUpdate()
				console.log(dataList, '2222')
			},
			getversionetail() {
				this.loading = true
				getversionetail({
					id: this.$route.query.id
				}).then(res => {
					if (res.data.code == 200) {
						this.loading = false
						this.form = res.data.data
						this.form.modular_info = res.data.data.modular_info
						// this.videoFileList = []
						// this.videoFileList.push({
						// 	name: '视频文件',
						// 	url: res.data.data.url
						// })
						// this.fileList = res.data.data.url
						// if (res.data.data.act_imgs) {

						// 	res.data.data.act_imgs.map(item => {
						// 		this.fileList_imgs.push({
						// 			url: item
						// 		})
						// 	})
						// }
					} else {
						this.$message.error(res.data.msg)
						this.loading = false
					}
				})
			},
			// 删除产品
			delItem(item, dataList, idx) {
				this.$confirm('此操作将直接删除该产品无需保存, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (dataList.length == 1) {
						this.$message.error("最少保留一个商品")
					} else {
						dataList.splice(idx, 1)
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.$forceUpdate()
						// if (item.id) {
						// 	deleteCouponShares({
						// 		id: item.id
						// 	}).then(res => {
						// 		if (res.data.code == 200) {
						// 			this.$message({
						// 				type: "success",
						// 				message: "删除成功"
						// 			})
						// 			dataList.splice(idx, 1)
						// 		} else {
						// 			this.$message.error(res.data.msg || "网络开小差了~")
						// 		}
						// 	})
						// } else {
						// 	dataList.splice(idx, 1)
						// 	this.$message({
						// 		type: 'success',
						// 		message: '删除成功!'
						// 	});
						// }
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},


			closeDialog() {
				this.showDialog = false
				this.$refs['videoReview'].pause()
			},

			beforeAvatarUpload(file) {
				console.log(file.type)
				this.loading = true
				const isfile = file.type === 'application/zip' || file.type === 'application/rar'
				// const isLt5M = file.size / 1024 / 1024 < 5
				// if (!isLt5M) {
				// 	this.$message.error('上传图片大小不能超过 5MB!')
				// }
				if (!isfile) {
					this.$message.error('检查文件格式是否正确!')
				}
				this.loading = false
				return isfile
				// return isImg && isLt5M
			},
			handleAvatarSuccess(res, index) {
				console.log(res, index, 'touxian')
				this.loading = false
				if (res.code === 200) {
					this.form.modular_info[index].url = res.url
				} else {
					this.form.modular_info[index].url = ''
					this.fileList = []
				}
			},
			handleRemove(file, fileList) {
				this.videoFileList = []
				console.log(file, fileList)
			},
			handleRemoveImg(file, idx) {
				// console.log(file)
				// let index = this.form.modular_info[idx] == file.url
				// if (index >= 0) {
				// 	this.form.modular_info[idx].splice(index, 1)
				// }
			},
			onSubmit(formName) {
				console.log(this.form)
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.$route.query.id) {
							this.form.id = this.$route.query.id;
							updateversion(this.form).then(res => {
								if (res.data.code == 200) {
									this.loading = false
									this.$message.success('操作成功')
									// this.getversionetail()

									this.$router.push('/tools/version')
								} else {
									this.$message.error(res.data.msg)
									this.loading = false
								}
							})
						} else {
							addversion(this.form).then(res => {
								if (res.data.code == 200) {
									this.loading = false
									this.$message.success('操作成功')
									this.$router.push('/tools/version')
									// this.getversionetail()
								} else {
									this.$message.error(res.data.msg)
									this.loading = false
								}
							})
						}

					} else {
						console.log('error submit!!');
						return false;
					}
				});



			},
			changeRadio() {
				if (!this.$route.query.id) {
					console.log(this.form.modular_info, '0000')
					let opt = {
						version_log: '',
						url: ''
					}
					this.form.modular_info = []
					this.form.modular_info.push(opt)
				}
			}
		}
	}

</script>

<style scoped lang="scss">
	.commodity {
		li {
			overflow: hidden;
			box-sizing: border-box;
			padding-top: 10px;
			border-top: 1px solid #ddd;
			margin-bottom: 5px;
		}

		.imgDiv {
			float: left;
			background: #f1f1f1;
			width: 90px;
			height: 90px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.section-p {
			padding-left: 10px;
			box-sizing: border-box;

			span {
				line-height: 16px;
				display: inline-block;
				margin-right: 20px;
			}
		}

		.select-btn {
			float: right;
		}

		/deep/ .del_item .el-button--danger.is-plain {
			margin-top: 24px;
			border-radius: 100%;
			padding: 0;
			width: 50px;
			height: 50px;
		}
	}

	/*/deep/ .el-input__inner {*/
	/*	width: 400px*/
	/*}*/

	.commodity-items {

		li {
			list-style: none;
			border: 1px solid #ccc;
			padding: 10px;
			border-radius: 8px;
			font-size: 12px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;

			.el-input {
				width: inherit;
			}

			.el-button {
				height: 40px;
			}

		}
	}

	.el-form {
		padding: 20px;

		// width: 615px;
		.el-input {
			width: 500px;
		}
	}

	.price-box {
		border: 1px solid #ccc;
		padding: 20px;
		border-radius: 20px;
		margin: 20px 0;
		display: flex;
		width: 90%;
		flex-wrap: wrap;

		.el-input {
			margin-right: 20px;

			.el-input__inner {
				width: 100px;
			}
		}
	}

	.warp_cont {
		position: relative;
		width: 800px;
		margin-left: 100px;
		margin-bottom: 100px;
	}

	.cont {
		width: 700px;
		border: 1px solid #ccc;
		padding: 20px;
		border-radius: 10px;
		margin-top: 20px;
	}

	.add_item {
		position: absolute;
		right: 0;
		bottom: 100px;
	}

</style>
