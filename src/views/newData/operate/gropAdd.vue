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
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="团长是否免单:" prop="is_give">
				<el-radio v-model="form.is_free_sheet" :label="1">是</el-radio>
				<el-radio v-model="form.is_free_sheet" :label="0">否</el-radio>
			</el-form-item>
			<el-form-item label="分享标题">
				<el-input v-model="form.share_title" placeholder="请输入分享标题"></el-input>
			</el-form-item>
			<el-form-item label="分享封面">
				<el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="1" :auto-upload="true"
				 :on-exceed="handleOnExceed" :file-list="fileList" :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess"
				 :before-upload="beforeAvatarUpload">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>
			<el-form-item label="有效时间">
				<div>
					<el-date-picker v-model="timeArray" :picker-options="pickerOptions" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
					 start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
			</el-form-item>
			<el-form-item label="排序" prop="">
				<el-input v-model="form.sort" placeholder="数字越大排序越靠前"  type="number" ></el-input>
			</el-form-item>
			<el-form-item label="选择商品">
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
			<el-form-item label="分销规则" prop="distribution_id">
				<el-select v-model="form.distribution_id" placeholder="请选择分销商规则" filterable clearable>
					<el-option v-for="item in distributionData" :key="item.id" :label="item.distribution_name" :value="item.id" />
				</el-select>
			</el-form-item>
			<el-form-item label="拼团名称">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="form.act_name" placeholder="请输入拼团名称"></el-input>
					</div>
					<div class="input-div"></div>
				</div>
			</el-form-item>
			<el-form-item label="活动库存">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="form.act_goods_stock" placeholder="请输入活动库存"  min='0' type="number" ></el-input>
					</div>
					<div class="input-div">※不可高于产品现有库存</div>
				</div>
			</el-form-item>

			<el-form-item label="限购数量">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="form.buy_limit" placeholder="请输入限购数量"  type="number" min='1'></el-input>
					</div>
					<div class="input-div">※同一用户最多购买数量</div>
				</div>
			</el-form-item>

			<el-form-item label="限单类型" class="background_color">
				<el-radio-group v-model="form.is_limit_type">
					<el-radio :label="0">全部</el-radio>
					<el-radio :label="1">会员</el-radio>
					<el-radio :label="2">非会员</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="限制单数" prop="">
				<div class="input-common" style="width:800px">
					<div class="ipt_list"  v-if="form.is_limit_type==0">
						会员限购单数：<input oninput="value=value.replace(/[^\d\.]/g,'')" v-model="form.member_order_limit" type="number" placeholder="会员限购单数">
						非会员限购单数：<input oninput="value=value.replace(/[^\d\.]/g,'')" v-model="form.no_member_order_limit" type="number" placeholder="非会员限购单数">
					</div>
					<div class="ipt_list"  v-if="form.is_limit_type==1">
						会员限购单数：<input oninput="value=value.replace(/[^\d\.]/g,'')" v-model="form.member_order_limit" type="number" placeholder="会员限购单数">
					</div>
					<div class="ipt_list"  v-if="form.is_limit_type==2">
						非会员限购单数：<input oninput="value=value.replace(/[^\d\.]/g,'')" v-model="form.no_member_order_limit" type="number" placeholder="非会员限购单数">
					</div>
				</div>
			</el-form-item>

			<el-form-item label="初始价格">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="form.origin_price" placeholder="请输入初始价格"  min='0' type="number" ></el-input>
					</div>
					<div class="input-div">※默认官网价格</div>
				</div>
			</el-form-item>
			<el-form-item label="拼团价格">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="form.team_price" placeholder="请输入拼团价格"  min='0' type="number" ></el-input>
					</div>
					<div class="input-div">※拼团最低多少钱购买</div>
				</div>
			</el-form-item>
			<el-form-item label="运费">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="form.goods_freight" placeholder="请输入运费"  min='0'  type="number" ></el-input>
					</div>
					<div class="input-div">※默认为商品当前运费</div>
				</div>
			</el-form-item>
			<el-form-item label="运费说明">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="form.freight_desc" placeholder="请输入运费说明" ></el-input>
					</div>
					<div class="input-div">※当前运费说明</div>
				</div>
			</el-form-item>
			<el-form-item label="成团人数">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="form.needer" placeholder="请输入成团人数"  min='2' type="number" ></el-input>
					</div>
					<div class="input-div">※设置成团人数</div>
				</div>
			</el-form-item>
			<el-form-item label="当前成团有效期">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="form.time_limit"  min='0' placeholder="请输入当前成团有效期 / 小时"  type="number" ></el-input>
					</div>
					<div class="input-div">※设置成团有效时长</div>
				</div>
			</el-form-item>
			<el-form-item label="推广渠道">
				 <el-checkbox-group v-model="form.pop_channels" size="mini"  @change="handleCheckedCitiesChange">
				  <el-checkbox v-for="item in cities" :label="item.id"  :key='item.id'>{{item.name}}</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存数据</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import _ from 'lodash'
	import {
		tabGoods,
		combinationsLists,
		getTabChannels,
		updateCombination,
		addCombination,
        getChannelList,
		updateCombinationSort
	} from '@/api/shops'
	import {getGoodsDistribution} from '@/api/shops'
	export default {
		name: 'gropAdd',
		directives: {
			waves
		},
		// components: { VerticalFrom },
		data() {
			return {
				total: 1,
				dialogTableVisible: false,
				form: {
					act_name: '', //拼团名称
					act_starttime: '', //活动开始时间
					act_endtime: '', //活动结束时间
					time_limit: 1, //拼团有效期
					act_goods_stock: '', //活动库存
					goods_freight: '', //运费
					freight_desc:'',
					needer: 2, //成团人数
					buy_limit: 1, //限购数量
					sort:0,//排序
					share_title: '', //分享标题
					team_price: '', //拼团价格
					origin_price: '', //官网价
					goods_img: '', //商品封面
					goods_name: '', //商品名称
					goods_id: '', //商品ID
					share_img: '', //分享图片
					sku_id: '', //sku_id
					pop_channels:[1],
					distribution_id:""
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
				promotion_channel:[],
				cities: [{id:1,name:"悦旅会APP"}],//推广渠道
				share_img: '',
				fileList: [],
				origin_price:"",
				dialogVisible: false,
				dialogImageUrl: '',

				searchVal: '',
				timeArray: [],
				list: '',
				stock: '',
				distributionData:"",//分析哦啊规则
			}
		},
		mounted() {
			this.getTabGoods(1);
			this.getTabChannels()
			if (this.$route.query.id) {
				this.getList(this.$route.query.id)
			}
			this.getGoodsDistribution();
            this.getChannelList();
		},
		methods: {
			//分销规则
			getGoodsDistribution(){
				getGoodsDistribution({dist_type:1}).then(res=>{
					this.distributionData =res.data.data;
				})
			},
			handleCheckedCitiesChange(val){
				console.log(val,'valll')
				console.log(this.promotion_channel,'promotion_channelpromotion_channel')
			},
			// 推广渠道
			getTabChannels(){
				getTabChannels().then(res=>{
					this.cities = res.data;
					console.log(this.cities,'citiescitiescities')
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
			// 回显
			getList(cid) {
				let _this = this;
				combinationsLists({
					id: cid
				}).then((res) => {
					if (res.data.code == 200) {
						_this.form = res.data.data
						if(this.form.distribution_id === 0){
							this.form.distribution_id = ''
						}

						this.origin_price =res.data.data.price;
						_this.stock = res.data.data.inventory
						_this.fileList.push({
							name: 'goods_img',
							url: res.data.data.share_img
						})
						_this.timeArray.push(res.data.data.act_starttime)
						_this.timeArray.push(res.data.data.act_endtime)
						var pop_channels = res.data.data.pop_channels;
						if(pop_channels.length != 0){
							let arr = [];
							console.log(pop_channels,'promotion_channelpromotion_channelpromotion_channel')
							pop_channels.map(item=>{
								arr.push(parseInt(item))
							})
							_this.form.pop_channels = arr;
						}else{
							_this.form.pop_channels = [];
						}
						console.log(_this.form.pop_channels,"_this.form.promotion_channel")
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			onSubmit() {
				var self = this
				//-------
				if(this.form.share_title == ''){
					self.$message({
						type: "error",
						message: "请输入分享标题"
					})
					return false;
				}
				if(this.form.share_img == ''){
					self.$message({
						type: "error",
						message: "请选择分享封面"
					})
					return false;
				}
				if(this.timeArray.length == 0 || this.timeArray == null){
					self.$message({
						type: "error",
						message: "请输入有效时间"
					})
					return false;
				}
				if (this.form.sort <0) {
					self.$message({
						type: "error",
						message: "排序不能下于0"
					})
					return false;
				}
				if (this.stock === '') {
					self.$message({
						type: "error",
						message: "请选择商品"
					})
					return false;
				}
				if(this.form.act_name == ''){
					self.$message({
						type: "error",
						message: "请填写拼团名称"
					})
					return false;
				}
				if (this.form.act_goods_stock == '' || this.form.act_goods_stock <=0) {
					self.$message({
						type: "error",
						message: "请填写库存且大于0"
					})
					return false;
				}
				if(this.form.buy_limit == ''||this.form.buy_limit <=0){
					self.$message({
						type: "error",
						message: "请输入限购数量且大于0"
					})
					return false;
				}
				if(this.form.origin_price == '' || this.form.origin_price <=0){
					self.$message({
						type: "error",
						message: "请输入初始价格且大于0"
					})
					return false;
				}
				if(this.form.team_price == ''||this.form.team_price <=0){
					self.$message({
						type: "error",
						message: "请输入拼团价格且大于0"
					})
					return false;
				}
				if(this.form.goods_freight === '' || this.form.goods_freight <0){
					self.$message({
						type: "error",
						message: "请输入运费"
					})
					return false;
				}
				if(this.form.needer == '' || this.form.needer <= 1){
					self.$message({
						type: "error",
						message: "请输入成团人数大于2人"
					})
					return false;
				}
				if(this.form.time_limit == '' ||  this.form.time_limit<=0){
					self.$message({
						type: "error",
						message: "请输入成团有效期且大于0"
					})
					return false;
				}

				//-----
				if (self.timeArray != null && self.timeArray.length > 0) {
					self.form.act_starttime = self.timeArray[0];
					self.form.act_endtime = self.timeArray[1];
				}
				if (!self.form.share_img) {
					self.form.share_img = self.form.goods_img
				}

				// console.log(this.form)
				// for (var key in this.form) {
				// 	if (this.form[key] === '') {
				// 		this.$message({
				// 			type:"error",
				// 			message:"请填写完整数据"
				// 		})
				// 		return false;
				// 	}
				// }

				if (this.$route.query.id) {
					this.form.id = this.$route.query.id;
					let obj = _.clone(this.form);
					obj.pop_channels = this.form.pop_channels.join(',');
					console.log(obj,'objobj2222')
					updateCombination(obj).then((res) => {
						if (res.data.code == 200) {
							self.$message({
								message: '编辑成功',
								type: 'success',
							})
							//跳转展示列表页
							self.$router.push({
								path: '/operate/gropList'
							});
						}else{
							this.$message({
								type:"error",
								message:res.data.msg ||'更新失败'
							})
						}
					}).catch((error) => {
						console.log(error)
					})
				} else {
					this.form.id = this.$route.query.id
					let obj = _.clone(this.form);
					obj.pop_channels = this.form.pop_channels.join(',');
					addCombination(obj).then((res) => {
						if (res.data.code == 200) {
							self.$message({
								message: '添加成功',
								type: 'success',
							})
							//跳转展示列表页
							self.$router.push({
								path: '/operate/gropList'
							});
						}else{
							this.$message({
								type:"error",
								message:res.data.msg ||'添加失败'
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
				this.form.team_price = item.origin_price //官网价
				this.form.origin_price = item.origin_price //官网价
				this.form.goods_name = item.goods_name //商品名称
				this.form.goods_img = item.path //商品封面
				this.form.sku_id = item.sku_id //sku_id
				this.form.goods_id = item.id //id
				this.stock = item.inventory //库存
				this.origin_price = item.origin_price;
				this.dialogTableVisible = false
			},
			handleCurrentChange(val) {
				this.getTabGoods(val)
			},
			getTabGoods(page) {
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
	.gropAdd {
		margin: 20px;
		width: 700px;
		box-sizing: border-box;
		padding: 20px;
	}
	/deep/ .el-input__inner {
		width: 400px
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

	.el-input__inner {
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
		}
</style>
