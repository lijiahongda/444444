<template>
	<div class="gropAdd" v-loading="loading">
		<el-dialog width="800px" title="选择优惠券" :visible.sync="dialogTableVisible">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择优惠券">
					<el-input v-model="searchVal" placeholder="选择优惠券名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getTabCoupons(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul v-if="btn_type == 'new'">
					<li @click="choseId_new(item,keyValue)" v-for="(item,index) in list" :key="index">
						<div class="section-p">
							<p v-text="item.goods_name"></p>
							<div>
								<span>名称：{{item.name}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
				<ul v-if="btn_type == 'old'">
					<li @click="choseId_old(item,keyValue)" v-for="(item,index) in list" :key="index">
						<div class="section-p">
							<p v-text="item.goods_name"></p>
							<div>
								<span>名称：{{item.name}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
				<ul v-if="btn_type == 'share'">
					<li @click="choseId_share(item,keyValue)" v-for="(item,index) in list" :key="index">
						<div class="section-p">
							<p v-text="item.goods_name"></p>
							<div>
								<span>名称：{{item.name}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
			</div>
			<el-pagination small @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
			</el-pagination>

		</el-dialog>
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="专题名称" class="background_color">
				<el-input v-model="form.share_title" placeholder="请输入专题名称"></el-input>
			</el-form-item>
			<el-form-item label="专题描述" class="background_color">
				<el-input v-model="form.share_intro" placeholder="请输入专题描述"></el-input>
			</el-form-item>
			<el-form-item label="分享图" prop="share_img">
				<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload"
					:show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
					<img v-if="form.share_img" :src="form.share_img" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span>尺寸:750*770,300kb以内</span>
			</el-form-item>
			<el-form-item label="海报" prop="poster">
				<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload"
					:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload1">
					<img v-if="form.poster" :src="form.poster" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span>尺寸:750*770,300kb以内</span>
			</el-form-item>
			<el-form-item label="小程序海报" prop="program_poster">
				<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload"
					:show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload1">
					<img v-if="form.program_poster" :src="form.program_poster" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span>尺寸:750*770,300kb以内</span>
			</el-form-item>
			<el-form-item label="模板" class="background_color">
			</el-form-item>
			<div class="dbox">
				<el-form-item v-for="(item,index) in form.coupon_info" :key="index" :label="''" style="margin-left:0"
					prop="goods_id" class="list_border">
					<div class="juan_box">
						<div v-if="form.coupon_info.length !=0" class="commodity fx_li">
							<ul>
								<li style="border:none">
									<div class="section-p" style="width:400px">
										<span v-if="form.coupon_info.new_name != 0">名称:</span><span
											v-text="item.new_name"></span>
									</div>
								</li>
							</ul>
						</div>
						<div class="fx_li">
							<el-button type="primary" @click="selecShop('new',index)" plain class="new_select_shop">
								选择新用户优惠券</el-button>
						</div>
					</div>
					<div class="juan_box">
						<div v-if="list.length !=0" class="commodity fx_li">
							<ul>
								<li>
									<div class="section-p" style="width:400px">
										<span v-if="form.coupon_info.old_name != 0">名称:</span><span
											v-text="item.old_name"></span>
									</div>
								</li>
							</ul>
						</div>
						<div class="fx_li">
							<el-button type="primary" @click="selecShop('old',index)" plain class="new_select_shop">
								选择老用户优惠券</el-button>
						</div>
					</div>
					<div class="juan_box">
						<div v-if="list.length !=0" class="commodity fx_li">
							<ul>
								<li>
									<div class="section-p" style="width:400px">
										<span v-if="form.coupon_info.share_name != 0">名称:</span><span
											v-text="item.share_name"></span>
									</div>
								</li>
							</ul>
						</div>
						<div class="fx_li">
							<el-button type="primary" @click="selecShop('share',index)" plain class="new_select_shop">
								选择分享者优惠券</el-button>
						</div>
					</div>
					<div class="del_item">
						排序（排序数字越大越靠前）
						<el-input v-model="item.sort" placeholder="排序数字越大越靠前" type="number"
							style="display: inline-block;width: 166px;"></el-input>
						<el-input style="display:none" v-model="item.id" placeholder="排序数字越大越靠前" type="number">
						</el-input>
						<el-input style="display:none" v-model="item.acs_id" placeholder="排序数字越大越靠前" type="number">
						</el-input>
						<el-button type="danger" plain @click='delItem(item,form.coupon_info,index)'>删除</el-button>
					</div>
				</el-form-item>
				<div class="add_item">
					<el-button type="success" plain @click='addItem(form.coupon_info)'>添加</el-button>
				</div>
			</div>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">保存数据</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import _ from 'lodash'
	import waves from '@/directive/waves' // 水波纹指令
	import uploadImg from '../../public/uploadImg'
	import {
		getCoupons,
		addshareCoupon,
		upshareCoupon,
		getCouponShares,
		deleteCouponShares
	} from '@/api/shops'
	const isInArray = (single, arr) => {
		return (arr.findIndex(res => {
			return res === single
		})) >= 0
	}
	export default {
		directives: {
			waves
		},
		components: {
			uploadImg
		},
		data() {
			// "product_id": "",
			// "goods_img": ""
			return {
				id: 0,
				tem_type: "",
				btn_type: '', //判断是那个优惠卷
				total: 1,
				dialogTableVisible: false,
				form: {
					id: 0,
					share_title: '', //分享标题
					share_intro: '', //分享描述
					share_img: '', //分享图片
					poster: '', //海报
					program_poster: '', //小程序图片
					coupon_info: [{
							id: 0,
							acs_id: 0,
							new_c_id: '',
							new_name: '',
							old_c_id: '',
							old_name: '',
							share_c_id: '',
							share_name: '',
							sort: 1 //排序
						}

					]
				},
				keyValue: '',
				loading: false,
				dialogVisible: false,
				dialogImageUrl: '',
				color: '',
				searchVal: '',
				list: [],
				stock: '',
				pic: "",
				banner_img: "", //一级banner临时存放
				moudleList: [{
					isRelonly: false,
					name: "模板1",
					id: 0,
				}]
			}
		},
		mounted() {
			this.getTabCoupons(1)
			if (this.$route.query.id) {
				this.loading = true;
				this.id = this.$route.query.id;
				this.getList(this.$route.query.id)
			}

		},
		methods: {
			selecShop(p, key) {
				this.keyValue = key
				if (p == 'new') {
					this.btn_type = 'new'
				}
				if (p == 'old') {
					this.btn_type = 'old'
				}
				if (p == 'share') {
					this.btn_type = 'share'
				}
				console.log(this.btn_type)
				this.dialogTableVisible = true;
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
						if (item.id) {
							deleteCouponShares({
								id: item.id
							}).then(res => {
								if (res.data.code == 200) {
									this.$message({
										type: "success",
										message: "删除成功"
									})
									dataList.splice(idx, 1)
								} else {
									this.$message.error(res.data.msg || "网络开小差了~")
								}
							})
						} else {
							dataList.splice(idx, 1)
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						}
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//添加产品
			addItem(dataList) {
				let opt = {
					id: Number(0),
					acs_id: Number(this.id),
					new_c_id: '',
					new_name: '',
					old_c_id: '',
					old_name: '',
					share_c_id: '',
					share_name: '',
					sort: 1 //排序
				}
				console.log(opt.id)
				dataList.push(opt)
			},

			// 回显
			getList(cid) {
				let _this = this;
				var obj = {
					id: cid
				}
				getCouponShares(obj).then((res) => {
					if (res.data.code == 200) {
						this.loading = false;
						_this.form = res.data.data
					}
				}).catch((error) => {
					console.log(error, 'error')
				})
			},
			onSubmit() {
				console.log(this.form, '保存数据')
				// return
				var self = this
				if (self.form.share_title == '') {
					self.$message({
						type: "error",
						message: '请输入分享标题'
					})
					return false;
				}
				if (self.form.share_intro == '') {
					self.$message({
						type: "error",
						message: '请输入分享描述'
					})
					return false;
				}
				if (self.form.share_img == '') {
					self.$message({
						type: "error",
						message: '请选择分享封面'
					})
					return false;
				}
				if (self.form.poster == '') {
					self.$message({
						type: "error",
						message: '请选择海报'
					})
					return false;
				}
				if (self.form.program_poster == '') {
					self.$message({
						type: "error",
						message: '请选择小程序海报'
					})
					return false;
				}
				if (self.form.share_title == '') {
					self.$message({
						type: "error",
						message: '请输入专题名称'
					})
					return false;
				}
				if (self.form.coupon_info[0].new_c_id == '' || self.form.coupon_info[0].old_c_id == '' || self.form
					.coupon_info[0].share_c_id == '') {
					self.$message({
						type: "error",
						message: '请输入优惠券'
					})
					return false;
				}

				if (this.$route.query.id) {
					var data = _.clone(this.form)
					data.id = this.$route.query.id;
					upshareCoupon(data).then(res => {
						if (res.data.code == 200) {
							self.$message({
								message: '修改成功',
								type: 'success',
							})
							self.$router.push('/operate/shareCoupons')
						} else {
							self.$message({
								message: res.data.msg || '修改失败',
								type: 'error',
							})
						}

					})
				} else {
					var data = _.clone(this.form)
					addshareCoupon(data).then(res => {
						if (res.data.code == 200) {
							self.$message({
								message: '添加成功',
								type: 'success',
							})
							self.$router.push('/operate/shareCoupons')
						} else {
							self.$message({
								message: res.data.msg || '添加失败',
								type: 'error',
							})
						}
					})
				}
			},

			// 选择商品
			choseId_new(item, keyValue) {
				if (this.form.coupon_info.length == 0) {
					this.form.coupon_info[keyValue].new_name = item.name;
					this.form.coupon_info[keyValue].new_c_id = item.id;
					console.log(item.name + '---')
				} else {
					var isArr = [];
					this.form.coupon_info.forEach((json, index) => {
						isArr.push(json.new_c_id)
						console.log(json)
					})
					console.log(item.id)
					if (isInArray(item.id, isArr)) {
						this.$message({
							type: 'info',
							message: '不能选择相同产品'
						})
						console.log('相同')
					} else {
						console.log('大大')
						this.form.coupon_info[keyValue].new_name = item.name;
						this.form.coupon_info[keyValue].new_c_id = item.id;
					}
				}
				this.dialogTableVisible = false
			},
			choseId_old(item, keyValue) {
				if (this.form.coupon_info.length == 0) {
					this.form.coupon_info[keyValue].old_name = item.name;
					this.form.coupon_info[keyValue].old_c_id = item.id;
					console.log(item.name + '---')
				} else {
					var isArr = [];
					this.form.coupon_info.forEach((json, index) => {
						isArr.push(json.old_c_id)
						console.log(json)
					})
					console.log(item.id)
					if (isInArray(item.id, isArr)) {
						this.$message({
							type: 'info',
							message: '不能选择相同产品'
						})
						console.log('相同')
					} else {
						console.log('大大')
						this.form.coupon_info[keyValue].old_name = item.name;
						this.form.coupon_info[keyValue].old_c_id = item.id;
					}
				}
				this.dialogTableVisible = false
			},
			choseId_share(item, keyValue) {
				if (this.form.coupon_info.length == 0) {
					this.form.coupon_info[keyValue].share_name = item.name;
					this.form.coupon_info[keyValue].share_c_id = item.id;
					console.log(item.name + '---')
				} else {
					var isArr = [];
					this.form.coupon_info.forEach((json, index) => {
						isArr.push(json.share_c_id)
						console.log(json)
					})
					console.log(item.id)
					if (isInArray(item.id, isArr)) {
						this.$message({
							type: 'info',
							message: '不能选择相同产品'
						})
						console.log('相同')
					} else {
						console.log('大大')
						this.form.coupon_info[keyValue].share_name = item.name;
						this.form.coupon_info[keyValue].share_c_id = item.id;
					}
				}
				this.dialogTableVisible = false
			},


			handleCurrentChange(val) {
				console.log(val)
				this.getTabCoupons(val)
			},
			getTabCoupons(page) {
				let _this = this;
				let data = {
					page: page
				}
				if (this.searchVal) {
					data['keyword'] = this.searchVal
				}

				getCoupons(data).then((res) => {
					if (res.data.code == 200) {
						_this.list = res.data.data
						_this.total = res.data.count
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt = file.size / 1024 < 100;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt) {
					this.$message.error('上传头像图片大小不能超过 100K!');
				}
				return isJPG && isLt;
			},
			beforeAvatarUpload1(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt = file.size / 1024 < 300;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt) {
					this.$message.error('上传头像图片大小不能超过 300K!');
				}
				return isJPG && isLt;
			},
			handlePictureCardPreview(file, fileList) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleOnExceed(file, fileList) {
				this.$message({
					type: "error",
					message: "最多上传两张图片"
				})
			},
			handleAvatarSuccess(res, file) {
				console.log(file.response.url, '海报')
				this.form.poster = file.response.url;
			},
			handleAvatarSuccess1(res, file) {
				console.log(file.response.url, '分享')
				this.form.share_img = file.response.url;
			},
			handleAvatarSuccess2(res, file) {
				console.log(file.response.url, '小程序')
				this.form.program_poster = file.response.url;
			},
		}
	}

</script>
<style scoped="scoped" lang="scss">
	.el-form-item__content span {
		clear: both
	}

	.list_border {
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 20px 0;
		width: 800px;
		min-height: 220px;

		/deep/ .el-form-item__label {
			color: #409EFF
		}
	}

	.list_info {
		overflow: hidden;
		margin-bottom: 20px;
	}

	.pic {
		float: left;

		.tit_p {
			margin: 0;
			color: #f00
		}

	}

	.input_list {
		float: left;
		width: 220px;
		margin-left: 20px;
		margin-top: 26px;

		.el-input--medium {
			margin-top: 10px
		}
	}

	/deep/ .avatar-uploader {
		float: left;
		height: 96px;
		border-radius: 5px;
		margin-left: 10px;
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

	/deep/ .el-upload-list--picture-card .el-upload-list__item {
		width: 88px;
		height: 88px;
	}

	/deep/ .el-upload--picture-card {
		display: inline-block;
		width: 88px;
		height: 88px;
		line-height: 90px;
	}

	.avatar {
		width: 88px;
		height: 88px;
		display: block;
	}

	.ipt_list input {
		width: 125px;
		padding-left: 5px;
		border-radius: 5px;
		margin-right: 10px;
		border: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
		margin-top: 7px
	}

	.gropAdd {
		margin: 20px;
		box-sizing: border-box;
		padding: 20px;
	}

	.input-common {
		width: 450px;
		display: flex;
		justify-content: space-between;

		.input-name {
			width: 250px;
		}

		;

		.s1 {
			margin-bottom: 5px;
			overflow: hidden;

			.s2 {
				margin-right: 5px;
				display: inline-block;
			}
		}

		.input-div {
			color: #999;
			padding-left: 5px;
			width: 200px;
		}
	}

	.bargain_mode {
		display: block;
		overflow: hidden;

	}

	ul,
	li {
		padding: 0;
		margin: 0;
		list-style: none
	}

	.commodity {
		li {
			overflow: hidden;
			box-sizing: border-box;
			padding-top: 10px;
			margin-bottom: 5px;
		}

		li.selectName {
			padding-top: 10px;
			width: 670px;
			margin: 15px 0;
			background: #f1f1f1;
		}

		li.small_bg.selectName {
			width: 480px
		}

		.imgDiv {
			float: left;
			background: #fff;
			width: 70px;
			height: 70px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.section-p {
			width: 500px;
			padding-left: 10px;
			box-sizing: border-box;
			float: left;

			span {
				line-height: 16px;
				display: inline-block;
				margin-right: 20px;
			}
		}

		.select-btn {
			float: right;
		}
	}

	/deep/ .del_item .el-button--danger.is-plain {
		padding: 0;
		width: 80px;
		height: 35px;
	}

	.background_color {
		position: relative;
		width: 405px;
	}

	.fx_li {
		float: left;
	}

	.background_color .el-input__inner {
		width: auto;
	}

	.color_name {
		position: absolute;
		right: 0;
		top: 0;
	}

	.is_relonly {
		color: #409EFF;
		border-color: #c6e2ff;
		background-color: #ecf5ff;
	}

	.del_moudle {
		position: absolute;
		top: 35px;
		right: 20px
	}

	.new_select_shop {
		position: absolute;
		right: 20px;
		bottom: 15px;
	}

	.old_select_shop {
		position: absolute;
		right: 20px
	}

	.share_select_shop {
		position: absolute;
		right: 20px
	}

	.juan_box {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: row;
		overflow: hidden;
		min-height: 75px;
		position: relative;
		border-bottom: 1px solid #ccc;
	}

	.dbox {
		position: relative;
	}

	.add_item {
		position: absolute;
		left: 850px;
		bottom: 100px;
	}

	.del_item {
		margin-top: 10px;
	}

</style>
