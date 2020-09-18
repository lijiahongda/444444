<template>
	<div class="gropAdd">
		<el-dialog width="800px" title="选择商品" :visible.sync="dialogTableVisible">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择商品">
					<el-input v-model="searchVal" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getTabGoods(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul>
					<li @click="choseId(item)" v-for="(item,index) in list" :key="index">
						<div class="imgDiv">
							<img :src="item.path" alt="">
						</div>
						<div class="section-p">
							<p v-text="item.goods_name"></p>
							<div>
								<span>官网价：￥{{item.origin_price}}</span>
								<span>库存：{{item.inventory}}</span>
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
		<el-form  label-width="120px">
			<el-form-item label="分享标题" prop="share_title">
				<el-input v-model="obj.product_name" placeholder="请输入分享标题" style="width: 300px;"></el-input>
			</el-form-item>
			<el-form-item label="分享封面" prop="share_img">
				<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="obj.product_img" :src="obj.product_img" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span>尺寸:421*375,100kb以内</span>
			</el-form-item>
			<el-form-item label="选择商品" prop="goods_id">
				<el-button type="primary" @click="dialogTableVisible = true" plain>点击选择</el-button>
				<div v-if="form.goods_name" class="commodity">
					<ul>
						<li style="border:none">
							<div class="imgDiv">
								<img :src="form.goods_img" alt="">
							</div>
							<div class="section-p" style="width:600px;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
								<span v-text="form.goods_name"></span>
								<div>
									<span>官网价：￥{{form.origin_price}}</span>
									<span>库存：{{form.goods_inventory}}</span>
								</div>
								<div class="ipt_list">
									<input oninput="value=value.replace(/[^\d]/g,'')" v-model="obj.inventory" type="number" placeholder="积分兑换库存">
									<input oninput="value=value.replace(/[^\d]/g,'')" v-model="obj.quota" type="number" placeholder="兑换数量">
									<input oninput="value=value.replace(/[^\d]/g,'')" v-model="obj.integral" type="number" placeholder="所需积分">
									<input oninput="value=value.replace(/[^\d\0]/g,'')" v-model="obj.goods_freight" type="number" placeholder="运费">
								</div>
							</div>
							<!-- <div class="del_item">
								<el-button type="danger" plain @click='delItem(item,form.goods_info,index)'>删除</el-button>
							</div> -->
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
	import waves from '@/directive/waves' // 水波纹指令
	import {
		getBargain,
		tabGoods,
		getTabChannels,
		addIntegralStore,
		updateIntegralStore,
		getIntegralStore
	} from '@/api/shops'
	import _ from 'lodash'
	export default {
		name: 'bargainAdd',
		directives: {
			waves
		},
		// components: { VerticalFrom },
		data() {
			let _this = this;
			var validateStock = (rule, value, callback) => {
				if (value > _this.stock) {
					callback(new Error('不可高于产品现有库存'));
				} else {
					callback();
				}
			};
			return {
				total: 1,
				dialogTableVisible: false,
				obj: {
					product_name:'',//分享标题
					product_img: '', //分享图片
					product_id: '', //商品ID
					sku_id: '', //商品属性ID
					inventory : '', //库存
					quota: '', //运费
					integral: '', //积分
					goods_freight: '', //运费
				},
				form:{
					origin_price:"",
					goods_name:"",
					goods_img:"",
					goods_inventory:"",
					inventory : '', //库存
					quota: '', //运费
					integral: '', //积分
					goods_freight: '', //运费
				},
				pickerOptions: {
					disabledDate: (time) => {
						const curDate = (new Date()).getTime()
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				dialogVisible: false,
				dialogImageUrl: '',
				searchVal: '',
				list: '',
			}
		},
		mounted() {
			this.getTabGoods(1)
			if (this.$route.query.id) {
				this.getList(this.$route.query.id)
			}
		},
		methods: {
			// 回显
			getList(cid) {
				let _this = this;
				getIntegralStore('?id='+cid).then((res) => {
					if (res.data.code == 200) {
						var pubList = res.data.data;
						this.obj={
							product_name:pubList.product_name,//分享标题
							product_img: pubList.product_img, //分享图片
							product_id: pubList.product_id, //商品ID
							sku_id: pubList.sku_id, //商品属性ID
							inventory : pubList.inventory, //库存
							quota: pubList.quota, //运费
							integral: pubList.integral, //积分
							goods_freight: pubList.goods_freight, //运费
						}
						this.form={
							origin_price:pubList.goods_price,
							goods_name:pubList.goods_name,
							goods_img:pubList.goods_img,
							goods_inventory:pubList.goods_inventory,
						}
					}else{
						this.$message({
							type:"error",
							message:res.data.msg ||'获取失败'
						})
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			onSubmit(formName) {
				var self = this;
				// for (var key in this.form) {
				// 	if (this.form[key] === '') {
				// 		self.$message({
				// 			type: "error",
				// 			message: "请填写完整数据"
				// 		})
				// 		return false;
				// 	}
				// }
				if(this.obj.product_name == ''){
					this.$message({
						type:"error",
						message:"分享标题不能为空"
					})
					return false;
				}
				if(this.obj.product_img == ''){
					this.$message({
						type:"error",
						message:"分享图片不能为空"
					})
					return false;
				}
				if(this.obj.inventory == ''){
					this.$message({
						type:"error",
						message:"库存不能为空"
					})
					return false;
				}
				if(this.obj.quota == ''){
					this.$message({
						type:"error",
						message:"限购数量不能为空"
					})
					return false;
				}
				if(this.obj.goods_freight === ''){
					this.$message({
						type:"error",
						message:"运费不能为空"
					})
					return false;
				}
				if (this.$route.query.id) {
					let obj = _.clone(this.obj);
					obj.id = this.$route.query.id
					updateIntegralStore(obj).then((res) => {
						if (res.data.code == 200) {
							self.$message({
								message: '编辑成功',
								type: 'success',
								duration: 5000
							})
							//跳转展示列表页
							self.$router.push({
								path: '/operate/integralMall'
							});
						} else {
							this.$message({
								type: "error",
								message: res.data.msg || '添加失败'
							})
						}
					}).catch((error) => {
						console.log(error)
					})
				} else {
					let obj = _.clone(this.obj);
					addIntegralStore(obj).then((res) => {
						if (res.data.code == 200) {
							self.$message({
								message: '添加成功',
								type: 'success',
							})
							//跳转展示列表页
							self.$router.push({
								path: '/operate/integralMall'
							});
						} else {
							this.$message({
								type: "error",
								message: res.data.msg || '添加失败'
							})
						}
					})
				}
			},
			// 选择商品
			choseId(item) {
				this.form.origin_price = item.origin_price //官网价
				this.form.goods_name = item.goods_name //商品名称
				this.form.goods_img = item.path //商品封面
				this.form.goods_inventory = item.inventory //库存

				this.obj.product_id = item.id //id
				this.obj.sku_id = item.sku_id //sku_id
				this.obj.inventory = '', //库存
				this.obj.quota = '', //运费
				this.obj.integral = '', //积分
				this.obj.goods_freight = '', //运费
				this.dialogTableVisible = false
			},
			handleCurrentChange(val) {
				this.getTabGoods(val)
			},
			getTabGoods(page) {
				let _this = this;
				let data = {
					page: page
				}
				if (this.searchVal) {
					data['goods_name'] = this.searchVal
				}

				tabGoods(data).then((res) => {
					if (res.data.code == 200) {
						_this.list = res.data.data
						_this.total = res.data.count
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			beforeAvatarUpload(file) {
				console.log(file)
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt = file.size / 1024 < 50;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt) {
					this.$message.error('上传头像图片大小不能超过 50K!');
				}
				return isJPG && isLt;
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleOnExceed(file, fileList) {
				this.$message({
					type:"error",
					message:"最多上传一张"
				})
			},
			handleAvatarSuccess(res, file) {
				this.obj.product_img = file.response.url
			},
		}
	}
</script>
<style scope lang="scss">
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
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
		border: 1px dashed #ccc;
		border-radius: 10px;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	/deep/ .el-input__inner {
		width: 400px
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

		/deep/ .del_item .el-button--danger.is-plain {
			margin-top: 24px;
			border-radius: 100%;
			padding: 0;
			width: 50px;
			height: 50px;
		}
	}
</style>
