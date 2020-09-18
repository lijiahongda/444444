<template>
	<div class="app-container" v-loading="loading">
		<el-button @click="dialogTableVisible = true">添加商品</el-button>
		<el-form label-width="120px" :model="form" :rules="rules" ref="form">
			<el-form-item label="直播用户ID" prop="live_people_id">
				<el-input size="mini" v-model="form.live_people_id" placeholder="请输入直播用户ID"></el-input>
			</el-form-item>
			<el-form-item label="直播标题" prop="act_name">
				<el-input size="mini" v-model="form.act_name" placeholder="请输入活动标题" maxlength="20"
						  show-word-limit></el-input>
			</el-form-item>
			<el-form-item label="直播简介" prop="act_desc">
				<el-input size="mini" v-model="form.act_desc" placeholder="请输入活动简介" maxlength="20"
						  show-word-limit></el-input>
			</el-form-item>
			<el-form-item label="虚拟人数">
				<el-input size="mini"  v-model="form.dummy_number"
						  placeholder="请输入直播虚拟人数"></el-input>
			</el-form-item>
			<el-form-item label="活动开始时间" prop="act_starttime">
				<el-date-picker
					v-model="form.act_starttime"
					type="datetime"
					value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="请选择活动开始时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="活动结束时间" prop="act_endtime">
				<el-date-picker
					v-model="form.act_endtime"
					type="datetime"
					value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="请选择活动结束时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="视频封面" prop="act_cover">
				<el-upload
					class="avatar-uploader"
					action="https://api2.yuelvhui.com/app/third/upload"
					list-type="picture-card"
					:on-success="handleAvatarSuccess"
					:on-remove="handleRemoveImg"
					:before-upload="beforeAvatarUpload"
					:on-exceed="handleExceed"
					:limit="1"
					:file-list="imgFileList"
				>
					<i class="el-icon-plus avatar-uploader-icon"></i>
					<div slot="tip" class="el-upload__tip">建议尺寸750*560px或4:3,JPG、PNG格式图片小于5M</div>
				</el-upload>
			</el-form-item>
			<el-form-item label="视频文件" prop="video_url">

				<el-row>
					<el-col :span="10">
						<el-upload
							class="upload-demo"
							action="https://open.yuelvhui.com/open/UploadAlibabaCloudVideo"
							ref="upVideo"
							:on-remove="handleRemove"
							:before-upload="beforeUpload"
							:on-success="handleVideoSuccess"
							:on-exceed="handleExceed"
							:on-preview="handlePreview"
							:limit="1"
							list-type="picture"
							:file-list="videoFileList"
						>
							<div slot="tip" class="el-upload__tip">建议视频时长2-3分钟，且不超过20M</div>
							<el-button size="small" type="primary">选择文件</el-button>
						</el-upload>
						<el-dialog
							title="预览视频"
							:visible.sync="showDialog"
							width="30%"
							:before-close="closeDialog"
						>
							<div style="padding: 20px;height: 450px;">
								<video style="width: 100%;" :src="form.video_url" controls ref="videoReview">
									您的浏览器不支持视频,请升级浏览器,或更换浏览器重试
								</video>
							</div>
							<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="closeDialog">确 定</el-button>
					 </span>
						</el-dialog>
					</el-col>
				</el-row>

			</el-form-item>
			<el-form-item label="分享标题" prop="share_title">
				<el-input size="mini" v-model="form.share_title" placeholder="请输入分享标题" maxlength="20"
						  show-word-limit></el-input>
			</el-form-item>
			<el-form-item label="分享简介" prop="share_desc">
				<el-input size="mini" v-model="form.share_desc" placeholder="请输入分享简介" maxlength="20"
						  show-word-limit></el-input>
			</el-form-item>
		</el-form>

		<div v-if="form.goods_info.length !=0" class="commodity-items" style="clear:both;">
			<ul>
				<li v-for="(item,index) in form.goods_info" :key="index">
					<div>
						<p>直播排序：
							<el-input size="mini" oninput="value=value.replace(/[^\d\.]/g,'')" v-model="item.sort"
									  type="text" placeholder="排序越大越靠前"></el-input>
						</p>
						<p>商品名称： <span v-text="item.goods_name"></span></p>
						<div class="price-box">
							<p>
								<span>会员价：</span>
								<el-input size="mini" oninput="value=value.replace(/[^\d\.]/g,'')"
										  v-model="item.vip_price"
										  disabled
										  type="text" placeholder="价格"></el-input>
								<!--<span style="color: green">  (官网价格：￥{{item.price}}；成本价格：￥{{item.buy_price
								}})</span>-->
							</p>
							<p>
								<span>官网价：</span>
								<el-input size="mini" oninput="value=value.replace(/[^\d\.]/g,'')"
										  v-model="item.price"
										  disabled
										  type="text" placeholder="价格"></el-input>
							</p>
							<p>
								<span>直播价：</span>
								<el-input size="mini" oninput="value=value.replace(/[^\d\.]/g,'')"
										  v-model="item.sk_price"
										  :disabled="item.status===2"
										  @input="setPriceDis(item)"
										  type="text" placeholder="价格"></el-input>
							</p>
							<p>
								<span>拍立减价：</span>
								<el-input size="mini" oninput="value=value.replace(/[^\d\.]/g,'')"
										  v-model="item.decrease_price"
										  :disabled="item.status===1"
										  @input="setPriceDis(item)"
										  type="text" placeholder="价格"></el-input>
							</p>

							<p>
								<span>库存：</span>
								<el-input size="mini" oninput="value=value.replace(/[^\d\.]/g,'')"
										  v-model="item.goods_stock" type="text" placeholder="库存"></el-input>
								<span style="color: green;">  (官网库存：{{item.inventory}})</span>
							</p>
							<p v-if="item.status==1"  style="margin-left: 20px;">
								<el-date-picker
									v-model="item.start_time"
									type="datetime"
									value-format="yyyy-MM-dd HH:mm:ss"
									placeholder="请选择开始时间">
								</el-date-picker>
								<el-date-picker
									v-model="item.end_time"
									type="datetime"
									value-format="yyyy-MM-dd HH:mm:ss"
									placeholder="请选择结束时间">
								</el-date-picker>
							</p>
						</div>

						<el-radio-group v-model="item.is_show">
							<el-radio :label="1">显示{{item.status===1?'直播价':'拍立减价'}}</el-radio>
							<el-radio :label="2">隐藏{{item.status===1?'直播价':'拍立减价'}}</el-radio>
						</el-radio-group>
						<el-radio-group v-model="item.is_status"  style="margin-left: 20px;">
							<el-radio :label="1">上架</el-radio>
							<el-radio :label="0">下架</el-radio>
						</el-radio-group>
					</div>
					<div>
						<el-button v-if="$route.query.id" type="success" plain @click='onSubmit("form")'>保存</el-button>
						<el-button type="danger" plain @click='delItem(item,form.goods_info,index)'>删除</el-button>
					</div>
					<div>


					</div>
				</li>
			</ul>
		</div>

		<el-dialog width="800px" title="选择商品" :visible.sync="dialogTableVisible">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="渠道" class="background_color">
					<el-radio-group v-model="form.channel_id" @change="radioChange">
						<el-radio v-if="item.id != 7" v-model="form.channel_id" v-for="item in channelList"
								  :key="item.id" :label="item.id">{{item.channel_name}}
						</el-radio>
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
							<div>
								<p style="color: darkred;">
									{{item.isSecKill ? '正在参加秒杀活动':''}}
								</p>
							</div>
						</div>

						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
			</div>
			<el-pagination small :current-page.sync="currentPage" @current-change="handleCurrentChange"
						   layout="prev, pager, next" :total="total">
			</el-pagination>

		</el-dialog>

		<el-button type="primary" @click="onSubmit('form')">保存数据</el-button>
		<router-link :to="{path:'live-video'}">
			<el-button>返回列表</el-button>
		</router-link>
	</div>
