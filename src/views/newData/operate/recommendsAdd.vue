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
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item   label="选择商品" prop="goods_id">
				<el-button   type="primary" @click="dialogTableVisible = true" plain>点击选择</el-button>
				<div v-if="form.goods_info.length !=0" class="commodity">
					<ul>
						<li style="border:none" v-for="(item,index) in form.goods_info" :key="index">
							<!-- <div class="imgDiv">
								<img :src="item.goods_img" alt="">
							</div> -->
							<div class="section-p" style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
								<div class="ipt_list" style="width:100%">
									商品名称：<span>{{item.name||item.goods_name}}</span>
									skuID：<span>{{item.goods_skuid}}</span>
									排序:<input oninput="value=value.replace(/[^\d\.]/g,'')" v-model="item.sort" type="text" placeholder="排序越大越靠前">
								</div>
							</div>
							<div class="del_item" v-if="!editId">
								<el-button type="danger" plain @click='delItem(item,form.goods_info,index)'>删除</el-button>
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
	import {
		tabGoods,
		getBagain,
		getRecommendGoodsOne,
		addRecommendGoods,
		upRecommendGoods,
		delRecommendGoods,
		getChannelList,
		getRecommendGoodsList
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

			return {
				dialogshow: false,
				total: 1,
				dialogTableVisible: false,
				form: {
					goods_info: [], //选择商品信息
					share_img: '', //分享图片
					act_imgs: '',
					is_online: 0
				},
				disableds: false,
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
				loading: false,
				channelList: [],
				radioChannel: '',
				editId: ''
			}
		},
		computed: {

		},
		mounted() {
			this.getTabGoods(1)

			if (this.$route.query.id) {
				this.editId = this.$route.query.id;
				this.getList(this.$route.query.id)
				this.disableds = true;
			}
			this.getChannelList();
		},
		methods: {
			// 删除
			delItem(item, dataList, idx) {
				if (item.id) {
					delRecommendGoods({
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
				let dataes = {
					page: 1,
					id: cid
				}
				getRecommendGoodsList(dataes).then((res) => {
					if (res.data.code == 200) {
						_this.form.goods_info = res.data.data.list;
						_this.stock = res.data.data.inventory;
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			onSubmit() {
				var self = this
				if (self.form.goods_info.length == 0) {
					self.$message({
						type: "error",
						message: '请选择商品'
					})
					return false;
				}
				var data = {
					goods_info: self.form.goods_info,
				}
				678
				// retrun;
				if (this.$route.query.id) {
					// obj.id = this.form.goods_info[0].id;
					let upData = {
						id: self.form.goods_info[0].act_id,
						goods_id: self.form.goods_info[0].id,
						goods_skuid: self.form.goods_info[0].goods_skuid,
						name:self.form.goods_info[0].goods_name,
						sort: self.form.goods_info[0].sort
					}

					upRecommendGoods(upData).then(res => {
						if (res.data.code == 200) {
							self.$message({
								message: '修改成功',
								type: 'success',
							})
							self.$router.push('/operate/recommends')
						} else {
							console.log(res)
							self.$message({
								message: res.data.msg || '修改失败',
								type: 'error',
							})
						}

					})
				} else {
					let datas = {
						id:self.form.goods_info[0].id,
						goods_id: self.form.goods_info[0].goods_id,
						goods_skuid: self.form.goods_info[0].goods_skuid,
						name:self.form.goods_info[0].goods_name,
						sort: self.form.goods_info[0].sort
					}
					console.log(datas,678)
					addRecommendGoods(datas).then(res => {
						if (res.data.code == 200) {
							self.$message({
								message: '添加成功',
								type: 'success',
							})
							self.$router.push('/operate/recommends')
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
				console.log(item, 'item')
				var goodsInfo = this.form.goods_info;
				console.log(goodsInfo,"9090")

				var idx = this.form.goods_info.length;
				var obj = {
					activityPrice: '', //活动价格
					sort: '', //排序
					act_id: '',
					goods_id: '',
					goods_img: '',
					goods_name: '',
					id: '',
					sort: '',
					inventory: '',
				};

				if(goodsInfo.length==0){


				obj.goods_skuid = item.sku_id;
				obj.goods_img = item.path;
				obj.goods_name = item.goods_name;
				obj.id = item.id ;
				obj.goods_id=item.id;
				obj.channelId = item.channelId;
				obj.act_id = this.$route.query.id || '';
				obj.price = item.origin_price;
				obj.inventory = item.inventory;

				obj.buyPrice = item.buy_price;
				obj.vipPrice = item.vip_price;
				obj.originPrice = item.origin_price;

				}else{
					if(this.editId==this.$route.query.id){
					goodsInfo.shift();}
					obj.goods_skuid = item.sku_id;
					obj.goods_img = item.path;
					obj.goods_name = item.goods_name;
					obj.id = item.id;
					obj.goods_id=item.goods_id;
					obj.channelId = item.channelId;
					obj.act_id = this.$route.query.id || '';
					obj.price = item.origin_price;
					obj.inventory = item.inventory
					obj.buyPrice = item.buy_price;
					obj.vipPrice = item.vip_price;
					obj.originPrice = item.origin_price;
				}
				this.form.goods_info.push(obj)
				console.log(this.form.goods_info,'werg')
				//官网价
				this.dialogTableVisible = false
			},
			handleCurrentChange(val) {
				this.getTabGoods(val)
			},
			getTabGoods(page) {
				this.loading = true
				let _this = this;
				let data = {
					id:this.$route.query.id,
					page: page,
					channel_id: this.radioChannel
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
			getChannelList() {
				getChannelList().then((res) => {
					if (res.data.code == 200) {
						this.channelList = res.data.data
					}
				}).catch((error) => {
					console.log(error)
				})
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
