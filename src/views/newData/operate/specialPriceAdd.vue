<template>
	<div class="gropAdd">
		<el-dialog width="800px" title="选择商品" :visible.sync="dialogTableVisible"  v-loading="loading">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择商品">
					<el-input v-model="searchVal" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getTabGoods(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul v-if="list.length>0">
					<li @click="choseId(item)" v-for="(item,index) in list" :key="index" >
						<div class="imgDiv">
							<img :src="item.path" alt="">
						</div>
						<div class="section-p">
							<p v-text="item.goods_name"></p>
							<div>
								<span>进货价：￥{{item.buy_price}}</span>
								<span>会员价：￥{{item.vip_price}}</span>
								<span>官网价：￥{{item.origin_price}}</span>
								<span>库存：{{item.inventory}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
				<div v-else style="text-align: center;">暂无数据</div>
			</div>
			<el-pagination small :current-page.sync="currentPage" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
			</el-pagination>

		</el-dialog>
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="渠道" class="background_color" v-if="!editId">
				<el-radio-group v-model="form.channel_id" @change="radioChange">
					<el-radio v-model="form.channel_id"  v-for="item in channelList" :key="item.id"  :label="item.id">{{item.channel_name}}</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="选择商品" prop="goods_id">
				<el-button  v-if="!editId" type="primary" @click="dialogTableVisible = true" plain>点击选择</el-button>
				<div v-if="form.goods_info.length !=0" class="commodity">
					<ul>
						<li style="border:none" v-for="(item,index) in form.goods_info">
							<!-- <div class="imgDiv">
								<img :src="item.goods_img" alt="">
							</div> -->
							<div class="section-p" style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
								<span v-text="item.goods_name"></span>
								<div>
									<span>商品名称：￥{{item.goodsName}}</span>
								</div>
								<div class="ipt_list">
									进货价：<span>{{item.buyPrice}}</span>
									会员价：<span>{{item.vipPrice}}</span>
									官网价：<span>{{item.originPrice}}</span>

									活动价：<input oninput="value=value.replace(/[^\d\.]/g,'')" v-model="item.activityPrice" type="text" placeholder="秒杀价格">
									排序:<input oninput="value=value.replace(/[^\d\.]/g,'')" v-model="item.sort" type="text" placeholder="排序越大越靠前">
									限购:<input oninput="value=value.replace(/[^\d\.]/g,'')" v-model="item.limitBuy" type="text" placeholder="限购">

								</div>
							</div>
							<div class="del_item" v-if="!editId">
								<el-button type="danger" plain @click='delItem(item,form.goods_info,index)'>删除</el-button>
							</div>
						</li>
					</ul>
				</div>
			</el-form-item>
			<!-- <el-form-item label="排序">
				<el-input v-model="form.sort"  placeholder="请输入排序,数字越大越靠前"></el-input>
			</el-form-item> -->
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">保存数据</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import _ from 'lodash'
	import waves from '@/directive/waves' // 水波纹指令
	import {
		tabGoods,
		getBargain,
		getSpecialGoodsDetail,
		addSpecialGoods,
		updateSpecial,
		deleteSpecialGoods,
		getChannelList
	} from '@/api/shops'
	const isInArray = (single, arr) => {
		return (arr.findIndex(res => {
			return res === single
		})) >= 0
	}
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
				form: {
					goods_info: [], //选择商品信息
					share_img: '', //分享图片
					act_imgs: '',
					is_online: 0
				},
				disableds:false,
				pickerOptions: {
					disabledDate: (time) => {
						const curDate = (new Date()).getTime()
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				share_img: '',
				dialogVisible: false,
				dialogImageUrl: '',
				searchVal: '',
				timeArray: [],
				list: [],
				stock: '',
				loading:false,
				channelList:[],
				radioChannel:'',
				editId:'',
                currentPage: 1,
			}
		},
		computed: {

		},
		mounted() {
			// this.getTabGoods(1)
			if (this.$route.query.id) {
				 this.editId=this.$route.query.id;
				this.getList(this.$route.query.id)
				this.disableds =true;
			}
			this.getChannelList();
		},
		methods: {
			// 删除
			delItem(item, dataList, idx) {
				if (item.id) {
					deleteSeckillIGood({
						id: item.id
					}).then(res => {
						if (res.data.code == 200) {
							this.$message({
								type: "success",
								message: "删除成功"
							})
							dataList.splice(idx, 1)
						}
					})
				} else {
					dataList.splice(idx, 1)
				}

			},
			// 回显
			getList(cid) {
				let _this = this;
				getSpecialGoodsDetail({id:cid}).then((res) => {
					if (res.data.code == 200) {
						_this.form.goods_info = res.data.data;
						_this.stock = res.data.data.inventory;
						let actImgs = res.data.data.act_imgs.split(',');
						if (actImgs != '') {
							actImgs.map(item => {
								_this.fileList.push({
									name: 'actImgs',
									url: item
								})
							})
						}
						let actImg = res.data.data.act_special_imgs;
						_this.timeArray.push(res.data.data.act_starttime)
						_this.timeArray.push(res.data.data.act_endtime)
						var pop_channels = res.data.data.pop_channels;
						let arr = [];
						pop_channels.map(item => {
							arr.push(parseInt(item.id))
						})
						_this.form.pop_channels = arr;
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			onSubmit() {
				console.log(this.form.goods_info,'self.form.goods_infoself.form.goods_info')
				var self = this
				if(self.form.goods_info.length == 0){
					self.$message({
						type:"error",
						message:'请选择商品'
					})
					return false;
				}
				// var obj = {
				// 	goodsName:self.form.goods_info[0].goodsName,
				// 	activityPrice:self.form.goods_info[0].activityPrice,
				// 	channelId:self.form.goods_info[0].channelId,
				// 	goodsId:self.form.goods_info[0].goodsId,
				// 	sort:self.form.goods_info[0].sort,
				// }


				console.log(self.form.goods_info);
				var data={
					goods_info:self.form.goods_info,
				}
				// retrun;
				// console.log(data);return;
				if (this.$route.query.id) {
					// obj.id = this.form.goods_info[0].id;
					var upData={
						id:self.form.goods_info[0].id,
						activityPrice:self.form.goods_info[0].activityPrice,
						sort:self.form.goods_info[0].sort,
						limitBuy:self.form.goods_info[0].limitBuy,
					}

					updateSpecial(upData).then(res => {
						if (res.data.code == 200) {
							self.$message({
								message: '修改成功',
								type: 'success',
							})
							self.$router.push('/operate/specialPrice')
						} else {
							self.$message({
								message: res.data.msg || '修改失败',
								type: 'error',
							})
						}

					})
				} else {
					addSpecialGoods(data).then(res => {
						if (res.data.code == 200) {
							self.$message({
								message: '添加成功',
								type: 'success',
							})
							self.$router.push('/operate/specialPrice')
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
				console.log(item,'item')
				var goodsInfo = this.form.goods_info;
				var idx = this.form.goods_info.length;
				var obj = {
					activityPrice: '', //活动价格
					sort: '', //排序
					act_id: '',
					goods_id: '',
					goods_img: '',
					goodsName : '',
					id: '',
					sort: '',
					inventory: '',
				};
				obj.sku_id = item.sku_id;
				obj.goods_img = item.path;
				obj.goodsName = item.goods_name;
				obj.goodsId = item.id || '';
				obj.channelId = item.channelId;
				obj.act_id = this.$route.query.id || '';
				obj.price = item.origin_price;
				obj.inventory = item.inventory;

				obj.buyPrice = item.buy_price;
				obj.vipPrice = item.vip_price;
				obj.originPrice = item.origin_price;

				this.form.goods_info.push(obj); //官网价
				this.dialogTableVisible = false
			},
			handleCurrentChange(val) {
				this.getTabGoods(val)
			},
			getTabGoods(page) {
				this.loading = true
				let _this = this;
				let data = {
					page: page,
					channel_id:this.radioChannel
				}
				if (this.searchVal) {
					data['goods_name'] = this.searchVal
				}

				tabGoods(data).then((res) => {
					if (res.data.code == 200) {
						_this.list = res.data.data
						_this.total = res.data.count;
						this.loading = false
					}
				}).catch((error) => {
					console.log(error)
				})
			},


			getChannelList()
			{
				getChannelList().then((res) => {
					if (res.data.code == 200) {
						this.channelList = res.data.data
					}
				}).catch((error) => {
					console.log(error)
				})
			},

		   radioChange:function(val)
		   {
               this.currentPage = 1;
			   this.radioChannel=val;
			   this.list=[];
			   this.getTabGoods(1)
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
			handleAvatarSuccess1(res, file, fileList) {
				let arrList = [];
				fileList.map(item => {
					console.log(item, 'itemitem')
					if (item.response) {
						arrList.push({
							name: 'item',
							url: item.response.url
						})
					} else {
						arrList.push({
							name: 'item',
							url: item.url
						})
					}

				})
				this.fileList = arrList;
			},
			handleAvatarSuccess2(res, file) {
				this.form.act_special_imgs = file.response.url
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
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
