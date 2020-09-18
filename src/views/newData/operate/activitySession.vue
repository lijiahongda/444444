<!--suppress ALL -->
<template>
	<div class="app-container">
		<div class="new_tab">
			<el-form ref="form" :model="info" label-width="150px" class='list_border'>
				<el-form-item label="综合活动名称" class="background_color">
					<el-input v-model="baseInfo.aa_name" placeholder="请输入综合活动名称"></el-input>
				</el-form-item>
				<el-form-item label="选择类型" class="background_color">
					<el-radio v-model="baseInfo.aa_type" :disabled="true" :label="0">默认</el-radio>
					<el-radio v-model="baseInfo.aa_type" :disabled="true" :label="1">首页</el-radio>
					<el-radio v-model="baseInfo.aa_type" :disabled="true" :label="2">广告图</el-radio>
					<el-radio v-model="baseInfo.aa_type" :disabled="true" :label="3">秒杀广告图</el-radio>
					<el-radio v-model="baseInfo.aa_type" :disabled="true" :label="4">二级页面</el-radio>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="upBaseInfo">保存数据</el-button>
					<el-button @click="addTem">添加背景图</el-button>
				</el-form-item>
			</el-form>
			
			<el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
				<el-form label-width="180px">
					<el-form-item label="名称" class="background_color">
						<el-input v-model="form.name" placeholder="请输入名称"></el-input>
					</el-form-item>
					<el-form-item label="背景图">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload"
							:show-file-list="false" :on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="form.backgroundImg" :src="form.backgroundImg" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="模板的宽度" class="background_color">
						<el-input v-model="form.width" placeholder="请输入模板的宽度"></el-input>
					</el-form-item>
					<el-form-item label="模板距离顶部的间隙" class="background_color">
						<el-input v-model="form.marginTop" placeholder="请输入模板距离顶部的间隙"></el-input>
					</el-form-item>
					<el-form-item label="模板距离下面的间隙" class="background_color">
						<el-input v-model="form.marginBottom" placeholder="请输入模板距离下面的间隙"></el-input>
					</el-form-item>
					<el-form-item label="模板内部左间距" class="background_color">
						<el-input v-model="form.paddingLeft" placeholder="请输入模板内部左间距"></el-input>
					</el-form-item>
					<el-form-item label="模板内部右间距" class="background_color">
						<el-input v-model="form.paddingRight" placeholder="请输入模板内部右间距"></el-input>
					</el-form-item>
					<el-form-item label="排序" class="background_color">
						<el-input v-model="form.sort" placeholder="请输入排序"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="addTemBg">确 定</el-button>
				</span>
			</el-dialog>
			<div class="public">
				<div :class="item.deletedAt==0?'item':'delItem'" v-for="item in tems" :key="item.id">
					<img :src="item.backgroundImg" alt="">
					<div class="content">
						<p>名称:{{item.name}}</p>
						<p>模板的宽度:{{item.width}}</p>
						<p>模板距离顶部的间隙:{{item.marginTop}}</p>
						<p>模板距离下面的间隙:{{item.marginBottom}}</p>
						<p>模板内部左间距:{{item.paddingLeft}}</p>
						<p>模板内部右间距:{{item.paddingRight}}</p>
						<p>排序:{{item.sort}}</p>
					</div>
					<div>
						<el-button @click="getTemBg(item.id)">编辑</el-button>
						<span v-if="item.deletedAt==0">
							<el-button type="danger" @click="delTemBg(item.id)">删除</el-button>
						</span>
						<span v-else-if="item.deletedAt!=0">
							<el-button type="primary" @click="recoveryTemBg(item.id)">恢复删除</el-button>
						</span>
						<el-button type="primary" @click="goDeTail(item.id)">模板数据</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {
		addTemBg,
		getTemBgsByActAllId,
		getTemBg,
		upTemBg,
		delTemBg,
		recoveryTemBg,
		getActivityAllList,
		upBaseInfo
	} from '@/api/shops'
	export default {
		directives: {
			waves
		},
		data() {
			return {
				info: {},
				dialogVisible: false,
				form: {

				},
				tems: [],
				baseInfo: [],
				title: ''
			}
		},
		mounted() {
			if (this.$route.query.id) {
				this.getTemBgsByActAllId()
				this.getList()
			}

		},
		methods: {
			getList() {
				var id = this.$route.query.id;
				var obj = {
					id: id,
				}
				getActivityAllList(obj).then(res => {
					if (res.data.code == 200) {
						this.baseInfo = res.data.data.baseInfo;
					}
				})
			},
			getTemBgsByActAllId() {
				getTemBgsByActAllId({
					activityAllId: this.$route.query.id
				}).then(res => {
					if (res.data.code == 200) {
						this.tems = res.data.data;
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			goDeTail(id) {
				this.$router.push({
					path: '/operate/activityAllTemplate',
					query: {
						bgId: id,
						id: this.$route.query.id
					}
				})
			},
			delTemBg(id) {
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delTemBg({
						id: id
					}).then(res => {
						if (res.data.code == 200) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getTemBgsByActAllId()
							this.form = {};
						} else {
							this.$message.error(res.data.msg)
						}
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},

			recoveryTemBg(id) {
				this.$confirm('此操作将永久恢复, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					recoveryTemBg({
						id: id
					}).then(res => {
						if (res.data.code == 200) {
							this.$message({
								type: 'success',
								message: '恢复成功!'
							});
							this.getTemBgsByActAllId()
							this.form = {};
						} else {
							this.$message.error(res.data.msg)
						}
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消恢复'
					});
				});

			},
			
			getTemBg(id) {
				getTemBg({
					id: id
				}).then(res => {
					if (res.data.code == 200) {
						this.title = '编辑背景图'
						this.form = res.data.data;
						this.dialogVisible = true
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			addTem() {
				this.title = '新增背景图'
				this.dialogVisible = true
			},
			addTemBg() {
				let url = this.title == '新增背景图' ? addTemBg : upTemBg;
				this.form.activityAllId = this.$route.query.id;
				url(this.form).then(res => {
					if (res.data.code == 200) {
						this.$message.success(res.data.msg)
						this.getTemBgsByActAllId()
						this.dialogVisible = false
						this.form = {}
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			handleAvatarSuccess(res, file) {
				this.$set(this.form, 'backgroundImg', file.response.url)
			},
			handleClose() {
				this.form = {}
				this.dialogVisible = false;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
				// const isLt = file.size / 1024 < 500;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
				}
				// if (!isLt) {
				// 	this.$message.error('上传头像图片大小不能超过 500K!');
				// }
				// return isJPG && isLt;
				return isJPG;
			},
			//修改基础信息
			upBaseInfo() {
				// console.log(this.baseInfo);
				var obj = this.baseInfo;
				var data = {
					id: obj.id,
					aa_type: obj.aa_type,
					aa_name: obj.aa_name,
				}
				upBaseInfo(data).then(res => {
					if (res.data.code == 200) {
						this.$message.success(res.data.msg || "编辑成功")
						this.getList()
					} else {
						this.$message.error(res.data.msg || "网络开小差了~")
					}
				})
			},
		}

	}

</script>
<style scoped="scoped" lang="scss">
	.goodsName {
		display: block;
	}

	.list_border {
		width: 650px;

		.public {
			width: 400px;
		}
	}

	.radio-list img {
		width: 120px;
		height: 80px;
		display: block;
		margin-top: 20px;
	}

	.radio-list .el-radio {
		width: 120px;
		text-align: center;
	}

	.radio-list {
		margin-bottom: 32px;
	}

	/deep/ .avatar-uploader {
		float: left;
		height: 96px;
		border-radius: 5px;
		margin-left: 10px;
	}

	/deep/ .el-input__inner {
		width: 400px
	}

	.el-form-item__content .avatar-uploader {
		float: none
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 90px;
		height: 90px;
		line-height: 90px;
		text-align: center;
		border: 1px dashed #ccc;
		border-radius: 10px;
	}

	.public {
		display: flex;
		width: 100%;
		flex-wrap: wrap;

		img {
			width: 150px;
			height: 150px;
		}

		.item {
			width: 45%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			border: 1px solid #ccc;
			margin: 20px;
			padding: 20px;
			justify-content: space-between;
			div.content {
				/*flex: 1;*/
			}
		}
		.delItem{
			width: 45%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			border: 1px solid red;
			margin: 20px;
			padding: 20px;
			justify-content: space-between;
			div.content {
				/*flex: 1;*/
			}			
		}
	}


	.el-dialog {
		img {
			width: 100px;
			height: 100px;
		}
	}

</style>
