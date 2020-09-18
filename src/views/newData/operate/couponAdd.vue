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
				<ul>
					<li @click="choseId(item)" v-for="(item,index) in list" :key="index">
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
				<el-input v-model="form.ac_name" placeholder="请输入专题名称"></el-input>
			</el-form-item>

			<el-form-item label="专题图片" prop="ac_imgs">
				<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
				 :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
					<img v-if="form.ac_imgs" :src="form.ac_imgs" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span>尺寸:750*770,300kb以内</span>
			</el-form-item>
			<el-form-item label="分享标题" class="background_color">
				<el-input v-model="form.share_title" placeholder="请输入分享标题"></el-input>
			</el-form-item>
			<el-form-item label="分享封面" prop="share_img">
				<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload1">
					<img v-if="form.share_img" :src="form.share_img" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span>尺寸:750*770,300kb以内</span>
			</el-form-item>

			<el-form-item label="背景颜色" class="background_color">
				<el-input readonly maxlength="8" v-model="form.ac_color" placeholder="请选择背景颜色"></el-input>
				<el-color-picker v-model="color" @change="colorChange" class="color_name"></el-color-picker>
			</el-form-item>
			<el-form-item label="模板" class="background_color" style="width: 530px;">
			</el-form-item>
			<el-form-item :label="''" prop="goods_id" class="list_border">

				<el-button type="primary" @click="selecShop" plain class="select_shop">选择优惠券</el-button>
				<div v-if="list.length !=0" class="commodity">
					<ul>
						<li style="border:none" v-for="(item,index) in form.coupon_info" :class="list.tem_type == 0?'selectName':'selectName small_bg'">
							<uploadImg :limit="1" :imgList="item.goods_img" @successList="successList0" @otherList="otherList0(idx,index)"
							 v-if="list.tem_type == 0"></uploadImg>
							<div style="margin-left: 10px;">
							<span style="margin-top:10px;margin-right: 10px;">排序:</span>
							<input v-model="item.ace_sort" type="number" placeholder="排序数字越大越靠前" style="display: inline-block;width: 166px;height: 36px;line-height: 36px;border-radius: 4px;border: 1px solid #ccc;padding-left: 10px;"/>
							</div>
							<div class="section-p" style="width:400px">
								<span v-if="list.tem_type != 0">名称:</span><span v-text="item.c_name"></span>
							</div>
							<div class="del_item">
								<el-button type="danger" plain @click='delItem(item,form.coupon_info,index)'>删除</el-button>
							</div>
						</li>
					</ul>
				</div>
			</el-form-item>
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
		getActivitiesCoupon,
		addActivitiesCoupon,
		updateActivitiesCoupon,
		deleteCoupons
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
				tem_type: "",
				total: 1,
				dialogTableVisible: false,
				form: {
					share_title: '', //分享标题
					share_img: '', //分享图片
					ac_imgs:'',
					coupon_info:[],
				},
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
					}
				]
			}
		},
		mounted() {
			this.getTabCoupons(1)
			if (this.$route.query.id) {
				this.loading = true;
				this.getList(this.$route.query.id)
			}

		},
		methods: {
			// 颜色值
			colorChange(val) {
				this.form.ac_color = val
			},


			selecShop() {
				this.dialogTableVisible = true;
			},


			// 删除产品
			delItem(item,dataList,idx) {
				this.$confirm('此操作将直接删除该产品无需保存, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
						if (item.id) {
							deleteCoupons({
								id: item.id
							}).then(res => {
								if (res.data.code == 200) {
									this.$message({
										type: "success",
										message: "删除成功"
									})
									dataList.splice(idx,1)
								} else {
									this.$message.error(res.data.msg || "网络开小差了~")
								}
							})
						} else {
							dataList.splice(idx,1)
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						}

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},

			// 回显
			getList(cid) {
				let _this = this;
				var obj = '?id=' + cid
				getActivitiesCoupon(obj).then((res) => {
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
				if (self.form.share_img == '') {
					self.$message({
						type: "error",
						message: '请选择分享封面'
					})
					return false;
				}
				if (self.form.ac_name == '') {
					self.$message({
						type: "error",
						message: '请输入专题名称'
					})
					return false;
				}

				if (self.form.ac_color == '') {
					self.$message({
						type: "error",
						message: '请输入背景颜色'
					})
					return false;
				}

				if (this.$route.query.id) {
					var data = _.clone(this.form)
					data.id = this.$route.query.id;
					updateActivitiesCoupon(data).then(res => {
						if (res.data.code == 200) {
							self.$message({
								message: '修改成功',
								type: 'success',
							})
							self.$router.push('/operate/coupon')
						} else {
							self.$message({
								message: res.data.msg || '修改失败',
								type: 'error',
							})
						}

					})
				} else {
					var data = _.clone(this.form)
					addActivitiesCoupon(data).then(res => {
						if (res.data.code == 200) {
							self.$message({
								message: '添加成功',
								type: 'success',
							})
							self.$router.push('/operate/coupon')
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
			choseId(item) {
				var couponsInfo = this.form.coupon_info;
				var obj = {
					c_name: '',
					c_id: '',
					ac_id:''
				};
				obj.c_name = item.name;
				obj.c_id = item.id;
				obj.ac_id = this.form.id;

				var isArr = []
				console.log(couponsInfo)
				couponsInfo.map((json) => {
					isArr.push(json.c_id)
				})

				console.log(item.id,isArr)

				if (isInArray(item.id, isArr)) {
					this.$message({
						type: 'info',
						message: '不能选择相同优惠券'
					})
				}else{
					this.form.coupon_info.push(obj)
					this.dialogTableVisible = false
				}

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
				this.form.share_img = file.response.url;
			},
			handleAvatarSuccess1(res, file) {
				console.log(file.response.url,'======')
				this.form.ac_imgs = file.response.url;
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
		min-height: 156px;

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
			border-top: 1px solid #ddd;
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
		width: 50px;
		height: 25px;
	}

	.background_color {
		position: relative;
		width: 405px;
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

	.select_shop {
		position: absolute;
		top: 80px;
		right: 20px
	}
</style>