</template>

<script>
	import {
		getNewTabGoods,
		updateLiveEvents,
		deleteLiveEventsGood,
		getLiveEvents,
		addLiveEvents,
		getChannelList,
		deleteSeckillIGood
	} from '@/api/shops'

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
					act_type: 3,
					is_online: 1,
					goods_info: [] //选择商品信息
				},
				loading: false,
				total: 0,
				currentPage: 1,
				radioChannel: '',
				channelList: [],
				list: [],
				disableds: false,
				dialogTableVisible: false,
				searchVal: '',
				showDialog: false,
				videoFileList: [],
				imgFileList: [],
				rules: {
					live_people_id: [
						{ required: true, message: '请输入直播用户ID', trigger: 'blur' }
					],
					act_name: [
						{ required: true, message: '请输入活动标题', trigger: 'blur' }
					],
					act_desc: [
						{ required: true, message: '请输入活动简介', trigger: 'blur' }
					],
					act_starttime: [
						{ required: true, message: '请选择活动开始时间', trigger: 'change' }
					],
					act_endtime: [
						{ required: true, message: '请选择活动结束时间', trigger: 'change' }
					],
					share_title: [
						{ required: true, message: '请输入分享标题', trigger: 'blur' }
					],
					share_desc: [
						{ required: true, message: '请输入分享简介', trigger: 'blur' }
					],
					act_cover: [
						{ required: true, message: '请上传图片', trigger: 'blur' }
					],
					// video_url: [
					// 	{ required: true, message: '请上传视频', trigger: 'blur' }
					// ]
				}
			}
		},
		mounted() {
			this.getTabGoods(1)
			if (this.$route.query.id) {
				this.getLiveEvents(this.$route.query.id)
				this.disableds = true
			}
			// this.getTabChannels();
			this.getChannelList()
		},
		methods: {
			setPriceDis(item){
				console.log(item)
				if(!item.sk_price && !item.decrease_price){
					item.status = ""
				}else if(item.sk_price){
					item.status = 1
					item.decrease_price=""
				}else if(item.decrease_price){
					item.status = 2
					item.sk_price=""
				}

			},
			getLiveEvents() {
				this.loading = true
				getLiveEvents({ id: this.$route.query.id }).then(res => {
					if (res.data.code == 200) {
						this.form = res.data.data
						this.videoFileList = []
						this.imgFileList = []
						this.videoFileList.push({
							name: res.data.data.video_title,
							url: res.data.data.video_cover
						})
						this.imgFileList.push({
							name: res.data.data.video_id,
							url: res.data.data.act_cover
						})
						this.loading = false
						// this.$message.success('操作成功')
					} else {
						this.$message.error(res.data.msg)
						this.loading = false
					}
				})
			},
			radioChange: function(val) {
				this.currentPage = 1
				this.radioChannel = val
				this.list = []
				this.getTabGoods(1)
			},
			handleCurrentChange(val) {
				this.getTabGoods(val)
			},
			// 删除
			delItem(item, dataList, idx) {
				if (item.id) {
					deleteLiveEventsGood({
						id: item.id
					}).then(res => {
						if (res.data.code == 200) {
							this.$message({
								type: 'success',
								message: '删除成功'
							})
							dataList.splice(idx, 1)
						}
					})
				} else {
					dataList.splice(idx, 1)
				}

			},
			// 选择商品
			choseId(item) {
				var goodsInfo = this.form.goods_info
				var idx = this.form.goods_info.length
				var obj = {
					sk_price: '', //活动价格
					goods_stock: '', //活动库存
					buy_limit: '', //限购数量
					sort: '', //排序
					act_id: '',
					buy_limit: '',
					goods_id: '',
					goods_img: '',
					goods_name: '',
					id: '',
					price: '',
					sku_id: '',
					sort: '',
					inventory: '',
					is_show:'',
					decrease_price:'',
					status:'',
				}
				obj.sku_id = item.sku_id
				obj.goods_img = item.path
				obj.goods_name = item.goods_name
				obj.goods_id = item.id || ''
				// obj.id = item.id || '';
				obj.act_id = this.$route.query.id || ''
				obj.price = item.origin_price
				obj.buy_price = item.buy_price
				obj.vip_price = item.vip_price
				obj.inventory = item.inventory
				obj.goods_stock = item.goods_stock
				obj.is_show = item.is_show ? item.is_show : 1
				obj.decrease_price = item.decrease_price ? item.decrease_price : ''
				obj.status = item.status ? item.status :''
				if (goodsInfo.length == 0) {
					console.log(222, idx)
					this.form.goods_info.push(obj) //官网价
					this.dialogTableVisible = false
				} else {
					console.log(243)
					var isArr = []
					goodsInfo.map((json) => {
						isArr.push(json.sku_id)
					})
					if (isInArray(item.sku_id, isArr)) {
						this.$message({
							type: 'info',
							message: '不能选择相同产品'
						})
					} else {
						this.form.goods_info.push(obj) //官网价
						this.dialogTableVisible = false
					}
				}
			},
			getTabGoods(page) {
				let _this = this
				let data = {
					page: page,
					channel_id: this.radioChannel,
					video_no_channel_id: 'no_xingyun'
				}
				if (this.searchVal) {
					data['goods_name'] = this.searchVal
				}

				getNewTabGoods(data).then((res) => {
					if (res.data.code == 200) {
						_this.list = res.data.data
						_this.total = res.data.count
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			// 删除
			delItem(item, dataList, idx) {
				if (item.id) {
					deleteSeckillIGood({
						id: item.id
					}).then(res => {
						if (res.data.code == 200) {
							this.$message({
								type: 'success',
								message: '删除成功'
							})
							dataList.splice(idx, 1)
						}
					})
				} else {
					dataList.splice(idx, 1)
				}

			},
			getChannelList() {
				getChannelList().then((res) => {
					if (res.data.code == 200) {
						this.channelList = res.data.data
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			closeDialog() {
				this.showDialog = false
				this.$refs['videoReview'].pause()
			},
			handleExceed(files, fileList) {
				this.$message.warning(`最多上传1个文件`)
			},
			beforeUpload(file) {
				const isVideo = ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1
				const isLt30M = file.size / 1024 / 1024 < 30
				if (isVideo) {
					this.$message.error('请上传正确的视频格式')
					return false
				}
				if (!isLt30M) {
					this.$message.error('上传视频大小不能超过 30MB!')
					return false
				}
				this.videoLoading = this.$loading({
					lock: true,
					text: '视频上传转码中,请稍候...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
			},
			beforeAvatarUpload(file) {
				const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
				const isLt5M = file.size / 1024 / 1024 < 5
				if (!isLt5M) {
					this.$message.error('上传图片大小不能超过 5MB!')
				}
				if (!isImg) {
					this.$message.error('检查图片格式是否正确!')
				}
				return isImg && isLt5M
			},
			handleAvatarSuccess(res, file) {
				console.log(res, file, 'touxian')
				if (res.code === 200) {
					this.form.act_cover = res.url
				} else {
					this.form.act_cover = ''
					this.imgFileList = []
				}
			},
			handleVideoSuccess(res, file) {
				console.log(res, file, '=======res')
				if (res.code == 200) {
					let videoId = res.data
					let url = 'https://open.yuelvhui.com/open/getVideoInfo?video_id=' + videoId
					this.axios({
						method: 'post',
						url: url
					}).then((item) => {
						if (!item.data.data.CoverURL) {
							this.timeOut = setInterval(this.handleVideoSuccess(res, file), 5000)

						} else {
							clearInterval(this.timeOut)
							this.videoLoading.close()
							this.$message.success('视频上传成功!')
							this.form.video_url = item.data.data.PlayURL
							this.form.video_cover = item.data.data.CoverURL
							this.videoFileList = [{
								name: file.name,
								url: item.data.data.CoverURL
							}]
						}

					})
				} else {
					this.videoLoading.close()
					this.$message.error('视频上传失败,请删除重试!')
					this.$refs.upVideo.clearFiles() //上传失败 清除文件列表
				}

			},
			handleRemove(file, fileList) {
				console.log(file, fileList)
			},
			handleRemoveImg() {
				this.form.act_cover = ''
				this.imgFileList = []
			},
			handlePreview(file) {
				console.log(file)
				this.showDialog = true
			},

			onSubmit(formName) {
				let url = ''
				if (this.$route.query.id) {
					url = updateLiveEvents
				} else {
					url = addLiveEvents
				}
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loading = true
						url(this.form).then(res => {
							if (res.data.code == 200) {
								this.$message.success('操作成功')
								this.loading = false
								if (!this.$route.query.id) {
									this.$router.push({ path: '/operate/live-video' })
								} else {
									this.getLiveEvents()
								}
							} else {
								this.$message.error(res.data.msg)
								this.loading = false
							}
						}).catch(res => {
							this.loading = false
						})
					} else {
						return false
					}
				})

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
		width: 615px;
	}

	.price-box {
		border: 1px solid #ccc;
		padding: 20px;
		border-radius: 20px;
		margin: 20px 0;
		display: flex;
		width: 1000px;
		flex-wrap: wrap;
		.el-input {
			margin-right: 20px;

			.el-input__inner {
				width: 100px;
			}
		}
	}

</style>
