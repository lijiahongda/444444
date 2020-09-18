<template>
	<div class="gropAdd">

		<el-dialog width="800px" title="选择商品" :visible.sync="dialogTableVisible">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="渠道" class="background_color" v-if="!editId">
					<el-radio-group v-model="form.channel_id" @change="radioChange">
						<el-radio v-model="form.channel_id"  v-for="item in channelList" :key="item.id"  :label="item.id">{{item.channel_name}}</el-radio>
					</el-radio-group>
				</el-form-item>
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
			<el-pagination small :current-page.sync="currentPage" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
			</el-pagination>
		</el-dialog>

		<el-dialog width="800px" title="选择优惠券" :visible.sync="dialogTableVisible_cop">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择优惠券">
					<el-input v-model="searchVal" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getCoupons(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul>
					<li @click="choseId2(item)" v-for="(item,index) in coupList" :key="index">
						<div class="section-p">
							<!-- <p v-text="item.id"></p> -->
							<div>
								<span>ID：￥{{item.id}}</span>
								<span>名称：￥{{item.name}}</span>
								<span>金额：￥{{item.amount}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
			</div>
			<el-pagination small @current-change="handleCurrentChange" layout="prev, pager, next" :total="coupTotal">
			</el-pagination>
		</el-dialog>




		<el-form ref="form" :model="form" label-width="120px">

			<el-form-item label="砍价类型" prop="">
				<el-radio v-model='form.bargain_act_type' :label="1">普通砍价</el-radio>
				<el-radio v-model='form.bargain_act_type' :label="2">红包砍价</el-radio>
			</el-form-item>


			<el-form-item label="选择优惠券" prop="coupon_id"  v-if="form.bargain_act_type==2">
				<el-button type="primary" @click="dialogTableVisible_cop = true" plain>点击选择</el-button>
				<div v-if="form.coupon_id" class="commodity">
					<ul>
						<li style="border:none">
							优惠券ID：{{form.coupon_id}}
							优惠券金额：{{form.origin_price}}
						</li>
					</ul>
				</div>
			</el-form-item>

			<!-- <el-form-item label="优惠券ID" prop="" v-if="form.bargain_act_type==2">
				<el-input v-model="form.coupon_id" placeholder="请输入优惠券ID" type="number"></el-input>
			</el-form-item> -->

			<el-form-item label="分享标题" prop="share_title">
				<el-input v-model="form.share_title" placeholder="请输入分享标题"></el-input>
			</el-form-item>
			<el-form-item label="分享封面" prop="share_img">
				<el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="1" :auto-upload="true"
				 :on-exceed="handleOnExceed" :file-list="fileList" :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess"
				 :before-upload="beforeAvatarUpload">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>
			<el-form-item label="有效时间" prop="timeArray">
				<el-date-picker v-model="timeArray" :picker-options="pickerOptions" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
				 start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="选择状态" prop="">
				<el-radio v-model='form.is_online' :label="0">下线</el-radio>
				<el-radio v-model='form.is_online' :label="1">上线</el-radio>
			</el-form-item>
			<el-form-item label="选择商品" prop="goods_id"  v-if="form.bargain_act_type==1">
				<el-button type="primary" @click="dialogTableVisible = true" plain>点击选择</el-button>
				<div v-if="form.goods_id" class="commodity">
					<ul>
						<li style="border:none">
							<div class="imgDiv">
								<img :src="form.goods_img" alt="">
							</div>
							<div class="section-p" style="width:400px">
								<span v-text="form.goods_name"></span>
								<div>
									<span>官网价：￥{{origin_price}}</span>
									<span>库存：{{stock}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</el-form-item>
			<el-form-item label="排序" prop="" v-if="form.bargain_act_type==1">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="form.sort" placeholder="数字越大排序越靠前" @input="handleInput" type="number"></el-input>
					</div>
				</div>
			</el-form-item>
			<el-form-item label="砍价名称" prop="act_name" v-if="form.bargain_act_type==1">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="form.act_name" placeholder="请输入砍价名称"></el-input>
					</div>
					<div class="input-div"></div>
				</div>
			</el-form-item>
			<el-form-item label="活动库存" prop="act_goods_stock">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model.number="form.act_goods_stock" type="number" min='0' placeholder="请输入活动库存" @input="handleInput"></el-input>
					</div>
					<div class="input-div">※不可高于产品现有库存</div>
				</div>
			</el-form-item>
			<el-form-item label="限购数量" prop="buy_limit">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model.number="form.buy_limit" type="number" min='0' placeholder="请输入限购数量" @input="handleInput"></el-input>
					</div>
					<div class="input-div">※同一用户最多购买数量</div>
				</div>
			</el-form-item>
			<el-form-item label="初始价格" prop="origin_price" v-if="form.bargain_act_type==1">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model.number="form.origin_price" min='0' type="number" placeholder="请输入初始价格" @input="handleInput"></el-input>
					</div>
					<div class="input-div">※默认官网价格</div>
				</div>
			</el-form-item>
			<el-form-item label="运费" prop="goods_freight" v-if="form.bargain_act_type==1">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model.number="form.goods_freight" min='0' type="number" placeholder="请输入运费" @input="handleInput"></el-input>
					</div>
					<div class="input-div">※默认为商品当前运费</div>
				</div>
			</el-form-item>
			<el-form-item label="运费说明" prop="goods_freight_desc" v-if="form.bargain_act_type==1">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model.number="form.goods_freight_desc" placeholder="请输入运费说明"></el-input>
					</div>
					<div class="input-div">请输入运费说明</div>
				</div>
			</el-form-item>
			<el-form-item label="活动低价" prop="bargain_price" v-if="form.bargain_act_type==1">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model.number="form.bargain_price" type="number" min='0' placeholder="请输入活动低价" @input="handleInput"></el-input>
					</div>
					<div class="input-div">※拼最低可砍至多少钱购买</div>
				</div>
			</el-form-item>

			<el-form-item label="首开金额" prop="" v-if="form.bargain_act_type==2">

				<div class="input-common other_type">
					<div class="s1">
						<!-- <div class="s_tit">老用户随机砍</div> -->
						<div class="s2">
							<el-input v-model="form.red_packet_first_min_price" min='0' type="number" placeholder="最小值"></el-input><span>至</span>
							<el-input v-model="form.red_packet_first_max_price" min='0' type="number" placeholder="最大值"></el-input>
						</div>

					</div>

				</div>
			</el-form-item>

			<el-form-item label="砍价方式" prop="bargain_type">
				<div class="input-common other_type">
					<div class="s1">
						<div class="s_tit">老用户随机砍</div>
						<div class="s2">
							<el-input v-model="form.bargain_min_price" min='0' type="number" placeholder="最小值"></el-input><span>至</span>
							<el-input v-model="form.bargain_max_price" min='0' type="number" placeholder="最大值"></el-input>
						</div>
						<div class="commission">
							<span>分拥金额</span>
							<el-input style="width:80px" v-model="form.commission_min" min='0' type="number" placeholder=""></el-input>至
							<el-input style="width:80px" v-model="form.commission_max" min='0' type="number" placeholder=""></el-input>
						</div>
					</div>
					<div class="s1">
						<div class="s_tit">新用户随机砍</div>
						<div class="s2">
							<el-input v-model="form.new_min_price" min='0' type="number" placeholder="最小值"></el-input><span>至</span>
							<el-input v-model="form.new_max_price" min='0' type="number" placeholder="最大值"></el-input>
						</div>
						<div class="commission">
							<span>分拥金额</span>
							<el-input style="width:80px" v-model="form.new_commission_min " min='0' type="number" placeholder=""></el-input>至
							<el-input style="width:80px" v-model="form.new_commission_max " min='0' type="number" placeholder=""></el-input>
						</div>
					</div>
				</div>
			</el-form-item>
			<el-form-item label="当前砍价有效期" prop="time_limit">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model.number="form.time_limit" type="number" min='0' placeholder="请输入当前砍价有效期 / 小时" @input="handleInput"></el-input>
					</div>
				</div>
			</el-form-item>
			<el-form-item label="推广渠道">
				<el-checkbox-group v-model="form.pop_channels" size="mini" @change="popChannel">
					<el-checkbox :label="city.id" :key='city.id' v-for="city in cities">{{city.name}}</el-checkbox>
				</el-checkbox-group>
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
		updateBargain,
		addBargain,
		getBargain,
		tabGoods,
		getTabChannels,
        getChannelList,
		getCoupons
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
				dialogTableVisible_cop:false,
				form: {
					act_name: '', //砍价名称
					act_starttime: '', //活动开始时间
					act_endtime: '', //活动结束时间
					time_limit: 1, //砍价有效期
					is_online: 0, //上线下线
					act_goods_stock: 1, //活动库存
					origin_price: '', //官网价
					goods_img: '', //商品封面
					goods_name: '', //商品名称
					goods_id: '', //商品ID
					share_img: '', //分享图片
					sort: 0, //默认排序值
					sku_id: '', //sku_id
					buy_limit: 1, //限购数量
					share_title: '', //分享标题
					goods_freight: '', //运费
					goods_freight_desc: '', //运费说明
					is_commission: 1, // 是否分佣 0 否 1是
					bargain_price: '', // 砍价最低价
					bargain_type: 2, //1 每次砍掉 2 随机砍掉
					commission_per: 0, // 老人分佣折扣 （1-99）
					new_commission_per:0,//新人分佣
					bargain_fixed_price: 1, // 固定砍掉金额
					bargain_max_price: 1, // 老人随机砍掉最大值
					bargain_min_price: 0, // 老人随机砍掉最小值
					new_max_price: 1, //新人随机砍
					new_min_price: 0, //新人随机砍
					pop_channels: [1], // 推广渠道
					commission_min:0,//老用户分拥最低金额
					commission_max:0,//老用户分拥最高金额
					new_commission_min:0,//新用户分拥最低金额
					new_commission_max:0,//新用户分拥最低高金额

				},
                channelList:[],
                radioChannel:'',
                editId:'',
                currentPage: 1,
				pickerOptions: {
					disabledDate: (time) => {
						const curDate = (new Date()).getTime()
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				cities: [{
					id: 1,
					name: "悦旅会APP"
				}], //推广渠道
				share_img: '',
				fileList: [],

				dialogVisible: false,
				dialogImageUrl: '',
				origin_price: '',
				searchVal: '',
				timeArray: [],
				list: '',
				stock: '',
				coupList:'',
				coupTotal:'',
			}
		},
		created() {
			this.getTabGoods(1)

			this.getCoupons(1)

			if (this.$route.query.id) {
				this.getList(this.$route.query.id)
			}
		},
		mounted() {
			this.getTabChannels();
            this.getChannelList();
		},
		methods: {
			handleInput(e) {
				// e = e.replace(/[^\d]/g,'')
				// console.log(e,'eeeee')
			},
			// 推广渠道
			getTabChannels() {
				getTabChannels().then(res => {
					console.log(res)
					this.cities = res.data;
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

		getCoupons(page){

			let _this = this;
				let data = {
					page: page
				}
				if (this.searchVal) {
					data['keyword'] = this.searchVal
				}

			getCoupons(data).then((res) => {
				if (res.data.code == 200) {
					this.coupList = res.data.data
					this.coupTotal = res.data.count
				}
			}).catch((error) => {
				console.log(error)
			})
		},
			// 选择推广渠道
			popChannel(val) {
				console.log(val, "vallll")
			},
			// 回显
			getList(cid) {
				let _this = this;
				getBargain({
					id: cid
				}).then((res) => {
					if (res.data.code == 200) {
						_this.form = res.data.data
						_this.stock = res.data.data.inventory;
						this.origin_price = res.data.data.price;
						_this.fileList.push({
							name: 'goods_img',
							url: res.data.data.share_img
						})
						_this.timeArray.push(res.data.data.act_starttime)
						_this.timeArray.push(res.data.data.act_endtime)
						var pop_channels = res.data.data.pop_channels;
						let arr = [];
						pop_channels.map(item => {
							arr.push(parseInt(item.id))
						})
						_this.form.pop_channels = arr;
						this.form.bargain_type =2;
						this.form.is_commission =1;
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			onSubmit(formName) {
				var self = this;
				if (this.form.share_title == '') {
					self.$message({
						type: "error",
						message: "请输入分享标题"
					})
					return false;
				}
				if (this.form.share_img == '') {
					self.$message({
						type: "error",
						message: "请选择分享封面"
					})
					return false;
				}
				if (this.timeArray.length == 0 || this.timeArray == null) {
					self.$message({
						type: "error",
						message: "请输入有效时间"
					})
					return false;
				}

				if(this.form.bargain_act_type==1)
				{
					if (this.stock === '') {
						self.$message({
							type: "error",
							message: "请选择商品"
						})
						return false;
					}

					if (this.form.act_name == '') {
						self.$message({
							type: "error",
							message: "请填写砍价名称"
						})
						return false;
					}

					if (this.form.sort < 0) {
						self.$message({
							type: "error",
							message: "排序不能下于0"
						})
						return false;
					}

					if (this.form.goods_freight === '' || this.form.goods_freight < 0) {
						self.$message({
							type: "error",
							message: "请输入运费且大于0"
						})
						return false;
					}

					if (this.form.goods_freight_desc == '') {
						self.$message({
							type: "error",
							message: "请输入运费说明"
						})
						return false;
					}

					if (this.form.bargain_price == '' || this.form.bargain_price <= 0) {
						self.$message({
							type: "error",
							message: "请输入活动低价且大于0"
						})
						return false;
					}


				}



				if (this.form.act_goods_stock == '' || this.form.act_goods_stock <= 0) {
					self.$message({
						type: "error",
						message: "请填写库存且大于0"
					})
					return false;
				}
				if (this.form.buy_limit == '' || this.form.buy_limit <= 0) {
					self.$message({
						type: "error",
						message: "请输入限购数量且大于0"
					})
					return false;
				}

				// 砍价方式
				if (self.form.bargain_min_price === '') {
					self.$message({
						type: "error",
						message: "填写老用户最低砍价"
					})
					return false;
				}

				 if (self.form.bargain_max_price <= 0  ||self.form.bargain_max_price === '') {
				 	self.$message({
				 		type: "error",
				 		message: "填写老用户最高砍价且不为0"
				 	})
				 	return false;
				 }
				 if (self.form.new_max_price <= 0 ||self.form.new_max_price === '') {
				 	self.$message({
				 		type: "error",
				 		message: "填写新用户最高砍价且不为0"
				 	})
				 	return false;
				 }
				  if (self.form.new_min_price === '') {
				  	self.$message({
				  		type: "error",
				  		message: "填写新用户最低砍价"
				  	})
				  	return false;
				  }

				if (this.form.time_limit == '' || this.form.time_limit <= 0) {
					self.$message({
						type: "error",
						message: "请输入当前砍价有效期且大于0"
					})
					return false;
				}
				if (self.timeArray != null && self.timeArray.length > 0) {
					self.form.act_starttime = self.timeArray[0];
					self.form.act_endtime = self.timeArray[1];
				}
				if (!self.form.share_img) {
					self.form.share_img = self.form.goods_img
				}
				// for (var key in this.form) {
				// 	if (this.form[key] === '') {
				// 		self.$message({
				// 			type: "error",
				// 			message: "请填写完整数据"
				// 		})
				// 		return false;
				// 	}
				// }
				if (this.$route.query.id) {
					this.form.id = this.$route.query.id
					let obj = _.clone(this.form);
					delete obj.new_commission_per;
					delete obj.commission_per;
					obj.pop_channels = obj.pop_channels.join(',')
					updateBargain(obj).then((res) => {
						if (res.data.code == 200) {
							self.$message({
								message: '编辑成功',
								type: 'success',
								duration: 5000
							})
							//跳转展示列表页
							self.$router.push({
								path: '/operate/bargainList'
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
					this.form.id = this.$route.query.id
					let obj = _.clone(this.form);
					delete obj.new_commission_per;
					delete obj.commission_per;
					obj.pop_channels = obj.pop_channels.join(',')
					addBargain(obj).then((res) => {
						if (res.data.code == 200) {
							self.$message({
								message: '添加成功',
								type: 'success',
							})
							//跳转展示列表页
							self.$router.push({
								path: '/operate/bargainList'
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
            radioChange:function(val)
            {
                this.currentPage = 1;
                this.radioChannel=val;
                this.list=[];
                this.getTabGoods(1)
            },
			// 选择商品
			choseId(item) {
				this.form.bargain_price = this.form.origin_price = item.origin_price //官网价
				this.form.goods_name = item.goods_name //商品名称
				this.form.goods_img = item.path //商品封面
				this.form.sku_id = item.sku_id //sku_id
				this.form.goods_id = item.id //id
				this.stock = item.inventory //库存
				this.origin_price = item.origin_price
				this.dialogTableVisible = false
			},

			choseId2(item) {
				this.form.coupon_id = item.id //官网价
				this.form.origin_price = item.amount
				// this.origin_price = item.amount
				this.dialogTableVisible_cop = false
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
				alert('最多上传一张图片')
			},
			handleAvatarSuccess(res, file) {
				this.form.share_img = file.response.url
				// this.imageUrl = URL.createObjectURL(file.raw);
				// console.log(this.imageUrl)
			},
		}
	}
</script>
<style scope lang="scss">
	.commission {
		margin-left: 5px;
		float: left;
		input{padding-right: 0;}
	}

	.gropAdd {
		margin: 20px;
		width: 700px;
		box-sizing: border-box;
		padding: 20px;
	}

	.input-common {
		display: flex;
		width: 450px;

		.s1 {
			overflow: hidden;
			width: 100%;
			display: block;
			margin-bottom: 15px;

			.s_tit {
				width: 90px;
				float: left;
			}

			.s2 {
				float: left;

				/deep/ .el-input {
					float: left;
					width: 75px;
					input {
						padding-right: 0;
					}
				}
				span{float: left;margin: 0 3px;}
			}
		}

		.input-div {
			color: #999;
			padding-left: 5px;
			width: 200px;
		}
	}
	.input-common.other_type{display: block;max-width: 550px;width: auto;}
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
			padding-top: 20px;
			border-top: 1px solid #ddd;
			margin-bottom: 20px;
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
</style>
